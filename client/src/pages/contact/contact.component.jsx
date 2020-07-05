import React from "react";
import "./contact.styles.scss";
import ContactForm from "../../components/contact-form/contact-form.component";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="header">
        <h1 className="title">Contact CRWN Clothing</h1>
        <p className="subtitle">
          We’re here to help and answer any question you might have. We look
          forward to hearing from you.
        </p>
      </div>
      <div className="page-content">
        <div className="background" />
        <div className="form">
          <ContactForm />
        </div>
        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="info-item">
            <img
              className="icon"
              src={require("../../assets/location.svg")}
              alt="location icon"
            />
            <p>Timisoara, Romania</p>
          </div>
          <div className="info-item">
            <img
              className="icon"
              src={require("../../assets/phone.svg")}
              alt="phone icon"
            />
            <p>+40 742520763</p>
          </div>
          <div className="info-item">
            <img
              className="icon"
              src={require("../../assets/email.svg")}
              alt="email icon"
            />
            <p>david94_p@yahoo.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
