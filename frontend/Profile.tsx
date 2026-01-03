import { useEffect } from 'react'
import { supabaseClient } from './SupabaseClient.ts'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState('');
  const [orders, setOrders] = useState('');
  const navigate = useNavigate();

  const ProfileLoader = async () => { 
    try { 
    const { data: currentSession, error: sessionError } = await supabaseClient.auth.getSession();
    if (sessionError || !currentSession?.session) {
      console.log("User not logged in.");
      window.alert("Session invalid or expired: Please sign in");
      navigate('/sign-in');    
      return;      
    }
    const userId = currentSession.session.user.id;
    const { data: fetchUser, error: fetchError } = await supabaseClient
    .from('users')
    .select()
    .eq('id', userId)
    .single();

    if (fetchError) console.error("Error fetching user");
    if (fetchUser) { 
      setUsername(fetchUser.username);
      setEmail(fetchUser.email);
      setProducts(fetchUser.products);
      setOrders(fetchUser.orders);
    }
    } catch (e) { 
      console.log("Error loading profile:", e);
    }
  }

  const HandleLogout = async () => { 
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(`Something went wrong: ${error.message}`);
      window.alert("Something went wrong: Please try again");
    }
    console.log("Successfully signed out.");
    window.alert("Successfully signed out.");
    navigate('/sign-in');
  } 

  useEffect(() => { 
    ProfileLoader();
  }, []);

  return (
    <>
      <div className="w-full max-w-md mx-auto flex flex-col items-center mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
  
  {/* Avatar Section */}
  <div className="relative group">
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
    <img 
      src={"https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
      alt="User Avatar" 
      className="relative w-32 h-32 object-cover rounded-full border-4 border-white shadow-sm"
    />
  </div>

  {/* Identity Section */}
  <div className="text-center mt-6">
    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
      {username || "Fetching name..."}
    </h2>
    <p className="text-blue-600 font-medium text-sm mb-1">
      Active Member
    </p>
    <p className="text-gray-500 text-sm italic">
      {email || "email@example.com"}
    </p>
  </div>

  <div className="w-full h-px bg-gray-100 my-8"></div>

  {/* Actions & Info Section */}
  <div className="w-full space-y-3">
    
    {/* Product Count Item */}
    <div className="flex justify-between items-center p-4 bg-blue-50/50 rounded-xl border border-blue-100">
      <div className="flex items-center gap-3">
        <span className="text-xl">🛍️</span>
        <span className="text-sm font-semibold text-blue-900">Products Hosted</span>
      </div>
      <span className="text-lg font-bold text-blue-700">
        {products || 0}
      </span>
    </div>

    {/* Navigation Links */}
    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-all group">
      <div className="flex items-center gap-3">
        <span className="text-xl">📦</span>
        <span className="text-sm font-medium text-gray-700">My Orders</span>
      </div>
      <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
    </button>

    <button 
      onClick={HandleLogout}
      className="w-full flex items-center gap-3 p-4 text-red-600 hover:bg-red-50 rounded-xl transition-all"
    >
      <span className="text-xl">🚪</span>
      <span className="text-sm font-bold uppercase tracking-wider">Log Out</span>
    </button>
  </div>
</div>
    </>
  )
}

export default Profile