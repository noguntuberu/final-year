const express = require('express');
const util = require('util');
const uploader = require('express-fileupload');
const path = require('path');
const Router = express.Router();
const postModel = require('../models/post.model');

//
const System = require('../controllers/system.control');



Router.get('/', async (req, res) => {
    res.json(System.reducePostsAndStatsForReduxStore());    
})

Router.get('/:id', async (req, res) => {
    
})

Router.get('/analysis/:id', async(req, res) => {
    res.send({
        postAnalysis: System.performOverallAnalysisForPost(req.params.id),
        groupAnalysis: {
            gender: System.performGenderAnalysisForPost(req.params.id)
        }
    })
})

Router.get('/search/:keywords', async () => {

})

//
Router.post('/new', async (req, res) => {
    image = req.files.image;
    const mv = util.promisify(image.mv);
    mv(path.resolve(`${__dirname}`, `../../client/public/uploads/${image.name}`))
        .then(response => {
            res.json(response);
        })
    // if (req.files === undefined || req.files === null){
    //     const result = await System.addNewPost({...req.body, mediaUri: ""});
    //     if(result) {
    //         res.json({
    //             success: true,
    //             payload: "Post uploaded"
    //         });
    //     } else {
    //         res.json({
    //             success: false,
    //             payload: "Post upload failed"
    //         });
    //     }
    // } else {
    //     const image = req.files.image;
    //     image.mv(path.resolve(`${__dirname}`, `../../client/public/uploads/${image.name}`), async err => {
    //         if (err) {
    //             return res.status(500).send(err);
    //         }
            
    //         const mediaUri = image.name;
    //         const result = await System.addNewPost({...req.body, mediaUri});
    //         if(result) {
    //             res.json({
    //                 success: true,
    //                 payload: "Post uploaded"
    //             });
    //         } else {
    //             res.json({
    //                 success: false,
    //                 payload: "Post upload failed"
    //             });
    //         }
    //     });
    // }
})

Router.post('/comment', async (req, res) => {
    const result = await System.addComment({...req.body});
    res.json(result);
})

//
Router.put('/view/:id', async (req, res) => {
    const postId = req.params.id;
    res.json(System.incrementPostViewCount(postId));
})

Router.put('/stat', async (req, res) => {
    res.send(System.updateLikeDislikeCounts({...req.body}));
})

//
Router.delete('/', async (req, res) => {
    res.send(await postModel.remove({}));
})

module.exports = Router;