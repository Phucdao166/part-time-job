import axios from "./customizeAxios";
//http://localhost:5000/api/Employer/getEmployerByAccId?aid=20
const getEmployById = (id) => {
    return axios.get(`/Employer/getEmployerByEmpId?eid=${id}`)
}
const saveProfileEmp = (formInput)=>{
    return axios.put("/Employer/SaveProfileEmploy",formInput);
}
const getAllCandidateApplyJobzzzzz = ()=>{
    return axios.get("/Employer/getAllCandidateByApply");
}
const CreateInterview = (request)=>{
    return axios.post("/Interview/CreateInterview",request);
}
const GetInterViewByEmpId = (id)=>{
    return axios.get(`/Interview/GetInterViewByEmpId?aId=${id}`);
}
const GetCandidateByInterviewId = (id)=>{
    return axios.get(`/Interview/GetCandidateByInterviewId?InterviewId=${id}`);
}
const createPost= (formInputEmp) =>{ 
    return axios.post("/Employer/createJobDetail", formInputEmp);
}
const createPosttinhanp = (formInputtinnhap) =>{ 
    return axios.post("/Employer/createJobDetailtinnhap", formInputtinnhap);
}
const getAllJObByEid = (eid) =>{
    return axios.get(`/Employer/getAllJobDetailByEid?empid=${eid}`)
}
const closeJobDetail = (idjob, empid) =>{
    return axios.put(`/Employer/closejobdetailBystatus?idjob=${idjob}&empid=${empid}`);
}
const getJobByStatus0 = (idemp)=>{
    return axios.get(`/Employer/getJobBystatus0?idemp=${idemp}`);
}
const getJobByStatus3 = (idemp)=>{
    return axios.get(`/Employer/getJobBystatus3?idemp=${idemp}`);
}
const getJobByStatus2 = (idemp)=>{
    return axios.get(`/Employer/getJobBydWithstatus2?idemp=${idemp}`);
}
const deleteJobDetail = (idjob)=>{
    return axios.delete(`/Employer/deleteJob?id=${idjob}`);
}
const getjobbyid =(idjob)=>{
    return axios.get(`/Employer/getjobbyid?id=${idjob}`);
}
const updatejob =(formInputJob)=>{
    return axios.put("/Employer/updatejobDetail",formInputJob);
}
const updatestatusjobtn =(formInputJobtn)=>{
    return axios.put("/Employer/updatestatustinnhap",formInputJobtn);
}

const tindangtrongtuan =(eid)=>{
    return axios.get(`/Employer/tindangtrongtuan?idemp=${eid}`);
}
const tindangtrongthang =(eid)=>{
    return axios.get(`/Employer/tindangtrongthang?idemp=${eid}`);
}
const ungvientrongthang =(eid)=>{
    return axios.get(`/Employer/ungvientrongthang?idemp=${eid}`);
}
const ungvientrongtuan =(eid)=>{
    return axios.get(`/Employer/ungvientrongtuan?idemp=${eid}`);
}
const tindangtuyendung =(eid)=>{
    return axios.get(`/Employer/tindangtuyendung?idemp=${eid}`);
}
const ungviendaungtuyen =(eid)=>{
    return axios.get(`/Employer/ungviendaungtuyen?idemp=${eid}`);
}
const getJobstatus4 =(eid)=>{
    return axios.get(`/Employer/getstatus4?idemp=${eid}`);
}

export {updatestatusjobtn,getJobstatus4,createPosttinhanp,tindangtuyendung,ungviendaungtuyen,tindangtrongtuan,ungvientrongtuan,ungvientrongthang,tindangtrongthang,updatejob,getjobbyid,deleteJobDetail,getJobByStatus2,getJobByStatus3,getJobByStatus0,closeJobDetail,getAllJObByEid,createPost, GetCandidateByInterviewId, GetInterViewByEmpId, CreateInterview, getEmployById, saveProfileEmp, getAllCandidateApplyJobzzzzz}

