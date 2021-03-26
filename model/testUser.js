const MysqlBaseClass = require('./../sys/mysql')

class TestUserClass extends MysqlBaseClass {
  constructor () {
    super()
  }

  async all () {
    const data = await super.query('select * from actor;')
    return data
  }
}

module.exports = new TestUserClass()
