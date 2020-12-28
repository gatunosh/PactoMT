const express = require('express');

const app = express();

app.get('/directiva', (req, res) => {
    res.json({
        ok: true,
        message: 'Directiva'
    });
});



module.exports = app;