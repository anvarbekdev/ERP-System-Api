import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminGetAllSubject } from "../../redux/action/adminAction";
import classnames from "classnames";

import {
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "green",
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const AdminGetAllSubjects = () => {
	const store = useSelector((store) => store);
	const dispatch = useDispatch();
	const [department, setDepartment] = useState("");
	const [year, setYear] = useState("");
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { t } = useTranslation();
	const formHandler = (e) => {
		e.preventDefault();
		setIsLoading(true);
		dispatch(adminGetAllSubject({ department, year }));
	};

	useEffect(() => {
		if (store.error) {
			setError(store.error);
		}
		setTimeout(() => {
			setError({});
		}, 5000);
		if (store.error) {
			setIsLoading(false);
		} else {
			setIsLoading(false);
		}
	}, [store.error]);

	useEffect(() => {
		if (store.admin.allSubject.length !== 0) {
			setIsLoading(false);
		}
	}, [store.admin.allSubject.length]);
	return (
		<div>
			<div>
				{store.admin.isAuthenticated ? (
					<>
						<form noValidate onSubmit={formHandler}>
							<div className="form-group mb-3">
								<label htmlFor="departmentId">{t("faculty")}</label>
								<select
									onChange={(e) => setDepartment(e.target.value)}
									className={classnames("form-control ", {
										"is-invalid": error.department,
									})}
									id="departmentId">
									<option>{t("select")}</option>
									<option value="B.Tech">B.Tech</option>
									<option value="B.Sc">B.Sc</option>
									<option value="BAA">BAA</option>
								</select>
								{error.department && (
									<div className="invalid-feedback">{error.department}</div>
								)}
							</div>
							<div className="form-group mb-3">
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
							<div className="text-center ">
								{isLoading && (
									<div className="spinner-border text-primary" role="status">
										<span className=""></span>
									</div>
								)}
								{!isLoading && (
									<button
										type="submit"
										className="btn btn-info btn-block mb-3 ">
										{t("search")}
									</button>
								)}
							</div>
						</form>

						{store.admin.allSubject.length !== 0 && (
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
									width: { xs: 305, sm: 530, md: 700 },
								}}
								component={Paper}>
								<Table aria-label="customized table">
									<TableHead>
										<TableRow>
											<StyledTableCell>T/R</StyledTableCell>
											<StyledTableCell align="center">
												{t("subjects_name")}
											</StyledTableCell>
											<StyledTableCell align="center">
												Total lesson
											</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{store.admin.allSubject.map((row, index) => (
											<StyledTableRow key={index}>
												<StyledTableCell component="th" scope="row">
													{index + 1}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.subjectName}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.totalLectures}
												</StyledTableCell>
											</StyledTableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						)}
					</>
				) : (
					navigate("/login")
				)}
			</div>
		</div>
	);
};

export default AdminGetAllSubjects;
