var express = require('express'),
rest = require('./rest'),
functables = require('./functables'),
bodyParser = require('body-parser'),
app = new express()
app.set('views','./views')
app.set('view engine','ejs')
app.use(express.static(__dirname + '/..'));
app.use(bodyParser.json({'limit':'10mb',extended:true}))
app.use(bodyParser.urlencoded({'limit':'10mb',extended:true}))
module.exports = {
    app:app,
    rest:rest,
    functables:functables
}