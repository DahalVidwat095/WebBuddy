const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')

// provides headers for security and prevents different attacks
const helmet = require("helmet");

// formatting of methods that I send requests of
const morgan = require("morgan");

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo')
})

mongoose.connection.on('error', (err) => {
    console.log('Error Connecting to Mongo ', err)
})


// using helemet and morgan 
app.use(helmet());
app.use(morgan("tiny"));
  
require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


// 4. Add error handlers as middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    if (res.statusCode == 200) res.status(500);
    res.json({ err: err });
  });
  

app.listen(PORT, () => {
    console.log('Server is running on ', PORT)
})