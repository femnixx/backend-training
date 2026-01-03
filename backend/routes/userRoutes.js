import { supabase } from '../db.js'; 
import express from 'express';
import 'dotenv/config';
const userRoutes = express.Router();

userRoutes.get('/users', async (req, res) => { 
    
});

userRoutes.get('/users/:id', async (req, res) => { 
  
});

userRoutes.post('/sign-up', async (req, res) => {
   try { 
    const { username, email, password } = req.body;

    const { data: authData, error: authError } = await supabase.auth.signUp({ 
        email: email,
        password: password,
        options: { 
            data: { 
                display_name: username
            }
        }
    });
    if (authError) return res.status(400).json({ authError });
    if (authData.user) { 
        const { error: dbError } = await supabase
        .from('users')
        .insert({ 
            id: authData.user.id,
            email: email,
            username: authData.user.user_metadata.display_name
        });
        if (dbError) return res.status(400).json({ error: dbError.message });
    }
    console.log(`User created successfully`);
    return res.status(200).json({ 
            message: "Account and profile created!",
            user: authData.user
        });
   } catch (e) { 
    console.error(e);
    res.status(500).json(`Internal Server Error: ${e.message}`);
   }
});

userRoutes.post('/sign-in', async (req, res) => { 
   try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) return res.status(401).json({ message: error.message });

    console.log("Login succesful for user:", data.user?.id);

    return res.status(200).json({ message: "Sign in worked successfully", userId: data.user.id, session: data.session });
   } catch (e) { 
        console.error(`Server error: ${e}`)
        res.status(500).json({ message: "Internal Service Error: ", e });
   }
});


export default userRoutes;