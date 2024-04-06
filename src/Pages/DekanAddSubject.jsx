import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MaterialReactTable from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { dekanAddSubject } from "../redux/action/dekanAction";
import DekanSubjectDetails from "./Admin/DekanSubjectDetails";
import { useTranslation } from "react-i18next";

function DekanGetAllSubject() {
	const store = useSelector((store) => store);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoading2, setIsLoading2] = useState(false);
	const navigate = useNavigate();
	const [datas, setData] = useState([]);
	const [fetched, setFetched] = useState([]);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [createModalOpen2, setCreateModalOpen2] = useState(false);
	const { t } = useTranslation();
	const list = fetched.map((row) => {
		const department = row.department;
		const year = row.year;
		const subjectName = row.subjectName;
		const totalLectures = row.totalLectures;

		return {
			department,
			year,
			subjectName,
			totalLectures,
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
			accessorKey: "department",
			header: t("department"),
			size: 140,
		},
		{
			accessorKey: "year",
			header: t("year"),
			size: 20,
		},
		{
			accessorKey: "subjectName",
			header: t("subjects_name"),
			size: 140,
		},
		{
			accessorKey: "totalLectures",
			header: t("total_lesson"),
			size: 140,
		},
	]);

	const getAllMovies = async () => {
		setIsLoading(true);
		try {
			const url = `/api/dekan/findAllSubject`;
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

	const deleteHandler = async (row) => {
		const id = row.getValue("subjectName");
		const regnum = {
			subjectName: id,
		};
		if (window.confirm(`Ushbu ${row.getValue("subjectName")} o'chirilsinmi?`)) {
			try {
				await axios({
					method: "Post",
					url: "/api/dekan/deleteSubject",
					data: regnum,
				});
				toast.success(`Subject ${row.getValue("subjectName")} deleted`);
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
			head: [["T/R", "Department", "Cours", "Subject name"]],
			body: filter.map((item, index) => [
				index + 1,
				item.department,
				item.year,
				item.subjectName,
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
	return (
		<>
			{store.dekan.isAuthenticated ? (
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
													<Link to={`${row.getValue("subjectName")}`}>
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
														{t("add_subject")}
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
														{t("total_subjects")}
														{list.length}
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
	const department = store.dekan.dekan.dekan.department;
	const [year, setYear] = useState("");
	const [subjectName, setSubjectName] = useState("");
	const [totalLectures, setTotalLectures] = useState("");
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const handleSubmit = () => {
		setIsLoading(true);
		dispatch(
			dekanAddSubject({
				department,
				year,
				subjectName,
				totalLectures,
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
		if (store.error || store.dekan.dekanAddSubjectFlag) {
			setIsLoading(false);
		}
	}, [store.error, store.dekan.dekanAddSubjectFlag]);

	return (
		<Dialog open={open}>
			<ToastContainer />
			<DialogTitle textAlign="center">{t("add_subject")}</DialogTitle>
			<DialogContent>
				<form onSubmit={(e) => e.preventDefault()}>
					<Stack
						sx={{
							width: "100%",
							minWidth: { xs: "300px", sm: "360px", md: "400px" },
							gap: "1.5rem",
						}}>
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
								<MenuItem value="3">3</MenuItem>
								<MenuItem value="4">4</MenuItem>
							</Select>
							<FormHelperText sx={{ color: "red" }}>
								{error.year}
							</FormHelperText>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								label={t("subjects_name")}
								type="text"
								onChange={(e) => setSubjectName(e.target.value)}
							/>
							<FormHelperText sx={{ color: "red" }}>
								{error.subjectName}
							</FormHelperText>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								label={t("total_lesson")}
								type="number"
								onChange={(e) => setTotalLectures(e.target.value)}
							/>
							<FormHelperText sx={{ color: "red" }}>
								{error.totalLectures}
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
						{t("add_subject")}
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
			<DialogTitle textAlign="center">{t("update_subject")}</DialogTitle>
			<DialogContent>
				<DekanSubjectDetails getAllMovies={getAllMovies} onClose={onClose} />
			</DialogContent>
		</Dialog>
	);
};

export default DekanGetAllSubject;
