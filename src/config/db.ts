import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize(
  'postgres',
  'postgres.djsahykbynicfoocbziw',
  'D7PKywphIrKE2zNi',
  {
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // required for Supabase
      },
    },
    logging: false,
  }
);

export const connectToDatabase = async () => {
  try {
    // console.log(process.env.DB_USER,);
    await sequelize.authenticate();
    console.log('✅ Database connection established.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;
