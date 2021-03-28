const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'test',
  port: 3306,
  database: 'sakila'
})
connection.connect()
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error
  console.log('The solution is: ', results[0].solution)
})
connection.end()
