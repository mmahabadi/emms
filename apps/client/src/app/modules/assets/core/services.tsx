import axios from 'axios';
import {getUserOrgId} from "../../../helpers/UserHelper";

const {NX_REACT_APP_API_URL} = process.env;

export const getAssets = async (query: string) => {
  const orgId = getUserOrgId();
  return await axios.get(`${NX_REACT_APP_API_URL}/asset/all/${orgId}?${query}`);
}

//d9e4cd7d-3bad-4f2a-8a46-aa482da880e0
export const getAsset = async (id: string) => {
  return await axios.get(`${NX_REACT_APP_API_URL}/asset/${id}`);
}

export const getAssetCategories = async (query: string) => {
  const orgId = getUserOrgId();
  const res = await axios.get(`${NX_REACT_APP_API_URL}/assetCat/all/paging/${orgId}?${query}`);
  return res.data;
}
