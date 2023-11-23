import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Button from 'react-bootstrap/Button';
import Header from "../components/adminHeader";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { GetAllJob } from "../../../Service/userService";
import moment from 'moment';
import { Link } from "react-router-dom";


const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  useEffect(() => {
    GetAllPost();
  }, []);

  const GetAllPost = async () => {
    let res = await GetAllJob();
    if (res) {
      setData(res)
    }
  }

  console.log("checkdata", data)

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }
  );

  //Call API
  const rows = data.map((item) => ({
    id: item.id,
    title: item.title,
    email: item.email,
    company: item.company,
    createdAt: moment(item.createdAt).format('DD/MM/yyyy'),
    deadline: moment(item.deadline).format('DD/MM/yyyy'),
    jobTime: item.jobTime,
    salary: VND.format(item.salary),
    typeSalary: item.typeSalary,
    numberApply: item.numberApply,
    status: item.status,
  }))

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1
    },
    {
      field: "title",
      headerName: "Tiêu đề",
      flex: 2.5,
      renderCell: (params) => (
        <Link style={{ color: "#fff" }} to='/'>{params.value}</Link>
      )
    },
    {
      field: "company",
      headerName: "Công ty / Cá nhân",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "createdAt",
      headerName: "Ngày tuyển dụng",
      type: "datetime",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "deadline",
      headerName: "Hạn tuyển dụng",
      type: "datetime",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "jobTime",
      headerName: "Thời gian",
      flex: 1,
    },
    {
      field: "salary",
      headerName: "Lương",
      flex: 1,
    },
    {
      field: "typeSalary",
      headerName: "Loại lương",
      flex: 0.8,
    },
    {
      field: "numberApply",
      headerName: "Số lượng người tuyển",
      flex: 1.1,
      align: "center",
    },
    {
      field: "status",
      headerName: "Trạng Thái",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === 0
                ? colors.grey[600]
                : status === 1
                  ? colors.greenAccent[700]
                  : colors.redAccent[700]
            }
            borderRadius="4px"
          >
            {status === 0 ? "Chưa duyệt" : ""}
            {status === 1 ? "Đã duyệt" : ""}
            {status === 2 ? "Đã xóa" : ""}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {/* {status} */}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Danh sách công việc"
        subtitle="Duyệt bài đăng"
      />
      <div>
        <Button id="approve-btn" variant="outline-success">Duyệt</Button>
        <Button id="approve-btn" variant="outline-warning">Từ chối</Button>
        <Button id="approve-btn" variant="outline-danger">Xóa</Button>
      </div>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          {...data}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 8 } },
          }}
          pageSizeOptions={[15, 25, 50]}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
