"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize('postgres', 'postgres.djsahykbynicfoocbziw', 'D7PKywphIrKE2zNi', {
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
});
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(process.env.DB_USER,);
        yield sequelize.authenticate();
        console.log('✅ Database connection established.');
    }
    catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1);
    }
});
exports.connectToDatabase = connectToDatabase;
exports.default = sequelize;
