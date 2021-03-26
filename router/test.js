const router = require('express').Router()
const validator = require('./../validator/test')
const testConstructor = require('./../constructor/test')
// add middle ware

router.post('/', validator.first, function (req, res, next) {
  testConstructor.getAllUsers()
    .then(data => {
      res.locals.data = data
      next()
    })
    .catch(err => {
      console.log("Error",err)
      next(err)
    })
})

module.exports = router
