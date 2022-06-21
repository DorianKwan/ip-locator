interface ServiceErrorConfig {
  message: string;
  type: string;
  data?: Record<string, unknown>;
}

export class ServiceError extends Error {
  type: ServiceErrorConfig['type'];

  data: ServiceErrorConfig['data'];

  constructor({ message, type, data = {} }: ServiceErrorConfig) {
    super(message);
    this.type = type;
    this.data = data;
  }
}
