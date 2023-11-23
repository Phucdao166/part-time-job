import axios from "./customizeAxios";

const GetAllAccount = () => {
    return axios.get("/Account/GetAllAccount")
}

export {GetAllAccount}