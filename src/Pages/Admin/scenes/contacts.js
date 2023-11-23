import { Box, useTheme } from "@mui/material";
import Header from "../components/adminHeader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";
import '../admin.scss'
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import PopupAdmin from '../components/popupContact'
import Form from 'react-bootstrap/Form';

const Contact = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [btnPopup, setBtnPopup] = useState(false)
  return (
    <Box m="20px" >
      <Header title="Liên hệ" subtitle="Phản hồi câu hỏi từ người dùng" />

      <Accordion defaultExpanded style={{ width: '1200px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Thằng nhà tuyển dụng lừa tôi
          </Typography>
          <div className="contact-infomation-time"><i class="fa-regular fa-clock"></i> 49 phút trước</div>
        </AccordionSummary>
        <div className="contact-infomation">
          <div className="contact-infomation-avt">
            <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
          </div>
          <div className="contact-infomation-detail">
            <div className="contact-infomation-name">Phúc Đào <span>(phucdao@gmail.com)</span></div>
            <div className="contact-infomation-role">Ứng viên</div>
          </div>
        </div>
        <AccordionDetails>
          <Typography>
            Ad ban thằng tuyển dụng trông chó đi. Nó lừa tôi trông mèo
            <Button onClick={() => setBtnPopup(true)} style={{ translate: '680px' }} variant="outline-light">Phản hồi</Button>
          </Typography>
        </AccordionDetails>
        <PopupAdmin trigger={btnPopup} setTrigger={setBtnPopup}>
          <div className='admin-notify-top'>Phản hồi</div>
          <div className='admin-notify-item'>
            <Form.Control
              type="text"
              id="contact-input"
            />
          </div>
          <Button onClick={() => setBtnPopup(false)} style={{ float: 'inline-end', marginLeft: '10px' }} variant="danger">Hủy bỏ</Button>
          <Button style={{ float: 'inline-end' }} variant="success">Phản hồi</Button>
        </PopupAdmin>
      </Accordion>

      <Accordion defaultExpanded style={{ width: '1200px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Thằng nhà tuyển dụng lừa tôi
          </Typography>
          <div className="contact-infomation-time"><i class="fa-regular fa-clock"></i> 49 phút trước</div>
        </AccordionSummary>
        <div className="contact-infomation">
          <div className="contact-infomation-avt">
            <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
          </div>
          <div className="contact-infomation-detail">
            <div className="contact-infomation-name">Phúc Đào <span>(phucdao@gmail.com)</span></div>
            <div className="contact-infomation-role">Ứng viên</div>
          </div>
        </div>
        <AccordionDetails>
          <Typography>
            Ad ban thằng tuyển dụng trông chó đi. Nó lừa tôi trông mèo
            <Button onClick={() => setBtnPopup(true)} style={{ translate: '680px' }} variant="outline-light">Phản hồi</Button>
          </Typography>
        </AccordionDetails>
        <PopupAdmin trigger={btnPopup} setTrigger={setBtnPopup}>
          <div className='admin-notify-top'>Phản hồi</div>
          <div className='admin-notify-item'>
            <Form.Control
              type="text"
              id="contact-input"
            />
          </div>
          <Button onClick={() => setBtnPopup(false)} style={{ float: 'inline-end', marginLeft: '10px' }} variant="danger">Hủy bỏ</Button>
          <Button style={{ float: 'inline-end' }} variant="success">Phản hồi</Button>
        </PopupAdmin>
      </Accordion>

      <Accordion defaultExpanded style={{ width: '1200px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Thằng nhà tuyển dụng lừa tôi
          </Typography>
          <div className="contact-infomation-time"><i class="fa-regular fa-clock"></i> 49 phút trước</div>
        </AccordionSummary>
        <div className="contact-infomation">
          <div className="contact-infomation-avt">
            <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
          </div>
          <div className="contact-infomation-detail">
            <div className="contact-infomation-name">Phúc Đào <span>(phucdao@gmail.com)</span></div>
            <div className="contact-infomation-role">Ứng viên</div>
          </div>
        </div>
        <AccordionDetails>
          <Typography>
            Ad ban thằng tuyển dụng trông chó đi. Nó lừa tôi trông mèo
            <Button onClick={() => setBtnPopup(true)} style={{ translate: '680px' }} variant="outline-light">Phản hồi</Button>
          </Typography>
        </AccordionDetails>
        <PopupAdmin trigger={btnPopup} setTrigger={setBtnPopup}>
          <div className='admin-notify-top'>Phản hồi</div>
          <div className='admin-notify-item'>
            <Form.Control
              type="text"
              id="contact-input"
            />
          </div>
          <Button onClick={() => setBtnPopup(false)} style={{ float: 'inline-end', marginLeft: '10px' }} variant="danger">Hủy bỏ</Button>
          <Button style={{ float: 'inline-end' }} variant="success">Phản hồi</Button>
        </PopupAdmin>
      </Accordion>

      <Accordion defaultExpanded style={{ width: '1200px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Thằng nhà tuyển dụng lừa tôi
          </Typography>
          <div className="contact-infomation-time"><i class="fa-regular fa-clock"></i> 49 phút trước</div>
        </AccordionSummary>
        <div className="contact-infomation">
          <div className="contact-infomation-avt">
            <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
          </div>
          <div className="contact-infomation-detail">
            <div className="contact-infomation-name">Phúc Đào <span>(phucdao@gmail.com)</span></div>
            <div className="contact-infomation-role">Ứng viên</div>
          </div>
        </div>
        <AccordionDetails>
          <Typography>
            Ad ban thằng tuyển dụng trông chó đi. Nó lừa tôi trông mèo
            <Button onClick={() => setBtnPopup(true)} style={{ translate: '680px' }} variant="outline-light">Phản hồi</Button>
          </Typography>
        </AccordionDetails>
        <PopupAdmin trigger={btnPopup} setTrigger={setBtnPopup}>
          <div className='admin-notify-top'>Phản hồi</div>
          <div className='admin-notify-item'>
            <Form.Control
              type="text"
              id="contact-input"
            />
          </div>
          <Button onClick={() => setBtnPopup(false)} style={{ float: 'inline-end', marginLeft: '10px' }} variant="danger">Hủy bỏ</Button>
          <Button style={{ float: 'inline-end' }} variant="success">Phản hồi</Button>
        </PopupAdmin>
      </Accordion>
    </Box>
  );
};

export default Contact;
