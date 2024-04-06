import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { adminAddNews } from "../../redux/action/adminAction";
import { Box } from "@mui/material";
import axios from "../../api/axios";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import {
	CircularProgress,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
} from "@mui/material";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import styled from "@emotion/styled";
import MyModal2 from "../../Components/Ui/Modal/MyModal2";
import MyModal1 from "../../Components/Ui/Modal/MyModal1";
import InputSimple from "../../Components/InputSimple";
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
const AdminAddNews = () => {
	const { t } = useTranslation();
	const store = useSelector((state) => state);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [contactNumber, setContactNumber] = useState("");
	const [error, setError] = useState({});
	const [modal2, setModal2] = useState(false);
	const [modal, setModal] = useState(false);
	const [dekans, setDekans] = useState([]);
	const [dob, setDob] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isLoading2, setIsLoading2] = useState(false);

	const formHandler = (e) => {
		e.preventDefault();

		setIsLoading(true);
		dispatch(
			adminAddNews({
				name,
				dob: dob.split("-").reverse().join("-"),
				contactNumber,
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
		if (store.admin.adminAddNewsFlag) {
			setError({});
		}
	}, [store.error, store.admin.adminAddNewsFlag]);
	useEffect(() => {
		if (store.error || store.admin.adminAddNewsFlag) {
			setIsLoading(false);
		} else {
			setIsLoading(true);
		}
	}, [store.error, store.admin.adminAddNewsFlag]);

	const getDekans = async () => {
		setIsLoading2(true);
		try {
			const url = `/api/admin/getNewsAdmin`;
			const { data } = await axios.get(url);
			setDekans(data);
			setIsLoading2(false);
		} catch (err) {
			console.log(err);
			setIsLoading2(false);
		}
	};

	const dekan = dekans ? dekans : ["Dekan Yoq"];

	useEffect(() => {
		getDekans();
	}, []);

	const deleteHandler = async (_id, registrationNumber) => {
		const id = { _id };
		if (window.confirm(`Ushbu ${registrationNumber} o'chirilsinmi?`)) {
			try {
				await axios({
					method: "Post",
					url: "/admin/getNewsAdmin/:id",
					data: id,
				});
				getDekans();
			} catch (err) {
				console.log(err);
			}
		}
	};
	const resetHandler = async (_id, registrationNumber) => {
		const id = { _id };
		if (
			window.confirm(`Ushbu ${registrationNumber} paroli asliga qaytarilsinmi?`)
		) {
			try {
				await axios({
					method: "Post",
					url: "/admin/resetPasswordNews",
					data: id,
				});
				getDekans();
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div>
			{store.admin.isAuthenticated ? (
				<>
					{isLoading2 ? (
						<Box
							sx={{
								position: "fixed",
								left: "50%",
							}}>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									height: "calc(100vh - 60px)",
								}}>
								<CircularProgress />
							</Box>
						</Box>
					) : (
						<Box
							sx={{
								minHeight: "calc(100vh - 60px)",
							}}>
							<button
								className="btn btn-primary fs-6 p-2 me-2 w-25 my-3"
								onClick={() => setModal(true)}>
								{t("add_news")}
							</button>
							<MyModal1 modal={modal} setModal={setModal}>
								<form noValidate onSubmit={formHandler}>
									<div className="row">
										<div className="col-md-6">
											<InputSimple
												label={t("full_name")}
												type="text"
												onChangeHandler={(e) => setName(e.target.value)}
											/>
											<InputSimple
												label={t("date_of_birth")}
												type="date"
												onChangeHandler={(e) => setDob(e.target.value)}
											/>
										</div>
										<div className="col-md-6">
											<InputSimple
												label={t("phone_number")}
												type="number"
												onChangeHandler={(e) =>
													setContactNumber(e.target.value)
												}
											/>
										</div>
									</div>
									{<div className="text-danger">{error.message}</div>}
									<div className="row justify-content-center mt-3 text-center">
										<div className="col-md-1">
											{isLoading && (
												<div
													className="spinner-border text-secondary"
													role="status">
													<span className=""></span>
												</div>
											)}
											<div className="invalid-feedback"></div>
											{!isLoading && (
												<button type="submit" className="btn btn-info  ">
													{t("submit")}
												</button>
											)}
										</div>
									</div>
								</form>
							</MyModal1>
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
												Reg number
											</StyledTableCell>
											<StyledTableCell align="center">
												{t("date_of_birth")}
											</StyledTableCell>
											<StyledTableCell align="center">
												{t("full_name")}
											</StyledTableCell>
											<StyledTableCell align="center">Email</StyledTableCell>
											<StyledTableCell align="center">
												{t("registered")}
											</StyledTableCell>
											<StyledTableCell align="center">
												Tel Number
											</StyledTableCell>
											<StyledTableCell align="center">Delete</StyledTableCell>
											<StyledTableCell align="center">
												{t("update")}
											</StyledTableCell>
											<StyledTableCell align="center">
												{t("reset_password")}
											</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{dekan.map((row, index) => (
											<StyledTableRow key={index}>
												<StyledTableCell component="th" scope="row">
													{index + 1}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.registrationNumber}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.dob}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.name}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.email}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.joiningYear}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.contactNumber}
												</StyledTableCell>
												<StyledTableCell align="center">
													<Tooltip title="Delete">
														<IconButton
															onClick={() =>
																deleteHandler(row._id, row.registrationNumber)
															}>
															<DeleteIcon />
														</IconButton>
													</Tooltip>
												</StyledTableCell>
												<StyledTableCell align="center">
													<Link to={`${row._id}`}>
														<Tooltip title="Update">
															<IconButton onClick={() => setModal2(true)}>
																<EditIcon />
															</IconButton>
														</Tooltip>
													</Link>
													<MyModal2 modal2={modal2} setModal2={setModal2}>
														<Outlet />
													</MyModal2>
												</StyledTableCell>
												<StyledTableCell align="center">
													<Tooltip title="Delete">
														<IconButton
															onClick={() =>
																resetHandler(row._id, row.registrationNumber)
															}>
															<LockResetIcon />
														</IconButton>
													</Tooltip>
												</StyledTableCell>
											</StyledTableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
					)}
				</>
			) : (
				navigate("/login")
			)}
		</div>
	);
};

export default AdminAddNews;
