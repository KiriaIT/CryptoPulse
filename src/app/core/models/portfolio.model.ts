/**
 * TODO(OgOqro) — შეავსე ველები PortfolioHolding-ისთვის.
 *
 * დახედე pictures/05-portfolio-holdings.png — ცხრილში ასეთი სვეტებია:
 *   Asset (symbol + name), Holdings (რაოდენობა), Price, Value, 24h (%)
 *
 * ველების სახელები უნდა ემთხვეოდეს PortfolioPageComponent-ში გამოყენებულ სახელებს:
 *   symbol, name, amount, price, value, changePct24h
 */
export interface PortfolioHolding {
  symbol: string;        // TODO(OgOqro): keep this and fill in the rest
  name: string;          // TODO(OgOqro): e.g. 'Bitcoin'
  amount: number;        // TODO(OgOqro): how many coins
  price: number;         // TODO(OgOqro): price per coin
  value: number;         // TODO(OgOqro): amount * price
  changePct24h: number;  // TODO(OgOqro): 24h % change, can be negative
}
