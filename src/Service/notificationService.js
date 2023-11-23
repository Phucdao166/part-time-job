
import axios from "./customizeAxios";

const AddNotiForCandidate = (appJobRequest) => {
    return axios.post("/Notification/CreateNotificationForCandidate",appJobRequest)
}
const AddNotiForEmployer = (appJobRequest) => {
    return axios.post("/Notification/CreateNotificationForEmployer",appJobRequest)
}
const GetNotiForCandidate = (aid) => {
    return axios.get(`/Notification/GetNotiForCandidate?aid=${aid}`)
}
const GetNotiForEmployer = (aid) => {
    return axios.get(`/Notification/GetNotiForEmployer?aid=${aid}`)
}

export {AddNotiForCandidate,AddNotiForEmployer,GetNotiForCandidate,GetNotiForEmployer}