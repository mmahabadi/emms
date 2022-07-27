import axios from "axios";
import {getUserOrgId} from "../../UserHelper";

const {NX_REACT_APP_API_URL} = process.env;

export const getAsyncOrganizations = async (q: string) => {
  const orgId = getUserOrgId();
  const res = await axios.get(`${NX_REACT_APP_API_URL}/org/${orgId}/search?q=${q?.toLowerCase()}`);
  return res.data;
}
