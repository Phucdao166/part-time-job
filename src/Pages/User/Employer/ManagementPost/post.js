import Header from "../../Themes/Header/header";
import SideBar from "../MangementPage/sidebar";
import Button from 'react-bootstrap/Button';
import logo_job from '../../../../Assets/logo-job.png'
import './post.scss';
import { useEffect, useState } from "react";
import { getAllJObByEid, closeJobDetail, getJobByStatus0, deleteJobDetail, getJobByStatus3, getJobByStatus2 } from '../../../../Service/employService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';
import HeaderEmployer from "../../Themes/Header/headerEmployer";
import numeral from 'numeral';
import {getJobstatus4} from '../../../../Service/employService';

function formatCurrency(number) {
    const formattedNumber = numeral(number).format('0,0.00');
    return formattedNumber;
  }
function Post() {
    const [listJobView, setListJobView] = useState([]);
    const [listJobWait, setListJobStatusWait] = useState([]);
    const [listJobClose, setListJobStatusClose] = useState([]);
    const [listJobReject, setListJobStatusReject] = useState([]);
    const [listJobtinnhap, setListJobStatustinnhap] = useState([]);
    const [toggleTab, setToggleTab] = useState(1)
    let [idemp, setidEmp] = useState(sessionStorage.getItem('employerId'));

    const navigate = useNavigate();
    var result;
    //---------------------------------Post View---------------------------------//
    useEffect(() => {

        getJobsView();
        console.log("empid", idemp);
        setidEmp(idemp);
    }, [])

    const getJobsView = async () => {
        console.log("idemp", idemp);
        let res = await getAllJObByEid(idemp);
        result = res.length;
        console.log("result", result);
        if (res) {
            setListJobView(res);
        }
        console.log("check2", res);
    }
    const HandleCloseJob = async (itemId, idemp) => {
        const closejob = await closeJobDetail(itemId, idemp);
        if (closejob) {
            toast.success("Tin da dc dong!");
            navigate("/post-close")
        } else {
            navigate("/post")
        }
    }
    const handleDeleteClick = (id, eid) => {
        // Hiển thị cảnh báo và xác nhận từ người dùng
        const userConfirmed = window.confirm('Bạn có chắc muốn bỏ quan tâm không?');

        // Nếu người dùng đồng ý, thực hiện xóa
        if (userConfirmed) {
            HandleCloseJob(id, eid);
        }
    };
    // delete jon status 0
    const handleDeleteClickJobDetail = (id) => {
        // Hiển thị cảnh báo và xác nhận từ người dùng
        const userConfirmed = window.confirm('Bạn có chắc muốn xóa job không?');

        // Nếu người dùng đồng ý, thực hiện xóa
        if (userConfirmed) {
            hadleDeleteJob(id);
        }
    };
    //---------------------------------Post Wait---------------------------------//
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get('toast')) {
            toast.success("Đăng bài thành công");
        }
        getPostWait();
        console.log("empid", idemp);
        setidEmp(idemp);
    }, []);

    const getPostWait = async () => {
        console.log("idemp", idemp);
        let res = await getJobByStatus0(idemp);
        console.log("layres",res)
        sessionStorage.setItem("countjob0",res.length);
        if (res) {
            setListJobStatusWait(res);
        }
        console.log("check2", res);
    }
    const hadleDeleteJob = async (idjob) => {
        console.log("nhay vao day");
        let res = await deleteJobDetail(idjob);
        if (res) {
            toast.success("Tin da dc xoa!");
            navigate("/post")
        }
    }
    //---------------------------------Post Close---------------------------------//
    useEffect(() => {
        getPostClose();
        console.log("empid", idemp);
        setidEmp(idemp);
    }, []);

    const getPostClose = async () => {
        console.log("idemp", idemp);
        let res = await getJobByStatus3(idemp);
        if (res) {
            setListJobStatusClose(res);
        }
        console.log("check2222", res);
    }
    //---------------------------------Post Reject---------------------------------//
    useEffect(() => {
        getPostTinnhap();
        console.log("empid", idemp);
        setidEmp(idemp);
    }, []);

    const getPostTinnhap = async () => {
        console.log("idemp", idemp);
        let res = await getJobByStatus2(idemp);
        if (res) {
            setListJobStatusReject(res);
        }
        console.log("checkhai", res);
    }
    //---------------------------------Post Wrap---------------------------------//
    const toggleTabHandle = (index) => {
        setToggleTab(index)
    }
    useEffect(() => {
        getPostReject();
        console.log("empid", idemp);
        setidEmp(idemp);
    }, []);

    const getPostReject = async () => {
        console.log("idemp", idemp);
        let res = await getJobstatus4(idemp);
        if (res) {
            setListJobStatustinnhap(res);
        }
        console.log("check4", res);
    }
    return (
        <>
            <HeaderEmployer />
            <div className="employer-page">
                <div className="employer-page-sidebar">
                    <SideBar />
                </div>

                <div className="employer-page-content">
                    <div className="post-btn-control">
                        <div className="post-btn-control-item">
                            <div className={toggleTab === 1 ? "post-btn post-btn-active" : "post-btn"} onClick={() => toggleTabHandle(1)}>Tin đang hiển thị</div>
                            <div className={toggleTab === 2 ? "post-btn post-btn-active" : "post-btn"} onClick={() => toggleTabHandle(2)}>Tin đang chờ duyệt</div>
                            <div className={toggleTab === 3 ? "post-btn post-btn-active" : "post-btn"} onClick={() => toggleTabHandle(3)}>Tin đã đóng</div>
                            <div className={toggleTab === 4 ? "post-btn post-btn-active" : "post-btn"} onClick={() => toggleTabHandle(4)}>Tin bị từ chối</div>
                            <div className={toggleTab === 5 ? "post-btn post-btn-active" : "post-btn"} onClick={() => toggleTabHandle(5)}>Tin nháp</div>

                            <a>Xem lịch sử đăng bài </a>
                        </div>
                    </div>

                    <div className={toggleTab === 1 ? "post-view" : "post-view none-active-post-content"}>
                        {listJobView && listJobView.length > 0 &&
                            listJobView.map((item, index) => {
                                return (
                                    <div className="post-manage">
                                        <div className="post-manage-item">
                                            <div className='job-list-item'>
                                                <div className='post-manage-item-left'>
                                                    <div className="job-list-logo">
                                                        <img id='company-logo' src={logo_job} alt="" />
                                                    </div>
                                                    <div className='job-list-item-left-content'>
                                                        <div className='post-manage-item-title'><a href={`/post-detail?jobid=${item.id}`}>{item.title}</a></div>
                                                        <div className='job-list-des'>
                                                            <div className='job-list-company'>{item.company}</div>
                                                        </div>
                                                        <div className='job-list-des'>
                                                            <div className='job-list-company'>Mức lương:{formatCurrency(item.salary)} VND</div>
                                                        </div>
                                                        <div className="job-list-des">
                                                            <div className="job-list-company">Số lượng: {item.numberApply}</div>
                                                            <div>Hạn đăng tuyển : {format(new Date(item.deadline), 'dd/MM/yyyy')}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='post-manage-item-right'>
                                                    <div className='post-manage-btn'>
                                                        <div><Button style={{ backgroundColor: 'green' }} id="candidate-save-btn" >Đã duyệt</Button></div>
                                                        <div><Button onClick={() => handleDeleteClick(item.id, item.employerId)} id="candidate-save-btn" variant="danger">Đóng bài</Button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>

                    <div className={toggleTab === 2 ? "post-wait-approve" : "post-wait-approve none-active-post-content"}>
                        {listJobWait && listJobWait.length > 0 &&
                            listJobWait.map((item, index) => {
                                return (
                                    <div className="post-manage">
                                        <div className="post-manage-item">
                                            <div className='job-list-item'>
                                                <div className='post-manage-item-left'>
                                                    <div className="job-list-logo">
                                                        <img id='company-logo' src={logo_job} alt="" />
                                                    </div>
                                                    <div className='job-list-item-left-content'>
                                                        <div className='post-manage-item-title'><a href="/edit-post">{item.title}</a></div>
                                                        <div className='job-list-des'>
                                                            <div className='job-list-company'>{item.company}</div>
                                                        </div>
                                                        <div className='job-list-des'>
                                                            <div className='job-list-company'>Mức lương: {formatCurrency(item.salary)} VND</div>
                                                        </div>
                                                        <div className="job-list-des">
                                                            <div className="job-list-company">Số lượng: {item.numberApply}</div>
                                                            <div>Hạn đăng tuyển :{format(new Date(item.deadline), 'dd/MM/yyyy')}</div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className='post-manage-item-right'>
                                                    <div className='post-manage-btn'>
                                                        <div><Button href={`/edit-post?jobid=${item.id}`} id="candidate-save-btn" variant="warning">Chỉnh sửa</Button></div>
                                                        <div><Button id="candidate-save-btn" onClick={() => handleDeleteClickJobDetail(item.id)} variant="danger">Xóa bài</Button>
                                                            <ToastContainer />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>

                    <div className={toggleTab === 3 ? "post-close" : "post-close none-active-post-content"}>
                        {listJobClose && listJobClose.length > 0 &&
                            listJobClose.map((item, index) => {
                                return (
                                    <div className="post-manage">
                                        <div className="post-manage-item">
                                            <div className='job-list-item'>
                                                <div className='post-manage-item-left'>
                                                    <div className="job-list-logo">
                                                        <img id='company-logo' src={logo_job} alt="" />
                                                    </div>
                                                    <div className='job-list-item-left-content'>
                                                        <div className='post-manage-item-title'><a href="/edit-post">{item.title}</a></div>
                                                        <div className='job-list-des'>
                                                            <div className='job-list-company'>{item.company}</div>
                                                        </div>
                                                        <div className='job-list-des'>
                                                            <div className='job-list-company'>Mức lương:{formatCurrency(item.salary)} VND</div>
                                                        </div>
                                                        <div className="job-list-des">
                                                            <div className="job-list-company">Số lượng: {item.numberApply}</div>
                                                            <div>Hạn đăng tuyển : {format(new Date(item.deadline), 'dd/MM/yyyy')}</div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className='post-manage-item-right'>
                                                    <div className='post-manage-btn'>
                                                        <div><Button href={`/view-post?jobid=${item.id}`} id="candidate-save-btn" variant="info">Xem bài</Button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })};
                    </div>

                    <div className={toggleTab === 4 ? "post-reject" : "post-reject none-active-post-content"}>
                        {listJobReject && listJobReject.length > 0 &&
                            listJobReject.map((item, index) => {
                                return (
                                    <div className="post-manage">
                                        <div className="post-manage-item">
                                            <div className='job-list-item'>
                                                <div className='post-manage-item-left'>
                                                    <div className="job-list-logo">
                                                        <img id='company-logo' src={logo_job} alt="" />
                                                    </div>
                                                    <div className='job-list-item-left-content'>
                                                        <div className='post-manage-item-title'><a href="/edit-post">{item.title}</a></div>
                                                        <div className='job-list-des'>
                                                            <div className='job-list-company'>{item.company}</div>
                                                        </div>
                                                        <div className='job-list-des'>
                                                            <div className='job-list-company'>Mức lương: {formatCurrency(item.salary)} VND</div>
                                                        </div>
                                                        <div className="job-list-des">
                                                            <div className="job-list-company">Số lượng: {item.numberApply}</div>
                                                            <div>Hạn đăng tuyển :{format(new Date(item.deadline), 'dd/MM/yyyy')}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='post-manage-item-right'>
                                                    <div className='post-manage-btn'>
                                                        <div><Button href="/edit-post" id="candidate-save-btn" variant="danger">Xem lý do</Button></div>
                                                        <div><Button href={`/edit-post?jobid=${item.id}`} id="candidate-save-btn" variant="warning">Chỉnh sửa</Button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className={toggleTab === 5 ? "post-wrap" : "post-wrap none-active-post-content"}>
                    {listJobtinnhap && listJobtinnhap.length > 0 &&
                            listJobtinnhap.map((item, index) => {
                                return (
                                    <div className="post-manage">
                                        <div className="post-manage-item">
                                            <div className='job-list-item'>
                                                <div className='post-manage-item-left'>
                                                    <div className="job-list-logo">
                                                        <img id='company-logo' src={logo_job} alt="" />
                                                    </div>
                                                    <div className='job-list-item-left-content'>
                                                        <div className='post-manage-item-title'><a href="/edit-post">{item.title}</a></div>
                                                        <div className='job-list-des'>
                                                            <div className='job-list-company'>{item.company}</div>
                                                        </div>
                                                        <div className='job-list-des'>
                                                            <div className='job-list-company'>Mức lương: {formatCurrency(item.salary)} VND</div>
                                                        </div>
                                                        <div className="job-list-des">
                                                            <div className="job-list-company">Số lượng: {item.numberApply}</div>
                                                            <div>Hạn đăng tuyển :{format(new Date(item.deadline), 'dd/MM/yyyy')}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='post-manage-item-right'>
                                                    <div className='post-manage-btn'>
                                                        <div><Button href={`/tinnhap-post?jobid=${item.id}`} id="candidate-save-btn" variant="warning">Dang lai bai</Button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div >
        </>
    )
}

export default Post;