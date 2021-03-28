// const MysqlBaseClass = require('./../sys/mysql')
const mysql = require('./../sys/mysql')

class TestUserClass {
  async all () {
    return new Promise((resolve, reject) => {
      mysql.query('SELECT 1 + 1 AS solution', [], (err, result) => {
        if (err) { reject(err) } else resolve(result)
      })
    })
  }
}

module.exports = new TestUserClass()
