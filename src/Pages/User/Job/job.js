import React, { Component } from "react";
import Slider from "react-slick";
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import logo_job from '../../../Assets/logo-job.png'
import { useState } from "react";
import { useEffect } from "react";
import { GetAllJob } from "../../../Service/userService";
import { searchAllJobDetail } from "../../../Service/jobService";
import { Xemtatca, ViecLamGanBanNhat } from "../../../Service/jobDetailService";
import Footer from "../Themes/Footer/footer";
import Header from "../Themes/Header/header";
import { CareJob, GetJobCare } from '../../../Service/jobService';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import { getCity } from '../../../Service/candidateService';
import { GetAllCate, GetAllJobType } from '../../../Service/searchService';
const Job = () => {
    const [listJob, setListJob] = useState([]);
    //const [searchJob, setListJobSearch] = useState([]);
    const [listcate, setlistcate] = useState([]);
    const [listjobType, setListjobType] = useState([]);
    const [title, setTitle] = useState();
    const [title1, setTitle1] = useState();
    const [location, setLocation] = useState();
    const [jobName, setJobName] = useState();
    const [url, setUrl] = useState('');
    const [listJobCare, setListJobCare] = useState([]);
    const [cid, setCid] = useState('');
    const [applyRequest, setApplyRequest] = useState({ applicantId: '', jobId: '' });
    const navigate = useNavigate();
    const [city, setCity] = useState([]);
    const [hasRun, setHasRun] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCity(1);
                console.log("City", res);
                setCity(res);
            } catch (error) {
                console.error("Error fetching city:", error);
            }
        };
        fetchData();
        getCate();
        getJobtype();
        // getJobs();
        if (sessionStorage.getItem("candidateId")) {
            setCid(sessionStorage.getItem("candidateId"));
            getJobsCare();
        }
    }, [])

    const getCate = async () => {
        let res = await GetAllCate();
        setlistcate(res);
    }
    const getJobtype = async () => {
        let res = await GetAllJobType();
        setListjobType(res);
    }

    const getJobsCare = async () => {
        const candidateId = sessionStorage.getItem("candidateId");
        let res = await GetJobCare(candidateId);
        if (res) {
            setListJobCare(res);
        }
        console.log("check", res);
    }

    const settings_1 = {
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        // Kiểm tra và chạy một lần duy nhất
        if (searchParams.get('listjob')) {
            if (searchParams.get('listjob') === "ViecLamGanBanNhat") {
                Ganbannhat();
            } else {
                XemAll(searchParams.get('listjob'));
            }
        } else {
            handleSearch();
        }
        // Đặt biến đánh dấu thành true để ngăn chạy lại

    }, []);

    const handleSearch = async () => {
        if (!hasRun) {
            const searchParams = new URLSearchParams(window.location.search);
            if (searchParams.get('title') && searchParams.get('title').length > 0) {
                setTitle(searchParams.get('title'));
                console.log("searchParams", searchParams.get('title'));
            }
            if (searchParams.get('location') && searchParams.get('location').length > 0) {
                setLocation(searchParams.get('location'));
                console.log("searchParams", searchParams.get('location'));
            }
            if (searchParams.get('jobName') && searchParams.get('jobName').length > 0) {
                setJobName(searchParams.get('jobName'));
                console.log("searchParams", searchParams.get('jobName'));
            }
            let jobDetails = await searchAllJobDetail(searchParams.get('title'), searchParams.get('location'), searchParams.get('jobName'));
            if (jobDetails) {
                setListJob(jobDetails);
            }
            setHasRun(true);
        } else {
            console.log("nhay vao search");
            try {
                let jobDetails = await searchAllJobDetail(title, location, jobName);
                setJobName("");
                setLocation("");
                console.log("title x ", title);
                console.log("title1", title1);
                console.log("location x", location);
                console.log("jobName x", jobName);
                if (jobDetails) {
                    setListJob(jobDetails);
                }
                console.log('Job details:', jobDetails);
            } catch (error) {
                // Handle errors if any
                console.error(error);
            }
        }

    };
    const SaveJobHandler = async (jid) => {
        const candidateId = sessionStorage.getItem("candidateId");
        if (candidateId === null) {
            navigate("/login");
            return;
        }
        applyRequest.applicantId = candidateId;
        applyRequest.jobId = jid;
        console.log("setApplyRequest:", applyRequest);
        await CareJob(applyRequest);
        toast.success("Bạn đã lưu công việc vào mục quan tâm");
    }
    const XemAll = async (title) => {
        let res = await Xemtatca(title);
        setListJob(res);
        console.log(res);
    }
    const Ganbannhat = async () => {
        let res = await ViecLamGanBanNhat(sessionStorage.getItem("candidateId"));
        setListJob(res);
    }
    const [selectedOption, setSelectedOption] = useState(null);

    const options = listjobType.map(item => ({ value: item.id, label: item.nameType }));

    const handleInputChange = (newValue) => {
        setTitle1(newValue);
        console.log("newValue1-1:", newValue);
    };

    const handleSelectChange = (selectedOption) => {
        setTitle(selectedOption.label);
        setSelectedOption(selectedOption);
        console.log("newValue2:", title);
        console.log("newValue2-2:", selectedOption.label);
    };
    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '450px',
            marginTop: '0px',
            margin: '0px 20px 0px 0px' // Đặt chiều dài mong muốn của Select
        }),
    };
    return (
        <div className='container-all'>
            <Header />
            <div className="container">
                <div className="job-div-homepage">
                    <div className="home-form">
                        <div className="home-dspan-ant-select">
                            <Form>
                                <Select
                                    placeholder='Việc làm, công ty muốn tìm'
                                    options={options}
                                    onInputChange={handleInputChange}
                                    onChange={handleSelectChange}
                                    value={selectedOption}
                                    styles={customStyles}
                                />
                            </Form>
                        </div>
                        <div className="home-div-ant-row-wrapper" style={{marginLeft: '-10px'}}> 
                            <div className="home-div-ant-row">
                                <div className="home-div-wrapper">
                                    <div className="home-div-ant-form-item">
                                        <div className="home-div">
                                            <div className="home-div-ant-select-2">
                                                <Form.Select aria-label="Default select example" id="home-div-ant-select-3"
                                                    name="city"
                                                    value={jobName}
                                                    onChange={event => setJobName(event.target.value)}
                                                    required
                                                >
                                                    <option id='home-tiltle' style={{ display: "none", color: "#444" }}>Các ngành nghề</option>
                                                    {listcate && listcate.length > 0 &&
                                                        listcate.map((item1, index1) => {
                                                            return (
                                                                <option value={item1.name}>
                                                                    {item1.name}
                                                                </option>
                                                            )
                                                        })}
                                                </Form.Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="home-div-ant-col-2">
                            <div className="home-div-ant-row">
                                <div className="home-div-ant-col-3">
                                    <div className="home-div-ant-form-item">
                                        <div className="home-div-ant-form-item-2">
                                            <div className="home-div-ant-select-2">
                                                <Form.Select aria-label="Default select example" id="home-div-ant-select-3"
                                                    name="city"
                                                    value={location}
                                                    onChange={event => setLocation(event.target.value)}
                                                    required
                                                >
                                                    <option id='home-tiltle' style={{ display: "none", color: "#444" }}>Địa điểm</option>
                                                    {city && city.length > 0 &&
                                                        city.map((item1, index1) => {
                                                            return (
                                                                <option value={item1.name}>
                                                                    {item1.name}
                                                                </option>
                                                            )
                                                        })}
                                                </Form.Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="home-div-ant-col-2" style={{marginLeft: '10px'}}>
            <div className="home-div-ant-row">
              <div className="home-div-ant-col-3">
                <div className="home-div-ant-form-item">
                  <div className="home-div-ant-form-item-2">
                    <div className="home-div-ant-select-2">
                      <Form.Select aria-label="Default select example" id="home-div-ant-select-3"
                        // name="city"
                        // value={location}
                        // onChange={event => setLocation(event.target.value)}
                        // required
                      >
                        <option id='home-tiltle' style={{ display: "none", color: "#444" }}>Loại lương</option>
                        {/* {ViecLamSinhVien && ViecLamSinhVien.length > 0 &&
                          ViecLamSinhVien.map((item1, index1) => {
                            return ( */}
                              <option value="0">Ca</option>
                              <option value="0">Giờ</option>
                              <option value="0">Ngày</option>
                            {/* )
                          })} */}
                      </Form.Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
                        <div className="home-div-banner-search-wrapper">
                            <div className="home-div-banner-search">
                                <button className="home-button">
                                    <div className="home-text-wrapper-3"><a onClick={handleSearch}>Tìm kiếm</a></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="all-job-list">
                    <div className="all-job-list-top">
                        <div className="all-job-list-top-item">Kết quả tìm kiếm <span>{listJob.length || 0}</span> tin đăng</div>
                        <Form.Select id="all-job-top-select">
                            <option style={{ display: "none" }}>Ngày đăng mới nhất</option>
                            <option value="1">Mới nhất</option>
                            <option value="2">Một tuần trước</option>
                            <option value="3">Hai tuần trước</option>
                            <option value="3">Một tháng trước</option>
                            <option value="3">Hai tháng trước</option>
                            <option value="3">Cũ hơn</option>
                        </Form.Select>
                    </div>

                    <div className="all-job-list-item">
                        {listJob && listJob.length > 0 &&
                            listJob.map((item, index) => {
                                let count = 0;
                                return (
                                    <div className="job-list-detail">
                                        <div className='job-list-item'>
                                            <div className='job-list-item-left'>
                                                <div className="job-list-logo">
                                                    <img id='company-logo' src={logo_job} alt="" />
                                                </div>
                                                <div className='job-list-item-left-content'>
                                                    <div className='job-list-name'><a href={`/job-detail?jobid=${item.id}`}>{item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}</a></div>

                                                    <div className='job-list-des'>
                                                        <div className='job-list-company'>{item.company}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='job-list-item-right'>
                                                <div className='job-list-item-right-content'>
                                                    {listJobCare && listJobCare.length > 0 &&
                                                        listJobCare.map((item1, index1) => {
                                                            if (item1.id === item.id) {
                                                                count = 1;
                                                                return (
                                                                    <i onClick={() => SaveJobHandler(item.id)} id="btn-list-save-job" class="fas fa-heart text-success icon"></i>
                                                                )
                                                            } else if (index1 === listJobCare.length - 1 && count === 0) {
                                                                return (
                                                                    <i onClick={() => SaveJobHandler(item.id)} id='btn-list-save-job' class="fa-regular fa-heart icon"></i>
                                                                )
                                                            }
                                                        })
                                                    }
                                                    {listJobCare.length === 0 ? (
                                                        <i onClick={() => SaveJobHandler(item.id)} id='btn-list-save-job' class="fa-regular fa-heart icon"></i>
                                                    ) : (null)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='job-list-sumary'>
                                            <div className='job-list-sumary-item'>Thời gian làm việc: {item.jobTime}</div>
                                            <div className='job-list-sumary-item'>{item.location}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {/* <div style={{ backgroundColor: '#fff', marginBottom: '-10px' }}>
                <div className="container">
                    <div className='home-employer'>Ngành nghề nổi bật</div>
                </div>

                <div className='container' style={{ paddingBottom: '50px' }}>
                    <Slider {...settings_1}>
                        <div className="">
                            <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
                        </div>

                        <div className="">
                            <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
                        </div>

                        <div className="">
                            <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
                        </div>

                        <div className="">
                            <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
                        </div>

                        <div className="">
                            <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
                        </div>

                        <div className="">
                            <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
                        </div>

                        <div className="">
                            <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
                        </div>

                        <div className="">
                            <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
                        </div>

                        <div className="">
                            <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
                        </div>

                        <div className="">
                            <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
                        </div>

                        <div className="">
                            <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
                        </div>

                        <div className="">
                            <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
                        </div>

                        <div className="">
                            <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
                        </div>

                        <div className="">
                            <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
                        </div>

                        <div className="">
                            <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
                        </div>
                    </Slider>
                </div>
            </div>
            <div>
                <img id='home-sp' src='https://previews.123rf.com/images/robuart/robuart1605/robuart160500292/57494709-support-banner-concept-design-flat-style-poster-or-a-banner-of-support-and-technical-advising-for.jpg' />
            </div> */}
            <Footer />
        </div >
    )
}

export default Job;