const router = require('express').Router();
const fs = require('fs');

function randomString(length) {
    let string = '';
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for(let i=0;i<length;i++) {
        string += characters.charAt(Math.floor(Math.random() * characters.length ));
    }
    return string;
}

class Paste {
    constructor(text, name, language, expiration, visability) {
        this.text = text;
        this.id = randomString(6);
        this.name = name || this.id;
        this.language = language;
        this.expiration = expiration || 'never';
        this.visability = visability || 'public';
    }
}

const pastes = [];

router.post('/paste', (req, res) => {
    const text = req.body.text;
    if(text == 0) res.send(400)
    const paste = new Paste(text)
    pastes.push(paste);
    res.send(paste);
});

router.get('/paste/:id', (req, res) => {
    const id = req.params.id;
    for(let paste of pastes) {
        if(paste.id == id) {
            return res.send(paste);
        }
    }   
    return res.send(404);
});

router.post('/paste/:id/download', (req, res) => {
    const id = req.params.id;
    for(let paste of pastes) {
        if(paste.id == id) {
            console.log('made quest')
            fs.writeFile('last.txt', paste.text, (err) => {if(err) {throw err}});
            return res.download('last.txt', 'last.txt');
        }
    }  
    return res.send(404);
});

module.exports = router;