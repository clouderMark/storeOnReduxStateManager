interface IId {
  id: number;
}

export interface IIdAndName extends IId {
  name: string;
}

interface IIdNameImage extends IIdAndName {
  image: string;
}

export interface ICustomError {
  data: {
    message: string;
  };
  status: number;
}

export interface IItem extends IIdNameImage {
  price: number;
  quantity: number;
}

export interface IBasket extends IId {
  products: IItem[] | [];
}

export interface IListItem extends IId {
  value: string;
}

export interface IInfo extends IId {
  image: string;
  listTitle: string;
  title: string;
  header: string;
  listItems: IListItem[];
  paragraphs: IListItem[];
}

interface IOpinion extends IIdNameImage {
  title: string;
  email: string;
  fax: string;
  listTitle: string;
  phone: string;
  listItems: IListItem[];
  paragraphs: IListItem[];
}

export interface IAreaResponse extends IIdAndName {
  cardImage: string;
  headerImage: string;
  title: string;
  paragraphs: IListItem[];
  industryId?: number;
  info: IInfo;
  opinion: IOpinion;
  sliderImage?: string;
}

export interface IProperty extends IIdAndName {
  productId: number;
  value: string;
}

export interface IProductWithProps extends IProduct {
  solution: IIdAndName;
  industry: IIdAndName;
  area: IIdAndName;
  props: IProperty[];
}

export interface IProduct extends IIdAndName {
  solutionId: number;
  industryId: number;
  areaId: number;
  image: string | null;
  price: number;
  rating: number;
  article: number;
  weight: number;
}

export interface IObject {
  [key: string]: string;
}

export interface IAllProducts {
  count: number;
  rows: IProductWithProps[];
}

export interface IData<T> {
  data: T;
}

interface IIdName extends IId {
  name: string;
}

export interface INavigation {
  industries: IIdName[];
  subIndustries: IIdName[];
  solutions: IIdName[];
}
