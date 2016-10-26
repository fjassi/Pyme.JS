var sql = require('mssql');

function conn(query, cb){
  var config = {
      user: 'sa',
      password: 'ironman',
      server: '138.97.200.246',
      database: 'GESTIONJS',
      options: {
          tdsVersion: '7_1'
      }
  }
   
  var connection = new sql.Connection(config, function (err) {
      if (err) throw err;
      var request = new sql.Request(connection);
      console.log("--------- DEBUG ---------")
      console.log(query)
      console.log("--------- DEBUG ---------")
      request.query(query, function (err, recordset) {
          //res.end(JSON.stringify(recordset));
          request.on('recordset', function(columns) {
          // Emitted once for each recordset in a query
          console.log(columns.length)
          });

          request.on('row', function(row) {
              // Emitted for each row in a recordset
          });

          request.on('error', function(err) {
              // May be emitted multiple times
              console.log(err)
          });

          request.on('done', function(returnValue) {
              // Always emitted as the last one
              // console.log(returnValue)
          });
          // console.log(err, recordset)
          cb(recordset);
      });
  });
}
exports.conn = conn