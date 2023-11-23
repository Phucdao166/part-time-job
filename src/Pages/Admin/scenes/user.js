import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Button from 'react-bootstrap/Button';
import Header from "../components/adminHeader";
import { useEffect, useState } from "react";
import { GetAllAccount } from "../../../Service/adminService";

function User() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  useEffect(() => {
    GetAllUser();
  }, []);

  const GetAllUser = async () => {
    let res = await GetAllAccount();
    if (res) {
      setData(res)
    }
  }

  console.log("checkdata", data)

  //Lấy item từ API
  const rows = data.map((item) => ({
    id: item.id,
    name: item.fullName,
    email: item.email,
    gender: item.gender,
    access: item.roleId,
    status: item.isBaned,
  }))

  const columns = [
    {
      field: "id",
      headerName: "ID"
    },
    {
      field: "name",
      headerName: "Họ và Tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "gender",
      headerName: "Giới tính",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "email",
      headerName: "Liên hệ",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Vai trò",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === 1
                ? colors.redAccent[600]
                : access === 2
                  ? colors.blueAccent[700]
                  : access === 3
                    ? colors.grey[700]
                    : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === 1 ? "employer" : ""}
            {access === 2 ? "candidate" : ""}
            {access === 3 ? "admin" : ""}
            {access === 4 ? "admin aprove" : ""}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {/* {access} */}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
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
              status === 1
                ? colors.redAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {status === 0 ? "UnBlock" : ""}
            {status === 1 ? "Block" : ""}
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
      <Header title="Người dùng" subtitle="Quản lý người dùng" />

      <div>
        <Button id="approve-btn" variant="outline-secondary">Block</Button>
        <Button id="approve-btn" variant="outline-success">Un Block</Button>
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
        <DataGrid checkboxSelection
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

export default User;
