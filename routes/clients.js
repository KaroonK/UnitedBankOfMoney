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

router.get('/getBranches', function(req, res,next){
  var arr = [];
  connection.query("SELECT Branch_name FROM Branch", function (err, result, fields){
      if(err) throw err;
      for(var i in result)
        arr.push(result[i].Branch_name);
      res.send(JSON.stringify(arr));
  })
});

router.post('/clientsFromBranch', function(req,res,next){
  var name = req.body.braName;
  connection.query("SELECT Ssn,Name,Home_branch,Branch_name FROM Client p1 INNER JOIN Branch p2 ON p1.Home_branch=p2.Branch_num WHERE Branch_name="+"\'"+ name+"\'", function(err, result, fields){
    if(err) throw err;
    res.send(result);
  });
});

router.post('/updateAddress', function(req,res,next){
    var address = req.body.add;
    var ssnNum = req.body.ssn;
    console.log(ssnNum);
    connection.query("SELECT EXISTS(Select* FROM CLIENT WHERE Ssn=" + ssnNum+")", function(err, result, fields){
      if (err) throw err;
      if(result>0){
        Connection.query("UPDATE Client SET Address="+"\'"+ address+"\'"+" WHERE Ssn="+ssnNum,function(err,result, fields){
          if(err) throw err;
          res.send(true);
        })}else{
        res.send(false);
      }
    });

});

// router.post('/getClient', function(req, res, next){
//   var branchName = req.body.bName;
// })
module.exports = router;
