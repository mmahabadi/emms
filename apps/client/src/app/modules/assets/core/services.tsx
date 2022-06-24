import axios from 'axios';
import {getAuth} from "@emms/ui-kit";
import {AuthModel} from "@emms/models";

const {NX_REACT_APP_API_URL} = process.env;

export const getAssets = async () => {
  const auth: AuthModel | undefined = getAuth();
  const organization = auth?.orgs?.pop();
  return await axios.get(`${NX_REACT_APP_API_URL}/asset/all/${organization?.orgId}`);
}

//d9e4cd7d-3bad-4f2a-8a46-aa482da880e0
export const getAsset = async (id: string) => {
  return await axios.get(`${NX_REACT_APP_API_URL}/asset/${id}`);
}

export const getAssetCategories = async (query: string) => {
  const auth: AuthModel | undefined = getAuth();
    const organization = auth?.orgs?.pop();
    const res = await axios.get(`${NX_REACT_APP_API_URL}/assetCat/all/paging/${organization?.orgId}?${query}`);
    return res.data;
}
