import app from "./app";
import dotenv from 'dotenv';
dotenv.config();
// import { PORT } from "./config/env";
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
