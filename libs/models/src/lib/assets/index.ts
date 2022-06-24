import {Entity, ID, Response} from "../general";

export type Assets = Entity & {
  code: string;
  name: string;
  cat: string;
  assetCat: AssetCategory;
}

export type AssetCategory = Entity & {
  activity_results: unknown;
  asset_identity_id: unknown;
  code: string;
  damage_results: unknown;
  field_title: string;
  invalid_from: unknown;
  name: string;
  org: ID;
  parent_id: ID;
}

export type AssetsQueryResponse = Response<Array<Assets>>;
export type AssetCategoriesQueryResponse = Response<Array<AssetCategory>>;
