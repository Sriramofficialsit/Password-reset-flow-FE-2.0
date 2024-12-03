import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ResetPass = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Extract the token from the URL query parameters
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');
    setToken(tokenFromUrl);
  }, [location.search]);

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      setMessage("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`https://password-reset-flow-be-2-0.onrender.com/auth/reset-password`, {
        token,
        newPassword,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen bg-slate-800 flex flex-col items-center justify-center text-white'>
      <div className='shadow-xl shadow-white/60 rounded border border-3 px-5 py-6 flex gap-5 flex-col'>
        <h1 className='text-3xl mb-5'>Reset Password</h1>
    
        <label htmlFor="newPassword" className='mr-10'>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className='px-5 py-1 rounded active:ring-2 focus:ring-white text-black'
          id='newPassword'
        />

        <label htmlFor="confirmPassword" className='mr-4'>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='px-5 py-1 rounded active:ring-2 focus:ring-white text-black'
          id='confirmPassword'
        />

        <button onClick={handleReset} className='px-3 py-1 bg-red-400 rounded' disabled={loading}>
          {loading ? "Resetting..." : "Reset"}
        </button>

        {message && (
          <p className={`text-center mt-2 ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPass;
