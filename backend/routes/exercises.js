const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  // mongoose find() method returns all list of all model data, here i.e. all exercises
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  // creating a new instance of a mongoose data model
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  });

  // mongoose save() command, saves newly created model instance to Mongo database
  newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 