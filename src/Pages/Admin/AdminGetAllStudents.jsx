import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import PrintIcon from "@mui/icons-material/Print";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import LockResetIcon from "@mui/icons-material/LockReset";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "jspdf-autotable";

import {
  CircularProgress,
  Box,
  IconButton,
  Tooltip,
  TableContainer,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MaterialReactTable from "material-react-table";
import { useTranslation } from "react-i18next";

function DekanGetAllStudents() {
  const store = useSelector((store) => store);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [datas, setData] = useState([]);
  const [fetched, setFetched] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (datas.length === undefined) {
      setFetched(datas.attendanceArray);
    }
  }, [datas]);

  const list = fetched.map((row) => ({
    registrationNumber: row.student.registrationNumber,
    name: row.student.name,
    department: row.student.department,
    email: row.student.email,
    year: row.student.year,
    gender: row.student.gender,
    fatherName: row.student.fatherName,
    section: row.student.section,
    dob: row.student.dob,
    batch: row.student.batch,
    studentMobileNumber: row.student.studentMobileNumber,
    fatherMobileNumber: row.student.fatherMobileNumber,
    attendances: row.attendances,
    totalAbsentHours: row.totalAbsentHours,
    totalLectureAttended: row.totalLectureAttended,
    totalLectures: row.totalLectures,
    totalPresentage: (row.totalLectureAttended / row.totalLectures) * 100,
    totalMaxHours: row.totalMaxHours,
  }));

  useEffect(() => {
    if (list.length !== 0) {
      setIsLoading(false);
    }
  }, [list]);

  const columns = useMemo(() => [
    {
      accessorKey: "registrationNumber",
      header: "ID",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "name",
      header: t("full_name"),
      size: 140,
    },
    {
      accessorKey: "department",
      header: t("department"),
      size: 140,
    },
    {
      accessorKey: "section",
      header: t("section"),
      size: 140,
    },
    {
      accessorKey: "year",
      header: t("year"),
      size: 80,
    },
    {
      accessorKey: "gender",
      header: t("gender"),
      size: 80,
    },
    {
      accessorKey: "dob",
      header: t("date_of_birth"),
      size: 80,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "batch",
      header: t("academic_year"),
    },
    {
      accessorKey: "studentMobileNumber",
      header: t("phone_number"),
    },
    {
      accessorKey: "fatherName",
      header: t("father_name"),
    },
    {
      accessorKey: "fatherMobileNumber",
      header: t("father_phone_number"),
    },
  ]);

  const getAllMovies = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios({
        method: "Get",
        url: "/api/admin/findAllStudent",
      });
      setData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  const downloadPdf = (rows) => {
    const filter = rows.map((row) => row.original);
    const doc = new jsPDF();
    doc.text("Students List", 20, 10);
    doc.autoTable({
      theme: "grid",
      head: [
        [
          "T/R",
          "Reg Num",
          "Full Name",
          "Department",
          "Section",
          "Date of birth",
          "Cours",
          "Gender",
          "Email",
          "Academic year",
          "Student Mobile Number",
          "Father Mobile Number",
        ],
      ],
      body: filter.map((item, index) => [
        index + 1,
        item.registrationNumber,
        item.name,
        item.department,
        item.section,
        item.dob,
        item.year,
        item.gender,
        item.email,
        item.batch,
        item.studentMobileNumber,
        item.fatherMobileNumber,
      ]),
    });
    doc.save("StudentsList.pdf");
  };

  const downloadExcel = (rows) => {
    const filter = rows.map((row) => row.original);
    // const newData = filter.map((row) => {
    // 	delete row.password;
    // 	delete row.subjects;
    // 	delete row._id;
    // 	delete row.avatar;
    // 	delete row.__v;
    // 	return row;
    // });
    const workSheet = XLSX.utils.json_to_sheet(filter);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "students");
    //Buffer
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, "StudentsData.xlsx");
  };

  const resetHandler = async (registrationNumber) => {
    const id = { registrationNumber: registrationNumber };
    if (
      window.confirm(`Ushbu ${registrationNumber} paroli asliga qaytarilsinmi?`)
    ) {
      try {
        await axios({
          method: "Post",
          url: "/api/admin/resetPasswordStudent",
          data: id,
        });
        toast.success("Password recovery successful");
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  return (
    <>
      {store.admin.isAuthenticated ? (
        <>
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "calc(100vh - 60px)",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {!isLoading && (
            <>
              <ToastContainer />
              <TableContainer
                sx={{
                  ml: 1,
                  width: { xs: 305, sm: 530, md: 750, lg: 1000, xl: 1500 },
                }}
              >
                <MaterialReactTable
                  displayColumnDefOptions={{
                    "mrt-row-actions": {
                      muiTableHeadCellProps: {
                        align: "center",
                      },
                      size: 120,
                    },
                  }}
                  columns={columns}
                  data={list}
                  editingMode="modal" //default
                  enableColumnOrdering
                  enableEditing
                  renderRowActions={({ row }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <Tooltip arrow placement="left" title="Password recovery">
                        <IconButton
                          onClick={() =>
                            resetHandler(row.getValue("registrationNumber"))
                          }
                        >
                          <LockResetIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                  renderDetailPanel={({ row }) => (
                    <TableContainer sx={{ maxWidth: 650 }} component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Fan nomi</TableCell>
                            <TableCell align="center">Jami darslar</TableCell>
                            <TableCell align="center">
                              O'tilgan darslar
                            </TableCell>
                            <TableCell align="center">Qatnashgan</TableCell>
                            <TableCell align="center">Qatnashmagan</TableCell>
                            <TableCell align="center">Foizlarda</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {row.original.attendances.map((row) => (
                            <TableRow
                              key={row.subjectName}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center" scope="row">
                                {row.subjectName}
                              </TableCell>
                              <TableCell align="center" scope="row">
                                {row.maxHours}
                              </TableCell>
                              <TableCell align="center">
                                {row.totalLecturesByFaculty}
                              </TableCell>
                              <TableCell align="center">
                                {row.lectureAttended}
                              </TableCell>
                              <TableCell align="center">
                                {row.absentHours}
                              </TableCell>
                              <TableCell align="center">
                                {row.attendence}%
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        <TableHead
                          sx={{
                            backgroundColor:
                              row.original.totalAbsentHours <= 25
                                ? "green"
                                : row.original.totalAbsentHours <= 40
                                ? "#B9CC58"
                                : row.original.totalAbsentHours <= 70
                                ? "red"
                                : "",
                          }}
                        >
                          <TableRow>
                            <TableCell align="center">Jami</TableCell>
                            <TableCell align="center">
                              {row.original.totalMaxHours}
                            </TableCell>
                            <TableCell align="center">
                              {row.original.totalLectures}
                            </TableCell>
                            <TableCell align="center">
                              {row.original.totalLectureAttended}
                            </TableCell>
                            <TableCell align="center">
                              {row.original.totalAbsentHours}
                            </TableCell>
                            <TableCell align="center">
                              {row.original.totalPresentage.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                  )}
                  renderTopToolbarCustomActions={({ table }) => (
                    <>
                      <Tooltip arrow title="Print for PDF">
                        <IconButton
                          disabled={table.getRowModel().rows.length === 0}
                          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                          onClick={() => downloadPdf(table.getRowModel().rows)}
                          startIcon={<FileDownloadIcon />}
                          variant="contained"
                        >
                          <PrintIcon />
                        </IconButton>
                      </Tooltip>
                      <button onClick={() => getAllMovies()}>Reload</button>
                      <Tooltip arrow title="Print for Excel">
                        <IconButton
                          disabled={table.getRowModel().rows.length === 0}
                          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                          onClick={() =>
                            downloadExcel(table.getRowModel().rows)
                          }
                          startIcon={<FileDownloadIcon />}
                          variant="contained"
                        >
                          <PrintIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                  renderBottomToolbarCustomActions={({ table }) => (
                    <>
                      {t("total_page")}
                      {table.getRowModel().rows.length}
                      <Typography>
                        {t("total_students")} {list?.length}
                      </Typography>
                    </>
                  )}
                />
              </TableContainer>
            </>
          )}
        </>
      ) : (
        navigate("/login")
      )}
    </>
  );
}

export default DekanGetAllStudents;
