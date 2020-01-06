/**
 * 
 */
const mongoose = require('mongoose');
const assert = require('chai').assert;
const System =  require('../../../src/controllers/system.control');

describe ("System Controller Tests:", () => {
    after (async () => {
       await mongoose.connection.db.dropDatabase();
    })

    describe ("System -> Users", () => {

        it ("Adds New User", async () => {
            const data = {
                firstName: "Nathan",
                lastName: "Oguntuberu",
                email: 'nateoguns@test.com',
                password: "test.password",
                gender: 'M'
            }
            const result = await System.addNewUser(data);
            assert.isTrue(result);
        })

        it ("Loads users from database", async () => {
            await System.loadUsersFromDatabase();
            assert.isObject(System.getUsers());
        })
    })

    describe ("System -> Posts Tests", () => {

        it ("Adds new post to post array", async () => {
            let data = {
                userId: System.getAUser(),
                title: "A post Title",
                body: "The post body",
                mediaUri: "link.png",
                audience: 'all'
            }
            assert.isString(await System.addNewPost(data));
        })

        it ("Loads posts from database", async () => {
            await System.loadPostsFromDatabase();
            assert.isNotEmpty(System.getPosts());
        })

        it ("Get all posts", () => {
            const result = System.getPosts();
            assert.isObject(result);
        })

        it ("Reduces post information for redux store", () => {
            assert.isObject(System.reducePostsAndStatsForReduxStore());
        })

    })

    describe ("System -> Comments", () => {

        it ("Adds new comment", async () => {
            const data = {
                postId: 'post1',
                userId: System.getAUser(),
                body: 'Just another comment',
                dateCreated: 786543345678,
                score: -0.45,
            }
            const result = await System.addComment(data);
            assert.isTrue(result);
        })

        it ("Loads comments from database", async () => {
            const result = await System.loadCommentsFromDatabase();
            assert.isTrue(result);
        })

        it ("Gets comments for a post", () => {
            assert.isObject(System.getPostComments('post1'));
        })
    })

    describe ("System -> PostStats", () => {
        it ("Adds new Post Stat", async () => {
            const result = await System.addNewPostStat('post1');
            assert.isTrue(result);
        })

        it ("Loads Posts Stats", async () => {
            const result = await System.loadPostStatsFromDatabase();
            assert.isNotEmpty(System.getPostStats());
        })
    })

    describe ("System -> PostAnalysis", () => {
        it ("Calculates Overall Post Analysis", () => {
            const result = System.performOverallAnalysisForPost('post1');
            assert.isNumber(result);
        })
    })

    describe ("System -> GroupAnalysis", () => {
        it ("Calculates Group Analysis  for post", () => {
            const result = System.performGenderAnalysisForPost('post1');
            assert.isObject(result);
        })
    })
})