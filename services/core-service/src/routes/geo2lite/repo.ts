import { getLogger } from '../../utils';

export default class Geo2LiteRepo {
  constructor(private readonly apiKey: string) {}

  async findAddressByIp(ip: string) {
    const logger = getLogger();
    (logger || console).info(ip);
    return 'street address';
  }
}
