import api from "./axios";

export const submitClaim=(userId:number,body:any)=> api.post(`/claims/submit/${userId}`,body);

export const getMyClaims=(userId:number)=> api.get(`/claims/user/${userId}/track`);

export const getAllClaims=()=> api.get("/claims");

export const approveClaim=(claimId: number)=> api.put(`/claims/approve/${claimId}`);

export const rejectClaim=(claimId: number,remarks:string)=> api.put(`/claims/approve/${claimId}?remarks=${remarks}`);

export const uploadClaimDocument = (
  claimId: number,
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(
    `/documents/upload?claimId=${claimId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const downloadDocument = (documentId: number) =>
  api.get(`/documents/download/${documentId}`, {
    responseType: "blob",
  });