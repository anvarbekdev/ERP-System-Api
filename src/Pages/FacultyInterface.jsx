import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import FacultyBar from "../Components/FacultyBar";

const FacultyInterface = () => {
	const navigate = useNavigate();
	const store = useSelector((store) => store);

	useEffect(() => {
		if (!store.faculty.isAuthenticated) {
			navigate("/login");
		}
	}, [store.faculty.isAuthenticated]);
	return (
		<>
			{store.faculty.isAuthenticated ? (
				<>
					<Box sx={{ width: { xs: 0, md: 200 } }}>
						<FacultyBar
							avatar={store.faculty.faculty.faculty.avatar}
							name={store.faculty.faculty.faculty.name}
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

export default FacultyInterface;
