import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAttendence } from "../redux/action/studentAction";
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

const Home = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation();
	useEffect(() => {
		dispatch(fetchAttendence());
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
												{t("max_hours")}
											</StyledTableCell>
											<StyledTableCell align="center">
												{t("attend")}
											</StyledTableCell>
											<StyledTableCell align="center">
												{t("no_hours")}
											</StyledTableCell>
											<StyledTableCell align="center">
												{t("total_lesson")}
											</StyledTableCell>
											<StyledTableCell align="center">
												{t("attendance")}
											</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{store.student.attendence.map((row, index) => (
											<StyledTableRow key={index}>
												<StyledTableCell component="th" scope="row">
													{index + 1}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.subjectName}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.maxHours}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.lectureAttended}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.absentHours}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.totalLecturesByFaculty}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.attendence}%
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

export default Home;
