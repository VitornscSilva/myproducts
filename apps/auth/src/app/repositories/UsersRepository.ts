import { ObjectId } from 'mongodb';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

import { connectToDatabase } from '../../database';

class UsersRepository {
  async findAll() {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const cursor = collection.find();
    const rows = await cursor.toArray();
    return rows;
  }

  async findById(id: string) {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const query = { _id: new ObjectId(id) };
    const row = await collection.findOne(query);
    return row;
  }

  async findByEmail(email: string) {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const query = { email };
    const row = await collection.findOne(query);
    return row;
  }

  async delete(id: string) {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const query = { _id: new ObjectId(id) };
    await collection.deleteOne(query);
  }

  async create({
    name, email, password
  }: ICreateUserDTO) {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const document = {
      name,
      email,
      password,
    };
    const result = await collection.insertOne(document);
    return result;
  }

  async update(id: string, {
    name, email, password,
  }: IUpdateUserDTO) {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const filter = { _id: new ObjectId(id) };
    const update = {
      $set: {
        name,
        email,
        password,
      },
    };
    const result = await collection.updateOne(filter, update);
    return result;
  }
}

export default new UsersRepository();
