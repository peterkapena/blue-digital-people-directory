import { Role } from "../redux/user-slice";

export interface RegisterModelIn {
    email: string;
    password: string;
    role: Role;
}