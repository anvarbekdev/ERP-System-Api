import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import PrintIcon from "@mui/icons-material/Print";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

import "jspdf-autotable";

import {
	CircularProgress,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	TextField,
	Tooltip,
	TableContainer,
	InputLabel,
	MenuItem,
	FormHelperText,
	Select,
	FormControl,
	Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MaterialReactTable from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { dekanAddStudent } from "../../redux/action/dekanAction";
import DekanStudentDetails from "./DekanStudentDetails";
import { useTranslation } from "react-i18next";

function DekanGetAllStudents() {
	const { t } = useTranslation();

	const store = useSelector((store) => store);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoading2, setIsLoading2] = useState(false);
	const navigate = useNavigate();
	const [datas, setData] = useState([]);
	const [fetched, setFetched] = useState([]);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [createModalOpen2, setCreateModalOpen2] = useState(false);

	const list = fetched.map((row) => {
		const registrationNumber = row.registrationNumber;
		const name = row.name;
		const department = row.department;
		const email = row.email;
		const year = row.year;
		const gender = row.gender;
		const fatherName = row.fatherName;
		const section = row.section;
		const dob = row.dob;
		const batch = row.batch;
		const studentMobileNumber = row.studentMobileNumber;
		const fatherMobileNumber = row.fatherMobileNumber;

		return {
			registrationNumber,
			name,
			department,
			email,
			year,
			gender,
			fatherName,
			section,
			dob,
			batch,
			studentMobileNumber,
			fatherMobileNumber,
		};
	});

	useEffect(() => {
		if (datas.length === undefined) {
			setFetched(datas.studentName);
		}
	}, [datas]);
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
			const url = `/api/dekan/findAllStudent`;
			const { data } = await axios.get(url);
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
	// console.log(data);

	const deleteHandler = async (row) => {
		const id = row.getValue("registrationNumber");
		const regnum = {
			registrationNumber: id,
		};
		if (
			window.confirm(
				`Ushbu ${row.getValue("registrationNumber")} o'chirilsinmi?`
			)
		) {
			try {
				await axios({
					method: "Post",
					url: "/api/dekan/deleteStudent",
					data: regnum,
				});
				toast.success(`Student ${row.getValue("name")} deleted`);
				getAllMovies();
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		if (store.error || store.dekan.adminDeleteStudentFlag) {
			setIsLoading2(false);
		}
	}, [store.error, store.dekan.adminDeleteStudentFlag]);

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

	return (
		<>
			{store.dekan.isAuthenticated ? (
				<>
					{isLoading && (
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								height: "calc(100vh - 60px)",
							}}>
							<CircularProgress />
						</Box>
					)}
					{isLoading2 && (
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								height: "calc(100vh - 60px)",
							}}>
							<CircularProgress />
						</Box>
					)}
					{!isLoading && (
						<>
							{!isLoading2 && (
								<>
									<TableContainer
										sx={{
											ml: 1,
											width: { xs: 305, sm: 530, md: 750, lg: 1000, xl: 1500 },
										}}>
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
													<Link to={`${row.getValue("registrationNumber")}`}>
														<Tooltip arrow placement="left" title="Edit">
															<IconButton
																onClick={() => setCreateModalOpen2(true)}>
																<Edit />
															</IconButton>
														</Tooltip>
													</Link>
													<Tooltip arrow placement="right" title="Delete">
														<IconButton
															color="error"
															onClick={() => deleteHandler(row)}>
															<Delete />
														</IconButton>
													</Tooltip>
												</Box>
											)}
											renderTopToolbarCustomActions={({ table }) => (
												<>
													<Button
														color="secondary"
														onClick={() => setCreateModalOpen(true)}
														variant="contained">
														Add Student
													</Button>
													<Tooltip arrow title="Print for PDF">
														<IconButton
															disabled={table.getRowModel().rows.length === 0}
															//export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
															onClick={() =>
																downloadPdf(table.getRowModel().rows)
															}
															startIcon={<FileDownloadIcon />}
															variant="contained">
															<PrintIcon />
														</IconButton>
													</Tooltip>
													<Tooltip arrow title="Print for Excel">
														<IconButton
															disabled={table.getRowModel().rows.length === 0}
															//export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
															onClick={() =>
																downloadExcel(table.getRowModel().rows)
															}
															startIcon={<FileDownloadIcon />}
															variant="contained">
															<PrintIcon />
														</IconButton>
													</Tooltip>
												</>
											)}
											renderBottomToolbarCustomActions={({ table }) => (
												<>
													{t("total_students")}{" "}
													{table.getRowModel().rows.length}
													<Typography>
														{t("total_page")} {list.length}
													</Typography>
												</>
											)}
										/>
									</TableContainer>
									<CreateNewStudent
										open={createModalOpen}
										onClose={() => setCreateModalOpen(false)}
									/>
									<CreateNewAccountModal
										open={createModalOpen2}
										onClose={() => setCreateModalOpen2(false)}
									/>
								</>
							)}
						</>
					)}
				</>
			) : (
				navigate("/login")
			)}
		</>
	);
}

