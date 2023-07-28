import {IParagraphs} from '../../interfaces/interfaces';
import {EType} from './EType';

export interface IInitialState {
  [EType.id]: number | undefined;

  [EType.name]: string;
  [EType.valid]: null | boolean;

  [EType.cardImage]: File | null;
  [EType.cardImageUrl]: string;

  [EType.sliderImage]: File | null;
  [EType.sliderImageUrl]: string;

  [EType.headerImage]: File | null;
  [EType.headerImageUrl]: string;

  [EType.title]: string;

  [EType.paragraphs]: IParagraphs[];

  [EType.infoImage]: File | null;
  [EType.infoImageUrl]: string;
  [EType.infoTitle]: string;
  [EType.infoHeader]: string;
  [EType.infoListTitle]: string;
  [EType.infoListItems]: IParagraphs[];
  [EType.infoParagraphs]: IParagraphs[];

  [EType.opinionTitle]: string;
  [EType.opinionListTitle]: string;
  [EType.opinionName]: string;
  [EType.opinionPhone]: string;
  [EType.opinionFax]: string;
  [EType.opinionEmail]: string;
  [EType.opinionImage]: File | null;
  [EType.opinionImageUrl]: string;
  [EType.opinionParagraphs]: IParagraphs[];
  [EType.opinionListItems]: IParagraphs[];
}
