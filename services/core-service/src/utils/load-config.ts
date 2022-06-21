import * as dotenv from 'dotenv';
import path from 'path';
import { ConfigError } from './config-error';

dotenv.config({ path: path.join(__dirname, '../../../..', '.env') });

// in prod I'd use another config loader like app-config (which is typed and has encrypted secrets but I didn't eject CRA)
export const loadConfig = () => {
  const {
    NODE_ENV,
    WEB_SERVER_PORT = 9001,
    GEO2LITE_API_KEY: apiKey,
    GEO2LITE_API_ACCOUNT_ID: apiAccountId,
    REACT_APP_URL: reactAppUrl,
  } = process.env;

  if (!apiKey) {
    throw new ConfigError({
      message: 'No Geo2Lite api key was found.',
      data: { apiKey },
    });
  }

  if (!apiAccountId) {
    throw new ConfigError({
      message: 'No Geo2Lite api accont id was found.',
      data: { apiAccountId },
    });
  }

  if (!reactAppUrl) {
    throw new ConfigError({
      message: 'No react app url was found.',
      data: { reactAppUrl },
    });
  }

  const isProduction = NODE_ENV === 'production';
  const port = Number(WEB_SERVER_PORT);

  return {
    isProduction,
    port,
    apiKey,
    reactAppUrl,
    apiAccountId,
  };
};
