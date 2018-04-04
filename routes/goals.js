var express = require('express');
var router = express.Router();
var goals = require('../models/goals'); // create a goals model by requiring it
router.get('/', function(req, res) { // render a goals view and pass the goals model to it
  res.render('goals', {title: 'Goals', goals: goals});
});
module.exports = router;
