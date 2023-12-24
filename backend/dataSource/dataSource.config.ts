import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const { DB_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

const config: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST || POSTGRES_DB,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  entities: [join(__dirname, '..', '/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '..', '/migrations/**/*{.ts,.js}')],
};

export default config;
