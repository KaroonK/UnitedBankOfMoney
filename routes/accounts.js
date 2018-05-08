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
router.get('/viewAccounts', function(req, res, next) {
  connection.query("SELECT * FROM Account;", function (err, result,fields){
  if (err) throw err;
    res.send(JSON.stringify(result));
  })
});

router.get('/viewCreditAccounts', function(req, res, next) {
  connection.query("SELECT Owner,Name,Credit_card_num,Balance FROM Credit_Card p1 INNER JOIN Client p2 ON p1.Owner=p2.Ssn", function (err, result,fields){
  if (err) throw err;
    res.send(JSON.stringify(result));
  })
});
router.get('/viewDebitAccounts', function(req, res, next) {
  connection.query("SELECT Owner, Name,Debit_card_num, Linked_acct FROM Debit_Card p1 INNER JOIN Client p2 ON p1.Owner = p2.Ssn", function (err, result,fields){
  if (err) throw err;
    res.send(JSON.stringify(result));
  })
});
router.post('/createNewAccount', function(req, res, next){
  var accountNum = req.body.accountNumber;
  var accountTyp = req.body.accountType;
  var currentDate = req.body.currentDate;
  var socNum = req.body.ssnAcc;

  connection.query("SELECT Acct_Num FROM ACCOUNT WHERE Acct_Num="+accountNum, function(err, result, fields){
      if(result.length > 0){
        console.log(result);
        console.log(false);
        res.send(false);
      }else{
        connection.query("INSERT INTO ACCOUNT VALUES(" + accountNum+",\'"+accountTyp+"\',"+0.00+",\'"+currentDate+"\'," + socNum +")", function (err, result, fields){
          if(err) throw err;
          res.send(true);
        })
      }
    })

});

router.post('/createCreditCard', function(req, res, next){
  var creditNum = req.body.accountNumber;
  var creditCvv = req.body.accountType;
  var creditExp = req.body.currentDate;
  var socNum = req.body.ssnAcc;

  connection.query("SELECT Credit_card_num FROM Credit_card WHERE Credit_card_num="+creditNum, function(err, result, fields){
      if(result.length > 0){
        res.send(false);
      }else{
        try{
          connection.query("SELECT " + socNum + " FROM Client WHERE Ssn="+socNum, function(err, resultB, fields){
              if(resultB.length==0){
                console.log(resultB.length);
                res.send(false);
              }else{
                connection.query("INSERT INTO Credit_card VALUES("+ creditNum+",\'"+creditExp+"\',"+creditCvv+","+0.00+","+socNum+")", function (err, result, fields){
                  res.send(true);
                })
              }
          })

      }catch(err){
        res.send(false);
      }
      }})

});

router.post('/createDebitCard', function(req, res, next){
  var debitNum = req.body.accountNumber;
  var debitCvv = req.body.accountType;
  var debitExp = req.body.currentDate;
  var socNum = req.body.ssnAcc;
  var linkedAccount = req.body.linkedAcc;

  connection.query("SELECT Debit_card_num FROM Debit_card WHERE Debit_card_num="+debitNum, function(err, result, fields){
      console.log(result);
      if(result > 0){
        res.send(false);
      }else{
        try{
          connection.query("SELECT " + socNum + " FROM Client WHERE Ssn="+socNum, function(err, resultB, fields){
              if(resultB.length==0){
                console.log(resultB.length);
                res.send(false);
              }else{
                connection.query("INSERT INTO Debit_card VALUES("+ debitNum+",\'"+debitExp+"\',"+debitCvv+","+linkedAccount+","+socNum+")", function (err, result, fields){
                  res.send(true);
                })
              }
          })

      }catch(err){
        res.send(false);
      }
      }})

});

router.post('/deleteAccount', function(req, res, next){
  var accDel = req.body.accountNumber;

  connection.query("SELECT Acct_Num FROM Account WHERE Acct_num="+accDel, function(err, result, fields){
      console.log(result);
      if(result.length > 0){
        connection.query("DELETE FROM ACCOUNT WHERE Acct_num="+accDel, function (err, result, fields){
          res.send(true);
        })
      }else{
          res.send(false);
      }})

});
module.exports = router;
