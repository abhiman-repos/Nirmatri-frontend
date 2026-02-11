'use client'

import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      console.log('Reset link sent to:', email)
      setIsSent(true)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '40px 30px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        {isSent ? (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '15px' }}>Check Your Email</h2>
            <p style={{ marginBottom: '20px' }}>
              We have sent reset instructions to {email}
            </p>
            <a 
              href="/userauth/login" 
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#3b82f6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px'
              }}
            >
              Back to Login
            </a>
          </div>
        ) : (
          <>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              textAlign: 'center',
              marginBottom: '10px'
            }}>
              Reset Password
            </h1>
            
            <p style={{ 
              textAlign: 'center', 
              color: '#6b7280',
              marginBottom: '30px'
            }}>
              Enter your email to receive reset link
            </p>
            
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  marginBottom: '20px'
                }}
                required
              />
              
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  marginBottom: '15px'
                }}
              >
                Send Reset Link
              </button>
              
              <div style={{ textAlign: 'center' }}>
                <a 
                  href="/login" 
                  style={{ 
                    color: '#3b82f6',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}
                >
                  ← Back to Login
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}