import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMarks } from "../../redux/action/studentAction";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	CircularProgress,
	Typography,
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

const StudentTestPerformance = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation();
	useEffect(() => {
		dispatch(getMarks());
	});

	useEffect(() => {
		if (store.student.getMarksLoading === true) {
			setLoading(true);
		} else setLoading(false);
	}, [store.student.getMarksLoading]);

	return (
		<>
			{store.student.isAuthenticated ? (
				<>
					{!loading ? (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								flexDirection: "column",
							}}>
							{store.student.allMarks.CycleTest1 && (
								<Box sx={{ mb: 3 }}>
									{store.student.allMarks.CycleTest1.length !== 0 ? (
										<>
											<Typography textAlign="center" variant="h5">
												{t("1-oraliq_natijalari")}
											</Typography>
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
												<Table
													sx={{ minWidth: 700 }}
													aria-label="customized table">
													<TableHead>
														<TableRow>
															<StyledTableCell>T/R</StyledTableCell>
															<StyledTableCell align="center">
																{t("subjects_name")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("grades_received")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("total_marks")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("Percent")}
															</StyledTableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{store.student.allMarks.CycleTest1.map(
															(row, index) => (
																<StyledTableRow key={index}>
																	<StyledTableCell component="th" scope="row">
																		{index + 1}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.subjectName}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.marks}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.totalMarks}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{(
																			(row.marks / row.totalMarks) *
																			100
																		).toFixed(2)}
																		%
																	</StyledTableCell>
																</StyledTableRow>
															)
														)}
													</TableBody>
												</Table>
											</TableContainer>
										</>
									) : (
										<Typography>{t("1-oraliq")}</Typography>
									)}
								</Box>
							)}
							{store.student.allMarks.CycleTest2 && (
								<Box sx={{ mb: 3 }}>
									{store.student.allMarks.CycleTest2.length !== 0 ? (
										<>
											<Typography textAlign="center" variant="h5">
												{t("2-oraliq_natijalari")}
											</Typography>
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
												<Table
													sx={{ minWidth: 700 }}
													aria-label="customized table">
													<TableHead>
														<TableRow>
															<StyledTableCell>T/R</StyledTableCell>
															<StyledTableCell align="center">
																{t("subjects_name")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("grades_received")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("total_marks")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("Percent")}
															</StyledTableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{store.student.allMarks.CycleTest2.map(
															(row, index) => (
																<StyledTableRow key={index}>
																	<StyledTableCell component="th" scope="row">
																		{index + 1}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.subjectName}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.marks}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.totalMarks}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{(
																			(row.marks / row.totalMarks) *
																			100
																		).toFixed(2)}
																		%
																	</StyledTableCell>
																</StyledTableRow>
															)
														)}
													</TableBody>
												</Table>
											</TableContainer>
										</>
									) : (
										<Typography>{t("2-oraliq")}</Typography>
									)}
								</Box>
							)}
							{store.student.allMarks.Semester1 && (
								<Box sx={{ mb: 3 }}>
									{store.student.allMarks.Semester1.length !== 0 ? (
										<>
											<Typography textAlign="center" variant="h5">
												{t("1-semester_natijalari")}
											</Typography>
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
												<Table
													sx={{ minWidth: 700 }}
													aria-label="customized table">
													<TableHead>
														<TableRow>
															<StyledTableCell>T/R</StyledTableCell>
															<StyledTableCell align="center">
																{t("subjects_name")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("grades_received")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("total_marks")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("Percent")}
															</StyledTableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{store.student.allMarks.Semester1.map(
															(row, index) => (
																<StyledTableRow key={index}>
																	<StyledTableCell component="th" scope="row">
																		{index + 1}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.subjectName}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.marks}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.totalMarks}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{(
																			(row.marks / row.totalMarks) *
																			100
																		).toFixed(2)}
																		%
																	</StyledTableCell>
																</StyledTableRow>
															)
														)}
													</TableBody>
												</Table>
											</TableContainer>
										</>
									) : (
										<Typography>{t("1-semester")}</Typography>
									)}
								</Box>
							)}
							{store.student.allMarks.CycleTest3 && (
								<Box sx={{ mb: 3 }}>
									{store.student.allMarks.CycleTest3.length !== 0 ? (
										<>
											<Typography textAlign="center" variant="h5">
												{t("3-oraliq_natijalari")}
											</Typography>
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
												<Table
													sx={{ minWidth: 700 }}
													aria-label="customized table">
													<TableHead>
														<TableRow>
															<StyledTableCell>T/R</StyledTableCell>
															<StyledTableCell align="center">
																{t("subjects_name")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("grades_received")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("total_marks")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("Percent")}
															</StyledTableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{store.student.allMarks.CycleTest3.map(
															(row, index) => (
																<StyledTableRow key={index}>
																	<StyledTableCell component="th" scope="row">
																		{index + 1}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.subjectName}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.marks}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.totalMarks}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{(
																			(row.marks / row.totalMarks) *
																			100
																		).toFixed(2)}
																		%
																	</StyledTableCell>
																</StyledTableRow>
															)
														)}
													</TableBody>
												</Table>
											</TableContainer>
										</>
									) : (
										<Typography>{t("3-oraliq")}</Typography>
									)}
								</Box>
							)}
							{store.student.allMarks.CycleTest4 && (
								<Box sx={{ mb: 3 }}>
									{store.student.allMarks.CycleTest4.length !== 0 ? (
										<>
											<Typography textAlign="center" variant="h5">
												{t("3-oraliq_natijalari")}
											</Typography>
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
												<Table
													sx={{ minWidth: 700 }}
													aria-label="customized table">
													<TableHead>
														<TableRow>
															<StyledTableCell>T/R</StyledTableCell>
															<StyledTableCell align="center">
																{t("subjects_name")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("grades_received")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("total_marks")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("Percent")}
															</StyledTableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{store.student.allMarks.CycleTest4.map(
															(row, index) => (
																<StyledTableRow key={index}>
																	<StyledTableCell component="th" scope="row">
																		{index + 1}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.subjectName}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.marks}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.totalMarks}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{(
																			(row.marks / row.totalMarks) *
																			100
																		).toFixed(2)}
																		%
																	</StyledTableCell>
																</StyledTableRow>
															)
														)}
													</TableBody>
												</Table>
											</TableContainer>
										</>
									) : (
										<Typography>{t("4-oraliq")}</Typography>
									)}
								</Box>
							)}
							{store.student.allMarks.Semester2 && (
								<Box sx={{ mb: 3 }}>
									{store.student.allMarks.Semester2.length !== 0 ? (
										<>
											<Typography textAlign="center" variant="h5">
												{t("2-semester_natijalari")}
											</Typography>
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
												<Table
													sx={{ minWidth: 700 }}
													aria-label="customized table">
													<TableHead>
														<TableRow>
															<StyledTableCell>T/R</StyledTableCell>
															<StyledTableCell align="center">
																{t("subjects_name")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("grades_received")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("total_marks")}
															</StyledTableCell>
															<StyledTableCell align="center">
																{t("Percent")}
															</StyledTableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{store.student.allMarks.Semester2.map(
															(row, index) => (
																<StyledTableRow key={index}>
																	<StyledTableCell component="th" scope="row">
																		{index + 1}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.subjectName}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.marks}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{row.totalMarks}
																	</StyledTableCell>
																	<StyledTableCell align="center">
																		{(
																			(row.marks / row.totalMarks) *
																			100
																		).toFixed(2)}
																		%
																	</StyledTableCell>
																</StyledTableRow>
															)
														)}
													</TableBody>
												</Table>
											</TableContainer>
										</>
									) : (
										<Typography>{t("2-semester")}</Typography>
									)}
								</Box>
							)}
						</Box>
					) : (
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<CircularProgress />
						</Box>
					)}
				</>
			) : (
				navigate("/login")
			)}
		</>
	);
};

export default StudentTestPerformance;
