import { Request, Response } from 'express';
import axios from 'axios';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

class AuthController {
  async index(req: Request, res: Response) {
    try {
      const response = await axios.get(`${AUTH_SERVICE_URL}/auth`);
      res.json(response.data);
    } catch (error: any) {
      res.status(error.response.status || 500).json({ message: error.response.data.message || 'Internal Server Error' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await axios.get(`${AUTH_SERVICE_URL}/auth/${id}`);
      res.json(response.data);
    } catch (error: any) {
      res.status(error.response.status || 500).json({ message: error.response.data.message || 'Internal Server Error' });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const response = await axios.post(`${AUTH_SERVICE_URL}/auth/register`, { ...req.body });
      res.json(response.data);
    } catch (error: any) {
      res.status(error.response.status || 500).json({ message: error.response.data.message || 'Internal Server Error' });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const response = await axios.post(`${AUTH_SERVICE_URL}/auth/signin`, { ...req.body });
      res.json(response.data);
    } catch (error: any) {
      res.status(error.response.status || 500).json({ message: error.response.data.message || 'Internal Server Error' });
    }
  }
}

export default new AuthController();