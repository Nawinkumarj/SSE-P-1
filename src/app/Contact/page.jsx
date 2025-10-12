"use client"
import React, { useState } from 'react';
import { FaArrowTrendUp } from "react-icons/fa6";

export default function Page() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
      
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='contact-page'>
      <div className="contact-container">
        {/* Left side - Contact Information */}
        <div className="contact-info-section">
          <div className="contact-info-content">
            <h1 className="main-title">
              Get in —<br />
              touch with us
            </h1>
            
            <p className="description">
              We're here to help! Whether you have a question about our 
              services, need assistance with your account, or want to 
              provide feedback, our team is ready to assist you.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-label">Email:</span>
                <a href="mailto:hello@finpro.com" className="contact-value">
                  hello@saisaranyaenterprises.com
                </a>
              </div>
              
              <div className="contact-item">
                <span className="contact-label">Phone:</span>
                <a href="tel:+1234567878" className="contact-value">
                  +91 9876543210
                </a>
              </div>
              
              <p className="availability">
                Available Monday to Friday, 9 AM - 6 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name..."
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name..."
                  className={`form-input ${errors.lastName ? 'error' : ''}`}
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address..."
                className={`form-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
            <div className="form-group full-width">
              <label htmlFor="message" className="form-label">
                How can we help you?
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your message..."
                rows="6"
                className={`form-textarea ${errors.message ? 'error' : ''}`}
              />
              {errors.message && (
                <span className="error-message">{errors.message}</span>
              )}
            </div>
            <button className="contact-btn" disabled={isSubmitting}>
              <span className="button-text">Submit</span>
              <div className="button-icon">
                <FaArrowTrendUp className="phone-icon" />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
