const express = require('express');
const path = require('path');
const Router = express.Router();

//
const System = require('../controllers/system.control');



Router.get('/', async (req, res) => {
    res.json(System.getPosts());    
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
    if (req.files === undefined || req.files === null){
        return res.status(400).json({msg: "No file"})
    }

    const image = req.files.image;
    image.mv(path.resolve(`${__dirname}`, `../../client/admin/public/uploads/${image.name}`), async err => {
        if (err) {
            return res.status(500).send(err);
        }

        //
        const mediaUri = image.name;
        const result = await System.addNewPost({...req.body, mediaUri});
        res.json(result);
    });
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

module.exports = Router;