export const CreateNewStudent = ({ open, onClose }) => {
	const store = useSelector((store) => store);
	const { t } = useTranslation();

	const [name, setName] = useState("");
	const [year, setYear] = useState("");
	const [section, setSection] = useState("");
	const [dob, setDob] = useState("");
	const [gender, setGender] = useState("");
	const [studentMobileNumber, setContactNumber] = useState("");
	const [fatherName, setFatherName] = useState("");
	const [fatherMobileNumber, setFatherContactNumber] = useState("");
	const [registrationNumber, setRegistrationNumber] = useState("");
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const department = store.dekan.dekan.dekan.department;

	const handleSubmit = () => {
		setIsLoading(true);
		dispatch(
			dekanAddStudent({
				registrationNumber,
				name,
				year,
				department,
				fatherName,
				gender,
				section: section,
				dob: dob.split("-").reverse().join("-"),
				studentMobileNumber,
				fatherMobileNumber,
			})
		);
	};

	useEffect(() => {
		if (store.error) {
			setError(store.error);
		}
		setTimeout(() => {
			setError({});
		}, 5000);
	}, [store.error]);

	useEffect(() => {
		if (store.error || store.dekan.dekanAddStudentFlag) {
			setIsLoading(false);
		}
	}, [store.error, store.dekan.dekanAddStudentFlag]);

	return (
		<Dialog open={open}>
			<DialogTitle textAlign="center">Add Student</DialogTitle>
			<DialogContent>
				<form onSubmit={(e) => e.preventDefault()}>
					<Stack
						sx={{
							width: "100%",
							minWidth: { xs: "300px", sm: "360px", md: "400px" },
							gap: "1.5rem",
						}}>
						<FormControl fullWidth>
							<TextField
								label="Reg number"
								type="text"
								onChange={(e) => setRegistrationNumber(e.target.value)}
							/>
							<FormHelperText sx={{ color: "red" }}>
								{error.registrationNumber}
							</FormHelperText>
						</FormControl>
						<Typography htmlFor="departmentId" className="me-3">
							<span className="me-2">{t("faculty")}</span>
							{store.dekan.dekan.dekan.department}
						</Typography>
						{error.department && (
							<div className="invalid-feedback">{error.department}</div>
						)}
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">{t("year")}</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="Age"
								onChange={(e) => setYear(e.target.value)}>
								<MenuItem value="1">1</MenuItem>
								<MenuItem value="2">2</MenuItem>
								<MenuItem value="3">4</MenuItem>
								<MenuItem value="4">5</MenuItem>
							</Select>
							<FormHelperText sx={{ color: "red" }}>
								{error.year}
							</FormHelperText>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								label="Section"
								type="number"
								onChange={(e) => setSection(e.target.value)}
							/>
							<FormHelperText sx={{ color: "red" }}>
								{error.section}
							</FormHelperText>
						</FormControl>{" "}
						<FormControl fullWidth>
							<TextField
								label={t("full_name")}
								required
								type="text"
								onChange={(e) => setName(e.target.value)}
							/>
							<FormHelperText sx={{ color: "red" }}>
								{error.name}
							</FormHelperText>
						</FormControl>{" "}
						<FormControl fullWidth>
							<TextField
								type="date"
								required
								onChange={(e) => setDob(e.target.value)}
								id="outlined-number"
								label={t("date_of_birth")}
								InputLabelProps={{
									shrink: true,
								}}
							/>{" "}
							<FormHelperText sx={{ color: "red" }}>{error.dob}</FormHelperText>
						</FormControl>
						<TextField
							label={t("phone_number")}
							type="number"
							onChange={(e) => setContactNumber(e.target.value)}
						/>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">
								{t("gender")}
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="Age"
								onChange={(e) => setGender(e.target.value)}>
								<MenuItem value="male">Male</MenuItem>
								<MenuItem value="female">Female</MenuItem>
							</Select>
						</FormControl>
						<TextField
							label={t("father_name")}
							type="text"
							onChange={(e) => setFatherName(e.target.value)}
						/>
						<TextField
							label={t("father_phone_number")}
							type="number"
							onChange={(e) => setFatherContactNumber(e.target.value)}
						/>
					</Stack>
				</form>
			</DialogContent>
			<DialogActions sx={{ p: "1.25rem" }}>
				<Button onClick={onClose}>{t("cancel")}</Button>
				{isLoading && (
					<div className="spinner-border text-primary" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				)}
				{!isLoading && (
					<Button color="secondary" onClick={handleSubmit} variant="contained">
						Add Student
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export const CreateNewAccountModal = ({ open, onClose }) => {
	const { t } = useTranslation();

	return (
		<Dialog open={open}>
			<DialogTitle textAlign="center">{t("update_sutudent")}</DialogTitle>
			<DialogContent>
				<DekanStudentDetails onClose={onClose} />
			</DialogContent>
		</Dialog>
	);
};

export default DekanGetAllStudents;
