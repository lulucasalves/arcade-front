const express = require('express')
const cors = require('cors')
const app = express()
const routers = require('./router')
const favicon = require('serve-favicon')
const path = require('path')
require('dotenv/config')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(cors())
app.use(routers)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
