import {Entity, ID, Response} from "../general";

export type Goods = Entity & {
  id: ID;
  org: ID;
  code: string;
  name: string;
  invalidFrom?: string;
}


export type GoodsQueryResponse = Response<Array<Goods>>;
