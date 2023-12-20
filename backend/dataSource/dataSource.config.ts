import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'promo_db',
  port: 5432,
  username: 'promo_admin',
  password: 'NijO9faBZgKjRvA',
  database: 'promo_db',
  synchronize: false,
  entities: [join(__dirname, '..', '/**/*.entity{.ts,.js}')],
  migrations: [
    join(
      __dirname,
      '..',
      process.env.TYPEORM_MODE === 'seed'
        ? '/seeds/**/*{.ts,.js}'
        : '/migrations/**/*{.ts,.js}',
    ),
  ],
};

export default config;
