const express = require('express');
const router = express.Router();
const db = require(`../models/index.js`);

// ================================================
// LISTING USERS
// ================================================
router.get('/', function(_req, res, _next) {
  db.User.findAll().then(users => {
    res.render('users/index', { title: 'List of Users', users: users });
  })
});


// ================================================
// VIEW USER BY ID
// ================================================
router.get('/show/:id', function(req, res, next) {
  const id = req.params.id;

  db.User.findByPk(id).then(user => {
    res.render('users/show', { title: 'Detail User', user: user });
  })
});


// ================================================
// PAGE TO CREATE USER
// ================================================
router.get('/new', function(_req, res, _next) {
  res.render('users/new', { title: 'New User', user: [{}] });
});


// ================================================
// CREATE USER
// ================================================
router.post('/create', function(req, res, next) {
  const { body } = req;

  db.User.create(body).then(user => res.redirect('/users'))
});


// ================================================
// PAGE TO EDIT USER
// ================================================
router.get('/edit/:id', function(req, res, next) {
  db.User.findByPk(req.params.id).then(user => {
    res.render('users/edit', { title: 'Edit User', user: user });
  });
})


// ================================================
// UPDATE USER
// ================================================
router.post('/update/:id', function(req, res, next) {
  const id = req.params.id
  const { body } = req;

  db.User.update(body, { where: { id }}).then(user => {
    res.redirect('/users')
  })
})


// ================================================
// DELETE USER
// ================================================
router.get('/delete/:id', function(req, res, next) {
  const id = req.params.id;

  db.User.destroy({ where: { id }}).then(() => {
    res.redirect('/users')
  })
})

module.exports = router;
