import {EType} from './EType';
import {IInitialState} from './IInitialState';

export const initialState: IInitialState = {
  [EType.id]: null,

  [EType.name]: '',
  [EType.valid]: null,

  [EType.cardImage]: null,
  [EType.cardImageUrl]: '',

  [EType.sliderImage]: null,
  [EType.sliderImageUrl]: '',

  [EType.headerImage]: null,
  [EType.headerImageUrl]: '',

  [EType.title]: '',
  [EType.paragraphs]: [],

  [EType.infoImage]: null,
  [EType.infoImageUrl]: '',
  [EType.infoTitle]: '',
  [EType.infoHeader]: '',
  [EType.infoListTitle]: '',
  [EType.infoListItems]: [],
  [EType.infoParagraphs]: [],
};
