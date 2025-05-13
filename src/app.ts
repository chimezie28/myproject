import express from 'express';
import userRoutes from './routes/user.routes';

const app = express();

// Define the root route to send plain text
app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('Welcome to the Insemi App!');
  });

app.use(express.json());
app.use('/api/users', userRoutes); 

export default app;
