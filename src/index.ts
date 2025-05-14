import app from "./app";
import { connectToDatabase } from './config/db';
import associateModels from './config/associate';
// import dotenv from 'dotenv';
// dotenv.config();
// import { PORT } from "./config/env";
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

(async () => {
  await connectToDatabase();
  associateModels();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})();
