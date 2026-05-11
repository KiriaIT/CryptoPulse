export type NotificationVariant = 'info' | 'success' | 'warning' | 'error';

export abstract class NotifierService {
  abstract info(message: string): void;
  abstract success(message: string): void;
  abstract warning(message: string): void;
  abstract error(message: string): void;
}
