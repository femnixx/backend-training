import 'dotenv/config';
import express from 'express';
import { supabase } from './db.js';
const productRoutes = express.Router();

productRoutes.post('/post-product', async (req, res) => { 

    console.log("Data received from frontend:", req.body);

    const { 
      productName,
      productType,
      productDescription,
      price,
      stock,
      userId 
    } = req.body;

    if (!userId || !productName) {
        return res.status(400).json({ message: "Missing required fields: userId or productName" });
    }

    const { data, error: productError } = await supabase
        .from('products')
        .insert({ 
            uuid: userId,
            name: productName,
            description: productDescription,
            price: parseFloat(price),
            stock_quantity: parseInt(stock),
            type: productType
        })
        .select(); 
    

    if (productError) {
        console.error("Supabase Database Error:", productError.message);
        return res.status(400).json({ message: productError.message });
    }
    const { data: selectProduct, error: errorSelectProduct } = await supabase
    .from('users')
    .select('products')
    .eq('id', userId)
    .single();

    if (errorSelectProduct) return res.status(400).json({ message: "No user found" });
    
    const incrementProduct = parseInt(selectProduct.products || 0) + 1; 
    const { data: updateProduct, error: errorProduct } = await supabase
    .from('users')
    .update({ products: incrementProduct})
    .eq('id', userId)
    .select();
    if (errorProduct) return res.status(400).json({ message: `Failed to update product for user: ${userId}`});
    
    console.log("Inserted Row:", data);
    return res.status(200).json({ 
        message: `Successfully posted with data`,
        data: data[0],
        productUpdatedMessage: `Product count is now ${incrementProduct}`
    });
});



export default productRoutes;