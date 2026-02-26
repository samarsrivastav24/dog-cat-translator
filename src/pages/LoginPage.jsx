import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleSendOtp(e) {
    e.preventDefault();

    const res = await fetch("https://dog-cat-translator.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      alert("OTP sent to your email");
      localStorage.setItem("email", email);
      navigate("/otp");
    } else {
      alert("Failed to send OTP");
    }
  }

  return (
    <div>
      <h2>Email Login</h2>

      <form onSubmit={handleSendOtp}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
}

export default LoginPage;