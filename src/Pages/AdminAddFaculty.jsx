import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import PrintIcon from "@mui/icons-material/Print";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import LockResetIcon from "@mui/icons-material/LockReset";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MaterialReactTable from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { adminAddFaculty } from "../redux/action/adminAction";
import AdminFacultyDetail from "./Admin/AdminFacultyDetail";
import { useTranslation } from "react-i18next";

function AdminAddFaculty() {
	const store = useSelector((store) => store);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoading2, setIsLoading2] = useState(false);
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [datas, setData] = useState([]);
	const [fetched, setFetched] = useState([]);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [createModalOpen2, setCreateModalOpen2] = useState(false);
	const list = fetched.map((row) => {
		const name = row.name;
		const email = row.email;
		const facultyMobileNumber = row.facultyMobileNumber;
		const aadharCard = row.aadharCard;
		const department = row.department;
		const gender = row.gender;
		const registrationNumber = row.registrationNumber;
		const dob = row.dob;
		const joiningYear = row.joiningYear;

		return {
			name,
			email,
			facultyMobileNumber,
			aadharCard,
			department,
			gender,
			registrationNumber,
			dob,
			joiningYear,
		};
	});
	useEffect(() => {
		if (datas.length !== 0) {
			setFetched(datas);
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
			header: "Reg num",
			size: 140,
		},
		{
			accessorKey: "name",
			header: t("full_name"),
			size: 20,
		},
		{
			accessorKey: "department",
			header: t("department"),
			size: 140,
		},
		{
			accessorKey: "dob",
			header: t("date_of_birth"),
			size: 140,
		},
		{
			accessorKey: "email",
			header: "Email",
			size: 140,
		},
		{
			accessorKey: "gender",
			header: t("gender"),
			size: 140,
		},
		{
			accessorKey: "joiningYear",
			header: t("academic_year"),
			size: 140,
		},
		{
			accessorKey: "facultyMobileNumber",
			header: t("phone_number"),
			size: 140,
		},
		{
			accessorKey: "aadharCard",
			header: t("secontNumber"),
			size: 140,
		},
	]);

	const getAllMovies = async () => {
		setIsLoading(true);
		try {
			const url = `/api/admin/getAllFaculty`;
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
					url: "/api/admin/deleteFaculty",
					data: regnum,
				});
				toast.success(`Teacher ${row.getValue("registrationNumber")} deleted`);
				getAllMovies();
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		if (store.error) {
			setIsLoading2(false);
		}
	}, [store.error]);

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
					"Full name",
					"Department",
					"Date of birth",
					"Email",
					"Gender",
					"Academic year",
					"First number",
					"Secont number",
				],
			],
			body: filter.map((item, index) => [
				index + 1,
				item.registrationNumber,
				item.name,
				item.department,
				item.dob,
				item.email,
				item.gender,
				item.joiningYear,
				item.facultyMobileNumber,
				item.aadharCard,
			]),
		});
		doc.save("SubjectsList.pdf");
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
		XLSX.writeFile(workBook, "SubjectsData.xlsx");
	};
	const resetHandler = async (registrationNumber) => {
		const id = { registrationNumber: registrationNumber };
		if (
			window.confirm(`Ushbu ${registrationNumber} paroli asliga qaytarilsinmi?`)
		) {
			try {
				await axios({
					method: "Post",
					url: "/api/admin/resetPasswordFaculty",
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
					<ToastContainer />
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
													<Tooltip
														arrow
														placement="left"
														title="Password recovery">
														<IconButton
															onClick={() =>
																resetHandler(row.getValue("registrationNumber"))
															}>
															<LockResetIcon />
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
														{t("add_teacher")}
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
													{t("total_page")}
													{table.getRowModel().rows.length}
													<Typography>
														{t("total_facultys")} {list.length}
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
										getAllMovies={getAllMovies}
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
	const [dob, setDob] = useState("");
	const { t } = useTranslation();

	const [department, setDepartment] = useState("");
	const [name, setName] = useState("");
	const [facultyMobileNumber, setFirstNumber] = useState("");
	const [aadharCard, setSecontNumber] = useState("");
	const [gender, setGender] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit = () => {
		setIsLoading(true);
		dispatch(
			adminAddFaculty({
				name,
				facultyMobileNumber,
				department,
				aadharCard,
				dob,
				gender,
				email,
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
		if (store.error || store.admin.adminAddFacultyFlag) {
			setIsLoading(false);
		}
	}, [store.error, store.admin.adminAddFacultyFlag]);

	return (
		<Dialog open={open}>
			<DialogTitle textAlign="center">{t("add_teacher")}</DialogTitle>
			<DialogContent>
				<form onSubmit={(e) => e.preventDefault()}>
					<Stack
						sx={{
							width: "100%",
							minWidth: { xs: "300px", sm: "360px", md: "400px" },
							gap: "1.5rem",
						}}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">
								{t("department")}
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="Age"
								onChange={(e) => setDepartment(e.target.value)}>
								<MenuItem value="B.Tech">B.Tech</MenuItem>
								<MenuItem value="B.Sc">B.Sc</MenuItem>
								<MenuItem value="BAA">BAA</MenuItem>
							</Select>
							<FormHelperText sx={{ color: "red" }}>
								{error.department}
							</FormHelperText>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								label={t("full_name")}
								type="text"
								onChange={(e) => setName(e.target.value)}
							/>
							<FormHelperText sx={{ color: "red" }}>
								{error.name}
							</FormHelperText>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								label={t("date_of_birth")}
								InputLabelProps={{
									shrink: true,
								}}
								type="date"
								onChange={(e) => setDob(e.target.value)}
							/>
							<FormHelperText sx={{ color: "red" }}>
								{error.totalLectures}
							</FormHelperText>
						</FormControl>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">
								{t("gender")}
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="Age"
								onChange={(e) => setGender(e.target.value)}>
								<MenuItem value="Male">Male</MenuItem>
								<MenuItem value="Female">Female</MenuItem>
							</Select>
							<FormHelperText sx={{ color: "red" }}>
								{error.department}
							</FormHelperText>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								label={t("phone_number")}
								type="number"
								onChange={(e) => setFirstNumber(e.target.value)}
							/>
							<FormHelperText sx={{ color: "red" }}>
								{error.firstNumber}
							</FormHelperText>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								label={t("secontNumber")}
								type="number"
								onChange={(e) => setSecontNumber(e.target.value)}
							/>
							<FormHelperText sx={{ color: "red" }}>
								{error.secondNumber}
							</FormHelperText>
						</FormControl>
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
						{t("add_teacher")}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export const CreateNewAccountModal = ({ open, onClose, getAllMovies }) => {
	const { t } = useTranslation();
	return (
		<Dialog open={open}>
			<DialogTitle textAlign="center">{t("update_faculty")}</DialogTitle>
			<DialogContent>
				<AdminFacultyDetail onClose={onClose} />
			</DialogContent>
		</Dialog>
	);
};

export default AdminAddFaculty;
