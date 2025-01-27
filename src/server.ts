import express from 'express';
import dotenv from 'dotenv';
import routes from '../src/routes';
import globalErrorHandler from './errors/error-handler';
const PORT = process.env.PORT || 3002;
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/v1', routes);
app.use(globalErrorHandler); 


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));