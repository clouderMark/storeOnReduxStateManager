interface IId {
  id: number;
}

export interface ICustomError {
  data: {
    message: string;
  };
  status: number;
}

interface IItem extends IId {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IBasket extends IId {
  products: IItem[] | [];
}
