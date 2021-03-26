const http = require('http')
const express = require('express')
const app = express()
const port = process.env.SERVICE_PORT || 3000
const log = require('./sys/log')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

// set environment variables
if (process.env.NODE_ENV === 'testing') {
  require('dotenv').config({ path: '.env.testing' })
} else {
  require('dotenv').config()
}

// router path
const testRoute = require('./router/test')

// router
app.use('/test', testRoute)
app.get('/', (req, res) => {
  res.json({ message: 'DaMensch!' })
})


app.use((req,res,next) =>{
  let {status,data} = res.locals
  res.status(status || 200).json(data) 
})

app.use((err, req, res, next) => {
  if (err) {
    console.error(res.locals)
    res.status(res.locals.status || 404).json({ status: 'error', message: err })
  } else { res.status(404).json({ status: 'error', message: 'Unable to find the requested resource' }) }
})

// create http server
const server = http.createServer(app)
server.listen(port, () => {
  log(`[${process.env.NODE_ENV}]App running on port:${port}`)
})
