import { useEffect,useState } from 'react';
import './profile.scss';
import Form from 'react-bootstrap/Form';
import Header from "../Themes/Header/header";
import Footer from "../Themes/Footer/footer";
import { getCanById } from '../../../Service/jobService';
import { SaveProfile } from '../../../Service/candidateService';
import { saveProfileEmp } from '../../../Service/employService';
import { ToastContainer,toast } from 'react-toastify';
const Profile = () => {

  const [profile, setProfile] = useState([]);
  const [save, setSave] = useState(false);
  const [aid, setAid] = useState(sessionStorage.getItem("id"));

  useEffect(() => {
    const accountid=sessionStorage.getItem("id");
    console.log(`Job ID: ${accountid}`);
    GetProfle(accountid);
    
  }, []);

  const [formInput, setFormInput] = useState({
    accountid:aid, fullname: '',phone: '',gender: '',email: '',dob: '',city: '',distric: '',expectAddress: '',addressDetail: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleUserInput = (name, value) => {
    if (isEditing) {
      setFormInput({ ...formInput, [name]: value });
    }
  };

  const GetProfle=async(aid)=>{
    let res = getCanById(aid);
    console.log("Dữ liệu proflie:", res);
    res.then(resultArray => {
      console.log("Dữ liệu mảng:", resultArray);
      setProfile(resultArray)
      setFormInput({
        accountid:aid,
        fullname:resultArray[0].fullname,
        phone:resultArray[0].phone,
        gender:resultArray[0].gender,
        email:resultArray[0].email,
        dob:resultArray[0].dob,
        city:resultArray[0].city,
        distric:resultArray[0].distric,
        expectAddress:resultArray[0].expectAddress,
        addressDetail:resultArray[0].addressDetail,
      });
      console.log("Dữ liệu mảng:", resultArray);
    }); 
  }

  const handleSubmit=async(event)=>{
    event.preventDefault();
    if(save){
      console.log("Profile", formInput);
      await SaveProfile(formInput);
      setIsEditing(false);
      toast.success("Lưu thông tin cá nhân thành công");
    }else{
      setIsEditing(true);
      console.log("chuyen sang trang thai edit");
    }
    setSave(!save)
  }
  
  return (
    
    <>
      <Header />
     
      {profile && profile.length > 0 && profile.map((item,index) => {
        return (
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
                            <div className="user-png-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                    <img
                      className="unverified-svg"
                      alt="Unverified svg"
                      src="https://c.animaapp.com/7RWGhrfx/img/unverified-svg.svg"
                    />
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
                                    type="date" value={formInput.dob} readOnly={!isEditing} style={isEditing ? {} : { backgroundColor: '#f2f2f2' }}
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
                               name="gender" style={isEditing ? {} : { backgroundColor: '#f2f2f2' }} id="div-ant-select" defaultValue={formInput.gender === 'Nữ' ? 'Nữ' : formInput.gender === 'Nam'? 'Nam':'Khác'}>
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
              <div className="div-ant-col-3">
                <div className="text-wrapper-9">Địa chỉ làm việc mong muốn</div>
                <div className="div-ant-row-6">
                  <Form.Control
                  onChange={({ target }) => {
                    handleUserInput(target.name, target.value);
                  }}
                    type="text" name="expectAddress" value={formInput.expectAddress} readOnly={!isEditing}  style={isEditing ? {} : { backgroundColor: '#f2f2f2' }}
                  />
                </div>
              </div>
            </div>
            <div className="div-12">
              {save?(
                <button className="button-2" type="submit">
                <div className="btn-save-profile">Lưu</div>
              </button>
              ):(
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
        )
      })
      } 
      <Footer />
    </>
  )

}

export default Profile;