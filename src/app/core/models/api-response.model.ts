export interface ApiResponse<T> {
  readonly data: T;
  readonly success: boolean;
  readonly message?: string;
}

export interface ApiError {
  readonly status: number;
  readonly message: string;
  readonly details?: Readonly<Record<string, unknown>>;
}

export interface Paginated<T> {
  readonly items: ReadonlyArray<T>;
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
}
