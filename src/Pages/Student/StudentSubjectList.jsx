import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubjects } from "../../redux/action/studentAction";
import { useNavigate } from "react-router-dom";
import {
	Box,
	CircularProgress,
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

const StudentSubjectList = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation();

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllSubjects());
	}, []);

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
								my: 3,
								display: "flex",
								justifyContent: "center",
								flexDirection: "column",
							}}>
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
								<Table sx={{ minWidth: 700 }} aria-label="customized table">
									<TableHead>
										<TableRow>
											<StyledTableCell>T/R</StyledTableCell>
											<StyledTableCell align="center">
												{t("subjects_name")}
											</StyledTableCell>
											<StyledTableCell align="center">
												{t("year")}
											</StyledTableCell>
											<StyledTableCell align="center">
												Total lesson
											</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{store.student.allSubjects.map((row, index) => (
											<StyledTableRow key={index}>
												<StyledTableCell component="th" scope="row">
													{index + 1}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.subjectName}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.year}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.totalLectures}
												</StyledTableCell>
											</StyledTableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
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

export default StudentSubjectList;
