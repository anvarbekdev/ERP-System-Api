import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { fetchStudents, markAttendence } from "../redux/action/facultyAction";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const AttendenceFaculty = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [department, setDepartment] = useState("");
	const [year, setYear] = useState("");
	const [section, setSection] = useState("");
	const [subjectName, setSubjectCode] = useState("");
	const [checkedValue, setCheckedValue] = useState([]);
	const [error, setError] = useState({});
	const [errorHelper, setErrorHelper] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isLoading2, setIsLoading2] = useState(false);
	const { t } = useTranslation();

	const handleInputChange = (e) => {
		const tempCheck = checkedValue;
		let index;
		if (e.target.checked) {
			tempCheck.push(e.target.value);
		} else {
			index = tempCheck.indexOf(e.target.value);
			tempCheck.splice(index, 1);
		}
		setCheckedValue(tempCheck);
	};

	const formHandler = (e) => {
		e.preventDefault();
		setIsLoading(true);
		dispatch(fetchStudents(department, year, section));
	};

	useEffect(() => {
		if (store.error) {
			setError(store.error);
		}
		setTimeout(() => {
			setError({});
		}, 5000);
		if (store.error || !store.faculty.fetchedStudentsHelper) {
			setIsLoading(false);
		}
	}, [store.error, store.faculty.fetchedStudentsHelper]);

	const secondFormHandler = (e) => {
		e.preventDefault();
		setIsLoading2(true);
		dispatch(
			markAttendence(checkedValue, subjectName, department, year, section)
		);
		setCheckedValue([]);
	};

	useEffect(() => {
		if (store.error) {
			setErrorHelper(store.errorHelper);
		}
		setTimeout(() => {
			setErrorHelper({});
		}, 5000);
		if (store.error || store.faculty.fetchedStudentsHelper) {
			setIsLoading2(false);
		}
		if (store.faculty.markLoad === false) {
			setIsLoading2(false);
		}
	}, [
		store.errorHelper,
		store.error,
		store.faculty.markLoad,
		store.faculty.fetchedStudentsHelper,
	]);
	return (
		<>
			{store.faculty.isAuthenticated ? (
				<>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						{store.faculty.fetchedStudentsHelper && (
							<form noValidate onSubmit={formHandler}>
								<div className="form-group">
									<h3>{t("attendance")}</h3>
									<label htmlFor="branchId">{t("faculty")}</label>
									<select
										onChange={(e) => setDepartment(e.target.value)}
										className={classnames("form-control", {
											"is-invalid": error.department,
										})}
										id="branchId">
										<option>{t("select")}</option>
										<option value={store.faculty.faculty.faculty.department}>
											{store.faculty.faculty.faculty.department}
										</option>
									</select>
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
								<div className="row justify-content-center">
									<div className="col-md-12 text-center">
										{isLoading && (
											<div
												className="spinner-border text-primary"
												role="status">
												<span className=""></span>
											</div>
										)}
										{!isLoading && (
											<button type="submit" className="btn btn-info  mt-3">
												{t("search")}
											</button>
										)}
									</div>
								</div>
							</form>
						)}
					</Box>
					{!store.faculty.fetchedStudentsHelper && (
						<form onSubmit={secondFormHandler}>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									flexDirection: "column",
								}}>
								<div className="form-group w-50 mb-2">
									<>
										<label htmlFor="subjectId">{t("subjects_name")}</label>
										<select
											required
											onChange={(e) => setSubjectCode(e.target.value)}
											className="form-control"
											id="subjectId">
											<option>{t("select")}</option>
											{store.faculty.allSubjectName.map(
												(subjectCodeName, index) => (
													<option key={index}>{subjectCodeName}</option>
												)
											)}
										</select>
										{errorHelper.subjectName && (
											<div className="invalid-feedback text-danger">
												{errorHelper.subjectName}
											</div>
										)}
									</>
								</div>
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
												<TableCell numeric>T/R</TableCell>
												<TableCell numeric>Reg Num</TableCell>
												<TableCell numeric align="left">
													{t("full_name")}
												</TableCell>
												<TableCell numeric align="left">
													Check
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{store.faculty.fetchedStudents.map((row, index) => (
												<TableRow
													key={index}
													sx={{
														"&:last-child td, &:last-child th": { border: 0 },
													}}>
													<TableCell numeric component="th" scope="row">
														{index + 1}
													</TableCell>
													<TableCell numeric align="left">
														{row.registrationNumber}
													</TableCell>
													<TableCell>{row.name}</TableCell>
													<TableCell numeric align="center">
														<input
															className="form-check-input"
															type="checkbox"
															value={row._id}
															onChange={handleInputChange}
															id="defaultCheck1"
														/>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
								<div className="row justify-content-center mt-3">
									<div className="col-md-1 text-center">
										{isLoading2 && (
											<div
												className="spinner-border text-primary"
												role="status">
												<span className="">Loading...</span>
											</div>
										)}
										{!isLoading2 && (
											<button type="submit" className="btn btn-info ml-1  ">
												Yuklash
											</button>
										)}
									</div>
								</div>
							</Box>
						</form>
					)}
				</>
			) : (
				navigate("/login")
			)}
		</>
	);
};

export default AttendenceFaculty;
