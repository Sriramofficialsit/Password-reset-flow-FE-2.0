import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
 
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleResetPassword = async () => {
    
    if (!username.trim()) {
      setMessage("Username cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`https://password-reset-flow-be-2-0.onrender.com/auth/forget-password`, { username });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen bg-slate-800 flex flex-col items-center justify-center text-white'>
      <div className='shadow-xl shadow-white/60 rounded border border-3 px-5 py-6 flex gap-5 flex-col'>
        <h1 className='text-3xl mb-5'>Forgot Password</h1>
        <label htmlFor="username" className='mr-5'>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='px-5 py-1 rounded active:ring-2 focus:ring-white text-black'
          id='username'/>
        <button onClick={handleResetPassword} className='px-3 py-1 bg-red-400 rounded'>{loading ? "Processing..." : "Reset Password"}</button>
        {message && (<p className={`text-center ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>{message}</p>
       
)}
      </div>
    </div>
  );
};

export default Login;
