import './register.css'

import require_icon from '../../../Assets/require.png'
import logo_icon from '../../../Assets/1.jpg'
import eye_icon from '../../../Assets/view.png'

function Register() {
  return (
    <div className='container'>
            <div id="login-form">

                <div className="logo">
                    <img src={logo_icon} alt="" />
                </div>

                <div className="header">
                    <p className='header-top'>CHÀO MỪNG BẠN ĐÃ QUAY TRỞ LẠI</p>
                    <p className='header-body'>Tìm ứng viên linh hoạt và phù hợp cùng <span>việc làm part-time.</span></p>
                    <p className='header-bottom'>Đăng ký</p>
                </div>

                <div className="register-form">
                    <div className="inputs">
                        <div className="input">
                            <p id='title'>Email đăng nhập<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='input' type="email" placeholder='   Email' required />
                        </div>

                        <div className="input">
                            <p id='title'>Mật khẩu<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='input' type="password" placeholder='    Mật khẩu' required />
                            <img src={eye_icon} alt="" />
                        </div>

                        <div className="input">
                            <p id='title'>Nhập lại mật khẩu<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='input' type="password" placeholder='    Nhập lại mật khẩu' required />
                            <img src={eye_icon} alt="" />
                        </div>
                    </div>

                    <p className='header-bottom'>Thông tin nhà tuyển dụng</p>

                    <div className="infomation">
                        <div className="input">
                            <p id='title'>Họ và tên<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='name' type="text" placeholder='   Email' required />
                        </div>

                        <div className="sex">
                            <p id='title'>Giới tính<img id='require-icon' src={require_icon} alt="" /></p>
                            <input type="radio" checked required />Nam
                            <input type="radio" required />Nữ
                        </div>

                        <div className="input">
                            <p id='title'>Số điện thoại cá nhân<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='input' type="email" placeholder='   Email' required />
                        </div>

                        <div className="input">
                            <p id='title'>Công ty, cơ sở kinh doanh<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='name' type="text" placeholder='   Email' required />
                        </div>

                        <div className="input">
                            <p id='title'>Vị trí kinh doanh<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='name' type="text" placeholder='   Email' required />
                        </div>

                        <div className="input">
                            <p id='title'>Tỉnh, thành phố<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='name' type="text" placeholder='   Email' required />
                        </div>

                        <div className="input">
                            <p id='title'>Quận, huyện<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='name' type="text" placeholder='   Email' required />
                        </div>

                        <div className="input">
                            <p id='title'>Địa chỉ cụ thể<img id='require-icon' src={require_icon} alt="" /></p>
                            <textarea id='input'></textarea>
                        </div>

                        <div className="checkbox">
                            <input type="checkbox" name="" />
                            <p id='accept'>Đồng ý với điều khoản của <span>Việc làm part-time</span></p>
                        </div>
                    </div>
                </div>

                <div className="submit">
                    <button id='submit' className="">Đăng ký</button>
                </div>

                <div>
                    <p id='re-login'>Đã có tài khoản? <span>Login</span></p>
                </div>

            </div>

            <div id="content"></div>
        </div>
  )
}

export default Register
