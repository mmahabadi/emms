import axios from 'axios';
import {getAuth} from "@emms/ui-kit";
import {AuthModel} from "@emms/models";

const {NX_REACT_APP_API_URL} = process.env;

export const getAssets = async () => {
  const auth: AuthModel | undefined = getAuth();
  const organization = auth?.orgs?.pop();
  const response =  await axios.get(`${NX_REACT_APP_API_URL}/asset/${organization?.orgId}`)
  return response.data;
}

//d9e4cd7d-3bad-4f2a-8a46-aa482da880e0
export const getAsset = async (id: string) => {
  return await axios.get(`${NX_REACT_APP_API_URL}/asset/${id}`);
}
