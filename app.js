const express = require('express')
const router = require('./routes/router')
const cookie = require('cookie-parser')
const app = express()

app.use(cookie())
app.use(express.json())

app.use('/', router)



app.listen(8000, () => {
    console.log('PORT listining:', 8000);
})