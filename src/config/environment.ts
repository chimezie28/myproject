import path from 'path';
import dotenv from 'dotenv';

export default function configureEnvironment() {
  const NODE_ENV = process.env.NODE_ENV;

  if (NODE_ENV) {
    const envPath = path.join(__dirname, '..', `.env.${NODE_ENV}`);
    dotenv.config({ path: envPath });
  } else {
    console.error("NODE_ENV is not set!");
  }
}
