import * as dotenv from 'dotenv';
import path from 'path';
import { ConfigError } from './config-error';

dotenv.config({ path: path.join(__dirname, '../../../..', '.env') });

// in prod I'd use another config loader like app-config (which is typed and has encrypted secrets but I didn't eject CRA)
export const loadConfig = () => {
  const {
    NODE_ENV,
    REACT_APP_WEB_SERVER_PORT = 9001,
    REACT_APP_URL: reactAppUrl,
  } = process.env;

  if (!reactAppUrl) {
    throw new ConfigError({
      message: 'No react app url was found.',
      data: { reactAppUrl },
    });
  }

  const isProduction = NODE_ENV === 'production';
  const port = Number(REACT_APP_WEB_SERVER_PORT);

  return {
    isProduction,
    port,
    reactAppUrl,
  };
};
