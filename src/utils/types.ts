export type OptionList = {
    name: string;
    lat: number;
    lon: number;
  }

export interface ICity extends OptionList {
    order?: number;
};