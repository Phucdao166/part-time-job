import Header from "../../Themes/Header/header";
import require_icon from '../../../../Assets/require.png'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useEffect } from "react";
import { createPost , createPosttinhanp} from '../../../../Service/employService'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import HeaderEmployer from "../../Themes/Header/headerEmployer";
import { getCity } from '../../../../Service/candidateService';
import { GetAllCate, GetAllJobType, GetAllJobTypeByCate } from '../../../../Service/searchService';
function CreatePost() {
    const [empid, setEid] = useState(sessionStorage.getItem('employerId'));
    const [isAccepted, setIsAccepted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const currentDate = new Date().toISOString().split('T')[0];
    const navigate = useNavigate();
    const [listjobType, setListjobType] = useState([]);
    const [city, setCity] = useState([]);
    const [distric, setDistric] = useState([]);
    const [RegisterRequest, setRegisterRequest] = useState({ city: '', district: '' });
    const [listcate, setlistcate] = useState([]);
    const [loading, Setloading] = useState();
    const [error, setError] = useState('');
    const [formInputEmp, setFormInput] = useState({
        // "title": "job 4",
        title: "",
        employerId: empid,
        description: "",
        salary: "",
        location: "",
        deadline: "2023-11-11T16:03:01.812Z",
        createdAt: "2023-11-11T16:03:01.812Z",
        jobTime: "",
        checktypejob: 0,
        status: 0,
        jobTypeId: 1,
        experient: "Không yêu cầu",
        rolecompany: 0,
        numberApply: 0,
        typeJob: 0,
        daywork: "2023-11-11T16:03:01.812Z",
        note: "",
        dob: 0,
        toage: 0,
        levellearn: "Không yêu cầu",
        fromage: 0,
        welfare: "",
        moredesciption: "",
        typename: 0,
        agreesalary: "",
        company: "",
        typeSalary: ""
    });
    const [formInputtinnhap, setFormInputinnhap] = useState({
        // "title": "job 4",
        title: "",
        employerId: empid,
        description: "",
        salary: "",
        location: "",
        deadline: "2023-11-11T16:03:01.812Z",
        createdAt: "2023-11-11T16:03:01.812Z",
        jobTime: "",
        checktypejob: 0,
        status: 4,
        jobTypeId: 1,
        experient: "Không yêu cầu",
        rolecompany: 0,
        numberApply: 0,
        typeJob: 0,
        daywork: "2023-11-11T16:03:01.812Z",
        note: "",
        dob: 0,
        toage: 0,
        levellearn: "Không yêu cầu",
        fromage: 0,
        welfare: "",
        moredesciption: "",
        typename: 0,
        agreesalary: "",
        company: "",
        typeSalary: ""
    });
    useEffect(() => {
        // const employid = sessionStorage.getItem("employId");
        console.log("empid", empid);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCity(3);
                console.log("City", res);
                setCity(res);
            } catch (error) {
                console.error("Error fetching city:", error);
            }
        };
        fetchData();
        getCate();
        getJobtype();
    }, [loading]);
    const getCate = async () => {
        let res = await GetAllCate();
        setlistcate(res);
    }
    const getJobtype = async (typeId) => {
        let res = await GetAllJobType();
        console.log("jobype", res);
        setListjobType(res);
    }
    const getJobtype1 = async (typeId) => {
        let res = await GetAllJobTypeByCate(typeId);
        console.log("GetAllJobTypeByCate", res);
        setListjobType(res);
    }

    const handleChange1 = async (e) => {
        const { name, value } = e.target;
        await setRegisterRequest({ ...RegisterRequest, [name]: value });
        const selectedCity = city.find((item) => item.name === value);
        if (selectedCity) {
            setDistric(selectedCity.districts);
        }
        console.log("Updated districts", distric);
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        await setRegisterRequest({ ...RegisterRequest, [name]: value });
    };
    // const handleEmployInput = (name, value) => {
    //     setFormInput({ ...formInputEmp, [name]: value });
    // };
    const handleEmployInput = (name, value) => {
        // Cập nhật giá trị vào đối tượng formInputEmp
        setFormInput((prevFormInputEmp) => ({
            ...prevFormInputEmp,
            [name]: value,
        }));
        setError(''); // Clear the error message
    };
    const handleEmployInput1 = (name, value) => {
        // Cập nhật giá trị vào đối tượng formInputEmp
        setFormInput((prevFormInputEmp) => ({
            ...prevFormInputEmp,
            [name]: value,
        }));
        console.log("Cate", value);
        getJobtype1(value);
    };

    useEffect(() => {
        const isFormValid =
            formInputEmp.title !== "" &&
            formInputEmp.description !== "" &&
            formInputEmp.welfare !== "" &&
            formInputEmp.employerId !== null &&
            formInputEmp.salary !== "" &&
            formInputEmp.location !== "" &&
            formInputEmp.deadline !== null &&
            formInputEmp.createdAt !== "" &&
            formInputEmp.jobTime !== "" &&
            formInputEmp.status !== null &&
            formInputEmp.jobTypeId !== null &&
            formInputEmp.numberApply !== null &&
            formInputEmp.daywork !== "" &&
            formInputEmp.note !== "" &&
            formInputEmp.toage !== null &&
            formInputEmp.fromage !== null &&
            formInputEmp.moredesciption !== "" &&
            formInputEmp.typename !== null &&
            formInputEmp.company !== "" &&
            formInputEmp.typeSalary !== "";

        setIsFormValid(isFormValid);
        if (formInputEmp.typeJob !== 0) {
            formInputEmp.daywork = getSelectedDaysString();
        }
        console.log("formInputEmp.daywork", formInputEmp.daywork);
        console.log("formInputEmp", formInputEmp);
    }, [formInputEmp]);

   const handleSubmitinnhap = async (event) =>{
    const creatPostNew = await createPosttinhanp(formInputtinnhap);
                console.log("newpostnhap", creatPostNew);
                if (creatPostNew) {
                    setFormInputinnhap(creatPostNew);
                    //toast.success("Tạo công việc thành công!");
                    navigate("/post-wrap?toast=1");
                } else {
                    console.log("API call failed");
                    toast.error("Đã xảy ra lỗi trong quá trình tạo công việc!");
                }
   }
    const handleSubmit = async (event) => {

        console.log("formInputEmp", formInputEmp);
        event.preventDefault();

        if (!isFormValid) {
            console.log("Invalid form");
            navigate("/add-post");
            toast.error("Vui lòng điền đầy đủ thông tin!");
        } else {
            try {
                if (formInputEmp.location && formInputEmp.location.length > 0) {
                    formInputEmp.location = formInputEmp.location + "," + RegisterRequest.district + "," + RegisterRequest.city
                    console.log("formInputEmp.location", formInputEmp.location);
                }else if (formInputEmp.fromage < formInputEmp.toage) {
                    setError('The "fromage" value must be greater than the "toage" value.');
                    return;
                  }
                else {
                    formInputEmp.location = RegisterRequest.district + "," + RegisterRequest.city
                }
                console.log("formInputEmp", formInputEmp);
                const creatPostNew = await createPost(formInputEmp);
                console.log("creatPostNew", creatPostNew);

                if (creatPostNew) {
                    setFormInput(creatPostNew);
                    //toast.success("Tạo công việc thành công!");

                    navigate("/post-manage?toast=1");
                } else {
                    console.log("API call failed");
                    toast.error("Đã xảy ra lỗi trong quá trình tạo công việc!");
                }
            } catch (error) {
                console.log("API call error:", error);
                toast.error("Đã xảy ra lỗi trong quá trình tạo công việc!");
            }
        }
    };

    const [selectedDays, setSelectedDays] = useState([]);

    const handleEmployInputx = (name, value) => {
        const updatedDays = selectedDays.includes(value)
            ? selectedDays.filter(day => day !== value)
            : [...selectedDays, value];

        setSelectedDays(updatedDays);
    };

    const getSelectedDaysString = () => {
        return selectedDays.join(',');
    };

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }
    );

    console.log("VN", VND.format("200454"))

    return (

        <>
            <HeaderEmployer />
            <div className="employer-page">
                <div className="create-post-content">
                    <div className="create-post">
                        <div className="create-post-top">Tạo bài đăng</div>
                        <div className="create-post-choose-role">                          
                            <div className="create-post-title">Tên cửa hàng/Công ty<img id='require-icon' src={require_icon} alt="" /></div>
                            <Form.Control
                                id="create-post-title"
                                type="text"
                                placeholder="Bơ Bán Bò"
                                name="company"
                                onChange={({ target }) => {
                                    handleEmployInput(target.name, target.value);
                                }}
                                value={formInputEmp.company}
                            />
                        </div>
                    </div>
                    <div className="create-post-info">
                        <div>
                            <div className="create-post-title">Tiêu đề tin tuyển dụng<img id='require-icon' src={require_icon} alt="" /></div>
                            <Form.Control
                                id="create-post-title"
                                type="text"
                                placeholder="Nhân viên bán hàng"
                                name="title"
                                onChange={({ target }) => {
                                    handleEmployInput(target.name, target.value);
                                }}
                                value={formInputEmp.title}
                            />
                        </div>
                        <div className="create-post-info-job">
                            <div className="create-post-info-job-left">
                                <div className="create-post-title">Ngành nghề đăng tuyển<img id='require-icon' src={require_icon} alt="" /></div>
                                <Form.Select aria-label="Default select example"
                                    id="create-post-select"
                                    name="typename"
                                    onChange={({ target }) => {
                                        handleEmployInput1(target.name, target.value);
                                    }}
                                    required
                                >
                                    <option id='home-tiltle' style={{ display: "none", color: "#444" }}>Các ngành nghề</option>
                                    {listcate && listcate.length > 0 &&
                                        listcate.map((item1, index1) => {
                                            return (
                                                <option value={item1.id}>
                                                    {item1.name}
                                                </option>
                                            )
                                        })}
                                </Form.Select>
                                <div className="create-post-title">Loại công việc<img id='require-icon' src={require_icon} alt="" /></div>
                                <Form.Select aria-label="Default select example"
                                    id="create-post-select"
                                    name="jobTypeId"
                                    onChange={({ target }) => {
                                        handleEmployInput(target.name, target.value);
                                    }}
                                    required
                                >
                                    <option id='home-tiltle' style={{ display: "none", color: "#444" }}>Loại công việc</option>
                                    {listjobType && listjobType.length > 0 &&
                                        listjobType.map((item1, index1) => {
                                            return (
                                                <option value={item1.id}>
                                                    {item1.nameType}
                                                </option>
                                            )
                                        })}
                                </Form.Select>
                                <div className="create-post-choose-role">
                                    <div className="create-post-title">Mức lương<img id='require-icon' src={require_icon} alt="" /></div>
                                    <div className="create-post-role">
                                        <div className="create-post-role-radio"><input type="number" name="salary" onChange={({ target }) => {
                                            let value = target.value;
    
                                            // Loại bỏ số 0 ban đầu nếu có
                                            if (value.length > 0 && value[0] === '0') {
                                              value = value.slice(1);
                                            }
                                            
                                            // Kiểm tra và không cho phép giá trị âm
                                            if (value < 0) {
                                              value = '';
                                            }
                                            handleEmployInput(target.name, value);
                                        }}
                                            placeholder=""
                                            value={formInputEmp.salary}
                                        />
                                            <div className="create-post-role">
                                                <div className="create-post-role-radio"><input type="radio"
                                                    name="typeSalary"
                                                    onChange={({ target }) => {
                                                        handleEmployInput(target.name, target.value);
                                                    }}
                                                    checked={formInputEmp.typeSalary === "Giờ"}
                                                    value="Giờ"
                                                />Giờ</div>
                                                <div className="create-post-role-radio"><input type="radio"
                                                    name="typeSalary"
                                                    onChange={({ target }) => {
                                                        handleEmployInput(target.name, target.value);
                                                    }}
                                                    checked={formInputEmp.typeSalary === "Ngày"}
                                                    value="Ngày"
                                                />Ngày</div>
                                                <div className="create-post-role-radio"><input type="radio"
                                                    name="typeSalary"
                                                    onChange={({ target }) => {
                                                        handleEmployInput(target.name, target.value);
                                                    }}
                                                    checked={formInputEmp.typeSalary === "Tháng"}
                                                    value="Tháng"
                                                />Tháng</div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="create-post-title">Tỉnh/Thành phố<img id='require-icon' src={require_icon} alt="" /></div>
                                    <Form.Select aria-label="Default select example"
                                        id="create-post-select"
                                        name="city"
                                        value={RegisterRequest.city}
                                        onChange={handleChange1}
                                        required
                                    >
                                        <option style={{ display: "none" }}>Chọn Tỉnh/Thành Phố</option>
                                        {city && city.length > 0 &&
                                            city.map((item1, index1) => {
                                                return (
                                                    <option value={item1.name}>
                                                        {item1.name}
                                                    </option>
                                                )
                                            })}
                                    </Form.Select>
                                    <div className="create-post-title">Quận/Huyện<img id='require-icon' src={require_icon} alt="" /></div>
                                    <Form.Select aria-label="Default select example"
                                        id="create-post-select"
                                        name="district"
                                        value={RegisterRequest.district}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option style={{ display: "none" }}>Chọn Quận/Huyện</option>
                                        {distric && distric.length > 0 &&
                                            distric.map((item1, index1) => {
                                                return (
                                                    <option value={item1.name}>
                                                        {item1.name}
                                                    </option>
                                                )
                                            })}
                                    </Form.Select>
                                </div>
                            </div>
                            <div className="create-post-info-job-right">
                                <div>
                                    <div className="create-post-title">Số lượng người tuyển<img id='require-icon' src={require_icon} alt="" /></div>
                                    <Form.Control
                                        id="create-post-title"
                                        type="number"
                                        name="numberApply"
                                        onChange={({ target }) => {
                                            let value = target.value;
    
                                            // Loại bỏ số 0 ban đầu nếu có
                                            if (value.length > 0 && value[0] === '0') {
                                              value = value.slice(1);
                                            }
                                            
                                            // Kiểm tra và không cho phép giá trị âm
                                            if (value < 0) {
                                              value = '';
                                            }
                                            handleEmployInput(target.name, value);
                                        }}
                                        value={formInputEmp.numberApply}
                                        placeholder="Nhập số lượng tuyển dụng"
                                    />
                                </div>

                                <div className="create-post-choose-role">
                                    <div className="create-post-title">Loại hình công việc<img id='require-icon' src={require_icon} alt="" /></div>
                                    <div className="create-post-role">
                                        <div className="create-post-role-radio"><input type="radio"
                                            name="typeJob"
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, parseInt(target.value));
                                            }}
                                            value={0} checked={formInputEmp.typeJob === 0}
                                        /> Trong ngày</div>
                                        <div className="create-post-role-radio"><input type="radio"
                                            name="typeJob"
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, parseInt(target.value));
                                            }}
                                            value={1} checked={formInputEmp.typeJob === 1}
                                        />Ngắn hạn(Trong 1 tuần-1 tháng)</div>
                                        <div className="create-post-role-radio"><input type="radio"
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, parseInt(target.value));
                                            }}
                                            name="typeJob"
                                            checked={formInputEmp.typeJob === 2}
                                            value={2}
                                        />Dài hạn(Trên 1 tháng)</div>
                                    </div>
                                </div>
                                {formInputEmp.typeJob === 0 ? (
                                    <div className="create-post-choose-role">
                                        <div className="create-post-title">Ngày làm<img id='require-icon' src={require_icon} alt="" /></div>
                                        <Form.Control
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, target.value);
                                            }}
                                            placeholder="dd/MM/YYYY"
                                            id="datemain"
                                            type="date"
                                            name="daywork"
                                            min={currentDate}
                                            value={formInputEmp.daywork}
                                            required
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <div className="create-post-title">Ngày làm việc<img id='require-icon' src={require_icon} alt="" /></div>
                                        <div className="create-post-role">
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(day => (
                                                <div key={day} className="create-post-role-radio">
                                                    <input
                                                        type="checkbox"
                                                        name="daywork"
                                                        value={day}
                                                        onChange={({ target }) => {
                                                            handleEmployInputx(target.name, target.value);
                                                        }}
                                                        checked={selectedDays.includes(day.toString())}
                                                    />
                                                    {day === 1 ? 'Tất cả' : day === 8 ? 'Chủ nhật' : `Thứ ${day}`}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                )}

                                <div className="create-post-choose-role">
                                    <div className="create-post-title">Nhập thời gian làm việc trong ngày<img id='require-icon' src={require_icon} alt="" /></div>
                                    <div className="create-post-role">
                                        <Form.Control
                                            id="create-post-title"
                                            type="text"
                                            placeholder="7h-10h và 14h-17"
                                            name="jobTime"
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, target.value);
                                            }}
                                            value={formInputEmp.jobTime}
                                        />
                                    </div>
                                </div>
                                <div className="create-post-choose-role">
                                    <div className="create-post-title">Thời hạn đăng tuyển<img id='require-icon' src={require_icon} alt="" /></div>
                                    <Form.Control
                                        onChange={({ target }) => {
                                            handleEmployInput(target.name, target.value);
                                        }}
                                        placeholder="dd/MM/YYYY"
                                        id="datemain"
                                        type="date"
                                        name="deadline"
                                        min={currentDate}
                                        value={formInputEmp.deadline}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="create-post-title">Địa chỉ cụ thể<img id='require-icon' src={require_icon} alt="" /></div>
                            <Form.Control
                                id="create-post-des"
                                type="text"
                                name="location"
                                onChange={({ target }) => {
                                    handleEmployInput(target.name, target.value);
                                }}
                                value={formInputEmp.location}
                                placeholder="Số 10 Phạm Hùng"
                            />
                        </div>
                    </div>



                    <div className="create-post-time">
                        <div className="create-post-choose-role">
                            <div className="create-post-title">Ghi chú <img id='require-icon' src={require_icon} alt="" /></div>
                            <Form.Control
                                id="create-post-title"
                                type="text"
                                name="note"
                                onChange={({ target }) => {
                                    handleEmployInput(target.name, target.value);
                                }}
                                value={formInputEmp.note}
                                placeholder="Ghi chú"
                            />

                            <div className="create-post-title">Mô tả công việc <img id='require-icon' src={require_icon} alt="" /></div>
                            <Form.Control
                                id="create-post-des"
                                type="text"
                                onChange={({ target }) => {
                                    handleEmployInput(target.name, target.value);
                                }}
                                value={formInputEmp.description}
                                name="description"
                                placeholder="Mô tả công việc"
                            />
                        </div>
                    </div>

                    <div className="create-post-gender">
                        <div className="create-post-info-job">
                            <div className="create-post-info-job-left">
                                <div className="create-post-choose-role">
                                    <div className="create-post-title">Giới tính <span></span></div>
                                    <div className="create-post-role">
                                        <div className="create-post-role-radio"><input type="radio"
                                            name="dob"
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, parseInt(target.value));
                                            }}
                                            checked={formInputEmp.dob === 1}
                                            value={1}
                                        />Nam</div>
                                        <div className="create-post-role-radio"><input type="radio"
                                            name="dob"
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, parseInt(target.value));
                                            }}
                                            checked={formInputEmp.dob === 0}
                                            value={0}
                                        />Nữ</div>
                                        <div className="create-post-role-radio"><input type="radio"
                                            name="dob"
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, parseInt(target.value));
                                            }}
                                            checked={formInputEmp.dob === 3}
                                            value={3}
                                        />Không yêu cầu</div>
                                    </div>
                                </div>

                                <div className="create-post-title">Trình độ học vấn <span>(Để trống nếu không yêu cầu)</span></div>
                                <Form.Select aria-label="Default select example"
                                    id="create-post-select"
                                    name="levellearn"
                                    onChange={({ target }) => {
                                        handleEmployInput(target.name, target.value);
                                    }}>
                                    <option value="không yêu cầu" style={{ display: "none" }}>Chọn trình để học vấn</option>
                                    <option value="Chưa tốt nghiệp THPT">Chưa tốt nghiệp THPT</option>
                                    <option value="Tốt nghiệp THPT">Tốt nghiệp THPT</option>
                                    <option value="Tốt nghiệp Trung Cấp">Tốt nghiệp Trung Cấp</option>
                                    <option value="Tốt nghiệp Cao Đẳng">Tốt nghiệp Cao Đẳng</option>
                                    <option value="Tốt nghiệp Đại học">Tốt nghiệp Đại học</option>
                                    <option value="Trên Đại học">Trên Đại học</option>
                                </Form.Select>
                            </div>

                            <div className="create-post-info-job-right">
                                <div className="create-post-choose-role">
                                    <div className="create-post-title">Độ tuổi <img id='require-icon' src={require_icon} alt="" /></div>
                                    <div className="create-post-role">
                                        <div className="create-post-role-radio">
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text htmlFor="toage" id="basic-addon1">Từ</InputGroup.Text>
                                                <Form.Control
                                                    id="toage"
                                                    type="number"
                                                    name="toage"
                                                    onChange={({ target }) => {
                                                        const value = Math.max(0, target.value); // Kiểm tra và không cho phép giá trị âm
                                                        handleEmployInput(target.name, value);
                                                    }}
                                                    value={formInputEmp.toage}
                                                />
                                            </InputGroup>
                                        </div>
                                        <div className="create-post-role-radio">
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text htmlFor="fromage" id="basic-addon1">Đến</InputGroup.Text>
                                                <Form.Control
                                                    id="fromage"
                                                    type="number"
                                                    name="fromage"
                                                    onChange={({ target }) => {
                                                        const value = Math.max(0, target.value); // Kiểm tra và không cho phép giá trị âm
                                                        handleEmployInput(target.name, value);
                                                    }}
                                                    value={formInputEmp.fromage}
                                                />
                                            </InputGroup>
                                        </div>
                                    </div>
                                </div>
                                <div className="create-post-choose-role">
                                    <div className="create-post-title">Kinh nghiệm <span>(Để trống nếu không yêu cầu)</span></div>
                                    <div className="create-post-experient">
                                        <div className="create-post-experient-right">
                                            <Form.Select aria-label="Default select example"
                                                id="create-post-select"
                                                name="experient"
                                                onChange={({ target }) => {
                                                    handleEmployInput(target.name, target.value);
                                                }}
                                            >
                                                <option value="Không yêu cầu" style={{ display: "none" }}>Chọn yêu cầu kinh nghiệm</option>
                                                <option value="Có kinh nghiệm">Có kinh nghiệm</option>
                                                <option value="Có kinh nghiệm trên 6 tháng">Có kinh nghiệm trên 6 tháng</option>
                                                <option value="Có kinh nghiệm trên 1 năm">Có kinh nghiệm trên 1 năm</option>
                                                <option value="Có kinh nghiệm trên 2 năm">Có kinh nghiệm trên 2 năm</option>
                                                <option value="Đã từng làm">Đã từng làm</option>
                                            </Form.Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="create-post-title">Phúc lợi <img id='require-icon' src={require_icon} alt="" /></div>
                        <Form.Control
                            id="create-post-title"
                            type="text"
                            name="welfare"
                            onChange={({ target }) => {
                                handleEmployInput(target.name, target.value);
                            }}
                            value={formInputEmp.welfare}
                            placeholder="Ghi chú"
                        />
                        <div className="create-post-title">Yêu cầu thêm <img id='require-icon' src={require_icon} alt="" /></div>
                        <Form.Control
                            id="create-post-des"
                            type="text"
                            name="moredesciption" onChange={({ target }) => {
                                handleEmployInput(target.name, target.value);
                            }}
                            value={formInputEmp.moredesciption}
                            placeholder="Mô tả công việc"
                        />

                    </div>

                    <div>
                    {error && <p className="error-message">{error}</p>}
                    <Button id="create-post-btn" onClick={handleSubmit} variant="info">Đăng bài</Button>
                        <Button id="create-post-btn" onClick={handleSubmitinnhap} variant="info">Lưu nhap</Button>
                        <ToastContainer />
                    </div>
                </div>
            </div>

        </>

    )
}

export default CreatePost;