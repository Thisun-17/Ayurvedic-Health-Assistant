import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Registration.css';

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    termsAccepted: false
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is being edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    let errors = {};
    let isValid = true;
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
      isValid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
      isValid = false;
    }
    
    if (!formData.gender) {
      errors.gender = 'Gender is required';
      isValid = false;
    }
    
    if (!formData.termsAccepted) {
      errors.termsAccepted = 'You must accept the terms and conditions';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // In a real application, you would make an API call here
      // For demonstration, we'll simulate an API call with setTimeout
      setTimeout(() => {
        console.log('Registration form submitted:', formData);
        
        // Store user data in localStorage for demonstration purposes
        // In a real app, this would come from your backend after successful registration
        const userData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          isAuthenticated: true
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        setIsSubmitting(false);
        navigate('/profile');
      }, 1500);
    }
  };
  
  return (
    <div className="registration-page">
      <div className="registration-container">
        <h1>Create Your Account</h1>
        <p className="subtitle">Start your wellness journey with Ayurveda</p>
        
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={formErrors.firstName ? 'error' : ''}
              />
              {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={formErrors.lastName ? 'error' : ''}
              />
              {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={formErrors.password ? 'error' : ''}
              />
              {formErrors.password && <span className="error-message">{formErrors.password}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={formErrors.confirmPassword ? 'error' : ''}
              />
              {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={formErrors.dateOfBirth ? 'error' : ''}
              />
              {formErrors.dateOfBirth && <span className="error-message">{formErrors.dateOfBirth}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={formErrors.gender ? 'error' : ''}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {formErrors.gender && <span className="error-message">{formErrors.gender}</span>}
            </div>
          </div>
          
          <div className="form-group checkbox-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              I agree to the <Link to="/terms">Terms and Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
            {formErrors.termsAccepted && <span className="error-message">{formErrors.termsAccepted}</span>}
          </div>
          
          <button type="submit" className="register-button" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="login-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Registration;