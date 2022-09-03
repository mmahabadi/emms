import axios from 'axios';
import {getUserOrgId} from "../../../helpers/UserHelper";
import {Activity, Goods, Skill} from "@emms/models";
import {Location} from "@emms/models";
import {ActivityList} from "../components/activity/ActivityList";

const {NX_REACT_APP_API_URL} = process.env;

export const getGoodses = async (query: string) => {
  const orgId = getUserOrgId();
  const res = await axios.get(`${NX_REACT_APP_API_URL}/goods/all/${orgId}?${query}`);
  return res.data;

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

export const getLocations = async (query: string) => {
  const orgId = getUserOrgId();
  const res =  await axios.get(`${NX_REACT_APP_API_URL}/location/all/${orgId}?${query}`);
  return res.data;
}

export const getLocation = async (id: string) => {
  return await axios.get(`${NX_REACT_APP_API_URL}/location/${id}`);
}

export const saveLocation = async (entry: Location) => {
  const orgId = getUserOrgId();
  entry.org = orgId;
  // const isUpdating = !!entry?.id;
  // const http = isUpdating ? axios.put : axios.post;
  return await axios.post(`${NX_REACT_APP_API_URL}/location`, entry);
}

export const getSkills = async (query: string) => {
  const orgId = getUserOrgId();
  return await axios.get(`${NX_REACT_APP_API_URL}/skill/all/${orgId}?${query}`);
}

export const getSkill = async (id: string) => {
  return await axios.get(`${NX_REACT_APP_API_URL}/skill/${id}`);
}

export const saveSkill = async (entry: Skill) => {
  const orgId = getUserOrgId();
  entry.org = orgId;
  // const isUpdating = !!entry?.id;
  // const http = isUpdating ? axios.put : axios.post;
  return await axios.post(`${NX_REACT_APP_API_URL}/skill`, entry);
}




export const getActivities = async (query: string) => {
  const orgId = getUserOrgId();
  const res = await axios.get(`${NX_REACT_APP_API_URL}/activity/all/${orgId}?${query}`);
  return res.data;

}

export const getActivity = async (id: string) => {
  return await axios.get(`${NX_REACT_APP_API_URL}/activity/${id}`);
}

export const saveActivity = async (entry: Activity) => {
  const orgId = getUserOrgId();
  entry.org = orgId;
  // const isUpdating = !!entry?.id;
  // const http = isUpdating ? axios.put : axios.post;
  return await axios.post(`${NX_REACT_APP_API_URL}/activity`, entry);
}
