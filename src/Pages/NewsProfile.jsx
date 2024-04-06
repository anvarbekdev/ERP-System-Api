import { Fab, Grid, Modal, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import { newsLogout } from "../redux/action/newsAction";
import { useTranslation } from "react-i18next";
const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
}));

const NewsProfile = () => {
	const navigate = useNavigate();
	const store = useSelector((store) => store);
	const dispatch = useDispatch();
	const rootRef = React.useRef(null);
	const { t } = useTranslation();
	useEffect(() => {
		if (!store.news.isAuthenticated) {
			navigate("/login");
		}
	}, [store.news.isAuthenticated]);
	const salom = store.news.news.news.email === "";
	const responseGoogle = (response) => {
		const userObject = jwt_decode(response.credential);
		const { email } = userObject;
		const doc = {
			email: email,
		};
		const postEmail = async () => {
			axios
				.put(`/api/news/updateProfile`, doc)
				.then((res) => {
					toast.success(`${res.data.message}`);
					googleLogout();
					setTimeout(() => {
						dispatch(newsLogout());
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
			{store.news.isAuthenticated ? (
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
												style={{ width: "100%" }}
												onClick={renderProps.onClick}
												disabled={renderProps.disabled}>
												{t("sign_google")}
											</button>
										)}
										shape="pill"
										onSuccess={responseGoogle}
										onFailure={responseGoogle}
										// cookiePolicy="single_host_origin"
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
										{store.news.news.news.name}
									</Typography>
									<Box sx={{ my: 1 }}>
										<Typography color="text.secondary" variant="subtitle1">
											Email
										</Typography>
										<Typography sx={{ wordWrap: "break-word" }}>
											{store.news.news.news.email}
										</Typography>
									</Box>
									<Box sx={{ mb: 1 }}>
										<Typography color="text.secondary" variant="subtitle1">
											Login
										</Typography>
										<Typography>
											{store.news.news.news.registrationNumber}
										</Typography>
									</Box>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											mb: 1,
										}}>
										<Box>
											<Typography color="text.secondary" variant="subtitle1">
												{t("registered")}
											</Typography>
											<Typography>
												{store.news.news.news.joiningYear}
											</Typography>
										</Box>
									</Box>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											mb: 1,
										}}></Box>
									<Box sx={{ mb: 1 }}>
										<Typography color="text.secondary" variant="subtitle1">
											{t("phone_number")}
										</Typography>
										<Typography>
											{store.news.news.news.contactNumber}
										</Typography>
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
										src={store.news.news.news.avatar}
										style={{ width: 200, height: 200, borderRadius: 10 }}
									/>
									<Link to="/news/updateProfile">
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

export default NewsProfile;
