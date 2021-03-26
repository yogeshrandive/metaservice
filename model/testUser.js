// const MysqlBaseClass = require('./../sys/mysql')
const mysql = require('./../sys/mysql')

class TestUserClass {
  async all () {
    const data = await mysql.query('select * from cards limit 2;',[])
    // .then(res=>res)
// console.log(data)
    return data
  }
}

module.exports = new TestUserClass()
