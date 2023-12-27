import { Role } from "../redux/user-slice";

export interface PersonOutModel {
    id: number,
    name: string,
    surname: string,
    profilePictureUrl: string | null,
    mobileNumber: string | null,
    gender: string | null,
    emailAddress: string | null,
    country: string | null,
    city: string | null,
}

export const PermissionsOnPeople = {
    canEdit: (role: Role): boolean => {
        switch (role) {
            case "ADMIN":
                return true
            default:
                return false
        }
    }
}