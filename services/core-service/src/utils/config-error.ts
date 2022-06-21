interface ErrorConfig {
  message: string;
  data?: Record<string, unknown>;
}

export class ConfigError extends Error {
  data: ErrorConfig['data'];

  constructor({ message, data = {} }: ErrorConfig) {
    super(`Missing config: ${message}`);
    this.data = data;
  }
}
