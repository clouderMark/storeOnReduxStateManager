export interface ICell {
  field: string;
  value: string;
}

enum ECell {
  Edit = 'Редактировать',
  Delete = 'Удалить',
  Name = 'Название',
  Price = 'Цена',
}

export const buttonText = {
  edit: ECell.Edit,
  delete: ECell.Delete,
};

export const areaCells: ICell[] = [
  {
    field: 'name',
    value: ECell.Name,
  },
  {
    field: 'edit',
    value: ECell.Edit,
  },
  {
    field: 'delte',
    value: ECell.Delete,
  },
];

export const productsCells: ICell[] = [
  {
    field: 'name',
    value: ECell.Name,
  },
  {
    field: 'industry',
    value: 'Индустрии',
  },
  {
    field: 'solution',
    value: 'Решение',
  },
  {
    field: 'area',
    value: 'Область',
  },
  {
    field: 'article',
    value: 'Артикл',
  },
  {
    field: 'weight',
    value: 'Масса',
  },
  {
    field: 'price',
    value: ECell.Price,
  },
  {
    field: 'edit',
    value: ECell.Edit,
  },
  {
    field: 'delte',
    value: ECell.Delete,
  },
];

export const orderCells: ICell[] = [
  {
    field: 'name',
    value: ECell.Name,
  },
  {
    field: 'price',
    value: ECell.Price,
  },
  {
    field: 'amount',
    value: 'Кол-во',
  },
  {
    field: 'sum',
    value: 'Сумма',
  },
];

export const adminMessagesCells = [
  {
    field: '№',
    value: '№',
  },
  {
    field: 'company',
    value: 'Компания',
  },
  {
    field: 'name',
    value: 'Имя',
  },
  {
    field: 'email',
    value: 'Email',
  },
  {
    field: 'phone',
    value: 'Телефон',
  },
  {
    field: 'question',
    value: 'Вопрос',
  },
  {
    field: 'type',
    value: 'Тип обращения',
  },
  {
    field: 'details',
    value: 'Подробнее',
  },
  {
    field: 'delete',
    value: ECell.Delete,
  },
];

export const adminSubscriptionCells = [
  {
    field: '№',
    value: '№',
  },
  {
    field: 'subscribed',
    value: 'Подписавшиеся',
  },
  {
    field: 'date',
    value: 'Дата подписки',
  },
  {
    field: 'delete',
    value: ECell.Delete,
  },
];

export const areaRelatedCells: ICell[] = [
  {
    field: 'name',
    value: ECell.Name,
  },
  {
    field: 'related',
    value: 'относящаяся к',
  },
  {
    field: 'edit',
    value: ECell.Edit,
  },
  {
    field: 'delte',
    value: ECell.Delete,
  },
];
