const userModel = require('./../model/testUser')
const log = require('./../sys/log')

class TestUserClass {
  async getAllUsers (data) {
    log(data)
    return await userModel.all()
  }
}

module.exports = new TestUserClass()
