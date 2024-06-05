var express = require('express');
var router = express.Router();

var usersData = [
  { id: 1, name: 'Ricardo', email: 'ricardo@gmail.com', phone: '(85) 9 0000 0000'},
  { id: 2, name: 'Carlos', email: 'carlos@gmail.com', phone: '(85) 9 0000 0000'}
]


// ================================================
// LISTING USERS
// ================================================
router.get('/', function(_req, res, _next) {
  res.render('users/index', { title: 'List of Users', users: usersData });
});


// ================================================
// VIEW USER BY ID
// ================================================
router.get('/:id', function(req, res, next) {
  const id   = req.params.id;
  const user = usersData.find((element) => element.id == id)
  // const user = getUser(req)
  console.log(id)
  console.log(user)

  res.render('users/show', { title: 'Detail User', user: user });
  // res.render('users/index', { title: 'List of Users', users: usersData });

  next();
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
  
  usersData.push({
    id: (usersData.length + 1),
    name: body.name,
    email: body.email,
    phone: body.phone
  })
  
  res.redirect('/users')
  next();
});


// ================================================
// PAGE TO EDIT USER
// ================================================
router.get('/edit/:id', function(req, res, next) {
  const user = getUser(req)
  
  res.render('users/edit', { title: 'Edit User', user: user });
  next();
})


// ================================================
// UPDATE USER
// ================================================
router.post('/update/:id', function(req, res, next) {
  const { body } = req;
  const user = getUser(req)

  user.name = body.name
  user.email = body.email
  user.phone = body.phone
  
  res.redirect('/users')
  next();
})


// ================================================
// DELETE USER
// ================================================
router.get('/delete/:id', function(req, res, next) {
  const user = getUser(req)

  usersData.pop(user)
  
  res.redirect('/users')
  next();
})


// ================================================
// HELPER METHODS
// ================================================
function getUser(req) {
  const id = req.params.id;

  return usersData.find((element) => element.id == id)
}

module.exports = router;
