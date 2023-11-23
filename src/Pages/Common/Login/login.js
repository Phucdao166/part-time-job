import { useEffect, useState } from 'react';
import './login.scss'
import { loginApi, RegisterGoogle } from '../../../Service/userService';
import { getCanById, getEmpById } from '../../../Service/jobService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import eye_icon from '../../../Assets/view.png'
import eye_hide_icon from '../../../Assets/hide.png'
import banner from '../../../Assets/banner-login.png'

import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { getEmployById } from '../../../Service/employService';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [password, setPassword] = useState(localStorage.getItem('password'));
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const [loginRe, setLoginRe] = useState({ Email: '', Password: '' });
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('changepass')) {
      toast.success("Đổi mật khẩu thành công thành công");
    }
    const storedIsCheckboxChecked = localStorage.getItem('isCheckboxChecked');
    if (storedIsCheckboxChecked) setIsCheckboxChecked(storedIsCheckboxChecked === 'true');
    setLoginRe({
      Email: email,
      Password: password
    });
    let token = localStorage.getItem("");
    if (token) {
      navigate("/");
    }
  }, [email, password])

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Kiểm tra email hoặc mật khẩu");
      return;
    }
    if (isCheckboxChecked) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    }
    setLoading(true)
    let res = await loginApi(loginRe);
    console.log("loginApi",res);
    if (res && res.accessToken) {
      let resc = await getCanById(res.account.id);
      let resc1 = await getEmpById(res.account.id);
      let candidate = resc.length > 0 ? resc[0] : null;
      console.log("candidate",candidate);
      console.log("candidate",resc);
      // let employer = resc1.length > 0 ? resc1[0] : null;
      console.log("employer", resc1);
      sessionStorage.setItem("token", res.accessToken);
      sessionStorage.setItem('id', res.account.id);
      sessionStorage.setItem('isCandidate', res.isCandidate);
      sessionStorage.setItem('isEmployer', res.isEmployer);
      if (candidate != null) {
        sessionStorage.setItem('idOfCandidate', candidate.accountId);
        sessionStorage.setItem('fullname', candidate.fullname);
        sessionStorage.setItem('candidateId', candidate.id);
        console.log('candidateId', candidate.id);
      }
      if (resc1 != null && resc1.account != null) {
        sessionStorage.setItem('idOfEmp', resc1.accountId);
        sessionStorage.setItem('fullnameEmp', resc1.account.fullName);
        sessionStorage.setItem('employerId', resc1.id);
        console.log('employerId', resc1.id);
        console.log('fullnameEmp', resc1.account.fullName);
        console.log('idOfEmp', resc1.accountId);
      }
      const searchParams = new URLSearchParams(window.location.search);
      if (res.account.roleId === 1) {
        navigate("/employer");
        return;
      }
      if (res.account.roleId === 3) {
        navigate("/adminDashboard");
        return;
      }
      if (searchParams.get('jobid')) {
        navigate("/job-detail?jobid=" + searchParams.get('jobid'))
      } else {
        navigate("/");
      }
    } else {
      if (res.account.status === 0) {
        toast.error("Kiểm tra lại tài khoản hoặc mật khẩu");
      }
    }
    setLoading(false)
  }

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
    localStorage.setItem('isCheckboxChecked', !isCheckboxChecked);
    if (!isCheckboxChecked) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
  }

  useEffect(() => {
    // Thiết lập Facebook SDK
    const loadFacebookSDK = () => {
      // Replace 'your-app-id' with your actual Facebook App ID
      const appId = '3622741384659197';
      const script = document.createElement('script');
      script.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0&appId=${appId}&autoLogAppEvents=1`;
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        // Facebook SDK đã được tải, bạn có thể tiến hành xử lý tại đây
        // Gọi hàm FB.init() và các sự kiện Facebook khác
        window.FB.init({
          appId,
          cookie: true,
          xfbml: true,
          version: 'v18.0',
        });
      };
    };
    loadFacebookSDK();
  }, []);

  const handleLoginFB = () => {
    // Xử lý đăng nhập bằng Facebook
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log('Đăng nhập thành công');
          // Thực hiện các hành động sau khi đăng nhập thành công
        } else {
          console.log('Đăng nhập thất bại');
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  return (
    <div className='containerd3'>
      <div className='container-login'>
        <div className="login-form">

          <div className="header">
            <p className='header-top'>CHÀO MỪNG BẠN ĐÃ QUAY TRỞ LẠI</p>
            <p className='header-body'>Tìm ứng viên linh hoạt và phù hợp cùng <span>việc làm part-time.</span></p>
            <p className='header-bottom'>Đăng nhập</p>
          </div>

          <div>
            <div className="inputs">
              <div className="input">
                <input id='input'
                  type="email"
                  placeholder='Email'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)} />
              </div>

              <div className="input">
                <input id='input'
                  type={isShowPassword === true ? "text" : "password"}
                  placeholder='Mật khẩu'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)} />
                <img
                  src={isShowPassword === true ? eye_hide_icon : eye_icon}
                  alt=""
                  onClick={() => setIsShowPassword(!isShowPassword)}
                />
              </div>
            </div>

            <div className="checkbox">
              <input type="checkbox" name="" checked={isCheckboxChecked} onChange={handleCheckboxChange} />
              <p className='remember'>Nhớ mật khẩu</p>
            </div>

            <div className="">
              <button id='button-login'
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
              >{loading && <i class="fa-solid fa-sync fa-spin"></i>}   Đăng nhập</button>
              <ToastContainer />
            </div>

            <div className="suport">
              <div className="register">
                <a href='/role'>Đăng ký</a>
              </div>

              <div className="register">
                <a href='/verify'>Quên mật khẩu</a>
              </div>
            </div>

            {/* <div className='back'>

              <a href='/'><i className='fa-solid fa-angles-left' style={{ color: '#005eff' }} />Về trang chủ</a>
            </div> */}

            <div className='gg-lg'>
              <GoogleOAuthProvider id="login-gg" clientId="487871973409-136v5d9fh3mnsnrv2c8tu9b73gqal8rl.apps.googleusercontent.com">
                <GoogleLogin
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      style={{
                        width: '500px',  // Đặt chiều rộng theo mong muốn
                      }}
                    >
                      Đăng nhập bằng Google
                    </button>
                  )}
                  onSuccess={async credentialResponse => {
                    const details = jwt_decode(credentialResponse.credential);
                    console.log(details);
                    const RegisterGoogleRequest = {
                      role: "Candidate",
                      email: details.email,
                      fullname: details.name
                    };
                    console.log(RegisterGoogleRequest);
                    let res = await RegisterGoogle(RegisterGoogleRequest);
                    sessionStorage.setItem("token", res.accessToken);
                    sessionStorage.setItem('fullname', res.account.fullName);
                    sessionStorage.setItem('id', res.account.id);
                    navigate("/");
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }} />
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>

        <div id="content" className='banner'>
          <a href='/'><img style={{ height: '110%' }} src={banner} alt="" /></a>
        </div>
      </div>

    </div>
  )
}

export default Login;