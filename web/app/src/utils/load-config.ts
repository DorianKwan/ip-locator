import * as dotenv from 'dotenv';

dotenv.config({ path: './.env' });

// in prod I'd use another config loader like app-config (which is typed and has encrypted secrets but I didn't eject CRA)
export const loadConfig = () => {
  const {
    NODE_ENV,
    REACT_APP_WEB_SERVER_PORT = 9001,
    REACT_APP_WEB_SERVER_URL = 'localhost',
  } = process.env;

  const isProduction = NODE_ENV === 'production';
  const webServerPort = Number(REACT_APP_WEB_SERVER_PORT);

  return {
    isProduction,
    webServerPort,
    webServerUrl: REACT_APP_WEB_SERVER_URL,
  };
};
