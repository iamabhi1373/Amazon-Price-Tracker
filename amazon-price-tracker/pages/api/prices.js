import { MongoClient } from "mongodb";

const url = 'mongodb://localhost:27017';
const dbName = 'amazon2';

export default async function handler(req, res) {
  const { priceInt } = req.query; // Extract priceInt from query parameters
  const client = new MongoClient(url);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('prices');
    const findResult = await collection.find({ priceInt: parseInt(priceInt) }).toArray(); // Convert priceInt to integer and use it in the query
    res.status(200).json(findResult);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
}
