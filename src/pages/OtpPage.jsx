import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OtpPage() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  async function handleVerify() {
    const email = localStorage.getItem("email");

    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      const res = await fetch("https://dog-cat-translator.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Set login flag
        localStorage.setItem("isLoggedIn", "true");

        // ✅ Redirect to first protected page
        navigate("/select-animal");
      } else {
        alert("Wrong OTP ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  }

  return (
    <div className="page-shell">
      <h2>Enter OTP</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={handleVerify}>
        Verify OTP
      </button>
    </div>
  );
}

export default OtpPage;