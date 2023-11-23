import { useEffect, useState } from 'react';
import './profile.scss';
import Form from 'react-bootstrap/Form';
import Footer from "../Themes/Footer/footer";
import { saveProfileEmp } from '../../../Service/employService';
import { ToastContainer, toast } from 'react-toastify';
import HeaderEmployer from "../Themes/Header/headerEmployer";
import { getEmpById } from '../../../Service/jobService';
import { format } from 'date-fns';
import axios from 'axios';
function Profilemp() {
  console.log("Profilemp");
  const [profile, setProfile] = useState([]);
  const [save, setSave] = useState(false);
  const [aid, setAid] = useState(sessionStorage.getItem("idOfEmp"));

  useEffect(() => {
    const accountid = sessionStorage.getItem("id");
    console.log(`Emp ID: ${accountid}`);
    GetProfleEmp(accountid);
  }, []);

  const [formInput, setFormInput] = useState({
    accountid: aid, fullname: '', phone: '', gender: '', email: '', dob: '2023-10-24T08:28:07.640Z', city: '', distric: '',
    position: '', companyaddress: '', company: '', addressDetail: '', image: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleUserInput = (name, value) => {
    if (isEditing) {
      setFormInput({ ...formInput, [name]: value });
    }
  };

  const GetProfleEmp = async (eid) => {
    console.log("eid", eid);
    let res = await getEmpById(eid);
    console.log("em", res);
    if (res) {
      setProfile(res)
      setFormInput({
        accountid: aid,
        fullname: res.account.fullName,
        phone: res.phone,
        gender: res.account.gender,
        email: res.account.email,
        dob: res.dob,
        city: res.city,
        position: res.position,
        companyaddress: res.companyaddress,
        distric: res.distric,
        company: res.company,
        expectAddress: res.expectAddress,
        addressDetail: res.addressdetail,
        image: res.image,
      });
      console.log("Dữ liệu mảng:", formInput);
    }

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (save) {
      setIsEditing(false);
      // call api save profile
      let saveProfile = await saveProfileEmp(formInput);
      console.log("saveProfile", saveProfile);
      if (saveProfile) {
        // setFormInput(saveProfile);
        toast.success("Lưu thông tin cá nhân thành công");
      }
      console.log("ssave du lieu thanh cong emp");
    } else {
      setIsEditing(true);
      console.log("chuyen sang trang thai edit emp");
    }
    setSave(!save)
  }

  const handleImageClick = () => {
    // Khi hình ảnh được click, kích hoạt sự kiện click cho input
    document.getElementById('imageInput').click();
  };

  const handleFileChange = async (e) => {
    // Xử lý khi người dùng chọn một tệp ảnh
    const selectedFile = e.target.files[0];
    // console.log('Đã chọn ảnh:', selectedFile);
    // setSelectedImage(URL.createObjectURL(selectedFile));
    // formInput.image=URL.createObjectURL(selectedFile);
    // console.log('URL.createObjectURL(selectedFile):', URL.createObjectURL(selectedFile));

    // Thêm xử lý tải ảnh lên server hoặc hiển thị nó trên trang
    const formData = new FormData();
    formData.append('image', selectedFile);
    try {
      await axios.post('http://localhost:3001/upload', formData);

      // Lưu trữ đường dẫn URL thực sự trên máy chủ
      const imageUrl = `http://localhost:3001/uploads/${selectedFile.name}`;
      setSelectedImage(imageUrl);
      console.log('imageUrl:', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const [selectedImage, setSelectedImage] = useState(null);
  return (

    <>
      <HeaderEmployer />
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="div-4">
            <div className="div-5">
              <div className="text-wrapper-5">Thông tin tài khoản</div>
            </div>
            <div className="form">
              <div className="div-ant-row">
                <div className="div-6">
                  <div className="div-ant-col-wrapper">
                    <div className="div-ant-col">
                      <div className="div-ant-form-item">
                        <div className="div-uploadavatar-wrapper">
                          <div className="div-7">
                            <div className="div-uploadavatar">                           
                              {selectedImage? (
                                <div>
                                  <img className="user-png-2" src={selectedImage} alt="Selected" />
                                </div>
                              ):(<div className="user-png-2" />)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img
                    style={{ cursor: 'pointer' }}
                    className="camera-svg"
                    alt="Camera svg"
                    onClick={handleImageClick}
                    src="https://c.animaapp.com/7RWGhrfx/img/camera-svg.svg"
                  />
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
                <div className="div-ant-col-2">
                  <div className="div-8">
                    <div className="text-wrapper-6">Tên người dùng</div>
                    <div className="div-ant-row-2">
                      <div className="div-ant-form-items-wrapper">
                        <div className="div-ant-form-istem">
                          <div className="input-wrsapper">
                            {/* <input className="input-profile" type="" value="" /> */}
                            <Form.Control
                              onChange={({ target }) => {
                                handleUserInput(target.name, target.value);
                              }}
                              className="input-profile"
                              type="text" name="fullname"
                              value={formInput.fullname} readOnly={!isEditing} style={isEditing ? {} : { backgroundColor: '#f2f2f2' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="div-9">
                    </div>
                  </div>
                </div>
              </div>
              <div className="overlap-group">
                <div className="div-ant-row-3">
                  <div className="div-ant-col-3">
                    <div className="text-wrapper-9">Ngày sinh</div>
                    <div className="div-ant-row-4">
                      <div className="div-ant-col-4">
                        <div className="div-ant-form-item">
                          <div className="div-ant-form-item-2">
                            <div >
                              <div className="">
                                <div className="">
                                  <div >
                                    <Form.Control
                                      onChange={({ target }) => {
                                        handleUserInput(target.name, target.value);
                                      }}
                                      id="div-ant-picker" name="dob"
                                      type="date"
                                      value={format(new Date(formInput.dob), 'yyyy-MM-dd')}
                                      readOnly={!isEditing}
                                      style={isEditing ? {} : { backgroundColor: '#f2f2f2' }}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="div-ant-col-3">
                    <div className="text-wrapper-9">Giới tính</div>
                    <div className="div-ant-row-4">
                      <div className="div-ant-col-4">
                        <div className="div-ant-form-item">
                          <div className="div-ant-form-item-2">
                            <div className="div-7">
                              <div className="">
                                <div className="span-ant-select">
                                  <Form.Select
                                    onChange={({ target }) => {
                                      handleUserInput(target.name, target.value);
                                    }}
                                    name="gender" style={isEditing ? {} : { backgroundColor: '#f2f2f2' }} id="div-ant-select" value={formInput.gender}>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                  </Form.Select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="div-ant-row-5">
                  <div className="div-ant-col-3">
                    <div className="text-wrapper-9">Số điện thoại</div>
                    <div className="div-ant-row-6">
                      <Form.Control
                        onChange={({ target }) => {
                          handleUserInput(target.name, target.value);
                        }}
                        type="text" name="phone" value={formInput.phone} readOnly={!isEditing} style={isEditing ? {} : { backgroundColor: '#f2f2f2' }}
                      />
                    </div>
                  </div>
                  <div className="div-ant-col-5">
                    <div className="div-10">
                      <div className="div-wrapper-2">
                        <div className="text-wrapper-9">Email</div>
                      </div>
                      <div className="div-11">
                        {/* <div className="text-wrapper-12">Đã xác thực!</div> */}
                      </div>
                    </div>
                    <div className="div-ant-row-7">
                      <div className="div-ant-col-4">
                        <div className="div-ant-form-item">
                          <div className="div-email-wrapper">
                            <div className="">
                              <div className="div-3">
                                <Form.Control
                                  type="text" name="email" value={formInput.email} readOnly style={isEditing ? {} : { backgroundColor: '#f2f2f2' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="div-ant-row-5">
                  <div className="div-ant-col-3">
                    <div className="text-wrapper-9">Số điện thoại</div>
                    <div className="div-ant-row-6">
                      <Form.Control
                        onChange={({ target }) => {
                          handleUserInput(target.name, target.value);
                        }}
                        type="text" name="phone" value={formInput.phone} readOnly={!isEditing} style={isEditing ? {} : { backgroundColor: '#f2f2f2' }}
                      />
                    </div>
                  </div>
                  <div className="div-ant-col-5">
                    <div className="div-10">
                      <div className="div-wrapper-2">
                        <div className="text-wrapper-9">Email</div>
                      </div>
                      <div className="div-11">
                        {/* <div className="text-wrapper-12">Đã xác thực!</div> */}
                      </div>
                    </div>
                    <div className="div-ant-row-7">
                      <div className="div-ant-col-4">
                        <div className="div-ant-form-item">
                          <div className="div-email-wrapper">
                            <div className="">
                              <div className="div-3">
                                <Form.Control
                                  type="text" name="email" value={formInput.email} readOnly style={isEditing ? {} : { backgroundColor: '#f2f2f2' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-address-address">
                <div className="div-ant-col-3">
                  <div className="text-wrapper-9">Tỉnh, thành phố</div>
                  <div className="div-ant-row-6">
                    <Form.Control
                      onChange={({ target }) => {
                        handleUserInput(target.name, target.value);
                      }}
                      type="text" name="city" value={formInput.city} readOnly={!isEditing} style={isEditing ? {} : { backgroundColor: '#f2f2f2' }}
                    />
                  </div>
                </div>

                <div className="div-ant-col-3">
                  <div className="text-wrapper-9">Quận, huyện</div>
                  <div className="div-ant-row-6">
                    <Form.Control
                      onChange={({ target }) => {
                        handleUserInput(target.name, target.value);
                      }}
                      type="text" name="distric" value={formInput.distric} readOnly={!isEditing} style={isEditing ? {} : { backgroundColor: '#f2f2f2' }}
                    />
                  </div>
                </div>
              </div>
              <div className="div-desiredlocation">
                <div className="div-ant-col-3">
                  <div className="text-wrapper-9">Địa chỉ cụ thể</div>
                  <div className="div-ant-row-6">
                    <textarea
                      onChange={({ target }) => {
                        handleUserInput(target.name, target.value);
                      }}
                      id="profile-address" name="addressDetail" value={formInput.addressDetail} readOnly={!isEditing} style={isEditing ? {} : { backgroundColor: '#f2f2f2' }}></textarea>
                  </div>
                </div>
              </div>

              <div className="div-12">
                {save ? (
                  <button className="button-2" type="submit">
                    <div className="btn-save-profile">Lưu</div>
                  </button>
                ) : (
                  <button className="button-2" type="submit">
                    <div className="btn-save-profile">Sửa</div>
                  </button>
                )}
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </>
  )

}

export default Profilemp;