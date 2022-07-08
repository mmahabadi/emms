import axios from "axios";

const {NX_REACT_APP_API_URL} = process.env;

export const getAsyncOrganizations = async (q: string) => {
  const res = await axios.get(`${NX_REACT_APP_API_URL}/org/search?q=${q?.toLowerCase()}`);
  return res.data;
}
