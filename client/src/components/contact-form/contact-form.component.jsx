import React, { useState } from "react";
import "./contact-form.styles.scss";
import CustomButton from "../../components/custom-button/custom-button.component";
import { useFormik } from "formik";
import axios from "axios";

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      message: "",
    },

    validate: values => {
      const errors = {};
      if (!values.fullName) {
        errors.fullName = "Please enter your name";
      }
      if (!values.email) {
        errors.email = "Please enter your email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.message) {
        errors.message = "Please enter your message";
      }
      return errors;
    },

    onSubmit: (values, { setErrors, setSubmitting, resetForm }) => {
      axios
        .post("/api/email", values)
        .then(res => {
          setSubmitting(false);
          setIsSubmitted(true);
        })
        .catch(err => {
          console.log("Error:", err);
          setSubmitting(false);
          resetForm();
          setErrors({
            messageNotSent: "Something went wrong, please try again later.",
          });
        });
    },
  });

  const {
    values: { fullName, email, message },
    isSubmitting,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = formik;

  const fullNameError = errors.fullName && touched.fullName;
  const emailError = errors.email && touched.email;
  const messageError = errors.message && touched.message;

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="inputWrapper">
        <input
          id="fullName"
          type="text"
          value={fullName}
          disabled={isSubmitted}
          className={`${fullNameError && "inputError"}`}
          onChange={handleChange}
        />
        <label htmlFor="fullName">Full Name</label>
        {fullNameError && <p className="errorMessage">{errors.fullName}</p>}
      </div>
      <div className="inputWrapper">
        <input
          id="email"
          type="email"
          value={email}
          disabled={isSubmitted}
          className={`${emailError && "inputError"}`}
          onChange={handleChange}
        />
        <label htmlFor="email">Email Address</label>
        {emailError && <p className="errorMessage">{errors.email}</p>}
      </div>
      <div className="inputWrapper">
        <input
          id="message"
          type="text"
          value={message}
          disabled={isSubmitted}
          className={`${messageError && "inputError"}`}
          onChange={handleChange}
        />
        <label htmlFor="message">Message</label>
        {messageError && <p className="errorMessage">{errors.message}</p>}
      </div>

      {isSubmitted ? (
        <p style={{ margin: "0" }}>
          Thank you for your message. We will get back to you as soon as
          possible.
        </p>
      ) : (
        <>
          <CustomButton isLoading={isSubmitting} inverted>
            SEND MESSAGE
          </CustomButton>
          {errors.messageNotSent && (
            <div className="messageNotSent">
              <p>{errors.messageNotSent}</p>
            </div>
          )}
        </>
      )}
    </form>
  );
};

export default ContactForm;
