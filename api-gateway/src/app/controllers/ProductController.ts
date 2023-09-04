import { Request, Response } from 'express';
import axios from 'axios';

const PRODUCTS_SERVICE_URL = process.env.PRODUCTS_SERVICE_URL;

class ProductController {
  async index(req: Request, res: Response) {
    try {
      const response = await axios.get(`${PRODUCTS_SERVICE_URL}/products`);
      res.json(response.data);
    } catch (error: any) {
      res.status(error.response.status || 500).json({ message: error.response.data.message || 'Internal Server Error' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await axios.get(`${PRODUCTS_SERVICE_URL}/products/${id}`);
      res.json(response.data);
    } catch (error: any) {
      res.status(error.response.status || 500).json({ message: error.response.data.message || 'Internal Server Error' });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const response = await axios.post(`${PRODUCTS_SERVICE_URL}/products`, { ...req.body });
      res.status(201).json(response.data);
    } catch (error: any) {
      res.status(error.response.status || 500).json({ message: error.response.data.message || 'Internal Server Error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await axios.put(`${PRODUCTS_SERVICE_URL}/products/${id}`, { ...req.body });
      res.status(201).json(response.data);
    } catch (error: any) {
      res.status(error.response.status || 500).json({ message: error.response.data.message || 'Internal Server Error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await axios.delete(`PRODUCTS_SERVICE_URL/products/${id}`);
      res.sendStatus(204);
    } catch (error: any) {
      res.status(error.response.status || 500).json({ message: error.response.data.message || 'Internal Server Error' });
    }
  }
}

export default new ProductController();