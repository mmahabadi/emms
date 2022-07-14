import {getUserOrgId} from "../../UserHelper";
import axios from "axios";

const {NX_REACT_APP_API_URL} = process.env;

export const getAsyncAssets = async (q: string) => {
  if (!q){
    return [];
  }
  const orgId = getUserOrgId();
  const res = await axios.get(`${NX_REACT_APP_API_URL}/asset/search/${orgId}?q=${q?.toLowerCase()}`);
  return res.data;
}
