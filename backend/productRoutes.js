import 'dotenv/config';
import { connectDB } from "./db.js";
import { authMiddleware } from "./authMiddleware.js";
import { ObjectId } from "mongodb";
import express from 'express';

const productRoutes = express.Router();

productRoutes.post('/post-products', authMiddleware, async (req, res) => { 
    const db = await connectDB();

    try { 
        const { productName, productType, productDescription, price } = req.body;
        const user = await db.collection("users").findOne(
            {_id: new ObjectId(req.user.id)},
            {projection: { _id: 1 }}

        );

        if (!user) return res.status(401).json({ message: "Unauthorized: token expired or invalid" });

        const postProduct = await db.collection("products").insertOne({ 
            productName: productName,
            productType: productType,
            productDescription: productDescription,
            price: price,
            owner: user._id
        })
        if (!postProduct) return res.status(400).json({ message: "Something went wrong" });
        res.status(200).json({ message: `Successfully posted product: ${postProduct.productName} with ID: ${postProduct.owner}` });
        console.log("Successfully posted product");
    } catch (e) { 
        console.error(e);
        res.status(500).json({ message: "500 Internal Service Error"});
    }
});

export default productRoutes;