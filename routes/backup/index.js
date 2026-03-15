var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  req.session.entityid='LALULLA';
  req.session.cgAppId='LLL';
  req.session.cgAppVersion='1.0.1';
  

  res.render('index', { title: 'Express', sess: req.session });
});

module.exports = router;
