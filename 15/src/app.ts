import express, { Application } from 'express';
import bodyParser from 'body-parser';
import emailRoutes from './routes/emailRoutes';

const app: Application = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use('/api', emailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
