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
router.post('/addClient', function(req, res, next) {
  var ssnPost= req.body.ssn;
  var fullNPost= req.body.fullN;
  var dateSPost= req.body.dateS;
  var phNumPost= req.body.phNum;
  var addPost= req.body.add;
  var dlNPost= req.body.dlN;
  var bNPost = req.body.bN;

  connection.query("SELECT Ssn FROM Client WHERE Ssn="+ssnPost, function(err, result, fields){
    try{
      if(result[0].Ssn >= 1){
        res.send(false);
      }
    }catch(err){
      connection.query("INSERT INTO Client VALUES(" + ssnPost+ ",\'" + fullNPost +"\',\'" + dateSPost + "\'," + phNumPost + ",\'" + addPost + "\',\'" + dlNPost +"\'," + bNPost + ")", function (err, result, fields){
        if(err) throw err;
        res.send(true);
      })
    }
    })


  });
module.exports = router;
