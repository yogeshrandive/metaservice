const mysql = require('mysql')
const log = require('./log')
const dbConfig = require('./../config/database')

class MysqlBaseClass {
  constructor () {
    this.pool = mysql.createPool({
      host: dbConfig.host,
      port: dbConfig.user,
      user: process.env.DB_USER_NAME,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      connectionLimit: process.env.DB_CONNECTION_LIMIT || 10
    })
    console.log({
      host: process.env.DB_HOST_NAME,
      port: process.env.DB_PORT,
      user: process.env.DB_USER_NAME,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      connectionLimit: process.env.DB_CONNECTION_LIMIT || 10
    })
  }

  query (query, params) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection(function (err, connection) {
        if (err) {
          log(`[Error] Failed to get connection from MYSQL - ${err}`)
          if (connection != null) connection.release()
          reject(err)
        } // not connected!
        else {
          connection.query(query, params, function (error, results, fields) {
            // Handle error after the release.
            if (error) {
              log(`[Error] Mysql query error -  ${error}`)
              throw error
            }

            resolve(results)
            // When done with the connection, release it.
            connection.release()
          })
        }
      })
    })
  }

  getConnection () {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) throw err
        resolve(connection)
      })
    })
  }
}

module.exports = MysqlBaseClass
