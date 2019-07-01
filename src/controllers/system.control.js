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

    reducePostsAndStatsForReduxStore() {
        let reducedPosts = {};
        for (const postId in this.posts) {
            reducedPosts = {
                ...reducedPosts,
                [postId] : {
                    ...this.posts[postId],
                    ...this.postStats[postId]
                }
            }
        }

        return reducedPosts
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

    incrementPostViewCount(postId) {
        this.postStats[postId] = {
            ...this.postStats[postId],
            viewCount: this.postStats[postId].viewCount + 1
        }

        return this.postStats[postId].viewCount;
    }

    updateLikeDislikeCounts(data) {

        this.postStats[data.postId] = {
            ...this.postStats[data.postId],
            likeCount: this.postStats[data.postId].likeCount + parseInt(data.like),
            dislikeCount: this.postStats[data.postId].dislikeCount + parseInt(data.dislike),
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
        let totalNegativeScore = 0,
            totalPositiveScore = 0;
        
        for (const commentId in this.comments[postId]) {
            const comment = this.comments[postId][commentId];
            //
            if (comment.score < 0) {
                totalNegativeScore += comment.score;
            } else {
                totalPositiveScore += comment.score;
            }
        }
        return this.analyzer.analyze(totalNegativeScore, totalPositiveScore);
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
        let maleNegativeScore = 0, 
            malePositiveScore = 0,
            maleTotalScore = 0,
            femaleNegativeScore = 0,
            femalePositiveScore = 0,
            femaleTotalScore = 0,
            nuetNegativeScore = 0,
            nuetPositiveScore = 0,
            nuetTotalScore = 0;
        //

        // GET negative and positive scores for each gender
        for (const commentId in this.comments[postId]) {
            const comment = this.comments[postId][commentId],
                  user = this.users[comment.userId];
            if (user) {
                if (user.gender === 'M') {
                    if (comment.score < 0) {
                        maleNegativeScore += comment.score;
                    } else {
                        malePositiveScore += comment.score;
                    }
                }else if (user.gender === 'F') {
                    if (comment.score < 0) {
                        femaleNegativeScore += comment.score;
                    } else {
                        femalePositiveScore += comment.score;
                    }
                }else {
                    if (comment.score < 0) {
                        nuetNegativeScore += comment.score;
                    } else {
                        nuetPositiveScore += comment.score;
                    }
                }
            }
        }
        
        maleTotalScore = this.analyzer.analyze(maleNegativeScore, malePositiveScore);
        femaleTotalScore = this.analyzer.analyze(femaleNegativeScore, femalePositiveScore);
        nuetTotalScore = this.analyzer.analyze(nuetNegativeScore, nuetPositiveScore);
        return {
            "Male": maleTotalScore,
            "Female": femaleTotalScore,
            "Neutral": nuetTotalScore
        }
    }
}

module.exports = new System();