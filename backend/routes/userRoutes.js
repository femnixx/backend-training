import { connectDB } from '../db.js';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {ObjectId} from 'mongodb';
import 'dotenv/config';
import { authMiddleware } from '../authMiddleware.js';
const userRoutes = express.Router();

userRoutes.get('/users', async (req, res) => { 
    const db = await connectDB();

    try { 
        const users = await db.collection('users').find({ projection: { password: 0 } }).toArray();
        res.status(200).json(users);
    } catch (e) { 
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });  
    }
});

userRoutes.get('/users/me', authMiddleware, async (req, res) => { 
    const db = await connectDB();
    try { 
        // Use projection to only fetch 'username' and exclude '_id' and 'password'
        const profile = await db.collection('users').findOne(
            { _id: new ObjectId(req.user.id) },
            { projection: { username: 1, _id: 0 } } 
        );
        
        if (!profile) return res.status(401).json({ message: "User not found" });

        // Send just the username
        res.status(200).json({ username: profile.username });
    } catch (e) { 
        res.status(500).json({ message: "Server error" });
    }
});


userRoutes.get('/users/:id', async (req, res) => { 
    const db = await connectDB();

    try { 
        const userId = req.params.id;
        const user = await db.collection('users').findOne({ 
            _id: new ObjectId(userId)
        });
        
        if (!user) { 
            return res.status(404).json({message: "User not found"});  
        }
        const { password, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);  
    } catch (e) { 
        console.error(e);
        res.status(500).json({message: "Internal Server Error or invalid ID format"});
    }   
});


userRoutes.post('/sign-up', async (req, res) => {
    const db = await connectDB();

    try { 
        const data = req.body;

        const existingUser = await db.collection('users').findOne({ email: data.email });
        if (existingUser) { 
            return res.status(409).json({message: "User already exists with this email"});
        }
        if (length(data.password) < 8) { 
            console.log("Password should be equal to or more than 8 characters in length.");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const doc = { 
            username: data.username,
            email: data.email,
            password: hashedPassword
        };
        await db.collection('users').insertOne(doc);
        res.status(201).json({message: "User created"});
    } catch (e) { 
        console.error(e);
        res.status(500).json({message: "Internal Server Error"});
    }
});

userRoutes.post('/sign-in', async (req, res) => { 
    const db = await connectDB();
    
    try { 
        const { email, password } = req.body;

        const existingUser = await db.collection('users').findOne({ email  });

        if (!existingUser) {
            return res.status(401).json({ message: "Invalid email or password"});
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password"});
        }
        const token = jwt.sign(
            { id: existingUser._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (e) { 
        console.error(e);
        res.status(500).json({ message: "Internal Server Error"});
    }
});


export default userRoutes;