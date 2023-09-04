import { ObjectId } from 'mongodb';

import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IUpdateProductDTO from '../dtos/IUpdateProductDTO';

import { connectToDatabase } from '../../database';

class ProductsRepository {
  async findAll() {
    const db = await connectToDatabase();
    const collection = db.collection('products');
    const cursor = collection.find();
    const rows = await cursor.toArray();
    return rows;
  }

  async findById(id: string) {
    const db = await connectToDatabase();
    const collection = db.collection('products');
    const query = { _id: new ObjectId(id) };
    const row = await collection.findOne(query);
    return row;
  }

  async delete(id: string) {
    const db = await connectToDatabase();
    const collection = db.collection('products');
    const query = { _id: new ObjectId(id) };
    await collection.deleteOne(query);
  }

  async create({
    name, description, price, created_by,
  }: ICreateProductDTO) {
    const db = await connectToDatabase();
    const collection = db.collection('products');
    const document = {
      name,
      description,
      price,
      created_by,
      created_at: new Date(),
    };
    const result = await collection.insertOne(document);
    return result;
  }

  async update(id: string, {
    name, description, price, updated_by,
  }: IUpdateProductDTO) {
    const db = await connectToDatabase();
    const collection = db.collection('products');
    const filter = { _id: new ObjectId(id) };
    const update = {
      $set: {
        name,
        description,
        price,
        updated_by,
        updated_at: new Date(),
      },
    };
    const result = await collection.updateOne(filter, update);
    return result;
  }
}

export default new ProductsRepository();
