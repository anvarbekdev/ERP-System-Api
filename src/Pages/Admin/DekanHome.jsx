import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import DekanBar from "../../Components/DekanBar";

const DekanHome = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	useEffect(() => {
		if (!store.dekan.isAuthenticated) {
			navigate("/login");
		}
	}, [store.dekan.isAuthenticated]);
	return (
		<>
			{store.dekan.isAuthenticated ? (
				<>
					<Box sx={{ width: { xs: 0, md: 200 } }}>
						<DekanBar
							avatar={store.dekan.dekan.dekan.avatar}
							name={store.dekan.dekan.dekan.name}
						/>
					</Box>
					<Outlet />
				</>
			) : (
				navigate("/login")
			)}
		</>
	);
};

export default DekanHome;
