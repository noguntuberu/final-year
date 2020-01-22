/**
 * @author Oguntuberu Nathan O.
 * 
 * The system object is a singleton that bears the weight of the app.
 */
const comment = require('./comment.control'),
    groupAnalysis = require('./group-analysis.control'),
    postAnalysis = require('./post-analysis.control'),
    postStat = require('./post-stat.control'),
    post = require('./post.control'),
    userAction = require('./user-action.control'),
    user = require('./user.control'),
    analyzer = require('./analyzer.control');
//

class System {
    constructor() {
        // controllers
        this.analyzer = analyzer;
        this.comment = comment;
        this.groupAnalysis = groupAnalysis;
        this.post = post;
        this.postAnalysis = postAnalysis;
        this.postStat = postStat;
        this.user = user;
        this.userAction = userAction;

        // containers
        this.users = {};
        this.posts = {};
        this.comments = {};
        this.postStats = {};
        this.userActions = {};
        this.commentScores = {};
    }

    convertToJSON(data) {
        let result = data;
        return JSON.parse(JSON.stringify(result));
    }

    async init() {
        // LOAD UP NECESSARY DATA
        await this.loadUsersFromDatabase();
        await this.loadPostsFromDatabase();
        await this.loadPostStatsFromDatabase();
        await this.loadCommentsFromDatabase();
        await this.loadUserActionFromDatabase();

        setInterval(async () => {
            await this.savePostStatsToDatabase();
            await this.loadUsersFromDatabase();
            await this.loadPostsFromDatabase();
            await this.loadPostStatsFromDatabase();
            await this.loadCommentsFromDatabase();
            await this.loadUserActionFromDatabase();
        }, 1000);
    }

    /**
     * 
     * @USER_CONTROLLER
     */
    clearUsers() {
        this.users = {}
    }
    getUsers() {
        return this.users;
    }
    getUser(userId) {
        return this.users[userId];
    }

    addUserToList(userInfo) {
        this.users = {
            ...this.users,
            [userInfo._id]: userInfo
        }
    }

    async addNewUser(data) {
        const User = new this.user;
        const result = this.convertToJSON(await User.createDatabaseRecord({
            ...data,
            level: parseInt(data.level)
        }));

        if (result.success) {
            this.addUserToList(result.payload);
            return true;
        }

        return false;
    }

    async loadUsersFromDatabase() {
        const User = new this.user;
        const result = await User.fetchAll();
        if (result.success) {
            result.payload.forEach(user => {
                this.addUserToList(user);
            })
            return true;
        }

        return false;
    }

    /***
     * @POST_CONTROLLER
     */
    clearPosts() {
        this.posts = {}
    }
    getPosts() {
        return this.posts;
    }

    getAPost(postId) {
        return this.posts[postId];
    }

    addNewPostToList(post) {
        this.posts = {
            ...this.posts,
            [post._id]: post
        }
    }

    async addNewPost(data) {
        //
        const Post = new this.post;
        Post.setInfo(data);
        const result = this.convertToJSON(await Post.createNewRecord());
        if (result.success) {
            this.addNewPostToList(result.payload);
            return result.payload._id;
        }

        return "";
    }

    async loadPostsFromDatabase() {
        const Post = new this.post;
        const result = this.convertToJSON(await Post.fetchAll());
        if (result) {
            result.forEach(post => {
                this.addNewPostToList({
                    ...post,
                    mediaUri: `${process.env.APP_URI}:${process.env.APP_PORT}/images/${post.mediaUri}`
                });
            })
            return true;
        }

        return false;
    }

    getPostForReduxStore(postId) {
        return {
            ...this.postStats[postId],
            ...this.posts[postId]
        }
    }

    reducePostsAndStatsForReduxStore() {
        let reducedPosts = {};
        for (const postId in this.posts) {
            reducedPosts = {
                ...reducedPosts,
                [postId]: {
                    ...this.postStats[postId],
                    ...this.posts[postId]
                }
            }
        }

        return reducedPosts
    }

    /**
     * 
     * @USER_ACTION_CONTROLLER
     */

    async loadUserActionFromDatabase() {
        const userActionControl = new this.userAction;
        const userActions = await userActionControl.fetchAllRecords();
        if (userActions) {
            let processedActions = {};
            for (let i = 0; i < userActions.length; i++) {
                const userAction = userActions[i];
                processedActions = {
                    ...processedActions,
                    [userAction.postId]: {
                        ...processedActions[userAction.postId],
                        [userAction.userId]: {
                            ...userAction
                        }
                    }
                }
            }

            this.userActions = processedActions;
        }
    }

