import axios from "./customizeAxios";
//http://localhost:5000/api/Employer/getEmployerByAccId?aid=20
const SetinterviewCandidate = (cid,interviewId,jid) => {
    return axios.put(`/Interview/SetinterviewCandidate?cId=${cid}&InterviewId=${interviewId}&jobId=${jid}`)
}
const EditLich = (requets) => {
    return axios.put("/Interview/EditLich",requets)
}
const DeleteCandidateInterview = (cid) => {
    return axios.put(`/Interview/DeleteCandidateInterview?cid=${cid}`)
}
const GetListCandidateInterviewByEid = (eid,status) => {
    return axios.get(`/Interview/GetListCandidateInterviewByEid?eId=${eid}&status=${status}`)
}
const SelectOptionInterviewByEmp = (eid) => {
    return axios.get(`/Interview/SelectOptionInterviewByEmp?eId=${eid}`)
}
const GetInterviewOfcandidate = (cid) => {
    return axios.get(`/Interview/GetInterviewOfcandidate?cid=${cid}`)
}
const CandidateCancelInterview = (jobApplicationId) => {
    return axios.get(`/Interview/CandidateCancelInterview?jobApplicationId=${jobApplicationId}`)
}
export {CandidateCancelInterview,GetInterviewOfcandidate,EditLich,DeleteCandidateInterview,GetListCandidateInterviewByEid,SelectOptionInterviewByEmp,SetinterviewCandidate}

