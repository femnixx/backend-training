import { supabase } from '../db.js'; 
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {ObjectId} from 'mongodb';
import 'dotenv/config';
import { authMiddleware } from '../authMiddleware.js';
const userRoutes = express.Router();

userRoutes.get('/users', async (req, res) => { 
    
});

userRoutes.get('/users/me', authMiddleware, async (req, res) => { 
    
});


userRoutes.get('/users/:id', async (req, res) => { 
  
});


userRoutes.post('/sign-up', async (req, res) => {
    
});

userRoutes.post('/sign-in', async (req, res) => { 
   
});


export default userRoutes;