import React, { useState } from 'react'

const SignUp = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const  userData = { 
      username: username,
      email: email,
      password: password
    }
    const response = await fetch('http://localhost:5000/api/auth/sign-up', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    if (response.ok) { 
      console.log("Sign-up successful");
      window.alert("Sign-up successful! Please sign in.");
      window.location.href = '/sign-in';
    } 
  }


  return (
    <div className='w-screen h-screen'>
      <form method='post' onSubmit={handleSubmit}>
        <p>Username</p>
        <input type="text" name='username' id='username' className='border' value={username} onChange={(e) => setUsername(e.target.value)}/>
        <p className={`${username.trim().length == 0 ? "flex" : "hidden"} text-red-600`}>This field is required</p>
        <p className={`text-red-600 ${username.trim().length <= 4} ? "flex" : "hidden"`}>Username must be more than 4 characters</p>
        <p>Email</p>
        <input type="email" className='border' value={email} required onChange={(e) => setEmail(e.target.value)}/>
        <p className={`${email.trim().length == 0 ? "flex" : "hidden"} text-red-600`}>This field is required</p>
        <p>Password</p>
        <input type="password" className='border' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <p className={`${password.trim().length < 8 ? "flex" : "hidden"} text-red-600`}>Password should be more or equal to 8 characters</p>
        <p className={`${password.trim().length == 0 ? "flex" : "hidden"} text-red-600`}>This field is required</p>
        <button className='border' type='submit'>Sign In</button>
      </form>
    </div>
  )
}

export default SignUp