const mysql=require('mysql')
const conn = mysql.createConnection({
    host: '127.0.0.1',
    database: 'my_blog',
    user: 'root',
    password: 'root'
  })

  module.exports=conn