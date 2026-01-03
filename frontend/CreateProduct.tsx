import React, { useState, useEffect } from 'react'
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '../frontend/components/dropzone.tsx';
import { useSupabaseUpload } from './hooks/use-supabase-upload.ts';
import { supabaseClient } from './SupabaseClient.ts';
import { useNavigate } from 'react-router-dom';

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

    const productPayload = { 
      productName,
      productType,
      productDescription,
      price,
      stock,
      userId 
    };

    try { 
      const response = await fetch('http://localhost:5000/api/products/post-product', { 
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(productPayload)
      });
      
      if (response.ok) {
        window.alert("Product posted successfully.");
      } else {
        const errorData = await response.json();
        console.error("Post failed:", errorData.message);
      }
    } catch (err) { 
      console.error("Network error:", err);
    }
  }

  if (!userId) {
    return <div className="flex h-screen w-screen items-center justify-center">Loading session...</div>;
  }

  return (
    <div className='w-screen h-screen p-8'>
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="font-medium">Product name</p>
          <input 
            type="text" 
            className='border rounded p-1 w-full max-w-md' 
            value={productName} 
            onChange={(e) => setproductName(e.target.value)}
            required
          />
        </div>

        <div>
          <p className="font-medium">Product type</p>
          <div className='flex flex-col gap-y-2 mt-1'>
            {['food', 'beauty', 'misc'].map((type) => (
              <div key={type} className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name='productType' 
                  id={type} 
                  value={type} 
                  checked={productType === type}
                  onChange={(e) => setProductType(e.target.value)}
                />
                <label htmlFor={type}>{type}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium">Product description</p>
          <textarea 
            className='border rounded p-2 w-full max-w-md h-32' 
            placeholder='Description of your product' 
            value={productDescription} 
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <div>
            <p className="font-medium">Price</p>
            <input 
              type="number" 
              className='border rounded p-1 w-32' 
              value={price} 
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <p className="font-medium">Stock</p>
            <input 
              type="number" 
              className='border rounded p-1 w-32' 
              value={stock} 
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>

        <div className="max-w-md">
          <p className="font-medium mb-2">Product Images</p>
          <Dropzone {...props}>
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>
        </div>

        <button 
          className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors' 
          type='submit'
        >
          Submit Product
        </button>
      </form>
    </div>
  )
}

export default CreateProduct;