const userModel = require('./../model/testUser')
const log = require('./../sys/log')

class TestUserClass {
  async getAllUsers (data) {
    const result = await userModel.all().then(res => res)
    return new Promise((resolve, reject) => {
      resolve({ status: 'success', message: 'user data', data: result })
    }).catch(error => { throw new Error(error) })
  }
}

module.exports = new TestUserClass()
