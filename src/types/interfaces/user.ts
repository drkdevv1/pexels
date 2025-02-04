import { UserData, validsRols } from "../../context/auth-context";

export interface LoginResponse {
    token: string;
    user: UserData;
    tipo: validsRols;
}

export interface UpdateProfileResponse {
    message: string;
}