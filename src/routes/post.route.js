const express = require('express');
const util = require('util');
const fs = require('fs');
const path = require('path');
const Router = express.Router();
const postModel = require('../models/post.model');
const Analyzer = require('../controllers/analyzer.control');

//
const System = require('../controllers/system.control');



Router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const result = {
        posts : System.reducePostsAndStatsForReduxStore(),
        userActions: await System.fetchUserActions(userId)
    }
    res.json(result);    
})

Router.get('/:id', async (req, res) => {
    
})

Router.get('/analysis/:id', async(req, res) => {
    res.json({
        postAnalysis: System.performOverallAnalysisForPost(req.params.id),
        groupAnalysis: {
            gender: System.performGenderAnalysisForPost(req.params.id)
        }
    })
})

Router.get('/comment/:postId', async (req, res) => {
    const postId = req.params.postId;
    const comments = await System.getPostComments(postId);

    res.send(comments);
})

Router.get('/search/:keywords', async (req, res) => {

})

//
Router.post('/new', async (req, res) => {
    let mediaUri;
    let statusCode = 500;
    let returnData = {
        success: false,
        payload: "Post upload failed."
    }
    
    if (req.files === undefined || req.files === null) {
        mediaUri = "";
    } else {
        const image = req.files.image;
        const mv = util.promisify(image.mv);
        const imagePath = path.resolve(`${__dirname}`, `../../client/public/uploads/${image.name}`);
        try {
            mv(imagePath);
            if ((await fs.existsSync(imagePath)) === false) {
                returnData.payload += " Try again later.";
            }
            mediaUri = image.name;
        } catch (err) {
            returnData.payload += err.message;
        }
    }

    const result = await System.addNewPost({...req.body, mediaUri});
    if (result && (await System.addNewPostStat(result))) {
        statusCode = 200;
        returnData.success = true;
        returnData.payload = await System.getAPost(result);
    } else {
        returnData.payload = "Post upload failed."
    }

    return res.status(statusCode).json(returnData);
})

Router.post('/comment', async (req, res) => {
    // handle analysis
    try {
        const score = await Analyzer.analyzeTextSentiment(req.body);
        const dateCreated = Date.now();

        const result = await System.addComment({...req.body, score, dateCreated});
        const user = System.getUser(req.body.userId);
        
        if (result.success) {
            result.payload = {
                ...System.getComment(req.body.postId, result.payload),
                userName: user.firstName + " " +user.lastName 
            }
        }
        res.send(result);
    } catch(err) {
        return res.status(500).json({
            success: false,
            payload: "Server Error"
        })
    }
})

//
Router.put('/view/:id', async (req, res) => {
    const postId = req.params.id;
    System.incrementPostViewCount(postId);
    res.json(System.getPostForReduxStore(postId));
})

Router.put('/stat', async (req, res) => {
    const actionData = req.body;
    res.send(await System.reactToPost(actionData));
})

//
Router.delete('/', async (req, res) => {
    System.clearPosts();
    res.send(await postModel.remove({}));
})

module.exports = Router;