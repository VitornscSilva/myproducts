import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { hash, compare } from "bcryptjs";

import isValidObjectId from '../utils/isValidObjectId';
import UsersRepository from '../repositories/UsersRepository';
import auth from '../config/auth';

class AuthController {
  async index(request: Request, response: Response) {
    const products = await UsersRepository.findAll();

    response.json(products);
  }

  async show(request: Request, response: Response) {
      const { id } = request.params;
      if(!isValidObjectId(id)) {
        return response.status(404).json({ message: 'Invalid Id format' });
      }

      const user = await UsersRepository.findById(id);
      if(!user) {
        return response.status(404).json({ message: 'User not found' });
      }

      response.json(user);
  }

  async store(request: Request, response: Response) {
    const {
      name, email, password
    } = request.body;
    if (!name || !email || !password) {
      return response.status(400).json({ message: 'All fields are required' });
    }
    const checkUserExists = await UsersRepository.findByEmail(email);
    if(checkUserExists) {
      return response.status(400).json({ message: 'This e-mail is already in use' }); 
    }

    const passwordHash = await hash(password, 8);

    const user = await UsersRepository.create({
      name, 
      email, 
      password: passwordHash,
    });

    response.status(201).json(user);
  }

  async signIn(request: Request, response: Response) {
    const {
      email, password,
    } = request.body;

    const user = await UsersRepository.findByEmail(email);

    if(!user) {
      return response.status(401).json({ message: 'Incorrect email/password combination.' });
    }

    const passwordMatched = await compare(
      password,
      user.password,
    );

    if (!passwordMatched) {
      return response.status(401).json({ message: 'Incorrect email/password combination.' });
    }

    const jwt = sign({ id: user._id }, auth.jwt.secret)

    response.json({ email, jwt  })
  }
}

export default new AuthController();