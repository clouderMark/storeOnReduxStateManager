import {EType} from './EType';
import {IInitialState} from './IInitialState';

export const initialState: IInitialState = {
  [EType.id]: undefined,

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

  [EType.opinionTitle]: '',
  [EType.opinionListTitle]: '',
  [EType.opinionName]: '',
  [EType.opinionPhone]: '',
  [EType.opinionFax]: '',
  [EType.opinionEmail]: '',
  [EType.opinionImage]: null,
  [EType.opinionImageUrl]: '',
  [EType.opinionParagraphs]: [],
  [EType.opinionListItems]: [],
};
