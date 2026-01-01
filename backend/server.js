import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './productRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes);
app.use((req, res, next) => { 
    console.log(`${req.method} request received at ${req.url}`);
    next();
})
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send("Hello World!");
    console.log("Backend working!")
});

app.listen(process.env.PORT, () => {
    console.log("Server is running at http://localhost:" + process.env.PORT);
});
