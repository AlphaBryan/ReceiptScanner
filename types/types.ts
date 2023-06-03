type market = {
  name: string;
  address: string;
  city: string;
  phone : string;
}
type client = {
  type : string;
  numberClient : string;
  paymentMethod : string;
}
type product = {
  name: string;
  price: number;
  quantity: number;
}
type ticket = {
  market: market;
  client: client;
  products: product[];
  totals: {
    total: number;
    tax: number;
    subTotal : number;
  };
};
