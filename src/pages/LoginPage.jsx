import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSendOtp(event) {
    event.preventDefault();
    setError('');

    const trimmed = phone.trim();
    if (!trimmed) {
      setError('Please enter your phone number.');
      return;
    }
    if (trimmed.length < 8) {
      setError('That looks a bit short. Try including country code.');
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem('demoOtp', otp);

    // Clear any previous auth state for a fresh session
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('selectedAnimal');
    localStorage.removeItem('selectedBreed');

    // Demo-only: show OTP in alert
    // In a real app this would be sent via SMS.
    alert(`Demo OTP for ${trimmed}: ${otp}`);

    navigate('/otp');
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <span className="page-kicker">Welcome back</span>
        <h1 className="page-title">Dog &amp; Cat Language Translator</h1>
        <p className="page-subtitle">
          Log in with your phone number to start translating barks and meows into human-friendly messages.
        </p>
      </div>

      <form className="page-content" onSubmit={handleSendOtp}>
        <div className="form-field">
          <label className="field-label" htmlFor="phone">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            className="text-input"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <p className="field-helper">Demo only – we will show your OTP in an alert on the next step.</p>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="primary-button">
          Send OTP
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

