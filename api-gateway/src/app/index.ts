import express from 'express';
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../swagger.json';

import cors from './middlewares/cors'
import routes from '../routes/index.routes';

const app = express();

app.use(express.json());
app.use(cors);
app.use('/api', routes);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


export default app;
