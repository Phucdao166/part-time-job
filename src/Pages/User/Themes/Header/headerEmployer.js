import NavDropdown from 'react-bootstrap/NavDropdown';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import React from "react";
import "./header.scss";
import { GetToken, GetAccountById } from '../../../../Service/userService';
import { useEffect, useState } from 'react';
import logo_icon from '../../../../Assets/logo-header.png'
import Popup from '../../CV/popupJob';

function HeaderEmployer() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const [UserName, setUserName] = useState("");
  const [IdUser, setIdUser] = useState("");
  const [notify, setNotify] = useState(false);
  const [btnPopup, setBtnPopup] = useState(false)

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('isCandidate');
    sessionStorage.removeItem('isEmployer');
    sessionStorage.removeItem('employerId');
    sessionStorage.removeItem('candidateId');
    sessionStorage.removeItem('fullnameEmp');
    window.location.href = '/';
    // toast.success("Đăng xuất thành công !")
  }

  const fetchData = async () => {
    const token = sessionStorage.getItem('employerId');
    let name = sessionStorage.getItem('fullnameEmp');
    let id = sessionStorage.getItem('id');
    const isC = sessionStorage.getItem('isCandidate');
    const isE = sessionStorage.getItem('isEmployer');
    const currentUrl = window.location.href;
    console.log(currentUrl);
    if (isC === "true") {
      console.log(sessionStorage.getItem('isCandidate'));
      setIsCandidate(true);
    }
    if (isE === "true") {
      console.log(sessionStorage.getItem('isEmployer'));
      setIsEmployer(true);
    }
    if (token) {
      setUserName(name);
      setIdUser(id);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const loginTextElement = document.getElementById('loginText');

  if (loginTextElement) {
    if (sessionStorage.getItem('employerId')) {
      loginTextElement.style.display = 'none';
    } else {
      loginTextElement.style.display = 'block';
    }
  }

  return (
    <div className='contanier-header'>
      <div className="div-header">
        <div className="div-headeree-header">
          <div className="header-div">
            <a href='/'><img
              style={{ width: 130, height: 70 }}
              className="img"
              alt="Div headeree header"
              src={logo_icon}
            /></a>
            <div className="">
              <div className="div-headeree-menu">
                <div className="header-div-3" style={{ display: isLoggedIn ? 'block' : 'none' }}>
                  <div className="link-blog-wrapper">
                    <a className="header-text-wrapper" href="/employer">
                      Trang quản lý
                    </a>
                  </div>
                </div>
              </div>
              <div className="div-headeree-menu">
                <div className="header-div-3">
                  <div className="link-li-n-h-wrapper">
                    <a className="header-text-wrapper" href="/aboutUs">
                      Về chúng tôi
                    </a>
                  </div>
                </div>
              </div>
              <div className="div-headeree-menu">
                <div className="header-div-3" style={{ display: isLoggedIn ? 'block' : 'none' }}>
                  <div className="link-li-n-h-wrapper">
                    <a className="header-text-wrapper" href="/contact">
                      Liên hệ
                    </a>
                  </div>
                </div>
              </div>
              <div className="div-headeree-menu">
                <div className="header-div-3" style={{ display: isLoggedIn ? 'none' : 'block' }}>
                  <div className="link-li-n-h-wrapper">
                    <a className="header-text-wrapper" href="/login">
                      <span id="loginText">Đăng nhập</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="div-headeree-menu">
                <div className="header-div-3" style={{ display: isLoggedIn ? 'none' : 'block' }}>
                  <div className="link-li-n-h-wrapper">
                    <a className="header-text-wrapper" href="/role">
                      <span id="loginText">Đăng ký</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-div-3">
            <div className="div-headeree-header-2">
              <div className="header-div-2" style={{ display: isLoggedIn ? 'block' : 'none' }}>
                <div className="div-hd-fdd">
                  <div className="link">
                    <a className="header-text-wrapper-2" href="/add-post">
                      Đăng tin tuyển dụng
                    </a>
                  </div>
                </div>
              </div>
              <div className="div-headeree-noti" style={{ display: isLoggedIn ? 'block' : 'none' }}>
                <div className="header-div-3">
                  <div className="div-notification">
                    <div className="header-div-2">
                      <i class="fa-regular fa-bell" id='div-fjob' onClick={() => setNotify((view) => !view)}></i>
                      {notify &&
                        <div className='notify-page'>
                          <div className='notify-hover' onClick={() => setBtnPopup(true)}>
                            <div className='notify-item'>
                              <div className='notify-user-avt'>
                                <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
                              </div>
                              <div className='notify-user'>
                                <div className='notify-user-name'>Phúc Đào</div>
                                <div className='notify-user-content'>Tạo job đi cu, lẹ lên không ăn ban</div>
                                <div className='notify-user-time'><i class="fa-regular fa-clock"></i> 49 phút trước</div>
                              </div>
                            </div>
                          </div>

                          <div className='notify-hover' onClick={() => setBtnPopup(true)}>
                            <div className='notify-item'>
                              <div className='notify-user-avt'>
                                <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
                              </div>
                              <div className='notify-user'>
                                <div className='notify-user-name'>Phúc Đào</div>
                                <div className='notify-user-content'>Tạo job đi cu, lẹ lên không ăn ban</div>
                                <div className='notify-user-time'><i class="fa-regular fa-clock"></i> 49 phút trước</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      <Popup trigger={btnPopup} setTrigger={setBtnPopup}>
                        <div className='notify-top'>Chi tiết thông báo</div>
                        <div className='notify-item'>
                          <div className='notify-detail-user-avt'>
                            <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
                          </div>
                          <div className='notify-detail-user'>
                            <div className='notify-user-name'>Phúc Đào</div>
                            <div className='notify-detail-user-time'><i class="fa-regular fa-clock"></i> 49 phút trước</div>
                            <div className='notify-user-content'>Tạo job đi cu, lẹ lên không ăn ban</div>
                          </div>
                        </div>
                      </Popup>
                      <div className="superscript">
                        <div className="header-text-wrapper-3">1</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="header-div-3" style={{ display: isLoggedIn ? 'block' : 'none' }}>
                <div className="div-headeree">
                  <div className="user-png" />
                  <div className="header-div-3">
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title={UserName}
                      menuVariant="light"
                    >
                      <div id='menu'>
                        <div className='info'>
                          <div className="user-png" />
                          <div className='info-content'>
                            <div className='info-name'>{UserName}</div>
                            <div className='info-item'>Mã nhân viên: #{IdUser}</div>
                          </div>
                        </div>
                        <NavDropdown.Divider />
                        {
                          <NavDropdown.Item className='' href="/profilemp">
                            <i class="fa-regular fa-user" id='header-icon'></i>Thông tin tài khoản
                          </NavDropdown.Item>
                        }
                        <NavDropdown.Item className='' href="/changepassEmp">
                          <i class="fa-solid fa-lock" id='header-icon'></i>Đổi mật khẩu
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className='' href="/interview">
                          <i class="fa-regular fa-calendar-days" id='header-icon'></i>Quản lý lịch phỏng vấn
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className='' href="/employer" style={{ display: isEmployer ? 'block' : 'none' }}>
                          <i class="fa-solid fa-house-laptop" id='header-icon'></i>Chế độ nhà tuyển dụng
                        </NavDropdown.Item>
                        <NavDropdown.Item className='' href="/" style={{ display: isCandidate ? 'block' : 'none' }}>
                          <i class="fa-solid fa-user-group" id='header-icon'></i>Chế độ ứng viên
                        </NavDropdown.Item>
                        <NavDropdown.Item className='' onClick={handleLogout}>
                          <i class="fa-solid fa-arrow-right-from-bracket" id='header-icon'></i> Đăng xuất
                        </NavDropdown.Item>
                        <ToastContainer />
                      </div>
                    </NavDropdown>
                    <div className="div-headeree-role">
                      <div className="header-text-wrapper-4">Nhân viên</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderEmployer;