require("./../config/config");
const express = require("express");
const app = express();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

app.post("/sms", async (req, res) => {
  let numeros = req.body.numeros;
  var body = req.body.mensaje;
  try {
    for (let numero in numeros) {
      let mensaje = await client.messages.create({
        body: body,
        from: "TwilioNumber",
        to: numeros[numero],
      });
    }
    res.json({
      ok: true,
    });
  } catch (error) {
    res.json({
      ok: false,
      error: error,
    });
  }
});

module.exports = app;
