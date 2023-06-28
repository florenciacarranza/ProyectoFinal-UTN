var express = require('express');
var router = express.Router();


router.get('/novedades', function(req, res, next) {
  res.render('novedades', { title: 'Novedades' });
});

module.exports = router;