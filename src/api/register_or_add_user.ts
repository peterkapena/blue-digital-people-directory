import { Role } from "../redux/user-slice";

export interface RegisterModelIn {
    email: string;
    password: string;
    role: Role;
}

export const PermissionsOnUser = {
    canEdit: (role: Role): boolean => {
        switch (role) {
            case "ADMIN":
                return true
            default:
                return false
        }
    },
    canAdd: (role: Role): boolean => {
        switch (role) {
            case "ADMIN":
                return true
            default:
                return false
        }
    }
}