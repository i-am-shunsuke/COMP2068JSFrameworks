const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('contact');
});

router.post('/', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    res.send('Thank you for contacting me!');
});

module.exports = router;
