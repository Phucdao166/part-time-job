import Header from "../../Themes/Header/header";
import SideBar from "../MangementPage/sidebar";
import Button from 'react-bootstrap/Button';
import logo_job from '../../../../Assets/logo-job.png'
import './post.scss';
import { useEffect, useState } from "react";
import { getJobByStatus0, deleteJobDetail } from '../../../../Service/employService';
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
function PostManage() {

    const [listJob0, setListJobStatus0] = useState([]);
    let [idemp, setidEmp] = useState(sessionStorage.getItem('employerId'));
    const navigate = useNavigate();
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get('toast')) {
            toast.success("Đăng bài thành công");
        }
        getJobstatus();
        console.log("empid", idemp);
        setidEmp(idemp);
    }, []);

    const getJobstatus = async () => {
        console.log("idemp", idemp);
        let res = await getJobByStatus0(idemp);
        console.log("layres",res)
        sessionStorage.setItem("countjob0",res.length);
        if (res) {
            setListJobStatus0(res);
        }
       
        console.log("countjob", res.length);
    }
    const hadleDeleteJob = async (idjob) => {
        console.log("nhay vao day",idjob);
        let res = await deleteJobDetail(idjob);
        if (res) {
            toast.success("Tin da dc xoa!");
            navigate("/post-manage")
        }

    }
    return (
        <>
            <Header />
            {listJob0 && listJob0.length > 0 &&
                listJob0.map((item, index) => {
                    return (
                        <div className="employer-page">
                            <div className="employer-page-sidebar">
                                <SideBar />
                            </div>

                            <div className="employer-page-content">
                                <div className="post-btn-control">
                                    <div className="post-btn-control">
                                        <div className="post-btn-control-item">
                                            <Button href="/post" id="post-btn" variant="primary">Tin đang hiển thị</Button>
                                            <Button href="/post-manage" id="post-btn" variant="primary">Tin đang chờ duyệt</Button>
                                            <Button href="/post-close" id="post-btn" variant="primary">Tin đã đóng</Button>
                                            <Button href="/post-rejected" id="post-btn" variant="primary">Tin bị từ chối</Button>
                                            <Button href="/post-wrap" id="post-btn" variant="primary">Tin nháp</Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="post-manage">
                                    <div className="post-manage-item">
                                        <div className='job-list-item'>
                                            <div className='post-manage-item-left'>
                                                <div className="job-list-logo">
                                                    <img id='company-logo' src={logo_job} alt=""/>
                                                </div>
                                                <div className='job-list-item-left-content'>
                                                    <div className='post-manage-item-title'><a href="/edit-post">{item.title}</a></div>
                                                    <div className='job-list-des'>
                                                        <div className='job-list-company'>{item.company}</div>
                                                    </div>
                                                    <div className='job-list-des'>
                                                        <div className='job-list-company'>Mức lương: {item.salary} VND</div>
                                                    </div>
                                                    <div className="job-list-des">
                                                        <div className="job-list-company">Số lượng: {item.numberApply}</div>
                                                        <div>Hạn đăng tuyển :{format(new Date(item.deadline), 'dd/MM/yyyy')}</div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className='post-manage-item-right'>
                                                <div className='post-manage-btn'>
                                                    <div><Button  href={`/edit-post?jobid=${item.id}`} id="candidate-save-btn" variant="warning">Chỉnh sửa</Button></div>
                                                    <div><Button id="candidate-save-btn" onClick={() => hadleDeleteJob(item.id)} variant="danger">Xóa bài</Button>
                                                        <ToastContainer />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ToastContainer />
                        </div>
                    )
                })}
        </>
    )
}

export default PostManage;