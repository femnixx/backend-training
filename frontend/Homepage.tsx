import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    navigate('/sign-in');
  }

  // --- UI IMPROVEMENTS START HERE ---
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {/* Top Header Section */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Hello, <span className="text-blue-600">{username ? username : 'Loading...'}</span> 👋
          </h1>
          <p className="text-sm text-gray-500">Welcome to your store management dashboard</p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2"
        >
          Logout
        </button>
      </div>

      {/* Main Navigation Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <Link to="/profile" className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-blue-400 hover:shadow-md transition-all">
          <div className="text-2xl mb-2">👤</div>
          <h3 className="font-bold text-gray-800">My Profile</h3>
          <p className="text-sm text-gray-500 mt-1">View and edit your personal account details.</p>
        </Link>

        {/* Create Product Card */}
        <Link to="/create-product" className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-green-400 hover:shadow-md transition-all">
          <div className="text-2xl mb-2">✨</div>
          <h3 className="font-bold text-gray-800">Create Product</h3>
          <p className="text-sm text-gray-500 mt-1">List a new item for sale in the marketplace.</p>
        </Link>

        {/* Marketplace/Buy Card */}
        <Link to="/buy-product" className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-purple-400 hover:shadow-md transition-all">
          <div className="text-2xl mb-2">🛒</div>
          <h3 className="font-bold text-gray-800">Buy Products</h3>
          <p className="text-sm text-gray-500 mt-1">Browse and purchase items from other users.</p>
        </Link>

        {/* Edit Product Card */}
        <Link to="/edit-product" className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-amber-400 hover:shadow-md transition-all">
          <div className="text-2xl mb-2">📝</div>
          <h3 className="font-bold text-gray-800">Edit Product</h3>
          <p className="text-sm text-gray-500 mt-1">Update price, description, or stock levels.</p>
        </Link>

        {/* Delete Product Card */}
        <Link to="/delete-product" className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-red-400 hover:shadow-md transition-all">
          <div className="text-2xl mb-2">🗑️</div>
          <h3 className="font-bold text-gray-800 text-red-600">Delete Product</h3>
          <p className="text-sm text-gray-500 mt-1">Permanently remove an item from your store.</p>
        </Link>

      </div>
    </div>
  );
};

export default Homepage;