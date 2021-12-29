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

router.route('/:id').get((req, res) => {
  // mongoose findById() method returns corresponding exercise according to the id provided by user as a url param
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  // mongoose findByIdAndDelete() method deletes corresponding exercise according to the id provided by user as a url param
  Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => res.json("Exercise deleted."))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  // mongoose findByIdAndDelete() method returns corresponding exercise according to the id provided by user as a url param
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      // mongoose save() command, saves newly created model instance to Mongo database
      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 