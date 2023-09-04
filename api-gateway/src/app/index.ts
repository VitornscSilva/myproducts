import express from 'express';

import cors from './middlewares/cors'
import routes from '../routes/index.routes';

const app = express();

app.use(express.json());
app.use(cors);
app.use('/api', routes);

export default app;
