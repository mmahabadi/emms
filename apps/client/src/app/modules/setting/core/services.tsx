import axios from 'axios';
import {getUserOrgId} from "../../../helpers/UserHelper";
import {Goods} from "@emms/models";

const {NX_REACT_APP_API_URL} = process.env;

export const getGoodses = async (query: string) => {
  const orgId = getUserOrgId();
  return await axios.get(`${NX_REACT_APP_API_URL}/goods/all/${orgId}?${query}`);
}

export const getGoods = async (id: string) => {
  return await axios.get(`${NX_REACT_APP_API_URL}/goods/${id}`);
}

export const saveGoods = async (entry: Goods) => {
  const orgId = getUserOrgId();
  entry.org = orgId;
  // const isUpdating = !!entry?.id;
  // const http = isUpdating ? axios.put : axios.post;
  return await axios.post(`${NX_REACT_APP_API_URL}/goods`, entry);
}
