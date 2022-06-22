import { AxiosResponse } from 'axios';
import { ApiData } from 'ip-locator-shared';
import { createBaseApi } from './base-api';

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

export const coreServiceApi = createApi('http://localhost:3838');
