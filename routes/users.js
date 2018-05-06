var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'karoon',
  password : 'DatabaseProject123!',
  database : 'unitedbankofmoney'
});
/* GET users listing. */
router.post('/login', function(req, res, next) {
  var userd = req.body.userid;
  var pass = req.body.pass;

  connection.query("SELECT Password FROM loginEmployee WHERE Emp_Num=" + userd, function (err, result,fields){
  if (err) throw err;
  console.log(result);
  if(result.length !== 0){
    if(pass == result[0].Password){
      res.send(true);
    }else {
      res.send(false);
    }
  }else{res.send(false);}
  })
});

module.exports = router;
