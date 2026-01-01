import React from 'react'
import { useState } from 'react'

const CreateProduct = () => {
  const [productName, setproductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');

  const token = sessionStorage.getItem('token');

  const product = { 
    productName,
    productType,
    productDescription,
    price
  }

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();

    try { 
      const response = await fetch('http://localhost:5000/api/products/post-products', { 
        method: 'POST',
        headers: { 
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("Product post failed: ", data.message);
        return;
      }
      console.log("Product posted successfully");
      window.alert("Product posted successfully.");
    } catch (e) { 
      console.error("Error:", e)
    }
  }
  
  return (
    <div className='w-screen h-screen'>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Product name</p>
          <input type="text" name='productName' id='productName'className='border' value={productName} onChange={(e) => setproductName(e.target.value)}/>
          <p>Product type</p>
          <div className='flex flex-col w-fit gap-y-3'>
            <div>
              <input type="radio" name='productType' id='food' value={"food"} onChange={(e) => setProductType(e.target.value)}/>
              <label htmlFor="productType">food</label>
            </div>
            <div>
              <input type="radio" name='productType' id='beauty' value={"beauty"} onChange={(e) => setProductType(e.target.value)}/>
              <label htmlFor="productType">beauty</label>
            </div>
            <div>
              <input type="radio" name='productType' id='misc' value={"misc"} onChange={(e) => setProductType(e.target.value)}/>
              <label htmlFor="productType">misc</label>
            </div>
          </div>
          <p>Product description</p>
          <textarea name="productDescription" id="productDescription" className='border p-15' placeholder='desc of your product' value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></textarea>
          <p>Price</p>
          <input type="number" className='border' name='price' id='price' value={price} onChange={(e) => setPrice(e.target.value)}/>
        </div>
        <button className='border flex mt-2' type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CreateProduct