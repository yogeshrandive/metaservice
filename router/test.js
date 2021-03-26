const router = require('express').Router()
const validator = require('./../validator/test')
const testConstructor = require('./../constructor/test')
// add middle ware

router.post('/', validator.first, function (req, res, next) {
  testConstructor.getAllUsers()
    .then(data => {
      next(data)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})

module.exports = router
