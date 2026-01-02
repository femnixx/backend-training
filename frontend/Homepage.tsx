import { handle } from 'express/lib/application';
import React, { use, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [username, setUsername] = useState('User');
  const navigate = useNavigate()

 const fetchUserData = async () => {
  try { 
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/auth/users/me', { 
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (response.ok) { 
      const data = await response.json();
      console.log("Full data: ", data);
      setUsername(data.username || 'User Not Found');      
    } else { 
      console.log("Unathorized or expired token");
      handleLogout();
    }
  } catch (e) { 
    console.error("Error fetching user:", e);
  }
 }

 useEffect(() => { 
  fetchUserData();
 }, []);
  
const handleLogout= () => { 
  sessionStorage.removeItem('token');
  navigate('/sign-in');
} 
  
return ( 
  <>
  <div className="w-screen h-screen p-3 flex flex-col gap-y-2">
      <p className="text-xl font-bold">Hello, {username}</p>

      <button className='' onClick={handleLogout}>Logout</button>

      <div className='flex-col flex w-1/4 gap-y-4'>
        <Link to='/create-product' className="border hover:bg-gray-100">create product</Link>
        <Link to='/profile' className="border hover:bg-gray-100">profiles</Link>
        <Link to='/delete-product' className="border hover:bg-gray-100">delete product</Link>
        <Link to='/edit-product' className="border hover:bg-gray-100">edit product</Link>
        <Link to='/buy-product' className="border hover:bg-gray-100">buy product</Link>
      </div>
    </div>
  </>
)};

export default Homepage;

