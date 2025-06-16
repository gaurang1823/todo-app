import React, { useState } from 'react';
import './Profile.css'; // Assuming you have a CSS file for styling
interface AuthCardProps {}

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
}

const AuthCard: React.FC<AuthCardProps> = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (isSignIn) {
      console.log('Sign In:', { email: formData.email, password: formData.password });
    } else {
      console.log('Register:', formData);
    }
  };

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: ''
    });
  };

  const authCardStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const cardStyles = {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    padding: '2rem',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid #e2e8f0'
  };

  const headerStyles = {
    textAlign: 'center' as const,
    marginBottom: '2rem'
  };

  const titleStyles = {
    fontSize: '1.875rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem'
  };

  const subtitleStyles = {
    fontSize: '0.875rem',
    color: '#64748b',
    lineHeight: '1.5'
  };

  const formGroupStyles = {
    marginBottom: '1.5rem'
  };

  const labelStyles = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem'
  };

  const inputStyles = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s',
    outline: 'none',
    boxSizing: 'border-box' as const
  };

  const inputFocusStyles = {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
  };

  const buttonStyles = {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginBottom: '1.5rem'
  };

  const buttonHoverStyles = {
    backgroundColor: '#2563eb'
  };

  const footerStyles = {
    textAlign: 'center' as const,
    marginBottom: '1rem'
  };

  const toggleTextStyles = {
    fontSize: '0.875rem',
    color: '#64748b'
  };

  const toggleButtonStyles = {
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginLeft: '0.5rem',
    textDecoration: 'underline'
  };

  const forgotButtonStyles = {
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    cursor: 'pointer',
    fontSize: '0.875rem',
    textDecoration: 'underline',
    display: 'block',
    margin: '0 auto'
  };

  return (
    <div style={authCardStyles}>
      <div style={cardStyles}>
        <div style={headerStyles}>
          <h2 style={titleStyles}>{isSignIn ? 'Sign In' : 'Create Account'}</h2>
          <p style={subtitleStyles}>
            {isSignIn ? 'Welcome back! Please sign in to your account.' : 'Join us today! Create your new account.'}
          </p>
        </div>

        <div>
          {!isSignIn && (
            <div style={formGroupStyles}>
              <label htmlFor="fullName" style={labelStyles}>Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleInputChange}
                style={inputStyles}
                placeholder="Enter your full name"
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                onBlur={(e) => Object.assign(e.target.style, inputStyles)}
              />
            </div>
          )}

          <div style={formGroupStyles}>
            <label htmlFor="email" style={labelStyles}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={inputStyles}
              placeholder="Enter your email"
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
              onBlur={(e) => Object.assign(e.target.style, inputStyles)}
            />
          </div>

          <div style={formGroupStyles}>
            <label htmlFor="password" style={labelStyles}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={inputStyles}
              placeholder="Enter your password"
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
              onBlur={(e) => Object.assign(e.target.style, inputStyles)}
            />
          </div>

          {!isSignIn && (
            <div style={formGroupStyles}>
              <label htmlFor="confirmPassword" style={labelStyles}>Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword || ''}
                onChange={handleInputChange}
                style={inputStyles}
                placeholder="Confirm your password"
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                onBlur={(e) => Object.assign(e.target.style, inputStyles)}
              />
            </div>
          )}

          <button 
            type="button" 
            onClick={handleSubmit}
            style={buttonStyles}
            onMouseEnter={(e) => Object.assign((e.target as HTMLButtonElement).style, buttonHoverStyles)}
            onMouseLeave={(e) => Object.assign((e.target as HTMLButtonElement).style, buttonStyles)}
          >
            {isSignIn ? 'Sign In' : 'Create Account'}
          </button>
        </div>

        <div style={footerStyles}>
          <p style={toggleTextStyles}>
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <button type="button" onClick={toggleMode} style={toggleButtonStyles}>
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {isSignIn && (
          <div style={{ textAlign: 'center' as const }}>
            <button type="button" style={forgotButtonStyles}>
              Forgot Password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCard;