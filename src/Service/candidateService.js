
import axios from "./customizeAxios";

const ApplyJob = (appJobRequest) => {
    return axios.post("/Home/jobapplycant",appJobRequest )
}
const getCanById = (id) => {
    return axios.get(`/Candidate/getCandidteByAccId?canid=${id}`)
}
const SaveProfile = (profileRequest) => {
    return axios.put("/Candidate/SaveProfile",profileRequest)
}
const getCity = (id) => {
    return axios.get(`https://provinces.open-api.vn/api/?depth=${id}`)
}


export {getCity,ApplyJob, getCanById,SaveProfile}