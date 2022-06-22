import { AxiosResponse } from 'axios';
import { ApiData } from 'ip-locator-shared';
import { loadConfig } from 'src/utils/load-config';
import { createBaseApi } from './base-api';

const { webServerUrl, webServerPort } = loadConfig();
interface ApiResponse<T> {
  data: T;
  success: boolean;
}

const createApi = (baseUrl: string) => {
  const coreServiceApi = createBaseApi(baseUrl);

  return {
    geoip2: {
      async getAddressByIp(ip: string) {
        type Response = AxiosResponse<ApiResponse<ApiData.AddressDetails>>;

        const response = await coreServiceApi.get<Response>(
          '/geoip2lite/find-address',
          {
            params: { ip },
          },
        );

        if (response.status !== 200) throw new Error(response.statusText);

        const { data } = response.data;

        return data;
      },
    },
  };
};

export const coreServiceApi = createApi(
  `http://${webServerUrl}:${webServerPort}`,
);
