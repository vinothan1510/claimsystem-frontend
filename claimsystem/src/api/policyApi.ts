import api from "./axios";

export const getAvailablePolicies=()=>api.get("/policies");

export const purchasePolicy=(userId:number,body:any)=>api.post(`/policies/purchase/${userId}`,body);