const express = require("express");

const app = express();

app.use(require("./usuario"));
app.use(require("./login"));

app.use(require("./asociacion"));
app.use(require("./directiva"));

// app.use(require("./capacitacion"));
app.use(require("./categoriaProducto"));
app.use(require("./producto"));
app.use(require("./factura"));
app.use(require("./productoSocio"));
app.use(require("./entidad"));

module.exports = app;
