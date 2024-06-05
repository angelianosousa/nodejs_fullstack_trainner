const express = require('express');
const router = express.Router();
const db = require(`../../../models/index.js`);

// ================================================
// LISTING USERS
// ================================================
router.get('/', function(_req, res) {
  db.User.findAll().then(users => {
    res.status(200).json({ users: users })
  })
});


// ================================================
// VIEW USER BY ID
// ================================================
router.get('/:id', function(req, res) {
  const id = req.params.id;

  db.User.findByPk(id).then(user => {
    if (user === 1) {
      res.status(200).json({ user: user })
    } else {
      res.status(422).json({ errors: 'User was not found...', users: user })
    }
  })
});


// ================================================
// CREATE USER
// ================================================
router.post('/create', function(req, res) {
  const { body } = req;

  db.User.create(body).then(user => {
    if (user === 1) {
      res.status(201).json({ message: 'User was created successfully!', users: user })
    } else {
      res.status(422).json({ errors: 'User was not create...', users: user })
    }
  }).catch((err) => { throw err })
});


// ================================================
// UPDATE USER
// ================================================
router.patch('/:id', function(req, res) {
  const id = req.params.id
  const { body } = req;

  db.User.update(body, { where: { id }}).then((user) => {
    if (user === 1) {
      res.status(200).json({ message: 'User was updated successfully!', users: user })
    } else {
      res.status(422).json({ errors: 'User was not updated...', users: user })
    }
  })
})


// ================================================
// DELETE USER
// ================================================
router.delete('/:id', function(req, res) {
  const id = req.params.id;

  db.User.destroy({ where: { id }}).then((user) => {
    if (user === 1) {
      res.status(200).json({ message: 'User was deleted successfully!', users: user })
    } else {
      res.status(422).json({ errors: 'User was not deleted...', users: user })
    }
  }).catch(err => { throw err })
})

module.exports = router;
