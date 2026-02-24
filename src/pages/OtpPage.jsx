import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OtpPage() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [hasOtp, setHasOtp] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOtp = sessionStorage.getItem('demoOtp');
    if (!storedOtp) {
      setHasOtp(false);
    }
  }, []);

  function handleVerify() {
    const storedOtp = sessionStorage.getItem('demoOtp');

    if (!storedOtp) {
      setError('No OTP found. Please request a new one.');
      return;
    }

    if (otp.trim() === storedOtp) {
      localStorage.setItem('isLoggedIn', 'true');
      setError('');
      navigate('/select-animal');
    } else {
      setError('That OTP does not look right. Double‑check and try again.');
    }
  }

  function handleBackToLogin() {
    navigate('/');
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <span className="page-kicker">Step 2 &middot; Verify OTP</span>
        <h1 className="page-title">Check your demo OTP</h1>
        <p className="page-subtitle">
          Enter the 6‑digit code that was shown in the alert. In a real app this would come via SMS.
        </p>
      </div>

      <div className="page-content">
        {!hasOtp && (
          <p className="error-text">
            We could not find a recent OTP. Please go back and request a new code.
          </p>
        )}

        <div className="form-field">
          <label className="field-label" htmlFor="otp">
            6‑digit OTP
          </label>
          <input
            id="otp"
            type="text"
            inputMode="numeric"
            maxLength={6}
            className="text-input"
            placeholder="••••••"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
          />
          <p className="field-helper">Type the exact 6 digits from the alert popup.</p>
        </div>

        {error && <p className="error-text">{error}</p>}

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="primary-button"
            onClick={handleVerify}
            disabled={!hasOtp || otp.trim().length !== 6}
          >
            Verify &amp; continue
          </button>
          <div className="subtle-link">
            Didn&apos;t see the OTP?{' '}
            <button type="button" onClick={handleBackToLogin}>
              Request again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpPage;

