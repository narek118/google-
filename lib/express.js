import express from 'express';
const app= express();
import {init} from './mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import api from "../api/index";
import passport from 'passport'
import util from 'util'
import session from 'express-session'
const RedisStore = require('connect-redis')(session);
import {Strategy as GoogleStrategy} from 'passport-google-oauth2';

const GOOGLE_CLIENT_ID = '290920124267-0390kpm6la0nrhjogcc4o4hih9q5qs48.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'eeyV2yWhwaiPyeiH_-Fk-D2o';

passport.serializeUser(function(user, done) {
    done(null, user);
});



passport.use(new GoogleStrategy({
        clientID:     GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:1200/auth/google/callback",
        passReqToCallback   : true
    },function(request, accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use( express.static(__dirname + '/public'));
app.use( cookieParser());
app.use( bodyParser.json());
app.use(morgan('dev'));
app.use( bodyParser.urlencoded({
    extended: true
}));

app.use( session({
    secret: 'cookie_secret',
    name:   'kaas',
    store:  new RedisStore({
        host: '127.0.0.1',
        port: 6379
    }),
    proxy:  true,
    resave: true,
    saveUninitialized: true
}));

app.use( passport.initialize());
app.use( passport.session());

app.get('/', function(req, res){
    res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
    res.render('login', { user: req.user });
});


app.get('/auth/google', passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read']
})
);


app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/account',
        failureRedirect: '/login'
    }));



app.listen( 1201 );


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}
