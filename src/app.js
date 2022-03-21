const express = require('express')
const cors = require('cors')
const app = express()
const routers = require('./router')
require('dotenv/config')

app.use(cors())
app.use(routers)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