    async reactToPost(actionData) {
        this.updateLikeDislikeCounts(actionData);
        const refinedData = this.refineUserActionDataForDatabase(actionData);
        if (await this.updateUserAction(refinedData)) {
            return {
                success: true,
                payload: {
                    posts: this.reducePostsAndStatsForReduxStore(),
                    userAction: refinedData
                }
            }
        }

        return {
            success: false,
            payload: {}
        }
    }

    refineUserActionDataForDatabase(rawActionData) {
        if (rawActionData.like === 1) {
            return {
                ...rawActionData,
                like: true,
                dislike: false
            }
        } else if (rawActionData.dislike === 1) {
            return {
                ...rawActionData,
                like: false,
                dislike: true
            }
        }

        return {
            ...rawActionData,
            like: false,
            dislike: false
        }
    }

    async fetchUserActions(userId) {
        const UserAction = new this.userAction;
        const userActions = await UserAction.fetchRecordsForUser(userId);
        let objectifiedActions = {};
        userActions.forEach(action => {
            objectifiedActions = {
                ...objectifiedActions,
                [action.postId]: { ...action }
            }
        })

        return objectifiedActions;
    }

    async updateUserAction(actionData) {
        const UserAction = new this.userAction;
        let actionSaveResult;

        const isRecordExist = await UserAction.doesRecordExist(actionData.userId, actionData.postId);
        if (isRecordExist) {
            actionSaveResult = await UserAction.saveToDatabase(actionData);
            if (actionSaveResult.success) {
                return true;
            }
            return false;
        }
        const { userId, postId, like, dislike } = actionData;
        actionSaveResult = await UserAction.createDatabaseRecord(userId, postId, like, dislike);
        if (actionSaveResult.success) {
            return true;
        }
        return false;
    }

    /**
     * 
     * @POST_STATS_CONTROLLER
     */

    addToPostStatList(postStat) {
        this.postStats = {
            ...this.postStats,
            [postStat.postId]: postStat
        }
    }

    async addNewPostStat(postId) {
        const PostStat = new this.postStat;
        const result = this.convertToJSON(await PostStat.createDatabaseRecord(postId));
        if (result.success) {
            this.addToPostStatList(result.payload);
            return true;
        }

        return false;
    }

    getPostStats() {
        return this.postStats;
    }

    async loadPostStatsFromDatabase() {
        const PostStat = new this.postStat;
        let postStats = this.convertToJSON(await PostStat.fetchAll());
        //
        postStats.forEach(postStat => {
            this.addToPostStatList(postStat);
        })
    }

    async savePostStatsToDatabase() {
        const PostStat = new this.postStat;
        for (const postId in this.postStats) {
            const postStat = this.postStats[postId];
            await PostStat.saveToDatabase(postStat);
        }
    }

    incrementPostViewCount(postId) {
        this.postStats[postId] = {
            ...this.postStats[postId],
            viewCount: this.postStats[postId].viewCount + 1
        }

        return this.postStats[postId].viewCount;
    }

    updateLikeDislikeCounts(data) {
        const newLikeCount = this.postStats[data.postId].likeCount + parseInt(data.like);
        const newDislikeCount = this.postStats[data.postId].dislikeCount + parseInt(data.dislike);

        this.postStats[data.postId] = {
            ...this.postStats[data.postId],
            likeCount: newLikeCount <= 0 ? 0 : newLikeCount,
            dislikeCount: newDislikeCount <= 0 ? 0 : newDislikeCount,
        }
        return this.postStats[data.postId];
    }


    /**
     * @COMMENTS_CONTROLLER
     */
    getComment(postId, commentId) {
        return this.comments[postId][commentId];
    }
    getPostComments(postId) {
        const comments = this.comments[postId];
        let processedComments = {};
        for (const commentId in comments) {
            const userId = comments[commentId].userId;
            const user = this.getUser(userId);
            processedComments = {
                ...processedComments,
                [commentId]: {
                    ...comments[commentId],
                    userName: user.firstName + " " + user.lastName
                }
            }
        }

        return processedComments;
    }

    addCommentToList(data) {
        this.comments[data.postId] = {
            ...this.comments[data.postId],
            [data._id]: data
        }
    }

    async addComment(data) {
        const Comment = new this.comment;
        const result = await Comment.createDatabaseRecord(data);
        if (result.success) {
            const commentInfo = Comment.getInfo();
            this.addCommentToList(commentInfo);
            return {
                success: true,
                payload: commentInfo._id
            }
        }

        return {
            success: false,
            payload: "Unable to add comment"
        }
    }

