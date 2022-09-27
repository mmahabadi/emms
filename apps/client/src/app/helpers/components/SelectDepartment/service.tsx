import {getUserOrgId} from "../../UserHelper";
import axios from "axios";

const {NX_REACT_APP_API_URL} = process.env;

export const getAsyncDepartment = async (q: string) => {
  // if (!q){
  //   return [];
  // }
  const orgId = getUserOrgId();
  const res = await axios.get(`${NX_REACT_APP_API_URL}/department/search/${orgId}?q=${q?.toLowerCase()}`);
  return res.data;
}
