import { AxiosResponse } from 'axios';
import { ApiData } from 'ip-locator-shared';
import { createBaseApi } from './base-api';

const createApi = (baseUrl: string) => {
  const coreServiceApi = createBaseApi(baseUrl);

  return {
    geoip2: {
      async getAddressByIp(ip: string) {
        type Response = AxiosResponse<ApiData.AddressDetails>;

        const response = await coreServiceApi.get<Response>(
          '/geoip2lite/find-address',
          {
            params: { ip },
          },
        );

        if (response.status !== 200) throw new Error(response.statusText);

        const { data } = response;

        return data;
      },
    },
  };
};

export const coreServiceApi = createApi('http://localhost:3838');
