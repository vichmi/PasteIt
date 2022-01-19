const router = require('express').Router();
const paste = require('./paste');

router.get('/', (req, res) => {
    res.send('Welcome 👏👏');
});

router.use('/', paste);

module.exports = router;