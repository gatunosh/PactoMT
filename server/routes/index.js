const express = require('express');

const app = express();


app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./asociacion'));
app.use(require('./directiva'));




module.exports = app;