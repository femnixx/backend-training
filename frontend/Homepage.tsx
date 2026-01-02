import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { supabaseClient } from './SupabaseClient.ts'

const Homepage = () => {
  const [username, setUsername] = useState();
  const navigate = useNavigate()

 const fetchUserData = async () => {
  
  try { 
    const { data: currentSession, error: sessionError } = await supabaseClient.auth.getSession();
    if (sessionError || !currentSession?.session) {
      console.error("Token invalid or expired, please sign in");
      navigate('/sign-in');
      return;
    }

    const userId = currentSession.session?.user.id;
    const { data, error } = await supabaseClient
    .from('users')
    .select('username')
    .eq('id', userId)
    .single();
    
    if (error) {
      console.error("Error fetching username:", error.message);
    } else { 
      setUsername(data?.username);
    }
  } catch (e) { 
    console.error("Error fetching user:", e);
    handleLogout();
  }
 }

useEffect(() => { 
  fetchUserData();
}, []);

const handleLogout= async () => { 
  await supabaseClient.auth.signOut();
  navigate('/sign-in');
} 
  
return (
    <div className="w-screen h-screen p-3 flex flex-col gap-y-2">
      <p className="text-xl font-bold">
        Hello, {username ? username : 'Loading...'}
      </p>

      <button onClick={handleLogout}>Logout</button>

      <div className="flex-col flex w-1/4 gap-y-4">
        <Link to="/create-product" className="border hover:bg-gray-100">
          Create Product
        </Link>
        <Link to="/profile" className="border hover:bg-gray-100">
          Profiles
        </Link>
        <Link to="/delete-product" className="border hover:bg-gray-100">
          Delete Product
        </Link>
        <Link to="/edit-product" className="border hover:bg-gray-100">
          Edit Product
        </Link>
        <Link to="/buy-product" className="border hover:bg-gray-100">
          Buy Product
        </Link>
      </div>
    </div>
  );
};


export default Homepage;

