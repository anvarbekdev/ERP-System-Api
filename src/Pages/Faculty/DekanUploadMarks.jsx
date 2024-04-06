import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { fetchStudents, uploadMarks } from "../../redux/action/dekanAction";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const DekanUploadMarks = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [year, setYear] = useState("");
	const [marks, setMarks] = useState([]);
	const [section, setSection] = useState("");
	const [subjectName, setSubjectName] = useState("");
	const [totalMarks, setTotalMarks] = useState();
	const [exam, setExam] = useState("");
	const [error, setError] = useState({});
	const [errorHelper, setErrorHelper] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isLoading2, setIsLoading2] = useState(false);
	const { t } = useTranslation();
	const department = store.dekan.dekan.dekan.department;

	const handleInputChange = (value, _id) => {
		const newMarks = [...marks];
		let index = newMarks.findIndex((m) => m._id === _id);
		if (index === -1) {
			newMarks.push({ _id, value });
		} else {
			newMarks[index].value = value;
		}
		setMarks(newMarks);
	};

	const formHandler = (e) => {
		e.preventDefault();
		setIsLoading(true);
		dispatch(fetchStudents(department, year, section));
	};

	useEffect(() => {
		if (store.dekan.loadingSearch === true) {
			setIsLoading(false);
		}
	}, [store.dekan.loadingSearch]);

	useEffect(() => {
		if (store.error) {
			setError(store.error);
		}
		setTimeout(() => {
			setError({});
		}, 5000);
		if (store.error) {
			setIsLoading(false);
		}
	}, [store.error]);

	const secondFormHandler = (e) => {
		e.preventDefault();
		setIsLoading2(true);
		dispatch(
			uploadMarks(
				subjectName,
				exam,
				totalMarks,
				marks,
				department,
				year,
				section
			)
		);
	};

	useEffect(() => {
		if (store.errorHelper) {
			setErrorHelper(store.errorHelper);
		}
		setTimeout(() => {
			setErrorHelper({});
		}, 5000);

		if (store.errorHelper) {
			setIsLoading2(false);
		}
	}, [store.errorHelper]);

	useEffect(() => {
		if (store.dekan.markLoad === false) {
			setIsLoading2(false);
		}
	}, [store.dekan.markLoad]);
	return (
		<div>
			{store.dekan.isAuthenticated ? (
				<>
					<Box sx={{ display: { sx: "block", md: "flex" } }}>
						<form noValidate onSubmit={formHandler} className="text-center">
							<Typography>{t("evaluation")}</Typography>
							<div className="form-group">
								<label htmlFor="branchId">{t("faculty")}</label>
								<p>{store.dekan.dekan.dekan.department}</p>
								{error.department && (
									<div className="invalid-feedback">{error.department}</div>
								)}
							</div>
							<div className="form-group">
								<label htmlFor="yearId">{t("year")}</label>
								<select
									onChange={(e) => setYear(e.target.value)}
									className={classnames("form-control", {
										"is-invalid": error.year,
									})}
									id="yearId">
									<option>{t("select")}</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
								</select>

								{error.year && (
									<div className="invalid-feedback">{error.year}</div>
								)}
							</div>
							<div className="form-group">
								<label htmlFor="sectionId">{t("section")}</label>
								<input
									onChange={(e) => setSection(e.target.value)}
									type="text"
									className={classnames("form-control", {
										"is-invalid": error.section,
									})}
									id="sectionId"></input>
								{error.section && (
									<div className="invalid-feedback">{error.section}</div>
								)}
							</div>
							<div className="row justify-content-center mt-2">
								<div className="col-md-1">
									{isLoading && (
										<div className="spinner-border text-primary" role="status">
											<span className="sr-only">Loading...</span>
										</div>
									)}
								</div>
								{!isLoading && (
									<Button type="submit" variant="outlined">
										{t("search")}
									</Button>
								)}
							</div>
						</form>
						{!store.dekan.fetchedStudentsHelper && (
							<form onSubmit={secondFormHandler} className="text-center">
								<Box sx={{ display: "flex", justifyContent: "center" }}>
									<div className="form-group ms-2">
										<label htmlFor="subjectId">{t("subjects_name")}</label>
										<select
											onChange={(e) => setSubjectName(e.target.value)}
											className={classnames("form-control", {
												"is-invalid": errorHelper.setSubjectName,
											})}
											id="subjectId">
											<option>{t("select")}</option>
											{store.dekan.allSubjectName.map((subjectCodeName) => (
												<option>{subjectCodeName}</option>
											))}
										</select>
										{errorHelper.setSubjectName && (
											<div className="invalid-feedback">
												{errorHelper.setSubjectName}
											</div>
										)}
									</div>
									<div className="form-group ms-2">
										<label htmlFor="examId">Exam</label>
										<select
											onChange={(e) => setExam(e.target.value)}
											value={exam}
											className={classnames("form-control", {
												"is-invalid": errorHelper.exam,
											})}
											id="examId">
											<option>{t("select")}</option>
											<option value="CycleTest1">1-Oraliq</option>
											<option value="CycleTest2">2-Oraliq</option>
											<option value="Semester1">1-Semester</option>
											<option value="CycleTest3">3-Oraliq</option>
											<option value="CycleTest4">4-Oraliq</option>
											<option value="Semester2">2-Semester</option>
										</select>
										{errorHelper.exam && (
											<div className="invalid-feedback">{errorHelper.exam}</div>
										)}
									</div>
									<Box className="form-group ms-2 mb-3 w-25">
										<Typography variant="body1">Total Marks</Typography>
										<input
											type="number"
											className={classnames("form-control", {
												"is-invalid": errorHelper.totalMarks,
											})}
											id="marksId"
											value={totalMarks}
											onChange={(e) => setTotalMarks(e.target.value)}
										/>
										{errorHelper.totalMarks && (
											<div className="invalid-feedback">
												{errorHelper.totalMarks}
											</div>
										)}
									</Box>
								</Box>

								<TableContainer
									sx={{
										"&::-webkit-scrollbar": {
											width: 20,
											height: 20,
										},
										"&::-webkit-scrollbar-track": {
											backgroundColor: "orange",
										},
										"&::-webkit-scrollbar-thumb": {
											backgroundColor: "blue",
											borderRadius: 2,
										},
										ml: 1,
										width: { xs: 305, sm: 400, md: 500 },
									}}
									component={Paper}>
									<Table
										sx={{
											width: "max-content",
										}}
										size="small"
										aria-label="a dense table">
										<TableHead>
											<TableRow>
												<TableCell>T/R</TableCell>
												<TableCell>Reg Num</TableCell>
												<TableCell align="left">{t("full_name")}</TableCell>
												<TableCell align="left">Marks</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{store.dekan.fetchedStudents.map((row, index) => (
												<TableRow
													key={index}
													sx={{
														"&:last-child td, &:last-child th": { border: 0 },
													}}>
													<TableCell component="th" scope="row">
														{index + 1}
													</TableCell>
													<TableCell align="left">
														{row.registrationNumber}
													</TableCell>
													<TableCell>{row.name}</TableCell>
													<TableCell align="left">
														<TextField
															sx={{ width: 70 }}
															id="standard-number"
															label="Value"
															type="number"
															size="small"
															InputLabelProps={{
																shrink: true,
															}}
															onChange={(e) =>
																handleInputChange(e.target.value, row._id)
															}
															value={row.marks}
															variant="standard"
														/>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>

								<div className="row justify-content-center mt-2">
									<div className="col-md-1 w-25">
										{isLoading2 && (
											<div
												className="spinner-border text-primary"
												role="status">
												<span className="sr-only">Loading...</span>
											</div>
										)}
										{!isLoading2 && (
											<Button type="submit" variant="outlined">
												Yuklash
											</Button>
										)}
									</div>
								</div>
							</form>
						)}
					</Box>
				</>
			) : (
				navigate("/login")
			)}
		</div>
	);
};

export default DekanUploadMarks;
