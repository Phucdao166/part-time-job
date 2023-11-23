import Header from "../../Themes/Header/header";
import SideBar from "../MangementPage/sidebar";
import Rating from '@mui/material/Rating'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './candidateManage.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import logo_job from '../../../../Assets/logo-job.png'
import { getAllCandidateApplyJobzzzzz } from '../../../../Service/employService';
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';
import { SetinterviewCandidate, SelectOptionInterviewByEmp, GetListCandidateInterviewByEid } from '../../../../Service/interviewService';

function CandidateManage() {
    const [toggleTab, setToggleTab] = useState(1)
    let [listCandidate, setListCan] = useState([]);
    useEffect(() => {
        getAllCandidateApply();
    }, []);


    const getAllCandidateApply = async () => {
        let res = await getAllCandidateApplyJobzzzzz();
        console.log("res11", res);
        if (res) {
            setListCan(res);
            console.log("listCandidate", listCandidate)
        }
    }


    const toggleTabHandle = (index) => {
        setToggleTab(index)
    }
    // --------------------------------phỏng vấn-----------------------------------
    const [emid, setEmid] = useState(sessionStorage.getItem("employerId"));
    const [listJobInterview, setlistJobInterview] = useState([]);
    const [select, setSelect] = useState([]);
    const [inter, setinter] = useState();
    const [load, setLoad] = useState();

    useEffect(() => {
        Select();
        getJobInterview();
    }, [load])
    const Select = async () => {
        let res = await SelectOptionInterviewByEmp(emid);
        if (res) {
            setSelect(res);
        }
        console.log("SelectOptionInterviewByEmp", res);
    }
    const getJobInterview = async () => {
        let res = await GetListCandidateInterviewByEid(emid, 4);
        if (res) {
            setlistJobInterview(res);
        }
        console.log("GetListCandidateInterviewByEid", res);
        console.log("Jobdetai", res);
        console.log("candiate", res);
    }
    const AddInterview = async (cid, jobid) => {
        await SetinterviewCandidate(cid, selectedValues[inter], jobid);
        setLoad(cid);
        console.log("selectedValues", selectedValues[inter]);
        toast.success("Tạo phỏng vấn thành công");
    }
    const [selectedValues, setSelectedValues] = useState(Array(select.length).fill(''));

    // Xử lý sự kiện khi giá trị của một Form.Select thay đổi
    const handleSelectChange = (event, index) => {
        // Tạo một bản sao của mảng state
        setinter(index);
        const newSelectedValues = [...selectedValues];
        // Cập nhật giá trị đã chọn cho Form.Select tại vị trí index
        newSelectedValues[index] = event.target.value;
        // Cập nhật state
        setSelectedValues(newSelectedValues);
    };
    return (
        <>
            <Header />
            <div className="employer-page">
                <div className="employer-page-sidebar">
                    <SideBar />
                </div>

                <div className="employer-page-content">
                    <div className="post-btn-control">
                        <div className="post-btn-control-item">
                            <div className={toggleTab === 1 ? "post-btn post-btn-active" : "post-btn"} onClick={() => toggleTabHandle(1)}>Chờ duyệt</div>
                            <div className={toggleTab === 2 ? "post-btn post-btn-active" : "post-btn"} onClick={() => toggleTabHandle(2)}>Đã tuyển</div>
                            <div className={toggleTab === 3 ? "post-btn post-btn-active" : "post-btn"} onClick={() => toggleTabHandle(3)}>Từ chối</div>
                            <div className={toggleTab === 4 ? "post-btn post-btn-active" : "post-btn"} onClick={() => toggleTabHandle(4)}>Phỏng vấn</div>
                            <div className={toggleTab === 5 ? "post-btn post-btn-active" : "post-btn"} onClick={() => toggleTabHandle(5)}>Ứng viên hủy</div>
                        </div>
                    </div>

                    <div className={toggleTab === 1 ? "candidate-manage-item" : "candidate-manage-item none-active-post-content"}>
                        <div className="candidate-manage-item-job">
                            <div className="candidate-manage-item-job-name">
                                Tuyển nhân viên bán hàng
                            </div>

                            <div className="candidate-manage-list-cv">
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
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-user-check"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-regular fa-heart"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-ban"></i></a>
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
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-user-check"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-regular fa-heart"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-ban"></i></a>
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
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-user-check"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-regular fa-heart"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-ban"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="candidate-manage-item-job">
                            <div className="candidate-manage-item-job-name">
                                Tuyển shipper
                            </div>

                            <div className="candidate-manage-list-cv">
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
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-user-check"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-regular fa-heart"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-ban"></i></a>
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
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-user-check"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-regular fa-heart"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-ban"></i></a>
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
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-user-check"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-regular fa-heart"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-ban"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="candidate-manage-item-job">
                            <div className="candidate-manage-item-job-name">
                                Tuyển nhân viên rửa bát
                            </div>

                            <div className="candidate-manage-list-cv">
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
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-user-check"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-regular fa-heart"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-ban"></i></a>
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
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-user-check"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-regular fa-heart"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-ban"></i></a>
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
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-user-check"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-regular fa-heart"></i></a>
                                                <a><i id='candidate-manage-cv-icon' class="fa-solid fa-ban"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={toggleTab === 2 ? "candidate-recruited" : "candidate-recruited none-active-post-content"}>
                        <div className="candidate-manage-item">
                            <div className="candidate-manage-item-job">
                                <div className="candidate-manage-item-job-name">
                                    Tuyển nhân viên bán hàng
                                </div>

                                <div className="candidate-manage-list-cv">
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
                            </div>

                            <div className="candidate-manage-item-job">
                                <div className="candidate-manage-item-job-name">
                                    Tuyển shipper
                                </div>

                                <div className="candidate-manage-list-cv">
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
                            </div>

                            <div className="candidate-manage-item-job">
                                <div className="candidate-manage-item-job-name">
                                    Tuyển nhân viên rửa bát
                                </div>

                                <div className="candidate-manage-list-cv">
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
                            </div>
                        </div>
                    </div>

                    <div className={toggleTab === 3 ? "candidate-reject" : "candidate-reject none-active-post-content"}>
                        <div className="candidate-manage-item">
                            <div className="candidate-manage-item-job">
                                <div className="candidate-manage-item-job-name">
                                    Tuyển nhân viên bán hàng
                                </div>

                                <div className="candidate-manage-list-cv">
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

                            <div className="candidate-manage-item-job">
                                <div className="candidate-manage-item-job-name">
                                    Tuyển shipper
                                </div>

                                <div className="candidate-manage-list-cv">
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

                            <div className="candidate-manage-item-job">
                                <div className="candidate-manage-item-job-name">
                                    Tuyển nhân viên rửa bát
                                </div>

                                <div className="candidate-manage-list-cv">
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
                    </div>

                    {/* ---------------------------------------------------------------------------Phỏng vấn ------------------------------------------------------ */}
                    <div className={toggleTab === 4 ? "candidate-interview" : "candidate-interview none-active-post-content"}>
                        <div className="candidate-manage-item">
                            {listJobInterview && listJobInterview.length > 0 &&
                                listJobInterview.map((item, index) => {
                                    return (
                                        (item && item.length > 0) ? (
                                            <div className="candidate-manage-item-job">
                                                <div className="candidate-manage-item-job-name">
                                                    {item && item.length > 0 &&
                                                        item.slice(0, 1).map((item4, index3) => {
                                                            return (
                                                                <a>{item4.job.title}</a>
                                                            )
                                                        })}
                                                </div>
                                                {item && item.length > 0 &&
                                                    item.map((item2, index2) => {
                                                        return (
                                                            <div className="candidate-manage-list-cv">
                                                                <div className="candidate-manage-item-job-cv">
                                                                    <div className='job-list-item'>
                                                                        <div className='candidate-manage-item-left'>
                                                                            <div className="job-list-logo">
                                                                                <img id='company-logo' src={logo_job} alt="" />
                                                                            </div>
                                                                            <div className='job-list-item-left-content'>
                                                                                <div className='candidate-manage-item-job-cv-name'><a>{item2.applicant.account.fullName}</a></div>
                                                                                <div className='job-list-des'>
                                                                                    <div className='job-list-company'>{item2.applicant.distric}-{item2.applicant.city}</div>
                                                                                </div>
                                                                                <div className='job-list-des'>
                                                                                    <div className='job-list-company'>Ngày sinh:{format(new Date(item2.applicant.dob), 'dd-MM-yyyy')}</div>
                                                                                </div>
                                                                                <div className='job-list-des'>
                                                                                    <div className='job-list-company'>Liên hệ: {item2.applicant.phone}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='candidate-manage-item-right'>
                                                                            <div className='candidate-manage-item-right-content'>
                                                                                <div className="candidate-cancel-btn">
                                                                                    <Form.Select
                                                                                        aria-label="Default select example"
                                                                                        id={`interview-select-${index}${index2}`}
                                                                                        onChange={(e) => handleSelectChange(e, index + "" + index2)}
                                                                                        value={selectedValues[index + "" + index2]}>
                                                                                        <option style={{ display: "none" }}>Chọn Lịch</option>
                                                                                        {select && select.length > 0 &&
                                                                                            select.map((item1, index1) => {
                                                                                                return (
                                                                                                    <option value={item1.id}>Mã lịch : #{item1.id}</option>
                                                                                                )
                                                                                            })}
                                                                                    </Form.Select>
                                                                                    <td><Button style={{ fontSize: 13 }} variant="primary" onClick={() => AddInterview(item2.applicantId, item2.jobId)}>Tạo lịch phỏng vấn</Button></td>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        ) : (null)
                                    )
                                })}
                        </div>
                        <ToastContainer />
                    </div>
                    {/* ---------------------------------------------------------------------------------------------------------------------------------------- */}

                    <div className={toggleTab === 5 ? "candidate-cancel" : "candidate-cancel none-active-post-content"}>
                        <div className="candidate-manage-item">
                            <div className="candidate-manage-item-job">
                                <div className="candidate-manage-item-job-name">
                                    Tuyển nhân viên bán hàng
                                </div>

                                <div className="candidate-manage-list-cv">
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
                            </div>

                            <div className="candidate-manage-item-job">
                                <div className="candidate-manage-item-job-name">
                                    Tuyển shipper
                                </div>

                                <div className="candidate-manage-list-cv">
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
                            </div>

                            <div className="candidate-manage-item-job">
                                <div className="candidate-manage-item-job-name">
                                    Tuyển nhân viên rửa bát
                                </div>

                                <div className="candidate-manage-list-cv">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CandidateManage;