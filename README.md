# k9-mysql
mysql driver for Node.js.

Only support the connection pool to connect mysql.

Initialization(The program only needs to be initialized once)：
```javascript
var initmysqlpool = require('k9-mysql').initmysqlpool;
initmysqlpool({
      user: 'root',
      password: 'xxx',
      host: '192.168.1.1',
      port: 33306,
      database: 'xxx',
      options: {
          poolMax: 2,
          poolAlias: 'xxx',
          retry_interval: 60,
          poolTimeout: 5000,
          poolDelay: 5000,
          isPooled: false,
          timezone: '0800'
      }
  });
```

No use of Transaction：
```javascript
var myquery = require('k9-mysql').query;
  co(function* () {
    yield myquery('select * from xxx',null)     

  }).catch((error)=>{
  });
```

Use of Transaction：
```javascript
var mygetConnection = require('k9-mysql').getConnection;
var mybeginTransaction = require('k9-mysql').beginTransaction;
var myconnQuery = require('k9-mysql').connQuery;
var mycommit = require('k9-mysql').commit;
var myrollback = require('k9-mysql').rollback;

  co(function* () {
    var tempConn = yield mygetConnection();
    try {
      yield mybeginTransaction(tempConn);
      console.log( yield myconnQuery(tempConn,'select * from xxx',null))
      console.log( yield myconnQuery(tempConn,'update dbtest SET val=val-1 where id = 1 ',null))
      console.log( yield myconnQuery(tempConn,"insert into dbtest (name,val)values('t1',2) ",null))
      yield mycommit(tempConn);
    } catch (error) {
      yield myrollback(tempConn);
    }
  }).catch((error)=>{
  });
```