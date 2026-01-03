import React, { useState, useEffect } from 'react'
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '../frontend/components/dropzone.tsx';
import { useSupabaseUpload } from './hooks/use-supabase-upload.ts';
import { supabaseClient } from './SupabaseClient.ts';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Tag, FileText, DollarSign, Layers, Image as ImageIcon } from 'lucide-react';

const CreateProduct = () => {
  const [productName, setproductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabaseClient.auth.getSession();
      if (error || !data.session) {
        console.error("Auth error:", error?.message);
        navigate('/sign-in');
        return;
      }
      setUserId(data.session.user.id);
    };
    getSession();
  }, [navigate]);

  const props = useSupabaseUpload({ 
    bucketName: 'products',
    path: userId ? `products/${userId}` : '', 
    allowedMimeTypes: ['image/*'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
  }); 

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    const productPayload = { productName, productType, productDescription, price, stock, userId };

    try { 
      const response = await fetch('http://localhost:5000/api/products/post-product', { 
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(productPayload)
      });
      
      if (response.ok) {
        window.alert("Product posted successfully.");
        navigate('/'); // Navigate back home after success
      } else {
        const errorData = await response.json();
        console.error("Post failed:", errorData.message);
      }
    } catch (err) { 
      console.error("Network error:", err);
    }
  }

  if (!userId) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Loading session...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center'>
      <div className="w-full max-w-2xl">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-white">
            <h1 className="text-2xl font-bold text-gray-900">Create New Product</h1>
            <p className="text-gray-500 text-sm">Fill in the details below to list your product in the marketplace.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Name Section */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Package size={16} className="text-blue-500" />
                Product Name
              </label>
              <input 
                type="text" 
                className='w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all' 
                placeholder="e.g. Vintage Camera"
                value={productName} 
                onChange={(e) => setproductName(e.target.value)}
                required
              />
            </div>

            {/* Type Section */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Tag size={16} className="text-blue-500" />
                Category
              </label>
              <div className='flex flex-wrap gap-3'>
                {['food', 'beauty', 'misc'].map((type) => (
                  <label 
                    key={type} 
                    className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl border-2 cursor-pointer transition-all capitalize font-medium ${
                      productType === type 
                      ? 'border-blue-600 bg-blue-50 text-blue-700' 
                      : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    <input 
                      type="radio" 
                      className="hidden"
                      name='productType' 
                      value={type} 
                      checked={productType === type}
                      onChange={(e) => setProductType(e.target.value)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText size={16} className="text-blue-500" />
                Description
              </label>
              <textarea 
                className='w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-32 resize-none' 
                placeholder='Tell buyers about your product...' 
                value={productDescription} 
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>

            {/* Pricing and Stock Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <DollarSign size={16} className="text-blue-500" />
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                  <input 
                    type="number" 
                    className='w-full p-3 pl-8 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none' 
                    placeholder="0.00"
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Layers size={16} className="text-blue-500" />
                  Stock Quantity
                </label>
                <input 
                  type="number" 
                  className='w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none' 
                  placeholder="0"
                  value={stock} 
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <ImageIcon size={16} className="text-blue-500" />
                Product Images
              </label>
              <div className="p-1 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <Dropzone {...props}>
                  <DropzoneEmptyState />
                  <DropzoneContent />
                </Dropzone>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              className='w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-100' 
              type='submit'
            >
              Post Product
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct;