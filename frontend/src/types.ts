export interface Trade {
  id: number;
  symbol: string;
  profit: number;
  volume: number;
  price: number;
  trade_type: string;
  time: string;
}