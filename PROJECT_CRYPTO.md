<!-- # Crypto project — API (course)

Locked stack for **CryptoTrade / Crypto Pulse** style projects:

| Item | Value |
|------|--------|
| **Environment** | [Binance Spot **Testnet**](https://testnet.binance.vision/) |
| **Base URL** | `https://testnet.binance.vision` |
| **HTTP (Sprint 1+)** | Public market data — no API key for read-only REST calls used in the UI. |
| **Primary read endpoint (dashboard snapshot)** | `GET /api/v3/ticker/24hr?symbol={SYMBOL}` (one row per request; app composes a small fixed symbol set). |

Official reference: [Binance Spot API — market data](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints).

> Trading, signed requests, and websockets use **API key / secret** from the testnet dashboard; keep keys out of the repo and inject them later via `InjectionToken` + environment. -->
