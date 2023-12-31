import 'dotenv/config';

import app from './app';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
