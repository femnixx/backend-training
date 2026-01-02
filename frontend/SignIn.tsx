import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from './SupabaseClient.ts';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/auth/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    console.log("Result received from server:", result);
    if (!response.ok) { 
      return window.alert(result.message || "Login failed");
    }
    if (result.userId) {
      window.alert(`Signed in successfully with user ID: ${result.userId}`);
      navigate('/');
      await supabaseClient.auth.setSession({
        access_token: result.session.access_token,
        refresh_token: result.session.refresh_token
      });
    } else { 
      console.error("Backend didn't send a userId property");
    }

  } catch (err) {
    console.error("Network error:", err);
  }
};


  return <>
  <div className='w-screen h-screen'>
      <form onSubmit={handleSubmit} method='post'>
        <p>Email</p>
        <input type="text" name='email' id='email' className='border' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <p>Password</p>
        <input type="password" name='password' id='password' className='border' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <p className={`${error.trim().length == 0 ? "hidden" : "flex"} text-red-600`}>Invalid email or password</p>
        <button className='border' type='submit'>Sign In</button>
        <p>Don't have an account?</p>
        <nav className='underline'>Sign up</nav>
      </form>
  </div>
  </>
}

export default SignIn