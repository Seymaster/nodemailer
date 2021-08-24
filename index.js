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
  <p> You have a new request Sale Acceleration Form</p>
  <h3>Client Details</h3>
  <ul>
  <li>First Name: ${req.body.person.contactFirstName}</li>
  <li>Last Name: ${req.body.person.contactLastName}</li>
  <li>Phone Number: <a href="tel:${req.body.person.contactPhone}">${req.body.person.contactPhone}</a></li>
  <li>Email Address: ${req.body.person.contactEmail}</li>
  <li>Occupation: ${req.body.person.Occupation}</li>
  <li>Business_Challenge_1: ${req.body.person.business_challenge_1}</li>
  <li>Business_Challenge_2: ${req.body.person.business_challenge_2}</li>
  <li>Business_Challenge_3: ${req.body.person.business_challenge_3}</li>
  <li>Business_Challenge_4: ${req.body.person.business_challenge_4}</li>
  <li>Business_Challenge_5: ${req.body.person.business_challenge_5}</li>
  <li>Business_Challenge_6: ${req.body.person.business_challenge_6}</li>
  <li>Business_Challenge_7: ${req.body.person.business_challenge_7}</li>
  <li>Business_Challenge_8: ${req.body.person.business_challenge_8}</li>
  <li>Business_Challenge_9: ${req.body.person.business_challenge_9}</li>
  <li>Business_Challenge_10: ${req.body.person.business_challenge_10}</li>
  <li>Business_Challenge_11: ${req.body.person.business_challenge_11}</li>
  <li>Business_Challenge_12: ${req.body.person.business_challenge_12}</li>
  <li>other Business Challenge: ${req.body.person.business_challenge_other}</li>
  `;

  let transporter = nodemailer.createTransport({
    host: "squeakfix.com.ng",
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
    from: `${req.body.person.contactFirstName} <${req.body.person.contactEmail}>`,
    to: process.env.WEBMAIL, // list of receivers
    subject: "Sale Acceleration Form ✔", // Subject line
    text: "Hello there", // plain text body
    html: pushout, // html body
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      console.log("== Message Sent ==");
      res.json({
        status: "success",
      });
    }
  });
});

app.get("/", (req, res) => res.send("welcome to a live server"));
app.listen(process.env.PORT || 5001, () => console.log("Server Running"));
