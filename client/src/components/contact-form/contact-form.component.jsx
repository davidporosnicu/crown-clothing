import React from "react";
import "./contact-form.styles.scss";
import CustomButton from "../../components/custom-button/custom-button.component";
import { useFormik } from "formik";
import axios from "axios";

const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      message: "",
    },

    validate: values => {
      const errors = {};
      if (!values.fullName) {
        errors.name = "This field is required";
      }
      if (!values.email) {
        errors.email = "This field is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.message) {
        errors.message = "This field is required";
      }
      return errors;
    },

    onSubmit: (values, { setErrors, setSubmitting, resetForm }) => {
      axios
        .post("/api/email", values)
        .then(res => console.log(res))
        .catch(err => console.log("err", err));
      resetForm();
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
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="inputWrapper">
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={handleChange}
        />
        <label htmlFor="fullName">Full Name</label>
      </div>
      <div className="inputWrapper">
        <input id="email" type="email" value={email} onChange={handleChange} />
        <label htmlFor="email">Email Address</label>
      </div>
      <div className="inputWrapper">
        <input
          id="message"
          type="text"
          value={message}
          onChange={handleChange}
        />
        <label htmlFor="message">Message</label>
      </div>
      <CustomButton inverted>SEND MESSAGE</CustomButton>
    </form>
  );
};

export default ContactForm;
