import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import StudentBar from "../Components/StudentBar";

const StudentHomes = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();

	useEffect(() => {
		if (!store.student.isAuthenticated) {
			navigate("/login");
		}
	}, [store.student.isAuthenticated]);
	return (
		<>
			{store.student.isAuthenticated ? (
				<>
					<Box sx={{ width: { xs: 0, md: 200 } }}>
						<StudentBar
							avatar={store.student.student.student.avatar}
							name={store.student.student.student.name}
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

export default StudentHomes;
