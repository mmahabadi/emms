import axios from 'axios';
import {getUserOrgId} from "../../../helpers/UserHelper";
import {Assets} from "@emms/models";

const {NX_REACT_APP_API_URL} = process.env;

export const getAssets = async (query: string) => {
  const orgId = getUserOrgId();
  return await axios.get(`${NX_REACT_APP_API_URL}/asset/all/${orgId}?${query}`);
}

export const getAsset = async (id: string) => {
  return await axios.get(`${NX_REACT_APP_API_URL}/asset/${id}`);
}

export const getAssetCategories = async (query: string) => {
  const orgId = getUserOrgId();
  const res = await axios.get(`${NX_REACT_APP_API_URL}/assetCat/all/paging/${orgId}?${query}`);
  return res.data;
}

export const saveAsset = async (entry: Assets) => {
  const orgId = getUserOrgId();
  entry.orgId = orgId;
  // const isUpdating = !!entry?.id;
  // const http = isUpdating ? axios.put : axios.post;
  return await axios.post(`${NX_REACT_APP_API_URL}/asset`, entry);
}
