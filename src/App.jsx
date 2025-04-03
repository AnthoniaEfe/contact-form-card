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
        {/* success message */}
           {successMessage && <div className="success__message" aria-live="polite">
            <h3> 
              <img src={successCheckIcon} alt="success check icon"/>
              Message Sent!
              </h3>
             <p>{successMessage}</p>
            </div>
            } 

            {/* form title */}
            <h2 id="contact__heading">Contact Us</h2>
   
          {/* first name */}
        <div className="form__group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            aria-required="true"
            aria-describedby="firstName-error"
          />
          {errors.firstName && <p className="error__message" id="firstName__error" aria-live="polite">{errors.firstName}</p>}
        </div>

          {/* last name */}
        <div className="form__group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            aria-required="true"
            aria-describedby="lastName-error"
          />
          {errors.lastName && <p className="error__message" id="lastName__error" aria-live="polite">{errors.lastName}</p>}
        </div>

        {/* email */}
        <div className="form__group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-required="true"
            aria-describedby="email-error"
          />
          {errors.email && <p className="error__message" id="email__error" aria-live="polite">{errors.email}</p>}
        </div>

        {/* query type */}
        <div className="form__group">
          <fieldset tabIndex="0" aria-required="true" aria-describedby="queryType__error">
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
          {errors.queryType && <p className="error__message" id="queryType__error" aria-live="polite">{errors.queryType}</p>}
        </div>

        {/* message */}
        <div className="form__group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            aria-required="true"
            aria-describedby="message__error"
          ></textarea>
          {errors.message && <p className="error__message" id="message-error" aria-live="polite">{errors.message}</p>}
        </div>

        {/* consent checkbox */}
        <div className="form__group ">
          <div className="checkbox__group">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            aria-required="true"
            aria-describedby="consent-error"
          />
          <label htmlFor="consent">I consent to being contacted by the team *</label> 
       </div>   
       {errors.consent && <p className="error__message" id="consent-error" aria-live="polite">{errors.consent}</p>}
       </div>
        <button type="submit" className="submit__button">Submit</button>
      </form>
    </main>
  );
};

export default App;
