import mongodb, { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);
let db;

export async function connectDB() {
     try { 
          await client.connect();
          console.log("Connected to MongoDB");    
          db = client.db('training');
          return db;          
     } catch (e) { 
          console.error(e);
          process.exit(1);
     } 
}

export { db };