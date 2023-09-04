import { MongoClient, Db } from 'mongodb';

const url = process.env.MONGO_URL || '';
const dbName = process.env.AUTH_DB_NAME;

let db: Db;

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
