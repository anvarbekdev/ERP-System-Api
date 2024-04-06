import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Fab, Grid, Modal, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import "./FacultyInterface.css";
import styled from "@emotion/styled";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import { studentLogout } from "../redux/action/studentAction";
import { useTranslation } from "react-i18next";
const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
}));

const StudentProfile = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const rootRef = React.useRef(null);
	const { t } = useTranslation();
	useEffect(() => {
		if (!store.student.isAuthenticated) {
			navigate("/login");
		}
	}, [store.student.isAuthenticated]);
	const salom = store.student.student.student.email === "";
	const responseGoogle = (response) => {
		const userObject = jwt_decode(response.credential);
		const { email } = userObject;
		const doc = {
			email: email,
		};
		const postEmail = async () => {
			axios
				.put(`/api/student/updateProfile`, doc)
				.then((res) => {
					toast.success(`${res.data.message}`);
					googleLogout();
					setTimeout(() => {
						dispatch(studentLogout());
					}, 4000);
				})
				.catch((err) => {
					toast.error(err.response.data);
				});
		};
		postEmail();
	};
	return (
		<>
			{store.student.isAuthenticated ? (
				<>
					<ToastContainer />
					{salom ? (
						<Box
							sx={{
								height: "100vh",
								flexGrow: 1,
								minWidth: "100%",
								position: "fixed",
								zIndex: 9999,
								transform: "translateZ(0)",
								// The position fixed scoping doesn't work in IE11.
								// Disable this demo to preserve the others.
								"@media all and (-ms-high-contrast: none)": {
									display: "none",
								},
							}}
							ref={rootRef}>
							<Modal
								disablePortal
								disableEnforceFocus
								disableAutoFocus
								open
								aria-labelledby="server-modal-title"
								aria-describedby="server-modal-description"
								sx={{
									display: "flex",
									p: 1,
									alignItems: "center",
									justifyContent: "center",
								}}
								container={() => rootRef.current}>
								<Box
									sx={{
										position: "relative",
										width: 400,
										textAlign: "center",
										bgcolor: "background.paper",
										border: "2px solid #000",
										boxShadow: (theme) => theme.shadows[5],
										p: 4,
									}}>
									<Typography
										id="server-modal-title"
										variant="h6"
										component="h2">
										{t("connect_your_email")}
									</Typography>
									<GoogleLogin
										render={(renderProps) => (
											<button
												type="button"
												onClick={renderProps.onClick}
												disabled={renderProps.disabled}>
												{t("sign_google")}
											</button>
										)}
										shape="pill"
										onSuccess={responseGoogle}
										onFailure={responseGoogle}
										cookiePolicy="single_host_origin"
									/>
								</Box>
							</Modal>
						</Box>
					) : (
						<Grid
							spacing={1}
							sx={{
								minHeight: "calc(100vh - 64px)",
								width: "100%",
								mb: { xs: 3, md: 0 },
								flexWrap: { xs: "nowrap", md: "wrap" },
								flexDirection: { xs: "column-reverse", md: "row" },
							}}
							container
							direction="row"
							justifyContent="space-evenly"
							alignItems="center">
							<Grid item sx={{ minWidth: 300 }} xs={8} md={4}>
								<Item>
									<Typography
										sx={{
											fontWeight: 400,
											fontFamily: "fantasy",
											letterSpacing: 3,
											mt: { xs: 1, md: 0 },
										}}
										textAlign="center"
										variant="h5">
										{store.student.student.student.name}
									</Typography>
									<Box sx={{ my: 1 }}>
										<Typography color="text.secondary" variant="subtitle1">
											Email
										</Typography>
										<Typography sx={{ wordWrap: "break-word" }}>
											{store.student.student.student.email}
										</Typography>
									</Box>
									<Box sx={{ mb: 1 }}>
										<Typography color="text.secondary" variant="subtitle1">
											Login
										</Typography>
										<Typography>
											{store.student.student.student.registrationNumber}
										</Typography>
									</Box>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											mb: 1,
										}}>
										<Box mr="1">
											<Typography color="text.secondary" variant="subtitle1">
												{t("date_of_birth")}
											</Typography>
											<Typography>
												{store.student.student.student.dob}
											</Typography>
										</Box>
										<Box mr="1">
											<Typography color="text.secondary" variant="subtitle1">
												Group
											</Typography>
											<Typography>
												{store.student.student.student.section}
											</Typography>
										</Box>
										<Box>
											<Typography color="text.secondary" variant="subtitle1">
												{t("registered")}
											</Typography>
											<Typography>
												{store.student.student.student.batch}
											</Typography>
										</Box>
									</Box>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											mb: 1,
										}}>
										<Box>
											<Typography color="text.secondary" variant="subtitle1">
												{t("faculty")}
											</Typography>
											<Typography>
												{store.student.student.student.department}
											</Typography>
										</Box>
										<Box>
											<Typography color="text.secondary" variant="subtitle1">
												{t("year")}
											</Typography>
											<Typography>
												{store.student.student.student.year}
											</Typography>
										</Box>
										<Box>
											<Typography color="text.secondary" variant="subtitle1">
												{t("gender")}
											</Typography>
											<Typography>
												{store.student.student.student.gender}
											</Typography>
										</Box>
									</Box>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											mb: 1,
										}}>
										<Box sx={{ mb: 1 }}>
											<Typography color="text.secondary" variant="subtitle1">
												{t("phone_number")}
											</Typography>
											<Typography>
												{store.student.student.student.studentMobileNumber}
											</Typography>
										</Box>
										<Box sx={{ mb: 1 }}>
											<Typography color="text.secondary" variant="subtitle1">
												{t("secontNumber")}
											</Typography>
											<Typography>
												{store.student.student.student.aadharCard}
											</Typography>
										</Box>
									</Box>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											mb: 1,
										}}>
										<Box sx={{ mb: 1 }}>
											<Typography color="text.secondary" variant="subtitle1">
												{t("father_name")}
											</Typography>
											<Typography>
												{store.student.student.student.fatherName}
											</Typography>
										</Box>
										<Box sx={{ mb: 1 }}>
											<Typography color="text.secondary" variant="subtitle1">
												{t("father_phone_number")}
											</Typography>
											<Typography>
												{store.student.student.student.fatherMobileNumber}
											</Typography>
										</Box>
									</Box>
								</Item>
							</Grid>
							<Grid
								item
								xs={8}
								md={4}
								sx={{ position: "relative", my: { xs: 3, md: 0 } }}>
								<Item>
									<img
										className="avatar_img"
										alt="Avatar"
										src={store.student.student.student.avatar}
										style={{ width: 200, height: 200, borderRadius: 10 }}
									/>
									<Link to="/student/updateProfile">
										<Fab
											size="small"
											color="primary"
											sx={{ position: "absolute", right: -16 }}>
											<EditIcon />
										</Fab>
									</Link>
								</Item>
							</Grid>
						</Grid>
					)}
				</>
			) : (
				navigate("/login")
			)}
		</>
	);
};

export default StudentProfile;
