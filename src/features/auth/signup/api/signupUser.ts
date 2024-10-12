import axios from "axios";
import {SignupUserModel} from "../model/types.ts";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const signupUser = async (userData : SignupUserModel) => {
    const response = await axios.post(`${API_URL}/api/nonMember/user/register`, userData)
    return response.data;
}
