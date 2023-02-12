type market = {
  name: string;
  address: string;
  city: string;
  phone : string;
}
type client = {
  type : string;
  numberClient : string;
}
type product = {
  name: string;
  price: number;
  quantity: number;
}
type ticket = {
  market: market;
  client: client;
  Products: product[];
  total: number;
};
