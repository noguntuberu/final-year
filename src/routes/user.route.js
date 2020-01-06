/** */
const express = require('express');
const Router = express.Router();
const guestController = require('../controllers/guest.control');
const System = require('../controllers/system.control');

//  GET

Router.get('/', async (req, res) => {
    //res.send(System.getUsers());
    res.send(await System.getUsers());
})

Router.get('/:id', async (req, res) => {

});

// POST
Router.post('/register', async (req, res) => {
    const Guest = new guestController;
    Guest.setInfo({
        ...req.body,
        isActive: true
    });

    res.send(await Guest.register());
})

Router.post('/login', async (req, res) => {
    const Guest = new guestController;
    const {email, password} = req.body;
    Guest.setInfo({
        email, 
        password
    })
    res.json(await Guest.login());
})

// PUT
Router.put('/update', async (req, res) => {

})

module.exports = Router;