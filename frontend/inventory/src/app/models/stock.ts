export interface Stock {
  _id: string;
  code: string;
  name: string;
  model: string;
  initialAmount: number;
  currentAmount: number;
  unitCostPrice: number;
  unitSellPrice: number;
  source: string;
  stocker: {
    _id: string;
    username: string;
    role: string;
  };
}

export interface StockResponse {
  success: boolean;
  data: Stock[];
}
