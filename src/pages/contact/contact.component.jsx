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
      <div className="form">
        <div className="background" />
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
