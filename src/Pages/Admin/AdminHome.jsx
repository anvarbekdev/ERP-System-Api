import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import AdminBar from "../../Components/AdminBar";

const AdminHome = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	useEffect(() => {
		if (!store.admin.isAuthenticated) {
			navigate("/");
		}
	}, [store.admin.isAuthenticated]);
	return (
		<>
			{store.admin.isAuthenticated ? (
				<>
					<Box sx={{ width: { xs: 0, md: 200 } }}>
						<AdminBar
							avatar={store.admin.admin.avatar}
							name={store.admin.admin.name}
						/>
					</Box>
					<Outlet />
				</>
			) : (
				navigate("/")
			)}
		</>
	);
};

export default AdminHome;
