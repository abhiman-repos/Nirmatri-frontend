"use client";

import { useState, useEffect } from 'react';
import { FiEdit, FiCheck, FiX, FiSave, FiUser, FiMail, FiPhone } from 'react-icons/fi';

export default function PersonalInformationPage() {
  // Initialize state from localStorage
  const initializeUserData = () => {
    const savedData = localStorage.getItem('personalInfo');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {
      firstName: '',
      lastName: '',
      gender: '',
      email: 'nirmatri@gmail.com',
      mobile: '+91xxxxxxxxx'
    };
  };

  // State for personal information
  const [userData, setUserData] = useState(initializeUserData);

  // State for editing mode
  const [editing, setEditing] = useState({
    personalInfo: false,
    email: false,
    mobile: false
  });

  // State for form data
  const [formData, setFormData] = useState(userData);

  // Handle editing state
  const startEditing = (section: string) => {
    setFormData({ ...userData });
    setEditing({ ...editing, [section]: true });
  };

  const cancelEditing = (section: string) => {
    setEditing({ ...editing, [section]: false });
    setFormData({ ...userData });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Save data for a specific section
  const saveData = (section: string) => {
    // Validation for email
    if (section === 'email' && formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validation for mobile number
    if (section === 'mobile' && formData.mobile && !/^\+?[0-9\s\-\(\)]{10,}$/.test(formData.mobile)) {
      alert('Please enter a valid mobile number');
      return;
    }

    const updatedData = { ...userData, ...formData };
    setUserData(updatedData);
    setEditing({ ...editing, [section]: false });
    
    // Save to localStorage
    localStorage.setItem('personalInfo', JSON.stringify(updatedData));
  };

  // Save all data at once
  const saveAllData = () => {
    const updatedData = { ...userData, ...formData };
    setUserData(updatedData);
    setEditing({ personalInfo: false, email: false, mobile: false });
    
    // Save to localStorage
    localStorage.setItem('personalInfo', JSON.stringify(updatedData));
  };

  // CSS Styles as JavaScript objects
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
      backgroundColor: '#120e31',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #e5e7eb'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: '700',
      color: '#f5f5f5',
      margin: '0'
    },
    saveAllButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: '#10b981',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    sectionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    sectionCard: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
      transition: 'box-shadow 0.3s'
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 1.5rem 0'
    },
    sectionTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    sectionIcon: {
      fontSize: '1.25rem',
      color: '#6b7280'
    },
    sectionTitleH2: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827',
      margin: '0'
    },
    editButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#f3f4f6',
      color: '#374151',
      transition: 'all 0.2s'
    },
    cancelButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      transition: 'all 0.2s'
    },
    saveButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#dbeafe',
      color: '#1d4ed8',
      marginTop: '1rem',
      transition: 'all 0.2s'
    },
    editControls: {
      display: 'flex',
      gap: '0.5rem'
    },
    displayContent: {
      padding: '1.5rem'
    },
    infoRow: {
      display: 'flex',
      marginBottom: '1rem',
      paddingBottom: '0.75rem',
      borderBottom: '1px solid #070707'
    },
    infoLabel: {
      fontWeight: '500',
      color: '#4b5563',
      minWidth: '140px'
    },
    infoValue: {
      color: '#111827',
      fontWeight: '400'
    },
    emailValue: {
      color: '#2563eb'
    },
    editForm: {
      padding: '1.5rem',
      borderTop: '1px solid #f3f4f6'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    formLabel: {
      display: 'block',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    formInput: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      transition: 'border-color 0.2s'
    },
    genderOptions: {
      display: 'flex',
      gap: '1.5rem',
      marginTop: '0.5rem'
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      fontWeight: '400',
      color: '#4b5563'
    },
    radioCustom: {
      display: 'inline-block',
      width: '1.25rem',
      height: '1.25rem',
      border: '2px solid #d1d5db',
      borderRadius: '50%',
      position: 'relative',
      transition: 'all 0.2s'
    },
    footerNote: {
      marginTop: '2rem',
      padding: '1rem',
      backgroundColor: '#f0f9ff',
      borderRadius: '0.5rem',
      color: '#0369a1',
      fontSize: '0.875rem',
      textAlign: 'center',
      border: '1px solid #bae6fd'
    }
  };

  // Mouse hover effects ko handle karne ke liye inline styles
  const buttonHover = (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
    if (type === 'edit') {
      e.currentTarget.style.backgroundColor = '#e5e7eb';
    } else if (type === 'cancel') {
      e.currentTarget.style.backgroundColor = '#fee2e2';
    } else if (type === 'save') {
      e.currentTarget.style.backgroundColor = '#bfdbfe';
    } else if (type === 'saveAll') {
      e.currentTarget.style.backgroundColor = '#059669';
    }
  };

  const buttonLeave = (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
    if (type === 'edit') {
      e.currentTarget.style.backgroundColor = '#f3f4f6';
    } else if (type === 'cancel') {
      e.currentTarget.style.backgroundColor = '#fef2f2';
    } else if (type === 'save') {
      e.currentTarget.style.backgroundColor = '#dbeafe';
    } else if (type === 'saveAll') {
      e.currentTarget.style.backgroundColor = '#10b981';
    }
  };

  // Input focus effect
  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.outline = 'none';
    e.target.style.borderColor = '#3b82f6';
    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
  };

  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#d1d5db';
    e.target.style.boxShadow = 'none';
  };

  // Card hover effect
  const cardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
  };

  const cardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Personal Information</h1>
        <button 
          style={styles.saveAllButton}
          onClick={saveAllData}
          onMouseEnter={(e) => buttonHover(e, 'saveAll')}
          onMouseLeave={(e) => buttonLeave(e, 'saveAll')}
        >
          <FiSave /> Save All
        </button>
      </header>

      <div style={styles.sectionsContainer}>
        {/* Personal Information Section */}
        <div 
          style={styles.sectionCard}
          onMouseEnter={cardHover}
          onMouseLeave={cardLeave}
        >
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitle}>
              <FiUser style={styles.sectionIcon} />
              <h2 style={styles.sectionTitleH2}>Personal Information</h2>
            </div>
            {!editing.personalInfo ? (
              <button 
                style={styles.editButton}
                onClick={() => startEditing('personalInfo')}
                onMouseEnter={(e) => buttonHover(e, 'edit')}
                onMouseLeave={(e) => buttonLeave(e, 'edit')}
              >
                <FiEdit /> Edit
              </button>
            ) : (
              <div style={styles.editControls}>
                <button 
                  style={styles.cancelButton}
                  onClick={() => cancelEditing('personalInfo')}
                  onMouseEnter={(e) => buttonHover(e, 'cancel')}
                  onMouseLeave={(e) => buttonLeave(e, 'cancel')}
                >
                  <FiX /> Cancel
                </button>
              </div>
            )}
          </div>

          {!editing.personalInfo ? (
            <div style={styles.displayContent}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>First Name:</span>
                <span style={styles.infoValue}>{userData.firstName || 'Not set'}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Last Name:</span>
                <span style={styles.infoValue}>{userData.lastName || 'Not set'}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Your Gender:</span>
                <span style={styles.infoValue}>{userData.gender || 'Not set'}</span>
              </div>
            </div>
          ) : (
            <div style={styles.editForm}>
              <div style={styles.formGroup}>
                <label htmlFor="firstName" style={styles.formLabel}>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  style={styles.formInput}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="lastName" style={styles.formLabel}>Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  style={styles.formInput}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Your Gender</label>
                <div style={styles.genderOptions}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === 'Male'}
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      ...styles.radioCustom,
                      borderColor: formData.gender === 'Male' ? '#3b82f6' : '#d1d5db'
                    } as React.CSSProperties}>
                      {formData.gender === 'Male' && (
                        <span style={{
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '0.75rem',
                          height: '0.75rem',
                          backgroundColor: '#3b82f6',
                          borderRadius: '50%'
                        }} />
                      )}
                    </span>
                    Male
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === 'Female'}
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      ...styles.radioCustom,
                      borderColor: formData.gender === 'Female' ? '#3b82f6' : '#d1d5db'
                    } as React.CSSProperties}>
                      {formData.gender === 'Female' && (
                        <span style={{
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '0.75rem',
                          height: '0.75rem',
                          backgroundColor: '#3b82f6',
                          borderRadius: '50%'
                        }} />
                      )}
                    </span>
                    Female
                  </label>
                </div>
              </div>
              <button 
                style={styles.saveButton}
                onClick={() => saveData('personalInfo')}
                onMouseEnter={(e) => buttonHover(e, 'save')}
                onMouseLeave={(e) => buttonLeave(e, 'save')}
              >
                <FiCheck /> Save
              </button>
            </div>
          )}
        </div>

        {/* Email Address Section */}
        <div 
          style={styles.sectionCard}
          onMouseEnter={cardHover}
          onMouseLeave={cardLeave}
        >
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitle}>
              <FiMail style={styles.sectionIcon} />
              <h2 style={styles.sectionTitleH2}>Email Address</h2>
            </div>
            {!editing.email ? (
              <button 
                style={styles.editButton}
                onClick={() => startEditing('email')}
                onMouseEnter={(e) => buttonHover(e, 'edit')}
                onMouseLeave={(e) => buttonLeave(e, 'edit')}
              >
                <FiEdit /> Edit
              </button>
            ) : (
              <div style={styles.editControls}>
                <button 
                  style={styles.cancelButton}
                  onClick={() => cancelEditing('email')}
                  onMouseEnter={(e) => buttonHover(e, 'cancel')}
                  onMouseLeave={(e) => buttonLeave(e, 'cancel')}
                >
                  <FiX /> Cancel
                </button>
              </div>
            )}
          </div>

          {!editing.email ? (
            <div style={styles.displayContent}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Email Address:</span>
                <span style={{...styles.infoValue, ...styles.emailValue}}>{userData.email}</span>
              </div>
            </div>
          ) : (
            <div style={styles.editForm}>
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.formLabel}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  style={styles.formInput}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>
              <button 
                style={styles.saveButton}
                onClick={() => saveData('email')}
                onMouseEnter={(e) => buttonHover(e, 'save')}
                onMouseLeave={(e) => buttonLeave(e, 'save')}
              >
                <FiCheck /> Save
              </button>
            </div>
          )}
        </div>

        {/* Mobile Number Section */}
        <div 
          style={styles.sectionCard}
          onMouseEnter={cardHover}
          onMouseLeave={cardLeave}
        >
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitle}>
              <FiPhone style={styles.sectionIcon} />
              <h2 style={styles.sectionTitleH2}>Mobile Number</h2>
            </div>
            {!editing.mobile ? (
              <button 
                style={styles.editButton}
                onClick={() => startEditing('mobile')}
                onMouseEnter={(e) => buttonHover(e, 'edit')}
                onMouseLeave={(e) => buttonLeave(e, 'edit')}
              >
                <FiEdit /> Edit
              </button>
            ) : (
              <div style={styles.editControls}>
                <button 
                  style={styles.cancelButton}
                  onClick={() => cancelEditing('mobile')}
                  onMouseEnter={(e) => buttonHover(e, 'cancel')}
                  onMouseLeave={(e) => buttonLeave(e, 'cancel')}
                >
                  <FiX /> Cancel
                </button>
              </div>
            )}
          </div>

          {!editing.mobile ? (
            <div style={styles.displayContent}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Mobile Number:</span>
                <span style={styles.infoValue}>{userData.mobile}</span>
              </div>
            </div>
          ) : (
            <div style={styles.editForm}>
              <div style={styles.formGroup}>
                <label htmlFor="mobile" style={styles.formLabel}>Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number with country code"
                  style={styles.formInput}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>
              <button 
                style={styles.saveButton}
                onClick={() => saveData('mobile')}
                onMouseEnter={(e) => buttonHover(e, 'save')}
                onMouseLeave={(e) => buttonLeave(e, 'save')}
              >
                <FiCheck /> Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}