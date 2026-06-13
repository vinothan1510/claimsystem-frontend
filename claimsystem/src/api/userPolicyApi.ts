





















import api from "./axios";

export const getMyPolicies = (userId: number) =>
  api.get(`/policies/user/${userId}`);

export const getActivePolicies = (userId: number) =>
  api.get(`/policies/user/${userId}/active`);



