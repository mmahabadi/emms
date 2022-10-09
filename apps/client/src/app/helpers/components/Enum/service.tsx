import axios from "axios";

const {NX_REACT_APP_API_URL} = process.env;

export const getAsyncRequestType = async (q: string) => {
  const res = await axios.get(`${NX_REACT_APP_API_URL}/enums/request-type`);
  return res.data;
}

export const getAsyncImportanceType = async (q: string) => {
  const res = await axios.get(`${NX_REACT_APP_API_URL}/enums/importance-type`);
  return res.data;
}
