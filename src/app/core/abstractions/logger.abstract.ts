export abstract class LoggerService {
  abstract info(message: string, context?: unknown): void;
  abstract warn(message: string, context?: unknown): void;
  abstract error(message: string, error?: unknown): void;
}
