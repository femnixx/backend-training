import React from 'react'
import { useState } from 'react'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { 
      email, 
      password
    }
    const response = await fetch('http://localhost:5000/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();
    if (response.ok) { 
      const myToken = result.token;
      sessionStorage.setItem('token', myToken);
      console.log("Sign-in successful: Token saved");
      window.alert("Sign in successful!");
      window.location.href = '/';
    }
    if (!response.ok) { 
      console.log("Sign-in failed: ", result);
      setError(result.message || "Something went wrong");
    } else { 
      setError(result.message || "Something went wrong");
    }
  }


  return <>
  <div className='w-screen h-screen'>
      <form onSubmit={handleSubmit} method='post'>
        <p>Email</p>
        <input type="text" name='email' id='email' className='border' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <p>Password</p>
        <input type="password" name='password' id='password' className='border' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <p className={`${error.trim().length == 0 ? "hidden" : "flex"} text-red-600`}>Invalid email or password</p>
        <button className='border' type='submit'>Sign In</button>
      </form>
  </div>
  </>
}

export default SignIn