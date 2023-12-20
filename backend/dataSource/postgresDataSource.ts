import { DataSource } from 'typeorm';
import dataSourceConfig from './dataSource.config';

const PostgresDataSource = new DataSource(dataSourceConfig);

PostgresDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default PostgresDataSource;
