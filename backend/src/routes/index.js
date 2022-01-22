const router = require('express').Router();
const paste = require('./paste');
const auth = require('./auth');
const fs = require('fs');

router.get('/', (req, res) => {
    res.send('Welcome 👏👏');
});

router.get('/languages', (req, res) => {
    let json;

    const data = fs.readFileSync('languages.json', 'utf-8');
    
    json = JSON.parse(data);

    console.log(json);

    res.sendFile('languages.json', {root: __dirname});
})

router.use('/', paste);
router.use('/auth', auth);

module.exports = router;