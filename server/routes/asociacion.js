const express = require('express');

const app = express();

app.get('/asociacion', (req, res) => {
    res.json({
        ok: true,
        message: 'Asociacion'
    });
});



module.exports = app;