import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';

import { BINANCE_TESTNET } from '../constants/market-api.constants';
import { NETWORK_ERROR_MESSAGES } from '../constants/user-feedback.constants';
import { Binance24hTickerDto } from '../models/binance-24h-ticker.model';
import { MarketTickerRow } from '../models/market-ticker-row.model';

@Injectable({ providedIn: 'root' })
export class MarketDataService {
  private readonly http = inject(HttpClient);

  getTickerSnapshot(): Observable<MarketTickerRow[]> {
    const url = `${BINANCE_TESTNET.BASE_URL}${BINANCE_TESTNET.TICKER_24H_PATH}`;
    const requests = BINANCE_TESTNET.SNAPSHOT_SYMBOLS.map((symbol) =>
      this.http.get<Binance24hTickerDto>(url, { params: { symbol } }),
    );
    return forkJoin(requests).pipe(
      map((rows) => rows.map((dto, index) => this.toRow(dto, index + 1))),
      catchError((error: unknown) => {
        const message = this.toUserMessage(error);
        return throwError(() => new Error(message));
      }),
    );
  }

  private toRow(dto: Binance24hTickerDto, rank: number): MarketTickerRow {
    return {
      rank,
      symbol: dto.symbol,
      lastPrice: this.parseNum(dto.lastPrice),
      changePct24h: this.parseNum(dto.priceChangePercent),
    };
  }

  private parseNum(raw: string): number | null {
    const n = Number.parseFloat(raw);
    return Number.isFinite(n) ? n : null;
  }

  private toUserMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return NETWORK_ERROR_MESSAGES.NO_CONNECTION;
      }
      return NETWORK_ERROR_MESSAGES.SERVER_UNAVAILABLE;
    }
    return NETWORK_ERROR_MESSAGES.UNKNOWN;
  }
}
