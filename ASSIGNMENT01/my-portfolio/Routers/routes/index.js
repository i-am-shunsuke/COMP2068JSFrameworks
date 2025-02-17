const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

// About Me Page
router.get("/about", (req, res) => {
  res.render("about", { title: "About Me" });
});

// Projects Page
router.get("/projects", (req, res) => {
  res.render("projects", { title: "Projects" });
});

// Contact Me Page
router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Me" });
});


router.get('/contact', (req, res) => {
  res.render('contact');
});

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
  res.send('Thank you for contacting me! Give me time');
});


/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
