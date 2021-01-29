const express = require("express");

const app = express();

app.use(require("./usuario"));
app.use(require("./login"));

// imagenes
app.use(require("./upload"));
app.use(require("./archivos"));

app.use(require("./asociacion"));
app.use(require("./directiva"));
app.use(require("./det_hojadecampo"));

app.use(require("./capacitacion"));
app.use(require("./categoriaProducto"));
app.use(require("./producto"));
app.use(require("./factura"));
app.use(require("./productoSocio"));
app.use(require("./entidad"));

app.use(require("./Reuniones"));

module.exports = app;
