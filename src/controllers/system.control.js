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
    constructor () {
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

        setInterval(async () => {
            await this.savePostStatsToDatabase();
            await this.loadUsersFromDatabase();
            await this.loadPostsFromDatabase();
            await this.loadPostStatsFromDatabase();
            await this.loadCommentsFromDatabase();
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
            [userInfo._id] : userInfo
        }
    }

    async addNewUser(data) {
        const User = new this.user;
        const result = this.convertToJSON(await  User.createDatabaseRecord({
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
                this.addNewPostToList(post);
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
                [postId] : {
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
                [action.postId] : {...action}
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
        const {userId, postId, like, dislike} = actionData;
        actionSaveResult = await UserAction.createDatabaseRecord(userId, postId, like, dislike);
        if(actionSaveResult.success) {
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
            [postStat.postId] : postStat
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
            likeCount: newLikeCount <= 0 ? 0 : newLikeCount ,
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
        const comments =  this.comments[postId];
        let processedComments  = {};
        for(const commentId in comments) {
            const userId = comments[commentId].userId;
            const user = this.getUser(userId);
            processedComments = {
                ...processedComments,
                [commentId] : {
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
        if(result.success) {
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
    performOverallAnalysisForPost(postId) {
        let actualTotalScore = 0,
            expectedTotalScore = 0;
        
        for (const commentId in this.comments[postId]) {
            actualTotalScore += this.comments[postId][commentId].score + 1;
            expectedTotalScore += 2;
        }
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
        let maleActualScore = 0, 
            maleExpectedScore = 0,
            maleTotalScore = 0,
            femaleActualScore = 0,
            femaleExpectedScore = 0,
            femaleTotalScore = 0,
            neutralActualScore = 0,
            neutralExpectedScore = 0,
            neutralTotalScore = 0;
        //

        // GET negative and positive scores for each gender
        for (const commentId in this.comments[postId]) {
            const comment = this.comments[postId][commentId],
                  user = this.users[comment.userId];
            if (user) {
                if (user.gender === 'M') {
                    maleActualScore += comment.score + 1;
                    maleExpectedScore += 2;
                }else if (user.gender === 'F') {
                    femaleActualScore += comment.score + 1;
                    femaleExpectedScore += 2;
                }else {
                    neutralActualScore += comment.score + 1;
                    neutralExpectedScore += 2;
                }
            }
        }
        
        maleTotalScore = this.analyzer.analyze(maleActualScore, maleExpectedScore);
        femaleTotalScore = this.analyzer.analyze(femaleActualScore, femaleExpectedScore);
        neutralTotalScore = this.analyzer.analyze(neutralActualScore, neutralExpectedScore);
        return {
            "Male": maleTotalScore,
            "Female": femaleTotalScore,
            "Neutral": neutralTotalScore
        }
    }
}

module.exports = new System();