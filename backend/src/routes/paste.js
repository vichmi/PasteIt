const router = require('express').Router();
const fs = require('fs');
const Paste = require('../model/Paste');
const mongoose = require('mongoose');
const axios = require('axios');

function randomString(length) {
    let string = '';
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for(let i=0;i<length;i++) {
        string += characters.charAt(Math.floor(Math.random() * characters.length ));
    }
    return string;
}

router.post('/paste', async(req, res) => {
    try {
        const text = req.body.text;
        if(text.length == 0) res.send(400);
        const id = randomString(6);
        const paste = new Paste({text, id, name: req.body.name || id, createdAt: new Date(), language: req.body.language, expiration: req.body.expiration || 'Never', visability: req.body.visability || 'Public'})
        await paste.save();
        console.log(req.body.token);
        if(req.body.token != null || req.body.token != 'null') {
            axios.post('http://localhost:3002/auth/appendUser?token='+req.body.token, {paste}, (err, response, body) => {
                if(!err && response.statusCode == 200) {
                    
                }
            });
        }

        return res.send(paste);
    } catch(err) {
        return res.send(err);
    }
});

router.get('/paste/:id', async(req, res) => {
    try {
        const id = req.params.id;

        const paste = await Paste.findOne({id: id})

        if(paste) {
            return res.send(paste)
        }

        return res.send(404);
    }catch(err) {
        console.log(err);
        return res.send(err);
    }
});

router.get('/allPastes', async(req, res) => {
    try{
        const pastes = await Paste.find({visability: 'Public'}).sort({createdAt: -1}).limit(20);
        
        return res.json(pastes);
    }catch(err){
        console.log(err);
        return res.send(err);
    }
})

module.exports = router;