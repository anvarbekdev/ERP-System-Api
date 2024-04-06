import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import DeleteIcon from "@mui/icons-material/Delete";

import {
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	IconButton,
} from "@mui/material";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import styled from "@emotion/styled";
import { dekanGetAllSubject } from "../../redux/action/dekanAction";
import axios from "../../api/axios";
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

const DekanGetAllSubjects = () => {
	const store = useSelector((store) => store);
	const dispatch = useDispatch();
	const [department, setDepartment] = useState("");
	const [year, setYear] = useState("");
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const { t } = useTranslation();
	const navigate = useNavigate();

	const formHandler = (e) => {
		e.preventDefault();

		setIsLoading(true);
		dispatch(dekanGetAllSubject({ department, year }));
	};

	const deleteHandler = async (_id, subjectName) => {
		const id = { _id };
		if (window.confirm(`Ushbu ${subjectName} o'chirilsinmi?`)) {
			setIsDeleting(false);
			try {
				await axios({
					method: "Post",
					url: "/dekan/deleteSubject",
					data: id,
				});
				setIsDeleting(false);
				dispatch(dekanGetAllSubject({ department, year }));
			} catch (err) {
				console.log(err);
				setIsDeleting(false);
			}
		}
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
		if (store.dekan.allSubject.length !== 0) {
			setIsLoading(false);
		}
	}, [store.dekan.allSubject]);

	return (
		<div>
			<div>
				{store.dekan.isAuthenticated ? (
					<>
						<form noValidate onSubmit={formHandler}>
							<div className="form-group">
								<label htmlFor="departmentId">{t("faculty")}</label>
								<select
									onChange={(e) => setDepartment(e.target.value)}
									className={classnames("form-control", {
										"is-invalid": error.department,
									})}
									id="departmentId">
									<option>{t("select")}</option>
									<option value={store.dekan.dekan.dekan.department}>
										{store.dekan.dekan.dekan.department}
									</option>
								</select>
								{error.department && (
									<div className="invalid-feedback mb-3">
										{error.department}
									</div>
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
									<div className="invalid-feedback ">{error.year}</div>
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
										className="btn btn-info btn-block my-3 ">
										{t("search")}
									</button>
								)}
							</div>
						</form>

						{store.dekan.allSubject.length !== 0 && (
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
												{t("total_lesson")}
											</StyledTableCell>
											<StyledTableCell align="center">
												{t("year")}
											</StyledTableCell>
											<StyledTableCell align="center">Action</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{store.dekan.allSubject.map((row, index) => (
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
												<StyledTableCell align="center">
													{row.year}
												</StyledTableCell>
												<StyledTableCell align="center">
													<Tooltip title="Delete">
														<IconButton
															onClick={() =>
																deleteHandler(row._id, row.subjectName)
															}
															disabled={isDeleting}>
															<DeleteIcon color="error" />
														</IconButton>
													</Tooltip>
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

export default DekanGetAllSubjects;
