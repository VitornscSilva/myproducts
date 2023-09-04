import { Request, Response } from 'express';
import axios from 'axios';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const PRODUCTS_SERVICE_URL = process.env.PRODUCTS_SERVICE_URL;

class HealthController {
  async index(req: Request, res: Response) {
    try {
      const authServiceStatus = await axios.get(`${AUTH_SERVICE_URL}/health`);
      const productServiceStatus = await axios.get(`${PRODUCTS_SERVICE_URL}/health`);
  
      if (authServiceStatus.status === 200 && productServiceStatus.status === 200) {
        res.status(200).json({ status: 'up' });
      } else {
        res.status(500).json({ status: 'down' });
      }
    } catch (error) {
      res.status(500).json({ status: 'down' });
    }
  }
}

export default new HealthController();