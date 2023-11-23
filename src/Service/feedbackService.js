
import axios from "./customizeAxios";

const SentFeedback = (appJobRequest) => {
    return axios.post("/Feedback/CreateFeedbackToEmployer",appJobRequest )
}
const SentFeedbackToCandidate = (appJobRequest) => {
    return axios.post("/Feedback/CreateFeedbackToCandidate",appJobRequest )
}
const GetFeedbackForCandidate = (aid) => {
    return axios.get(`/Feedback/GetFeedbackForCandidate?aid=${aid}`)
}
const GetFeedbackForEmployer = (aid) => {
    return axios.get(`/Feedback/GetFeedbackForEmployer?aid=${aid}`)
}

export {SentFeedback,SentFeedbackToCandidate,GetFeedbackForCandidate,GetFeedbackForEmployer}