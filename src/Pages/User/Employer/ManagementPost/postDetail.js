import React from 'react'
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import logo_job from '../../../../Assets/logo-job.png'
import { useState } from 'react';
import { GetJobById } from '../../../../Service/userService';
import { getCanById, ApplyJob, getJobApplication } from '../../../../Service/jobService';
import { useEffect } from 'react';
import HeaderEmployer from "../../Themes/Header/headerEmployer";
import Footer from '../../Themes/Footer/footer';
import './post.scss';
import Rating from '@mui/material/Rating';

function PostDetail(props) {

    const navigate = useNavigate();
    const [jobDetail, setJobDetail] = useState([]);
    const [jobid, setjobid] = useState("");
    const [apply, setApply] = useState();
    const [applyRequest, setApplyRequest] = useState({ applicantId: '', jobId: '' });
    const [toggleTab, setToggleTab] = useState(1)

    useEffect(() => {

        const fetchData = async () => {
            const candidateId = sessionStorage.getItem("candidateId");
            setApplyRequest({
                applicantId: candidateId,
                jobId: jobid
            });
            console.log("setApplyRequest:", applyRequest);
        };

        fetchData();
        const searchParams = new URLSearchParams(window.location.search);
        setjobid(searchParams.get('jobid'));
        getJobDeatail();
    }, [jobid]);

    useEffect(() => {
        // Thực hiện hành động sau khi applyRequest đã được cập nhật
        console.log("setApplyRequest:", applyRequest);
        SetStatus();
    }, [applyRequest]);

    const SetStatus = async () => {
        let res = await getJobApplication(applyRequest.applicantId, applyRequest.jobId)
        console.log(res);
        if (res) {
            if (res.status === 0) {
                console.log(res.status);
                setApply(false);
            } else {
                console.log(res.status);
                setApply(true);
            }
        }
    }

    const getJobDeatail = async () => {
        let res = await GetJobById(jobid);
        if (res) {
            setJobDetail(res);
            // let date = moment('22/2001/02').format('DD/MM/YYYY')
            // console.log("check", date);
        }
        console.log("check", res);
    }

    // const ApplyHandler = async () => {
    //     const accountid = sessionStorage.getItem("id");
    //     if (accountid === null) {
    //         navigate("/login?jobid=" + jobid);
    //         return;
    //     }
    //     let app = await ApplyJob(applyRequest);
    //     console.log(app);
    //     if (app.message === "Huy ung tuyen") {
    //         setApply(true);
    //         toast.success("Hủy ứng tuyển thành công");
    //     } else {
    //         setApply(false);
    //         toast.success("Ứng tuyển thành công");
    //     }
    // }

    // const SaveJobHandler = async () => {
    //     toast.success("Bạn đã lưu công việc vào mục quan tâm");
    // }

    const toggleTabHandle = (index) => {
        setToggleTab(index)
    }
    return (
        <>
            <HeaderEmployer />
            {jobDetail && jobDetail.length > 0 && jobDetail.map((item, index) => {
                return (
                    <div className='container-all-1'>
                        <div className='container'>
                            <div className='post-detail-tabs'>
                                <div className={toggleTab === 1 ? "post-detail-tabs-item active-tab" : "post-detail-tabs-item"}
                                    onClick={() => toggleTabHandle(1)}
                                >Chi tiết tuyển dụng</div>
                                <div className={toggleTab === 2 ? "post-detail-tabs-item active-tab" : "post-detail-tabs-item"}
                                    onClick={() => toggleTabHandle(2)}>Ứng viên</div>
                                <div className={toggleTab === 3 ? "post-detail-tabs-item active-tab" : "post-detail-tabs-item"}
                                    onClick={() => toggleTabHandle(3)}>Đã tuyển</div>
                                <div className={toggleTab === 4 ? "post-detail-tabs-item active-tab" : "post-detail-tabs-item"}
                                    onClick={() => toggleTabHandle(4)}>Từ chối</div>
                                <div className={toggleTab === 5 ? "post-detail-tabs-item active-tab" : "post-detail-tabs-item"}
                                    onClick={() => toggleTabHandle(5)}>Ứng viên hủy</div>
                            </div>

                            <div className={toggleTab === 1 ? "job-detail" : "job-detail none-active-post-content"}>
                                <div className='job-detail-left'>
                                    <div className='box'>
                                        <div className='job-detail-left-name'>{item.title}</div>
                                        <div className='job-detail-left-top'>
                                            <div className='job-detail-left-top-item'>
                                                <i class="fa-solid fa-sack-dollar" id='job-detail-icon'></i>
                                                <div>
                                                    <div className='job-detail-title'>Mức lương</div>
                                                    <div className='job-detail-content'>{item.salary}vnđ</div>
                                                </div>
                                            </div>

                                            <div className='job-detail-left-top-item-1'>
                                                <i class="fa-solid fa-location-dot" id='job-detail-icon'></i>
                                                <div>
                                                    <div className='job-detail-title'>Địa điểm</div>
                                                    <div className='job-detail-content'>{item.location}</div>
                                                </div>
                                            </div>

                                            <div className='job-detail-left-top-item-1' >
                                                <i class="fa-regular fa-hourglass-half" id='job-detail-icon'></i>
                                                <div>
                                                    <div className='job-detail-title'>Kinh nghiệm</div>
                                                    <div className='job-detail-content'>1 năm</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='job-detail-left-top-due'><i class="fa-regular fa-clock"></i>  Hạn nộp: {moment(item.deadline).format('DD/MM/YYYY')}</div>
                                        {/* <div id='btn-job-detail'>
                                            {apply ? (
                                                <Button onClick={ApplyHandler} id='btn-apply' variant="success">Ứng tuyển ngay</Button>
                                            ) : (
                                                <Button onClick={ApplyHandler} id='btn-apply' variant="success">Hủy ứng tuyển</Button>
                                            )}

                                            <Button onClick={SaveJobHandler} id='btn-save' variant="outline-primary">Lưu công việc</Button>
                                            <ToastContainer />
                                        </div> */}
                                    </div>

                                    <div className='content'>
                                        <div className='content-detail'>
                                            <div className='content-detail-common'>Chi tiết tin tuyển dụng</div>
                                        </div>
                                        <div className='content-title'>Mô tả công việc</div>
                                        <div className='content-detail-job'>
                                            <ul>
                                                <li>Tiếp đón và hướng dẫn khách hàng: Bồi bàn chào đón khách, hỗ trợ họ trong việc chọn bàn, đưa thực đơn và giải đáp các câu hỏi về món ăn và thức uống.</li>
                                                <li>Ghi đơn và đặt hàng: Họ lắng nghe yêu cầu của khách hàng, ghi đơn và truyền đơn đến bếp hoặc quầy pha chế. Họ cũng phải đảm bảo rằng các món đồ uống và món ăn được gửi đúng cho khách hàng.</li>
                                            </ul>
                                        </div>

                                        <div className='content-title'>Yêu cầu</div>
                                        <div className='content-detail-job'>
                                            <ul>
                                                <li>Sinh viên.</li>
                                                <li>Kỹ năng giao tiếp:  Kỹ năng giao tiếp cơ bản bằng tiếng địa phương hoặc tiếng Anh có thể được yêu cầu, tùy theo vị trí làm việc.</li>
                                                <li>Khả năng làm việc trong môi trường nhanh chóng.</li>
                                                <li>Kiên nhẫn và thái độ tích cực.</li>
                                                <li>Kỹ năng tổ chức: Quản lý đơn đặt hàng, đồ uống và thực đơn đòi hỏi khả năng tổ chức tốt.</li>
                                            </ul>
                                        </div>

                                        <div className='content-title'>Quyền lợi</div>
                                        <div className='content-detail-job'>
                                            <ul>
                                                <li>Môi trường làm việc năng động.</li>
                                                <li>Có mức thu nhập hấp dẫn.</li>
                                            </ul>
                                        </div>

                                        <div className='content-title'>Địa điểm: <div className='content-title-item'> Hà Nội</div></div>

                                        <div className='content-title'>Hạn nộp: <div className='content-title-item'> 31/12/2023</div></div>

                                        {/* <div id='btn-job-submit'>
                                            {apply ? (
                                                <Button onClick={ApplyHandler} id='btn-apply-submit' variant="success">Ứng tuyển ngay</Button>
                                            ) : (
                                                <Button onClick={ApplyHandler} id='btn-apply-submit' variant="success">Hủy ứng tuyển</Button>
                                            )}
                                            <Button onClick={SaveJobHandler} id='btn-save-submit' variant="outline-primary">Lưu công việc</Button>
                                            <ToastContainer />
                                        </div> */}

                                        <div className='related-job'>
                                            <div className='content-detail'>
                                                <div className='content-detail-common'>Việc làm liên quan</div>
                                            </div>

                                            <div className='job-item'>
                                                <div className='job-item-left'>
                                                    <div><img id='company-logo' src={logo_job} alt="" /></div>
                                                    <div className='job-item-left-content'>
                                                        <div className='job-name'>Bồi bàn</div>
                                                        <div className='job-des'>
                                                            <div className='job-company'>VinGroup</div>
                                                            <div className='job-sumary'>
                                                                <div className='job-sumary-item'>Thời gian làm việc: 8h-10h</div>
                                                                <div className='job-sumary-item'>Nguyễn Chí Thanh, Hà Nội</div>
                                                            </div>
                                                            <div className='job-sumary-item'>Còn <span>20</span> ngày ứng tuyển</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='job-item-right'>
                                                    <div className='job-item-right-content'>
                                                        <div className='job-salary'>20,000/h</div>
                                                        <div id='btn-view-job'>
                                                            <Button href='/job-detail' id='btn-submit' variant="success">Ứng tuyển</Button>
                                                            <a href='/'><i id='btn-save-job' class="fa-regular fa-heart"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='job-item'>
                                                <div className='job-item-left'>
                                                    <div><img id='company-logo' src={logo_job} alt="" /></div>
                                                    <div className='job-item-left-content'>
                                                        <div className='job-name'>Bồi bàn</div>
                                                        <div className='job-des'>
                                                            <div className='job-company'>VinGroup</div>
                                                            <div className='job-sumary'>
                                                                <div className='job-sumary-item'>Thời gian làm việc: 8h-10h</div>
                                                                <div className='job-sumary-item'>Nguyễn Chí Thanh, Hà Nội</div>
                                                            </div>
                                                            <div className='job-sumary-item'>Còn <span>20</span> ngày ứng tuyển</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='job-item-right'>
                                                    <div className='job-item-right-content'>
                                                        <div className='job-salary'>20,000/h</div>
                                                        <div id='btn-view-job'>
                                                            <Button href='/job-detail' id='btn-submit' variant="success">Ứng tuyển</Button>
                                                            <a href='/'><i id='btn-save-job' class="fa-regular fa-heart"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='job-item'>
                                                <div className='job-item-left'>
                                                    <div><img id='company-logo' src={logo_job} alt="" /></div>
                                                    <div className='job-item-left-content'>
                                                        <div className='job-name'>Bồi bàn</div>
                                                        <div className='job-des'>
                                                            <div className='job-company'>VinGroup</div>
                                                            <div className='job-sumary'>
                                                                <div className='job-sumary-item'>Thời gian làm việc: 8h-10h</div>
                                                                <div className='job-sumary-item'>Nguyễn Chí Thanh, Hà Nội</div>
                                                            </div>
                                                            <div className='job-sumary-item'>Còn <span>20</span> ngày ứng tuyển</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='job-item-right'>
                                                    <div className='job-item-right-content'>
                                                        <div className='job-salary'>20,000/h</div>
                                                        <div id='btn-view-job'>
                                                            <Button href='/job-detail' id='btn-submit' variant="success">Ứng tuyển</Button>
                                                            <a href='/'><i id='btn-save-job' class="fa-regular fa-heart"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='job-detail-right'>
                                    <div className='job-company-detail'>
                                        <div className='job-company-box'>
                                            <div className='job-company-logo'>
                                                <div><img id='company-logo' src={logo_job} alt="" /></div>
                                            </div>
                                            <div className='job-company-name'>VinGroup</div>
                                        </div>
                                        <div className='job-company-address'>
                                            <div className='job-company-title'><i class="fa-solid fa-location-dot"></i> Địa điểm:</div>
                                            <div className='job-company-address-detail'>Cầu Giấy - Hà Nội</div>
                                        </div>

                                        <a className='job-company-go-detail' href='/company'>Xem trang công ty <i class="fa-solid fa-up-right-from-square"></i></a>
                                    </div>

                                    <div className='infomation-common'>
                                        <div className='infomation-common-title'>Thông tin chung</div>
                                        <div className='infomation-private'>
                                            <div className='job-company-title'><i class="fa-solid fa-medal" id='job-detail-icon'></i>Chức vụ</div>
                                            <div className='infomation-content'>Nhân viên</div>
                                        </div>

                                        <div className='infomation-private'>
                                            <div className='job-company-title'><i class="fa-regular fa-hourglass-half" id='job-detail-icon'></i>Kinh nghiệm</div>
                                            <div className='infomation-content'>1 năm</div>
                                        </div>

                                        <div className='infomation-private'>
                                            <div className='job-company-title'><i class="fa-solid fa-users" id='job-detail-icon'></i>Số lượng tuyển</div>
                                            <div className='infomation-content'>10</div>
                                        </div>

                                        <div className='infomation-private'>
                                            <div className='job-company-title'><i class="fa-solid fa-briefcase" id='job-detail-icon'></i>Hình thức làm việc</div>
                                            <div className='infomation-content'>Bán thời gian</div>
                                        </div>

                                        <div className='infomation-private'>
                                            <div className='job-company-title'><i class="fa-solid fa-venus-mars" id='job-detail-icon'></i>Giới tính</div>
                                            <div className='infomation-content'>Không yêu cầu</div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className={toggleTab === 2 ? "post-detail-candidate" : "post-detail-candidate none-active-post-content"}>
                                <div className="candidate-manage-item-job-cv" >
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-user-check"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-regular fa-heart"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-ban"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv" >
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-user-check"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-regular fa-heart"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-ban"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv" >
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-user-check"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-regular fa-heart"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-ban"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv" >
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-user-check"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-regular fa-heart"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-ban"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv" >
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-user-check"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-regular fa-heart"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-ban"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv" >
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-user-check"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-regular fa-heart"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-ban"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={toggleTab === 3 ? "post-detail-candidate" : "post-detail-candidate none-active-post-content"}>
                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <Rating name="half-rating" defaultValue={0} precision={0.5} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <Rating name="half-rating" defaultValue={0} precision={0.5} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <Rating name="half-rating" defaultValue={0} precision={0.5} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={toggleTab === 4 ? "post-detail-candidate" : "post-detail-candidate none-active-post-content"}>
                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <div className="candidate-cancel-btn">
                                                    <div><Button id="candidate-cancel-btn" variant="danger">Bỏ qua</Button></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <div className="candidate-cancel-btn">
                                                    <div><Button id="candidate-cancel-btn" variant="danger">Bỏ qua</Button></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <div className="candidate-cancel-btn">
                                                    <div><Button id="candidate-cancel-btn" variant="danger">Bỏ qua</Button></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={toggleTab === 5 ? "post-detail-candidate" : "post-detail-candidate none-active-post-content"}>
                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <div className="candidate-cancel-btn">
                                                    <div><Button id="candidate-cancel-btn" variant="warning">Xem lý do hủy</Button></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <div className="candidate-cancel-btn">
                                                    <div><Button id="candidate-cancel-btn" variant="warning">Xem lý do hủy</Button></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <div className="candidate-cancel-btn">
                                                    <div><Button id="candidate-cancel-btn" variant="warning">Xem lý do hủy</Button></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <div className="candidate-cancel-btn">
                                                    <div><Button id="candidate-cancel-btn" variant="warning">Xem lý do hủy</Button></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            }
            <Footer />
        </>
    )
}

export default PostDetail;
