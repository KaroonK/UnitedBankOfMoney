var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'karoon',
  password : 'DatabaseProject123!',
  database : 'unitedbankofmoney'
});
/* GET home page. */
router.get('/api', function(req, res, next) {
    connection.query("SELECT * FROM loginEmployee", function (err, result,fields){
    if (err) throw err;
    res.send(JSON.stringify(result));
    })
  });

module.exports = router;
