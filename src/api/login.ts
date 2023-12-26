import { Role } from "../redux/user-slice";
import { CommonOutputModel } from "./useApi";

export interface LoginModelOut extends CommonOutputModel {
    email: string;
    token: string;
}

export interface VerifyTokenOut extends LoginModelOut {
    role: Role;
}

export interface LoginModelIn {
    email: string, password: string,
} 
