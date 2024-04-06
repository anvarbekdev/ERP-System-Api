import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Fab, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	// color: theme.palette.text.secondary,
}));
const AdminProfile = () => {
	const { t } = useTranslation();
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	useEffect(() => {
		if (!store.admin.isAuthenticated) {
			navigate("/login");
		}
	}, [store.admin.isAuthenticated]);
	return (
		<>
			{store.admin.isAuthenticated ? (
				<>
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
									{store.admin.admin.name}
								</Typography>
								<Box sx={{ my: 1 }}>
									<Typography color="text.secondary" variant="subtitle1">
										Email
									</Typography>
									<Typography sx={{ wordWrap: "break-word" }}>
										{store.admin.admin.email}
									</Typography>
								</Box>
								<Box sx={{ mb: 1 }}>
									<Typography color="text.secondary" variant="subtitle1">
										Login
									</Typography>
									<Typography>
										{store.admin.admin.registrationNumber}
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
										<Typography>{store.admin.admin.joiningYear}</Typography>
									</Box>
									<Box sx={{ mb: 1 }}>
										<Typography color="text.secondary" variant="subtitle1">
											{t("date_of_birth")}
										</Typography>
										<Typography>{store.admin.admin.dob}</Typography>
									</Box>
									<Box>
										<Typography color="text.secondary" variant="subtitle1">
											{t("phone_number")}
										</Typography>
										<Typography>{store.admin.admin.contactNumber}</Typography>
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
									src={store.admin.admin.avatar}
									style={{ width: 200, height: 200, borderRadius: 10 }}
								/>
								<Link to="/admin/updateProfile">
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
				</>
			) : (
				navigate("/login")
			)}
		</>
	);
};

export default AdminProfile;
