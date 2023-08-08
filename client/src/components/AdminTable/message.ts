export interface IMessage {
  title: string;
  create: string;
  listOf: string;
}

export const solutions: IMessage = {
  title: 'Продуктовые решения',
  create: 'продуктовое решение',
  listOf: 'продуктовых решений',
};

export const industry: IMessage = {
  title: 'Индустрии',
  create: 'индустрию',
  listOf: 'индустрий',
};

export const goods: IMessage = {
  title: 'Товары',
  create: 'товар',
  listOf: 'товаров',
};

export const area: IMessage = {
  title: 'Области применения',
  create: 'область применения',
  listOf: 'областей применения',
};

export const subindustry: IMessage = {
  title: 'Подиндустрии',
  create: 'подиндустрию',
  listOf: 'подиндустрий',
};
