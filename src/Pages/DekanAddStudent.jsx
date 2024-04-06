import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DekanGetAllStudents from "./Admin/DekanGetAllStudents";
import { ToastContainer } from "react-toastify";

const DekanAddStudent = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	return (
		<div>
			{store.dekan.isAuthenticated ? (
				<>
					<ToastContainer />
					<DekanGetAllStudents />
				</>
			) : (
				navigate("/login")
			)}
		</div>
	);
};

export default DekanAddStudent;
