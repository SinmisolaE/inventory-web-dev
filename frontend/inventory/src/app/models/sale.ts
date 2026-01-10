export interface Sale {
  _id: string;
  product: {
    _id: string;
    name: string;
    model: string;
  };
  user: {
    _id: string;
    username: string;
  };
  quantity: number;
  unitSellPrice: number;
  totalSaleAmount: number;
  customer: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  contact?: string;
}
