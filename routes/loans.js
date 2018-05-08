var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'karoon',
  password : 'DatabaseProject123!',
  database : 'unitedbankofmoney'
});

router.get('/viewLoans', function(req, res, next) {
    connection.query("SELECT * FROM Loan", function (err, result,fields){
    if (err) throw err;
    res.send(JSON.stringify(result));
    })
  });

  router.post('/applyLoan', function(req,res,next){
    var appNum = req.body.aNum;
    var loanType = req.body.lType;
    var appName = req.body.aName;
    var ssnNum = req.body.ssn;

    connection.query("INSERT INTO LOAN_APPLICANTS VALUES(" +appNum +",\'"+loanType+"\',\'"+appName+"\',"+ssnNum+", 'Fresh Application')",function(err,result,fields){
      if (err) throw err;
      res.send(true);
    })
  });

  router.post('/checkStatus', function(req,res,next){
    var appNum = req.body.aNum;
    connection.query("SELECT Application_num, Status FROM Loan_Applicants WHERE Application_num =" + appNum,function(err,result,fields){
       if (err) throw err;
       res.send(result[0].Status);
    })
  });

  router.post('/checkBalance', function(req,res,next){
    var appNum = req.body.aBalance;
    connection.query("SELECT Loan_num, Name, Balance FROM Loan WHERE Loan_num=" + appNum,function(err,result,fields){
       if (err) throw err;
       res.send(JSON.stringify(result[0].Balance));
    })
  });


module.exports = router;
