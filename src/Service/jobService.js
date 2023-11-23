
import axios from "./customizeAxios";

const ApplyJob = (appJobRequest) => {
    return axios.post("/Home/jobapplycant",appJobRequest )
}
const getCanById = (id) => {
    return axios.get(`/Candidate/getCandidteByAccId?aid=${id}`)
}
const getEmpById = (id) => {
    return axios.get(`/Employer/GetEmployerByAId?aId=${id}`)
}
const getJobApplication = (cid,jid) => {
    return axios.get(`/Job/GetjobApplycationByCandidateId?candidateId=${cid}&jobId=${jid}`)
}
const CareJob = (applyRequest) => {
    return axios.post("/Job/CareJob",applyRequest)
}
const GetJobByStatus = (status,canid) => {
    return axios.get(`/Job/GetJobByStatus?status=${status}&canId=${canid}`)
}

const GetJobCare = (canid) => {
    return axios.get(`/Job/GetJobCare?CandidateId=${canid}`)
}

const DeleteJobCare = (id) => {
    return axios.delete(`/Job/DeleteJobCare?jobApplicationId=${id}`)
}

const CanceApplyJob = (request) => {
    return axios.put("/Job/CanceApply",request)
}
const GetJobByTypeId = (typeid) => {
    return axios.get(`/Home/GetAllJobByType?jobid=${typeid}`)
}
const ApplyjobCance = (id) => {
    return axios.put(`/Job/Apply?jobApplicationId=${id}`)
}
const countnhatd = ()=>{
    return axios.get('/Home/countnhatd');
}
const countcvtd = ()=>{
    return axios.get("/Home/congviectuyendung");
}
//http://localhost:5000/api/Home/searbJobAllDetail?title=Job%201&location=Location%201&jobName=IT
const searchAllJobDetail = (title,location,jobName ) => {
    return  axios.get(`/Home/searbJobAllDetail`, {
        params: {
          title: title,
          location: location,
          jobName: jobName
        }
      });
}
export {countcvtd,countnhatd,getEmpById,GetJobByTypeId,ApplyjobCance,CanceApplyJob,DeleteJobCare,ApplyJob, getCanById,searchAllJobDetail,CareJob,GetJobByStatus,GetJobCare,getJobApplication}