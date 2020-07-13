const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const compression = require("compression");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// const configureRoutes = require("./routes");

// configureRoutes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.post("/api/email", (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const formData = {
    fullName: req.body.fullName,
    email: req.body.email,
    message: req.body.message,
  };

  const msg = {
    to: "y3times@gmail.com",
    from: "y3times@gmail.com",
    subject: "New mail from contact form on www.CRWN-Clothing.com",
    text: `You are receiving this email because somebody sent a message through the contact form on www.CRWN-Clothing.com 
    Name: ${formData.fullName} Email: ${formData.email} Message: ${formData.message}`,
    html: `<p>You are receiving this email because somebody sent a message through the contact form on www.CRWN-Clothing.com</p>
    <h3>Name: ${formData.fullName}</h3><p>Email: ${formData.email}</p><p>Message: ${formData.message}</p>`,
  };

  sgMail
    .send(msg)
    .then(result => {
      res.status(200).json({
        success: true,
      });
    })
    .catch(err => {
      console.log("error: ", err);
      res.status(401).json({
        success: false,
      });
    });
});

app.listen(port, error => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
