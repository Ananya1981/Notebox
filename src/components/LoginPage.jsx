import { useState } from 'react'
import {
  FiBookOpen,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiStar,
  FiUser,
  FiArrowLeft,
} from 'react-icons/fi'
import './LoginPage.css'

const API_BASE_URL = 'http://localhost:5000/api'

export default function LoginPage({ onBack, onLoginSuccess }) {
  const [mode, setMode] = useState('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    fullName: '',
    email: localStorage.getItem('notebox_remembered_email') || '',
    password: '',
    confirmPassword: '',
    rememberMe: true,
  })

  const isSignIn = mode === 'signin'

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setMessage('')
  }

  const validate = () => {
    const nextErrors = {}
    const email = form.email.trim()

    if (!isSignIn && !form.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.'
    }

    if (!email) {
      nextErrors.email = 'Please enter your Gmail address.'
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email)) {
      nextErrors.email = 'Please use a valid @gmail.com address.'
    }

    if (!form.password) {
      nextErrors.password = 'Please enter your password.'
    } else if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    if (!isSignIn) {
      if (!form.confirmPassword) {
        nextErrors.confirmPassword = 'Please confirm your password.'
      } else if (form.password !== form.confirmPassword) {
        nextErrors.confirmPassword = 'Passwords do not match.'
      }
    }

    return nextErrors
  }

  const switchMode = () => {
    setMode((current) => (current === 'signin' ? 'signup' : 'signin'))
    setErrors({})
    setMessage('')
    setShowPassword(false)
    setForm((current) => ({ ...current, password: '', confirmPassword: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setMessage('')

    const payload = isSignIn
      ? { email: form.email.trim(), password: form.password }
      : {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          password: form.password,
          confirmPassword: form.confirmPassword,
        }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/${isSignIn ? 'signin' : 'signup'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Unable to complete your request.')
      }

      setMessage(result.message)

      if (isSignIn) {
        if (form.rememberMe) {
          localStorage.setItem('notebox_remembered_email', form.email.trim())
        } else {
          localStorage.removeItem('notebox_remembered_email')
        }
        setForm((current) => ({ ...current, password: '' }))
        if (onLoginSuccess) {
          setTimeout(() => {
            onLoginSuccess(result.user?.fullName || form.email.split('@')[0])
          }, 800)
        }
      } else {
        setMode('signin')
        setForm((current) => ({
          ...current,
          email: current.email.trim(),
          fullName: '',
          password: '',
          confirmPassword: '',
        }))
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unable to reach the server.'
      setMessage(errMsg)
      // If server is offline, also offer a demo sign in helper
      if (errMsg === 'Failed to fetch' || errMsg.includes('Unable to reach')) {
        setMessage('Backend server offline (http://localhost:5000). You can also click below to test.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDemoSignIn = () => {
    if (onLoginSuccess) {
      onLoginSuccess('Demo User')
    }
  }

  return (
    <div className="page-shell">
      {/* Return to Landing Page Button */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="back-nav-btn"
          aria-label="Back to NoteBox"
        >
          <FiArrowLeft />
          <span>Back to NoteBox</span>
        </button>
      )}

      <div className="floating floating-left" aria-hidden="true">
        <div className="notebook-mini">
          <div className="notebook-ring" />
          <div className="notebook-heart">♥️</div>
        </div>
        <div className="mini-pencil"><span className="lead" /></div>
        <FiStar style={{ color: '#d8b4fe', fontSize: '18px' }} />
      </div>

      <div className="floating floating-right" aria-hidden="true">
        <div className="pen-stand">
          <div className="pencil pencil-one" />
          <div className="pencil pencil-two" />
          <div className="pencil pencil-three" />
          <div className="eraser" />
        </div>
      </div>

      <main className="auth-card">
        <header className="brand-header">
          <div className="brand-mark"><FiBookOpen /></div>
          <h1>NoteBox</h1>
        </header>

        <div className="intro-copy">
          <h2>{isSignIn ? 'Welcome to NoteBox' : 'Create your NoteBox account'}</h2>
          <p>
            {isSignIn
              ? 'Sign in to manage your stationery subscription, orders, and more.'
              : 'Create an account to start your stationery subscription.'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {!isSignIn && (
            <div className="field-group">
              <label htmlFor="fullName">Full Name</label>
              <div className={`input-wrap ${errors.fullName ? 'is-invalid' : ''}`}>
                <span className="field-icon"><FiUser /></span>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </div>
              {errors.fullName && <small>{errors.fullName}</small>}
            </div>
          )}

          <div className="field-group">
            <label htmlFor="email">Gmail</label>
            <div className={`input-wrap ${errors.email ? 'is-invalid' : ''}`}>
              <span className="field-icon"><FiMail /></span>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your Gmail"
                autoComplete="email"
              />
            </div>
            {errors.email && <small>{errors.email}</small>}
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <div className={`input-wrap ${errors.password ? 'is-invalid' : ''}`}>
              <span className="field-icon"><FiLock /></span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete={isSignIn ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <small>{errors.password}</small>}
          </div>

          {!isSignIn && (
            <div className="field-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className={`input-wrap ${errors.confirmPassword ? 'is-invalid' : ''}`}>
                <span className="field-icon"><FiLock /></span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
              </div>
              {errors.confirmPassword && <small>{errors.confirmPassword}</small>}
            </div>
          )}

          {isSignIn && (
            <div className="utility-row">
              <label className="remember-me" htmlFor="rememberMe">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={form.rememberMe}
                  onChange={handleChange}
                />
                <span className="checkmark"><FiCheck /></span>
                Remember me
              </label>
              <button
                type="button"
                className="text-link"
                onClick={() => setMessage('Password reset is not configured yet.')}
              >
                Forgot password?
              </button>
            </div>
          )}

          {message && <p className="server-message" role="status">{message}</p>}

          <button type="submit" className="primary-button" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : isSignIn ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="divider"><span>or</span></div>

        <button type="button" className="secondary-button" onClick={switchMode}>
          {isSignIn ? 'Create Account' : 'Sign In'}
        </button>

        {onLoginSuccess && (
          <div style={{ textAlign: 'center', marginTop: '0.875rem' }}>
            <button
              type="button"
              onClick={handleDemoSignIn}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.75rem',
                color: '#7e22ce',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Demo Sign In (Skip Backend)
            </button>
          </div>
        )}

        <p className="bottom-link">
          {isSignIn ? 'New to NoteBox?' : 'Already have an account?'}{' '}
          <button type="button" className="inline-link" onClick={switchMode}>
            {isSignIn ? 'Create an account' : 'Sign in'}
          </button>
          {isSignIn ? ' to get started.' : '.'}
        </p>
      </main>
    </div>
  )
}
