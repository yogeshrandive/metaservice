const userModel = require('./../model/testUser')
const log = require('./../sys/log')

class TestUserClass {
  async getAllUsers (data) {
    return new Promise(async (resolve,reject)=>{

      let data =  await userModel.all().then(res=>res)
      resolve({status:"success",message:"user data",data:data})

    })
  }
}

module.exports = new TestUserClass()
