var express = require('express');
var path = require('path');
const http = require('http')
const config=require('./config.js')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const socketio = require('socket.io')

var app = express();
const server = http.Server(app)
const io = socketio(server)
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')

app.use(cookieParser());
var route={
    signup:require('./routes/signup').route,

    login:require('./routes/login').route
}

app.use('/' ,express.static(path.join(__dirname,'docs')))
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

io.on('connection',function (socket) {

    socket.on('msg',function (data) {
        io.emit('msg',{
           // username:route.username,
            message:data.message
        })
    })
})
app.use('/signup.html', route.signup)
app.use('/login.html',route.login)


server.listen(config.Port, function(){
    console.log('Server started on port '+app.get('port'));
});
