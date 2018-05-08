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
router.get('/viewBranch', function(req, res, next) {
    connection.query("SELECT Branch_num,Branch_name FROM Branch", function (err, result,fields){
    if (err) throw err;
    res.send(JSON.stringify(result));
    })
  });

router.post('/branchAddress', function(req, res, next) {
    var userd = '\''+ req.body.branchAddress + '\'';
    console.log(this.userd);
    connection.query("SELECT Branch_name,Address FROM Branch WHERE Branch_name=" + userd, function (err, result,fields){
    if (err) throw err;
    console.log(result);
    res.send(result);
    })
  });

router.get('/viewEmployees', function(req, res, next){
    connection.query("SELECT * FROM Employee", function (err, result,fields){
    if (err) throw err;
    res.send(JSON.stringify(result));
    })
  });

router.post('/employeePosition',function(req, res, next){
  var pos = '\''+req.body.employeePosition + '\'';
  console.log(this.pos);
  connection.query("SELECT Emp_num, Name ,Branch_name,Position FROM Employee WHERE Position=" + pos, function (err,result,fields){
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
});

// router.post('/openSafeBox',function(req, res, next){
//   var boxid = req.body.boxId;
//   var boxnum = req.body.boxNum;
//   var branchnum = req.body.branchNum;
//   var name = '\''+ req.body.name +'\'';
//   var ssn = req.body.ssn;
//   connection.query("INSERT INTO Safety_Deposit_Box VALUES")
// })

module.exports = router;
