import axios from 'axios';
import {getUserOrgId} from "../../../helpers/UserHelper";
import {Activity, Goods, Skill} from "@emms/models";
import {Location} from "@emms/models";
import {JobOrderList} from "../components/jobOrder/JobOrderList";

const {NX_REACT_APP_API_URL} = process.env;



export const getJobOrders = async (query: string) => {
  const orgId = getUserOrgId();
  const res = await axios.get(`${NX_REACT_APP_API_URL}/job_order/all/${orgId}?${query}`);
  return res.data;

}

export const JobOrder = async (id: string) => {
  return await axios.get(`${NX_REACT_APP_API_URL}/job_order/${id}`);
}

function SaveJobOrder<JobOrder>() {
  return async (entry: JobOrder) => {
    console.log(entry)
    const orgId = getUserOrgId();
    // entry.orgId = orgId;
    return await axios.post(`${NX_REACT_APP_API_URL}/job_order`, entry);
  };
}

export const getJobRequests = async (query: string) => {
  const orgId = getUserOrgId();
  const res = await axios.get(`${NX_REACT_APP_API_URL}/job_request/all/${orgId}?${query}`);
  return res.data;

}

export const JobRequest = async (id: string) => {
  return await axios.get(`${NX_REACT_APP_API_URL}/job_request/${id}`);
}

function SaveJobRequest<JobRequest>() {
  return async (entry: JobRequest) => {
    console.log(entry)
    const orgId = getUserOrgId();
    // entry.orgId = orgId;
    return await axios.post(`${NX_REACT_APP_API_URL}/job_request`, entry);
  };
}

export const saveJobOrder = SaveJobOrder()
export const saveJobRequest = SaveJobRequest()
