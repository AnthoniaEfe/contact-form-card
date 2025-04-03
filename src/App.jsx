import React, { useState } from "react";
import "./styles/styles.scss";
import successCheckIcon from "./assets/images/icon-success-check.svg";

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "This field is required";
    if (!formData.lastName.trim()) newErrors.lastName = "This field is required";
    if (!formData.email.trim()) newErrors.email = "Please enter a valid email address";
    if (!formData.queryType) newErrors.queryType = "Please select a query type";
    if (!formData.message.trim()) newErrors.message = "This field is required";
    if (!formData.consent) newErrors.consent = "To submit this form, please consent to being contacted";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted", formData);
      setSuccessMessage("Thanks for completeing the form. We'll be in touch soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        queryType: "",
        message: "",
        consent: false,
      });
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <main>
      <form className="contact__form" onSubmit={handleSubmit} aria-labelledby="contact__heading" noValidate>
           {successMessage && <div className="success__message" aria-labelledby="contact__heading">
            <h3> 
              <img src={successCheckIcon} alt="success check icon"/>
              Message Sent!</h3>
             <p>{successMessage}</p>
            </div>} 
            <h2 id="contact__heading">Contact Us</h2>
   
        <div className="form__group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            aria-required="true"
          />
          {errors.firstName && <p className="error__message">{errors.firstName}</p>}
        </div>
        <div className="form__group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            aria-required="true"
          />
          {errors.lastName && <p className="error__message">{errors.lastName}</p>}
        </div>
        <div className="form__group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-required="true"
          />
          {errors.email && <p className="error__message">{errors.email}</p>}
        </div>
        <div className="form__group">
          <fieldset>
            <legend>Query Type *</legend>
            <div className="radio__group">
              <label htmlFor="generalEnquiry">
                <input
                  type="radio"
                  id="generalEnquiry"
                  name="queryType"
                  value="General Enquiry"
                  checked={formData.queryType === "General Enquiry"}
                  onChange={handleChange}
                  aria-required="true"
                />
               General Enquiry
              </label>
              <label htmlFor="supportRequest">
                <input
                  type="radio"
                  id="supportRequest"
                  name="queryType"
                  value="Support Request"
                  checked={formData.queryType === "Support Request"}
                  onChange={handleChange}
                  aria-required="true"
                />
             Support Request
              </label>
            </div>
          </fieldset>
          {errors.queryType && <p className="error__message">{errors.queryType}</p>}
        </div>
        <div className="form__group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            aria-required="true"
          ></textarea>
          {errors.message && <p className="error__message">{errors.message}</p>}
        </div>
        <div className="form__group checkbox__group">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            aria-required="true"
          />
          <label htmlFor="consent">I consent to being contacted by the team *</label>
          {errors.consent && <p className="error__message">{errors.consent}</p>}
        </div>
        <button type="submit" className="submit__button">Submit</button>
      </form>
    </main>
  );
};

export default App;
