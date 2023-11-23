import HeaderEmployer from "../../Themes/Header/headerEmployer";
import SideBar from "../MangementPage/sidebar";
import { useState, useEffect } from 'react';
import { GetJobById } from '../../../../Service/userService';
import require_icon from '../../../../Assets/require.png'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import { getjobbyid, updatejob, createPost } from '../../../../Service/employService';
import { format } from 'date-fns';
import { getCity } from '../../../../Service/candidateService';
import { GetAllCate, GetAllJobType, GetAllJobTypeByCate } from '../../../../Service/searchService';
import { useNavigate } from 'react-router-dom';
function TinNhapPost() {
    const navigate = useNavigate();
    const [listjobdt, setListJob] = useState([]);
    const [jobid, setjobid] = useState();
    const [empid, setEid] = useState(sessionStorage.getItem('employerId'));
    let [isEditing, setIsEditing] = useState();
    const [isFormValid, setIsFormValid] = useState(false);
    const currentDate = new Date().toISOString().split('T')[0];
    const [listjobType, setListjobType] = useState([]);
    const [city, setCity] = useState([]);
    const [distric, setDistric] = useState([]);
    const [RegisterRequest, setRegisterRequest] = useState({ city: '', district: '' });
    const [listcate, setlistcate] = useState([]);
    const [NameCity, setNameCity] = useState();
    const [NameDistrict, setNameDistrict] = useState();
    const [loading, Setloading] = useState();
    const [selectedDays, setSelectedDays] = useState([]);
    const [formInputEmp, setFormInput] = useState({
        // "title": "job 4",
        id: jobid,
        title: "",
        employerId: empid,
        description: "",
        salary: "",
        location: "",
        deadline: "",
        createdAt: "2023-11-11T16:03:01.812Z",
        jobTime: "",
        checktypejob: 0,
        status: 0,
        jobTypeId: 1,
        experient: "",
        rolecompany: 0,
        numberApply: 0,
        typeJob: 0,
        daywork: "",
        note: "",
        dob: 0,
        toage: 0,
        levellearn: "",
        fromage: 0,
        welfare: "",
        moredesciption: "",
        typename: "",
        agreesalary: "",
        company: "",
        typeSalary: "",
    });
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
        setCityDistrict();
    }, [formInputEmp.location]);

    useEffect(() => {
        console.log("empid", empid);
        getJobByid(jobid);
    }, [jobid]);

    useEffect(() => {
        const fetchData = async () => {
            const searchParams = new URLSearchParams(window.location.search);
            setjobid(searchParams.get('jobid'));
        };
        fetchData();
    }, []);

    const setCityDistrict = () => {
        if (city && formInputEmp.location && formInputEmp.location.length > 0 && formInputEmp.location.split(',').length > 2 && city.length > 0) {
            const addressParts = formInputEmp.location.split(',');
            console.log("addressParts", addressParts);
            setNameCity(addressParts[addressParts.length - 1]);
            setNameDistrict(addressParts[addressParts.length - 2]);
            formInputEmp.location = addressParts[0];

            const selectedCity = city.find((item) => item.name === addressParts[addressParts.length - 1]);
            if (selectedCity) {
                setDistric(selectedCity.districts);
            }
        }
    }



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



    // const handleEmployInput = (name, value) => {
    //     setFormInput({ ...formInputEmp, [name]: value });
    // };
    const handleEmployInput = (name, value) => {
        // Cập nhật giá trị vào đối tượng formInputEmp
        setFormInput((prevFormInputEmp) => ({
            ...prevFormInputEmp,
            [name]: value,
        }));
        if (formInputEmp.typeJob !== 0) {
            formInputEmp.daywork = getSelectedDaysString();
        }
        console.log("formInputEmp.daywork", formInputEmp.daywork);
        console.log("formInputEmp", formInputEmp)
    };


    let getJobByid = async (jobid) => {
        let res = await getjobbyid(jobid);
        console.log("em", res);
        console.log("forminput", formInputEmp);
        setListJob(res);
        setIsEditing(jobid);
        if (res[0]) {
            setFormInput({
                id: jobid,
                title: res[0].title,
                employerId: res[0].empid,
                description: res[0].description,
                salary: res[0].salary,
                location: res[0].location,
                deadline: res[0].deadline,
                createdAt: res[0].createdAt,
                jobTime: res[0].jobTime,
                checktypejob: res[0].checktypejob,
                status: res[0].status,
                jobTypeId: res[0].jobTypeId,
                experient: res[0].experient,
                company: res[0].company,
                rolecompany: res[0].rolecompany,
                numberApply: res[0].numberApply,
                typeJob: res[0].typeJob,
                daywork: res[0].daywork,
                note: res[0].note,
                dob: res[0].dob,
                toage: res[0].toage,
                levellearn: res[0].levellearn,
                fromage: res[0].fromage,
                welfare: res[0].welfare,
                moredesciption: res[0].moredesciption,
                typename: res[0].typename,
                agreesalary: res[0].agreesalary,
                typeSalary: res[0].typeSalary,
            });
            try {
                setSelectedDays(res[0].daywork.split(','));
            } catch {

            }

        } else {
            console.log("loi o day");
        }
        setCityDistrict();
        console.log("Dữ liệu mảng:", res);
    }
    const handleEmployInput1 = (name, value) => {
        // Cập nhật giá trị vào đối tượng formInputEmp
        setFormInput((prevFormInputEmp) => ({
            ...prevFormInputEmp,
            [name]: value,
        }));
        console.log("Cate", value);
        getJobtype1(value);
    };
    const handleEmployInput2 = (name, value) => {
        setFormInput((prevFormInputEmp) => ({
            ...prevFormInputEmp,
            [name]: value,
        }));
    };
    const handleChange1 = async (e) => {
        const { name, value } = e.target;
        await setRegisterRequest({ ...RegisterRequest, [name]: value });
        setNameCity(value);
        const selectedCity = city.find((item) => item.name === value);
        if (selectedCity) {
            setDistric(selectedCity.districts);
        }
        console.log("Updated districts", distric);
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        await setRegisterRequest({ ...RegisterRequest, [name]: value });
        setNameDistrict(value);
    };

    const handleUpdateJob = async () => {
        console.log("nhay update");
        if (formInputEmp.typeJob !== 0) {
            formInputEmp.daywork = getSelectedDaysString();
        }
        formInputEmp.location = formInputEmp.location + "," + NameDistrict + "," + NameCity;
        console.log("formInputEmp.location", formInputEmp.location);
        console.log("formInputEmp.location", formInputEmp);
        let up = await updatejob(formInputEmp);
        console.log("updatejob", up);
        if (up) {
            setFormInput(formInputEmp);
            toast.success("Lưu thông tin cá nhân thành công emp");
        }
    }

    const handleEmployInputx = (name, value) => {
        const updatedDays = selectedDays.includes(value)
            ? selectedDays.filter(day => day !== value)
            : [...selectedDays, value];

        setSelectedDays(updatedDays);
        formInputEmp.daywork = getSelectedDaysString();

    };

    const getSelectedDaysString = () => {
        return selectedDays.join(',');
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
                }
                // else if (formInputEmp.fromage < formInputEmp.toage) {
                //     setError('The "fromage" value must be greater than the "toage" value.');
                //     return;
                //   }
                else {
                    formInputEmp.location = RegisterRequest.district + "," + RegisterRequest.city
                }
                console.log("formInputEmp", formInputEmp);
                let up = await updatejob(formInputEmp);
                console.log("updatejob", up);
                if (up) {
                    setFormInput(formInputEmp);
                    navigate("/post-manage?toast=1");
                    toast.success("Lưu thông tin cá nhân thành công emp");
                }
                else {
                    console.log("API call failed");
                    toast.error("Đã xảy ra lỗi trong quá trình tạo công việc!");
                }
            } catch (error) {
                console.log("API call error:", error);
                toast.error("Đã xảy ra lỗi trong quá trình tạo công việc!");
            }
        }
    };

    return (
        <>
            <HeaderEmployer />

            {listjobdt && listjobdt.length > 0 && listjobdt.map((item, index) => {
                return (
                    <form>
                        <div className="employer-page">
                            <div className="employer-page-sidebar">
                                {/* <SideBar /> */}
                            </div>
                            <div className="employer-page">

                                <div className="create-post-content">
                                    <div className="create-post">
                                        <div className="create-post-top">Tạo bài đăng</div>
                                        <div className="create-post-choose-role">
                                            <div className="create-post-title">Vai trò đăng<img id='require-icon' src={require_icon} alt="" /></div>
                                            <div className="create-post-role">
                                                <div className="create-post-role-radio">
                                                    <input type="radio" name="rolecompany"
                                                        onChange={({ target }) => {
                                                            handleEmployInput(target.name, parseInt(target.value));
                                                        }}
                                                        id="personal" value={formInputEmp.rolecompany} checked={formInputEmp.rolecompany === 1} />
                                                    <label for="personal">Cá nhân</label>
                                                </div>
                                                <div className="create-post-role-radio">
                                                    <input type="radio" onChange={({ target }) => {
                                                        handleEmployInput(target.name, parseInt(target.value));
                                                    }}
                                                        name="rolecompany" value={formInputEmp.rolecompany} id="company" checked={formInputEmp.rolecompany === 0} />
                                                    <label for="company">Công ty</label>
                                                </div>
                                            </div>
                                        </div>
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
                                    <div className="create-post-info">
                                        <div>
                                            <div className="create-post-title">Tiêu đề tin tuyển dụng<img id='require-icon' src={require_icon} alt="" /></div>
                                            <Form.Control
                                                id="create-post-title"
                                                type="text"
                                                placeholder="Nhân viên bán hàng"
                                                name="title"
                                                value={formInputEmp.title}
                                                onChange={({ target }) => {
                                                    handleEmployInput(target.name, target.value);
                                                }}
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
                                                                item1.id == formInputEmp.typename ? (
                                                                    <option selected value={item1.id}>
                                                                        {item1.name}
                                                                    </option>
                                                                ) : (
                                                                    <option value={item1.id}>
                                                                        {item1.name}
                                                                    </option>
                                                                )
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
                                                                item1.id === formInputEmp.jobTypeId ? (
                                                                    <option selected value={item1.id}>
                                                                        {item1.nameType}
                                                                    </option>
                                                                ) : (
                                                                    <option value={item1.id}>
                                                                        {item1.nameType}
                                                                    </option>
                                                                )

                                                            )
                                                        })}
                                                </Form.Select>
                                                <div className="create-post-choose-role">
                                                    <div className="create-post-title">Mức lương<img id='require-icon' src={require_icon} alt="" /></div>
                                                    <div className="create-post-role">
                                                        <div className="create-post-role-radio"><input type="text" name="salary" onChange={({ target }) => {
                                                            handleEmployInput(target.name, target.value);
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
                                                </div>
                                            </div>
                                            <div className="create-post-info-job-right">
                                                <div>
                                                    <div className="create-post-title">Số lượng<img id='require-icon' src={require_icon} alt="" /></div>
                                                    <Form.Control
                                                        id="create-post-title"
                                                        type="number"
                                                        name="numberApply"
                                                        onChange={({ target }) => {
                                                            handleEmployInput(target.name, target.value);
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
                                                                    {day === 1 ? 'Tất cả' : day === 8 ? 'Chủ nhất' : `Thứ ${day}`}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                )}

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
                                            <div className="create-post-title">Tỉnh/Thành phố<img id='require-icon' src={require_icon} alt="" /></div>
                                            <Form.Select aria-label="Default select example" id="input"
                                                name="city"
                                                value={NameCity}
                                                onChange={handleChange1}
                                                required
                                            >
                                                {city && city.length > 0 &&
                                                    city.map((item1, index1) => {
                                                        return (
                                                            item1.name === NameCity ? (
                                                                <option selected value={item1.name}>
                                                                    {item1.name}
                                                                </option>
                                                            ) : (
                                                                <option value={item1.name}>
                                                                    {item1.name}
                                                                </option>
                                                            )
                                                        )
                                                    })}
                                            </Form.Select>
                                            <div className="create-post-title">Quận/Huyện<img id='require-icon' src={require_icon} alt="" /></div>
                                            <Form.Select aria-label="Default select example" id="input"
                                                name="district"
                                                value={NameDistrict}
                                                onChange={handleChange}
                                                required
                                            >
                                                {distric && distric.length > 0 &&
                                                    distric.map((item1, index1) => {
                                                        return (
                                                            item1.name === NameDistrict ? (
                                                                <option value={item1.name}>
                                                                    {item1.name}
                                                                </option>
                                                            ) : (
                                                                <option value={item1.name}>
                                                                    {item1.name}
                                                                </option>
                                                            )

                                                        )
                                                    })}
                                            </Form.Select>
                                            <div className="create-post-title">Địa chỉ cụ thể<img id='require-icon' src={require_icon} alt="" /></div>
                                            <Form.Control
                                                id="create-post-title"
                                                type="text"
                                                name="location"
                                                onChange={({ target }) => {
                                                    handleEmployInput2(target.name, target.value);
                                                }}
                                                value={formInputEmp.location}
                                                placeholder="Số 10 Phạm Hùng"
                                            />
                                        </div>
                                    </div>

                                    <div className="create-post-time">
                                        <div className="create-post-choose-role">
                                            <div className="create-post-title">Lịch làm việc<img id='require-icon' src={require_icon} alt="" /></div>
                                            <div className="create-post-role">
                                            </div>
                                        </div>
                                    </div>
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
                                                <div className="create-post-title">Giới tính <span>(Để trống nếu không yêu cầu)</span></div>
                                                <div className="create-post-role">
                                                    <div className="create-post-role-radio"><input type="radio"
                                                        name="dob"
                                                        onChange={({ target }) => {
                                                            handleEmployInput(target.name, parseInt(target.value));
                                                        }}
                                                        checked={formInputEmp.dob === 1}
                                                        value={formInputEmp.dob}
                                                    />Nam</div>
                                                    <div className="create-post-role-radio"><input type="radio"
                                                        name="dob"
                                                        onChange={({ target }) => {
                                                            handleEmployInput(target.name, parseInt(target.value));
                                                        }}
                                                        checked={formInputEmp.dob === 0}
                                                        value={formInputEmp.dob}
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
                                                value={formInputEmp.levellearn}
                                                onChange={({ target }) => {
                                                    handleEmployInput(target.name, target.value);
                                                }}>
                                                <option style={{ display: "none" }}>Chọn trình để học vấn</option>
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
                                                <div className="create-post-title">Độ tuổi <span>(Để trống nếu không yêu cầu)</span></div>
                                                <div className="create-post-role">
                                                    <div className="create-post-role-radio">
                                                        <InputGroup className="mb-3">
                                                            <Form.Label htmlFor="toage" className="input-label">
                                                                Từ
                                                            </Form.Label>
                                                            <Form.Control
                                                                id="toage"
                                                                type="number"
                                                                name="toage"
                                                                onChange={({ target }) => {
                                                                    handleEmployInput(target.name, target.value);
                                                                }}
                                                                value={formInputEmp.toage}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                    <div className="create-post-role-radio">
                                                        <InputGroup className="mb-3">
                                                            <Form.Label htmlFor="fromage" className="input-label">
                                                                Đến
                                                            </Form.Label>
                                                            <Form.Control
                                                                id="fromage"
                                                                type="number"
                                                                name="fromage"
                                                                onChange={({ target }) => {
                                                                    handleEmployInput(target.name, target.value);
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
                                                            value={formInputEmp.experient}
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

                                    <div className="create-post-title">Phúc lợi</div>
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
                                    <div className="create-post-title">Yêu cầu thêm</div>
                                    <Form.Control
                                        id="create-post-des"
                                        type="text"
                                        name="moredesciption" onChange={({ target }) => {
                                            handleEmployInput(target.name, target.value);
                                        }}
                                        value={formInputEmp.moredesciption}
                                        placeholder="Mô tả công việc"
                                    />
                                    <div>
                                        <Button id="create-post-btn" onClick={handleSubmit} variant="info">Đăng laij</Button>
                                        <ToastContainer />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                )
            })}
        </>
    )
}

export default TinNhapPost;