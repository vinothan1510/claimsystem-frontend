
import api from "./axios";

export const loginApi=(data:any)=> api.post("users/login",data);

export const registerApi=(data:any)=> api.post("users/register",data);