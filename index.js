
var mysql = require('mysql');

var pool = {};

exports.initmysqlpool=(options)=>{
    pool = mysql.createPool(options);
}

exports.getConnection=()=>{
  return new Promise(function(resolve, reject){

    pool.getConnection(function(err, connection) {
      if (err) {reject(new Error(err)); }
      resolve(connection);
    })
  })
}

exports.beginTransaction =(connection)=>{
  return new Promise(function(resolve, reject){
    connection.beginTransaction(function(err) {
      if (err) {reject(new Error(err)); }
      resolve();
    })
  })
}

exports.connQuery =(connection,sql,parame)=>{
  return new Promise(function(resolve, reject){
    connection.query(sql,parame,  function (err, results, fields) {
      if (err) {reject(new Error(err)); }
      resolve({results,fields});
    })
     
  })
}

exports.query =(sql,parame)=>{
  return new Promise(function(resolve, reject){
    
    pool.getConnection(function(err, connection) {
      if(err){
          reject(new Error(err));
      }
      connection.query(sql, parame, function(err, results, fields){
          
          if(err){
              reject(new Error(err));
          }
          else{
              resolve({
                  results: results,
                  fields: fields
              });
          }
      });
    })
  })
}

exports.rollback =(connection)=>{
  return new Promise(function(resolve, reject){
    connection.rollback()
    resolve();
  })
}

exports.commit =(connection)=>{
  return new Promise(function(resolve, reject){
    connection.commit()
    resolve();
  })
}
