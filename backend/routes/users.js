const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  // mongoose find() method returns all list of all model data, here i.e. all users
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  // creating a new instance of a mongoose data model
  const newUser = new User({username});

  // mongoose save() command, saves newly created model instance to Mongo database
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}) ;

module.exports = router; 