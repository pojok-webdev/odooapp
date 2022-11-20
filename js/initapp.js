var express = require('express'),
rest = require('./rest'),
session = require('express-session'),
functables = require('./functables'),
bodyParser = require('body-parser'),
auth = require('./auth'),
cookieParser = require('cookie-parser'),
app = new express()
app.set('views','./views')
app.set('view engine','ejs')
app.use(express.static(__dirname + '/..'));
app.use(bodyParser.json({'limit':'10mb',extended:true}))
app.use(bodyParser.urlencoded({'limit':'10mb',extended:true}))
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
  
module.exports = {
    app:app,
    rest:rest,
    functables:functables,
    session:session,auth:auth,
}