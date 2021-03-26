const first = {
  name: {
    default: 'Genericman',
    required: true,
    rules: { maxLength: 140, minLength: 4 },
    errors: { required: 'Name is required', minLength: 'Invalid name' }
  },
  email: {
    required: true,
    errors: { required: 'Email id required' }
  }
}

module.exports = {
  first
}
