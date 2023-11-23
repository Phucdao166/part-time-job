import Footer from '../Themes/Footer/footer'
import React from 'react';
import Popup from './popupJob';
import Header from '../Themes/Header/header'
import './cv.scss'
import '../Job/job.scss'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import logo_job from '../../../Assets/logo-job.png'
import { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';

export default function CV() {
  const [btnPopup, setBtnPopup] = useState(false)
  const [btnPopupSalary, setBtnPopupSalary] = useState(false)
  const [btnPopupExperient, setBtnPopupExperient] = useState(false)
  const [btnPopupHistory, setBtnPopupHistory] = useState(false)
  const [btnPopupSkill, setBtnPopupSkill] = useState(false)
  return (
    <>
      <Header />
      <div className='container-all'>
        <div className='container'>
          <div className='CV-page'>
            <div className='CV-page-top'>
              <div className='CV-page-top-1'>
                <div className='CV-page-top-1-title'>Hồ sơ cá nhân</div>
              </div>
              <div className='CV-page-top-2'>
                <div className="CV-uploadavatar">
                  <div className="CV-uploadavatar-user" />
                </div>
                <div className='CV-name'>Đào Xuân Phúc</div>
              </div>
            </div>

            <div className='CV-page-care'>
              <div className='CV-page-care-top'>
                <div className='CV-page-care-title'>Thông tin cơ bản <i class="fa-solid fa-circle-check" style={{ color: 'green' }}></i></div>
              </div>

              <div className='CV-page-expirent'>
                <div className='CV-page-expirent-list'>
                  <div className='post-manage-item-left'>
                    <div className='job-list-item-left-content'>

                      <div className='cv-list-des'>
                        <div className='job-list-company'>
                          <span>Họ và tên:</span>
                          <Form.Control
                            type="text"
                            value="Huy trân"
                            placeholder='Kỹ năng cần có'
                            style={{ marginLeft: 100, width: 1070, display: 'inline-block', marginTop: 10 }}
                          />
                        </div>
                      </div>
                      <div className='cv-list-des'>
                        <div className='job-list-company'>
                          <span>Ngày tháng năm sinh:</span>
                          <Form.Control
                            type="date"
                            value=""
                            placeholder='Kỹ năng cần có'
                            style={{ marginLeft: 100, width: 1070, display: 'inline-block', marginTop: 10 }}
                          />
                        </div>
                      </div>
                      <div className='cv-list-des'>
                        <div className='job-list-company'>
                          <span>Giới tính:</span>
                          <Form.Select aria-label="Default select example"
                            id="create-post-select"
                            name="gender"
                            style={{ marginLeft: 100, width: 1070, display: 'inline-block', marginTop: 10 }}
                          >
                            <option value="Không yêu cầu" style={{ display: "none" }}>Giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                          </Form.Select>
                        </div>
                      </div>
                      <div className='cv-list-des'>
                        <div className='job-list-company'>
                          <span>Địa chỉ:</span>
                          <Form.Control
                            type="text"
                            value="Huy trân"
                            placeholder='Kỹ năng cần có'
                            style={{ marginLeft: 100, width: 1070, display: 'inline-block', marginTop: 10 }}
                          />
                        </div>
                      </div>
                      <div className='cv-list-des'>
                        <div className='job-list-company'>
                          <span>Số điện thoại:</span>
                          <Form.Control
                            type="text"
                            value="Huy trân"
                            placeholder='Kỹ năng cần có'
                            style={{ marginLeft: 100, width: 1070, display: 'inline-block', marginTop: 10 }}
                          />
                        </div>
                      </div>
                      <div className='cv-list-des'>
                        <div className='job-list-company'>
                          <span>Kỹ năng cơ bản:</span>
                          <Form.Control
                            type="text"
                            value="Huy trân"
                            placeholder='Kỹ năng cần có'
                            style={{ marginLeft: 100, width: 1070, display: 'inline-block', marginTop: 10 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='CV-page-care'>
              <div className='CV-page-care-top'>
                <div className='CV-page-care-title'>Lịch sử làm việc <i class="fa-solid fa-circle-check" style={{ color: 'green' }}></i></div>
              </div>

              <div className='CV-page-expirent'>
                <div className='CV-page-expirent-list'>
                  <div className='post-manage-item-left'>
                    <div className="job-list-logo">
                      <img id='company-logo' src={logo_job} alt="" />
                    </div>
                    <div className='job-list-item-left-content'>
                      <div className='job-list-des'>
                        <div className='job-list-company'><span>Vị trí làm việc: </span>Bán hàng</div>
                      </div>
                      <div className='job-list-des'>
                        <div className='job-list-company'><span>Thời gian: </span>01/10/2022 - 01/10/2023</div>
                      </div>
                      <div className='job-list-des'>
                        <div className='job-list-company'><span>Công ty làm: </span>Nhà hàng 5 sao</div>
                      </div>

                      <div className='box-view-cmt'>
                  <div className='job-detail-comment-new'>
                    <div className='job-detail-comment-avt'>
                      <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
                    </div>
                    <div className='job-detail-comment' style={{marginLeft: 20}}>
                      <div className='user-comment-name'>Phúc Đào </div>
                      <div className='user-comment-time'>20/11/2023</div>
                    </div>
                  </div>
                  <div className='view-cmt'>
                    Nhanh nhẹn, hoạt bát
                  </div>
                </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div>
          <img id='home-sp' src='https://previews.123rf.com/images/robuart/robuart1605/robuart160500292/57494709-support-banner-concept-design-flat-style-poster-or-a-banner-of-support-and-technical-advising-for.jpg' />
        </div>
      </div>
      <Footer />
    </>
  )
}
