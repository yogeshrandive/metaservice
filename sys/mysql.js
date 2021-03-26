const log = require('../sys/log')
const mysqlconfig = {
  host: process.env.host,
  port: process.env.user,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
  multipleStatements: true
}
const pool = require('mysql').createPool(mysqlconfig)

const mysqlexport = {
  query(query, params, callback) 
  {
    return new Promise((resolve,reject)=>{
      
        pool.getConnection((err, conn) => {
          if (err != null) {
            log(`[ERROR] Failed to getConnection from mySQL - ${err}`, true, true)
            if (conn != null) {
              conn.release()
            }
            return reject('DB error')
          }

          conn.query(query, params, (_err, rows) => {
            if (_err != null) {
              log(_err, true)
              return reject(_err)
            }
            // console.log(rows)
            conn.release()
            resolve(rows)
          })

        })
    })

  },
  getConnection(callback) {
    pool.getConnection((err, conn) => {
      if (err || err != null) {
        log(`[ERROR] Failed to getConnection from mySQL - ${err}`, true, true)
        if (conn != null)
          conn.release()

        if (callback != null)
          return callback("DB Error")

      }

      callback(err, conn)
    })
  },
  end(callback) {
    pool.end(callback)
  }
}
module.exports = mysqlexport
