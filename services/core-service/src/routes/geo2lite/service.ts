import Geo2LiteRepo from './repo';

export default class Geo2LiteService {
  constructor(private readonly geo2LiteRepo: Geo2LiteRepo) {}

  async findAddressByIp(ip: string) {
    return this.geo2LiteRepo.findAddressByIp(ip);
  }
}

export enum Geo2LiteServiceError {}
