import express from 'express';
import configureEnvironment from './config/environment';
import userRoutes from './routes/user.routes';
configureEnvironment();
const app = express();

// Define the root route to send plain text
app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('Welcome to the Insemi App!');
  });

app.use(express.json());
app.use('/api/users', userRoutes); 

export default app;
