const log = require('../sys/log')
const mysqlconfig = {
  host: process.env.DB_HOST_NAME,
  port: process.env.DB_PORT,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 100
}
const pool = require('mysql2').createPool(mysqlconfig)
const mysqlexport = {
  query (query, params, callback) {
    if (process.env.LOG_MYSQL_LATENCY) console.time('mysql_latency')
    pool.getConnection((err, conn) => {
      if (err != null) {
        log(`[ERROR] Failed to getConnection from mySQL - ${err}`, true, true)
        if (conn != null) {
          conn.release()
        }
        if (callback != null) {
          if (process.env.LOG_MYSQL_LATENCY) console.timeEnd('mysql_latency')
          return callback('DB error')
        }
      }
      conn.query(query, params, (_err, rows) => {
        if (process.env.LOG_MYSQL_LATENCY) console.timeEnd('mysql_latency')
        if (_err != null) {
          log(_err, true)
        }
        conn.release()
        if (callback != null) {
          return callback(_err, rows)
        }
      })
    })
  },
  end (callback) {
    pool.end(callback)
  }
}
module.exports = mysqlexport
