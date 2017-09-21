var express = require('express');
var router = express.Router();
var request = require('request');
var Q = require('q');

function scrape(options) {
  'use strict';
  
  var defer = Q.defer();
  
  request(options, function (err, res, body) {
    if (err) { return defer.reject(err); }
    if (res.statusCode === 200) { return defer.resolve(body); }
  });
  
  return defer.promise;
}

// GET /scraper
function index(req, res) {
  'use strict';

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  //Check 'url' parameter
  if (!req.query.url) {
    return res.render('error', {
      error: {
        status: 'ERROR 400',
        stack: '\'url\' parameter isn\'t defined, ex: foo.com?url=http://bar.com'
      },
      message: 'BAD REQUEST'
    });
  }
  
  scrape({
	url: req.query.url,
	headers: {
	  'User-Agent': req.headers['user-agent']
	}
  }).then(function (body) {
    res.set('Content-Type', 'text/html');
    res.send(body);
  });
}


/* GET home page. */
router.get('/', index);

module.exports = router;
