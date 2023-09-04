import { Request, Response } from 'express';
import isValidObjectId from '../utils/isValidObjectId';
import ProductsRepository from '../repositories/ProductsRepository';

class ProductController {
  async index(request: Request, response: Response) {
    const products = await ProductsRepository.findAll();

    response.json(products);
  }

  async show(request: Request, response: Response) {
      const { id } = request.params;
      if(!isValidObjectId(id)) {
        return response.status(404).json({ message: 'Invalid Id format' });
      }

      const product = await ProductsRepository.findById(id);
      if(!product) {
        return response.status(404).json({ message: 'Product not found' });
      }

      response.json(product);
  }

  async store(request: Request, response: Response) {
    const {
      name, description, price, user_id,
    } = request.body;
    if (!name || !description || !price || !user_id) {
      return response.status(400).json({ message: 'All fields are required' });
    }
    const product = await ProductsRepository.create({
      name, description, price, created_by: user_id,
    });

    response.status(201).json(product);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const {
      name, description, price, user_id,
    } = request.body;

    if(!isValidObjectId(id)) {
      return response.status(404).json({ message: 'Invalid Id format' });
    }

    const productExists = await ProductsRepository.findById(id);
    if (!productExists) {
      return response.status(404).json({ message: 'Product not found' });
    }

    const product = await ProductsRepository.update(id, {
      name,
      description,
      price,
      updated_by: user_id,
    });

    response.json(product);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await ProductsRepository.delete(id);
    response.sendStatus(204);
  }
}

export default new ProductController();