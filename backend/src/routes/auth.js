const router = require('express').Router();
const passport = require('passport');
const User = require('../model/user');
const jwt = require('jsonwebtoken');

router.post('/register', async(req, res) => {
    try{
        const {username, password} = req.body;

        if(!username || !password) {
            return res.send(400);
        }

        const doesExists = await User.findOne({username: username});
        
        if(doesExists) {
            return res.send(403);
        }


        const user = new User({
            username, password
        });
        const savedUser = await user.save();
        // console.log(savedUser);

        const token = jwt.sign({username}, 'carrot');

        return res.send(token);

    }catch(err) {
        console.log(err);
        return res.send(err);
    } 
});


router.post('/login', async(req, res) => {
    try {
        const {username, password} = req.body;
        // console.log(username, password)

        if(!username || !password) {
            return res.send(400);
        }

        const user = await User.findOne({username: username});

        if(!user) {
            return res.send(404);
        }

        const savedUser = await user.save();
        // console.log(savedUser);

        const token = jwt.sign({username}, 'carrot');

        return res.send(token);

    } catch(err) {
        console.log(err);
        return res.send(err);
    }
});

router.get('/verifyToken', (req, res) => {
    const token = req.query.token;
    if(req.query.token == null) return res.send('unauthenticated');
    jwt.verify(token, 'carrot', function(err, decoded){
        if(!err){
            res.json(decoded);
        } else {
            res.send(401);
        }
    })
});

router.post('/appendUser', async(req, res) => {
    try{
        const token = req.query.token;
        const paste = req.body.paste;
        let username;
        jwt.verify(token, 'carrot', function(err, decoded){
            if(!err){
                username = decoded.username;
            } else {
                username = null;
            }
        });
    
        if(username) {
            const user = await User.findOne({username});

            user.pastes.push(paste);
            await user.save();
        }
    
    
        return res.send(200);
    }catch(err){
        console.log(err)
        return res.send(err)
    }
});

module.exports = router;