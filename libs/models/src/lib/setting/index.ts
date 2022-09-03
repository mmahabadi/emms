import {Entity, ID, Response} from "../general";

export type Goods = Entity & {
  id: ID;
  org: ID;
  code: string;
  name: string;
  invalidFrom?: string;
}


export type Location = Entity & {
  id: ID;
  org: ID;
  code: string;
  name: string;
  parent: ID;
  invalidFrom?: string;
}
export type Skill = Entity & {
  id: ID;
  org: ID;
  code: string;
  name: string;
  invalidFrom?: string;
}

export type Activity = Entity & {
  id: ID;
  org: ID;
  code: string;
  name: string;
  parent: string;
  invalidFrom?: string;
  goods?: {id: string}[];
  skills?:{id: string}[];
}


export type GoodsQueryResponse = Response<Array<Goods>>;
export type LocationQueryResponse = Response<Array<Location>>;
