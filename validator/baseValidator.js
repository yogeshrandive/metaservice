class BaseValidator {
  errorResult (res, message) {
    Object.keys(message).forEach(key => {
      message[key] = message[key][0]
    })
    // process the message
    console.log(message)
    res.status(412).json({ status: 'error', message: 'Validation error', data: message })
  }
}

module.exports = BaseValidator
