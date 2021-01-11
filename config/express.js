const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    // Setup the view engine
    app.engine('.hbs', handlebars(
        {extname: '.hbs'}
    ));
    app.set('view engine', '.hbs');
    // Setup the static files
    app.use('/static', express.static('static'));
    // Setup the cookie-cookie
    app.use(cookieParser());
};