import './register.scss'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import require_icon from '../../../Assets/require.png'
import eye_icon from '../../../Assets/view.png'
import { Sentcode, CheckRegister } from '../../../Service/userService';
import { getCity } from '../../../Service/candidateService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { green } from '@mui/material/colors';
function RegisterCandidate() {

    const navigate = useNavigate();
    const [isAccepted, setIsAccepted] = useState(false);
    const [city, setCity] = useState([]);
    const [distric, setDistric] = useState([]);
    const [wards, setWards] = useState([]);
    const [MessageError, setMessageError] = useState('');
    const [RegisterRequest, setRegisterRequest] = useState({
        role: 'Candidate', email: '', password: '', repassword: '', fullname: ''
        , phone: '', dob: '2023-10-24T08:28:07.640Z', image: '', gender: '', companyName: '', position: '', city: '', district: '', detailAddress: ''
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
    }, []); // Chú ý vào dependencies, nếu bạn không muốn fetchData chạy mỗi khi state thay đổi, hãy giữ dependencies rỗng.

    useEffect(() => {
        console.log("Updated City", city);
        console.log("Updated request", RegisterRequest);
    }, [RegisterRequest]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        await setRegisterRequest({ ...RegisterRequest, [name]: value });
    };
    const handleChange1 = async (e) => {
        const { name, value } = e.target;
        await setRegisterRequest({ ...RegisterRequest, [name]: value });
        const selectedCity = city.find((item) => item.name === value);
        if (selectedCity) {
            setDistric(selectedCity.districts);
        }
        console.log("Updated districts", distric);
    };
    const RegisterHandler = async () => {
        console.log("vao thanh cong");
        const registerRequestString = JSON.stringify(RegisterRequest);
        sessionStorage.setItem('registerRequestData', registerRequestString);
        console.log(RegisterRequest.email);
        console.log(RegisterRequest);
        let res1 = await CheckRegister(RegisterRequest);
        if (res1.message === "Đăng ký thành công") {
            let res = await Sentcode(RegisterRequest.email);
            sessionStorage.setItem('otp', res.message);
            navigate("/otpRegister");
        } else {
            setMessageError(res1.message);
        }
    }



    // Xử lý sự kiện khi ô checkbox thay đổi
    const handleCheckboxChange = () => {
        setIsAccepted(!isAccepted);
    };
    const buttonStyle = {
        backgroundColor: 'green'
    };
    return (
        <div className='container'>
            <div id="login-form">
                <div className="header">
                    <p className='header-top'>CHÀO MỪNG BẠN ĐÃ QUAY TRỞ LẠI</p>
                    <p className='header-body'>Tìm ứng viên linh hoạt và phù hợp cùng <span>việc làm part-time.</span></p>
                    <p className='header-bottom'>Đăng ký</p>
                </div>

                <div className="register-form">
                    <div className="inputs">
                        <div className="input">
                            <p id='title'>Email đăng nhập<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='input' type="email" placeholder='   Email' required=""
                                name="email" value={RegisterRequest.email} onChange={handleChange}
                            />
                        </div>

                        <div className="input">
                            <p id='title'>Mật khẩu<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='input' type="password" placeholder='    Mật khẩu' required=""
                                name="password" value={RegisterRequest.password} onChange={handleChange}
                            />
                            <img id='eye' src={eye_icon} alt="" />
                        </div>

                        <div className="input">
                            <p id='title'>Nhập lại mật khẩu<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='input' type="password" placeholder='    Nhập lại mật khẩu' required
                                name="repassword" value={RegisterRequest.repassword} onChange={handleChange} />
                            <img id='eye' src={eye_icon} alt="" />
                        </div>
                    </div>

                    <p id='type-register' className='header-bottom'>Người tìm việc</p>

                    <div className="infomation">
                        <div className="input">
                            <p id='title'>Họ và tên<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='input' type="text" placeholder='   Họ và tên' required
                                name="fullname" value={RegisterRequest.fullname} onChange={handleChange} />
                        </div>

                        <div className="sex">
                            <p id='title'>Giới tính<img id='require-icon' src={require_icon} alt="" /></p>
                            <input name="gender" id='sex' type="radio" checked required value="Nam" onChange={handleChange} />Nam
                            <input name="gender" id='sex' type="radio" value="Nữ" onChange={handleChange} />Nữ
                        </div>

                        <div className="input">
                            <p id='title'>Số điện thoại cá nhân<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='input' type="email" placeholder='   Số điện thoại' required
                                name="phone" value={RegisterRequest.phone} onChange={handleChange} />
                        </div>


                        <div className="input">
                            <p id='title'>Tỉnh, thành phố<img id='require-icon' src={require_icon} alt="" /></p>
                            <Form.Select aria-label="Default select example" id="input"
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
                        </div>

                        <div className="input">
                            <p id='title'>Quận, huyện<img id='require-icon' src={require_icon} alt="" /></p>
                            <Form.Select aria-label="Default select example" id="input"
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

                        <div className="input">
                            <p id='title'>Địa chỉ cụ thể<img id='require-icon' src={require_icon} alt="" /></p>
                            <textarea id='inputs'
                                name="detailAddress" value={RegisterRequest.detailAddress} onChange={handleChange}></textarea>
                        </div>
                        <div className="checkbox">
                            <p style={{color:'green', fontSize:17}}>- Thông tin cá nhân sẽ được nhìn bởi nhà tuyển dụng</p>
                        </div>
                        <div className="checkbox">
                            <p style={{color:'green', fontSize:17}}>- Cho phép sử dụng thông tin cá nhân</p>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" name="" checked={isAccepted} onChange={handleCheckboxChange} />
                            <p id='accept'>Đồng ý với điều khoản của <span>Việc làm part-time</span></p>
                        </div>
                        <p className="error-message">{MessageError}</p>
                    </div>
                </div>

                <div className='btn-register'>
                    <Button onClick={RegisterHandler} variant="secondary" size="lg" disabled={!isAccepted} style={buttonStyle}>
                        Đăng Ký
                    </Button>
                    <ToastContainer />
                    <div className='btn-register'>
                        <p id='re-login'>Đã có tài khoản? <a href='/login'>Login</a></p>
                    </div>
                </div>

            </div>

            <div id="content"></div>
        </div>
    )
}

export default RegisterCandidate