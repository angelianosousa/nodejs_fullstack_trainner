const express = require('express');
const router = express.Router();
const db = require(`../models/index.js`);

router.get('/sign_up', function(req, res) {
  res.render('sessions/sign_up', { title: 'User Registration' });
})

router.post('/sign_up', function(req, res) {
  const { body } = req;

  db.User.create(body).then(user => {
    if (user) {
      res.redirect('/sessions/sign_in')
    } else {
      return
    }
  });
})

router.get('/sign_in', function(_req, res) {
  res.render('sessions/sign_in', { title: 'User Login', errors: null })
})

router.post('/sign_in', function(req, res) {
  const { email, password } = req.body;
  
  db.User.findOne({ where: { email }}).then(user => {
    if (user.validPassword(password)) {
      res.redirect('/users')
    } else {
      res.render('sessions/sign_in', { title: 'User Login', errors: 'Email ou Senha inválidos' })
    }
  })
})//.catch(err => { throw err })

module.exports = router;