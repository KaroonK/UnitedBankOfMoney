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
router.get('/viewInvestments', function(req, res, next) {
    connection.query("SELECT Owner, Name, Portfolio_num FROM Investments p1 INNER JOIN Client p2 ON p1.Owner = p2.Ssn", function (err, result,fields){
    if (err) throw err;
    res.send(JSON.stringify(result));
    })
  });

<<<<<<< HEAD
router.get('/viewPortfolioAdvisors',function(req, res, next){
  connection.query("SELECT Portfolio_Advisor FROM Investments WHERE Portfolio_Advisor!='Self Advised'",function (err. restult, fields){
=======
router.get('/viewPortfolioAdvisors', function(req, res, next){
  connection.query("SELECT Portfolio_Advisor FROM Investments WHERE Portfolio_Advisor!='Self Advised'", function (err, result, fields){
>>>>>>> 4acd525a295dc0f44ddfecda3592b20a5a64181a
    if(err) throw err;
    res.send(JSON.stringify(result));
  })
});
<<<<<<< HEAD
=======

  router.post('/checkNetWorth', function(req, res, next) {
    var userd = '\''+ req.body.netWorth + '\'';
    console.log(this.userd);
    connection.query("SELECT Name, Portfolio_num, Portfolio_worth FROM Investments p1 INNER JOIN Client p2 ON p1.Owner=p2.Ssn WHERE Name=" + userd, function (err, result,fields){
    if (err) throw err;
    console.log(result);
    res.send(result);
    })
  });

>>>>>>> 4acd525a295dc0f44ddfecda3592b20a5a64181a

module.exports = router;
