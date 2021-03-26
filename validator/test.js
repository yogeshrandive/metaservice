const Skematic = require('skematic')
const BaseValidator = require('./baseValidator')
const testRule = require('./rules/testrule')

class Test extends BaseValidator {
  first (req, res, next) {
    const validationResult = Skematic.validate(testRule.first, req.body)
    if (validationResult.valid) next()
    else super.errorResult(res, validationResult.errors)
  }
}

module.exports = new Test()