    async loadCommentsFromDatabase() {
        const Comment = new this.comment;
        const result = await Comment.fetchAll();
        if (result.success) {
            result.payload.forEach(commentInfo => {
                this.addCommentToList(commentInfo);
            })

            return true;
        }

        return false;
    }

    /**
     * @OVERALL_ANALYSIS
     */
    //
    getAnalysisGridForPost(postId) {
        let analysisGrid = {};

        // populate analysisGrid for comments
        for (const commentId in this.comments[postId]) {
            const comment = this.comments[postId][commentId];
            if (analysisGrid[comment.userId]) {
                analysisGrid[comment.userId].comments = [
                    ...analysisGrid[comment.userId].comments,
                    comment.score
                ]
            } else {
                analysisGrid[comment.userId] = {
                    like: false,
                    dislike: false,
                    comments: [comment.score]
                }
            }
        }

        // populate analysisGrid for userActions
        for (const userId in this.userActions[postId]) {
            const userAction = this.userActions[postId][userId];

            if (analysisGrid[userId]) {
                analysisGrid[userId] = {
                    ...analysisGrid[userId],
                    like: userAction.like ? 1 : 0,
                    dislike: userAction.dislike ? -1 : 0
                }
            } else {
                analysisGrid[userId] = {
                    like: userAction.like,
                    dislike: userAction.dislike,
                    comments: []
                }
            }
        }

        return analysisGrid;
    }

    computeScores(analysisGrid) {
        let actualTotalScore = 0,
            expectedTotalScore = 0;

        for (let userId in analysisGrid) {
            const userGrid = analysisGrid[userId];
            const commentWeight = 0.5 / userGrid.comments.length;

            // get action score
            let actionScore = userGrid.like == 0 ? userGrid.dislike : userGrid.like;
            actionScore *= userGrid.comments.length <= 0 ? 1 : 0.5;

            // get comment score
            let commentScore = 0;
            for (let i = 0; i < userGrid.comments.length; i++) {
                commentScore += (userGrid.comments[i]) * commentWeight;
            }
            actualTotalScore += actionScore + commentScore;
            expectedTotalScore += 1;
        }

        return { actualTotalScore, expectedTotalScore };
    }

    computeScoreForGroup(analysisGrid, groupName, groupKey) {
        let actualTotalScore = 0,
            expectedTotalScore = 0;

        for (let userId in analysisGrid) {
            const userGrid = analysisGrid[userId];

            if (this.users[userId][groupName] === groupKey) {
                const commentWeight = 0.5 / userGrid.comments.length;

                // get action score
                let actionScore = userGrid.like == 0 ? userGrid.dislike : userGrid.like;
                actionScore *= userGrid.comments.length <= 0 ? 1 : 0.5;

                // get comment score
                let commentScore = 0;
                for (let i = 0; i < userGrid.comments.length; i++) {
                    commentScore += (userGrid.comments[i]) * commentWeight;
                }
                actualTotalScore += actionScore + commentScore;
                expectedTotalScore += 1;
            }
        }
        return { actualTotalScore, expectedTotalScore };
    }
    //
    performOverallAnalysisForPost(postId) {
        //
        const analysisGrid = this.getAnalysisGridForPost(postId);
        const { actualTotalScore, expectedTotalScore } = this.computeScores(analysisGrid);

        return this.analyzer.analyze(actualTotalScore, expectedTotalScore);
    }

    /**
     * @GROUP_ANALYSIS
     */

    // This method is for testing purposes
    getAUser() {
        for (const userId in this.users) {
            return userId;
        }
    }
    performGenderAnalysisForPost(postId) {
        const analysisGrid = this.getAnalysisGridForPost(postId);
        const male = {
            ...this.computeScoreForGroup(analysisGrid, 'gender', 'M')
        };
        const female = {
            ...this.computeScoreForGroup(analysisGrid, 'gender', 'F')
        };
        const neutral = {
            ...this.computeScoreForGroup(analysisGrid, 'gender', undefined)
        };
        //
        return {
            "Male": this.analyzer.analyze(male.actualTotalScore, male.expectedTotalScore),
            "Female": this.analyzer.analyze(female.actualTotalScore, female.expectedTotalScore),
            "Neutral": this.analyzer.analyze(neutral.actualTotalScore, neutral.expectedTotalScore)
        }
    }
}

module.exports = new System();