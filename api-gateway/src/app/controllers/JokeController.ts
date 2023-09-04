import { Request, Response } from 'express';
import axios from 'axios';

class AuthController {
  async show(request: Request, res: Response) {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      res.status(200).json({ value: response.data.value });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new AuthController();