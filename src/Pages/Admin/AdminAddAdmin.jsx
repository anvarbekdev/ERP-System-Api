// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import classnames from "classnames";
// import { adminAddAdmin } from "../../redux/action/adminAction";
// import { Box } from "@mui/material";

// const AdminAddAdmin = () => {
// 	const store = useSelector((state) => state);
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();
// 	const [name, setName] = useState("");
// 	const [parol, setParol] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [department, setDepartment] = useState("");
// 	const [dob, setDob] = useState("");
// 	const [contactNumber, setContactNumber] = useState("");
// 	const [error, setError] = useState({});
// 	const [isLoading, setIsLoading] = useState(false);

// 	const formHandler = (e) => {
// 		e.preventDefault();
// 		if (store.error) {
// 			setError(store.error);
// 		}
// 		setTimeout(() => {
// 			setError({});
// 		}, 5000);
// 		setIsLoading(true);
// 		dispatch(
// 			adminAddAdmin({
// 				name,
// 				parol,
// 				email,
// 				department,
// 				contactNumber,
// 				dob: dob.split("-").reverse().join("-"),
// 			})
// 		);
// 	};

// 	useEffect(() => {
// 		if (store.error || store.admin.adminAddAdminFlag) {
// 			setIsLoading(false);
// 		} else {
// 			setIsLoading(true);
// 		}
// 	}, [store.error, store.admin.adminAddAdminFlag]);

// 	return (
// 		<div>
// 			{store.admin.isAuthenticated ? (
// 				<>
// 					<Box
// 						sx={{
// 							minHeight: "calc(100vh - 60px)",
// 							display: "flex",
// 							alignItems: "center",
// 							textAlign: "center",
// 						}}>
// 						<form noValidate onSubmit={formHandler}>
// 							<div className="row">
// 								<div className="col-md-6">
// 									<div className="form-group">
// 										<label htmlFor="nameId">{t("full_name")}</label>
// 										<input
// 											onChange={(e) => setName(e.target.value)}
// 											type="text"
// 											className={classnames("form-control mb-3", {
// 												"is-invalid": error.name,
// 											})}
// 											id="nameId"
// 										/>
// 										{error.name && (
// 											<div className="invalid-feedback">{error.name}</div>
// 										)}
// 									</div>
// 									<div className="form-group">
// 										<label htmlFor="parolId">Old password</label>
// 										<input
// 											onChange={(e) => setParol(e.target.value)}
// 											type="text"
// 											className={classnames("form-control mb-3", {
// 												"is-invalid": error.parol,
// 											})}
// 											id="parolId"
// 										/>
// 										{error.parol && (
// 											<div className="invalid-feedback">{error.parol}</div>
// 										)}
// 									</div>
// 									<div className="form-group">
// 										<label htmlFor="emailId">Email</label>
// 										<input
// 											onChange={(e) => setEmail(e.target.value)}
// 											type="email"
// 											className={classnames("form-control mb-3", {
// 												"is-invalid": error.email,
// 											})}
// 											id="emailId"
// 										/>
// 										{error.email && (
// 											<div className="invalid-feedback">{error.email}</div>
// 										)}
// 									</div>
// 								</div>
// 								<div className="col-md-6">
// 									<div className="form-group">
// 										<label htmlFor="departmentId">Facultet</label>
// 										<select
// 											onChange={(e) => setDepartment(e.target.value)}
// 											className={classnames("form-control mb-3", {
// 												"is-invalid": error.department,
// 											})}
// 											id="departmentId">
// 											<option>{t("select")}</option>
// 											<option value="B.Tech">B.Tech</option>
// 											<option value="B.Sc">B.Sc</option>
// 											<option value="BAA">BAA</option>
// 											<span></span>
// 											<span></span>
// 											<span></span>
// 										</select>
// 										{error.department && (
// 											<div className="invalid-feedback">{error.department}</div>
// 										)}
// 									</div>
// 									<div className="form-group">
// 										<label htmlFor="dobId">Tug'ilgan sana</label>
// 										<input
// 											onChange={(e) => setDob(e.target.value)}
// 											type="date"
// 											className={classnames("form-control mb-3", {
// 												"is-invalid": error.dob,
// 											})}
// 											id="dobId"
// 										/>
// 										{error.dob && (
// 											<div className="invalid-feedback">{error.dob}</div>
// 										)}
// 									</div>
// 									<div className="form-group">
// 										<label htmlFor="numberId">Bog'lanish</label>
// 										<input
// 											onChange={(e) => setContactNumber(e.target.value)}
// 											type="number"
// 											className={classnames("form-control", {
// 												"is-invalid": error.contactNumber,
// 											})}
// 											id="numberId"
// 										/>
// 										{error.contactNumber && (
// 											<div className="invalid-feedback">
// 												{error.contactNumber}
// 											</div>
// 										)}
// 									</div>
// 								</div>
// 							</div>
// 							<div className="row justify-content-center mt-3 text-center">
// 								<div className="col-md-1">
// 									{isLoading && (
// 										<div className="spinner-border text-primary" role="status">
// 											<span className="">Yuklanmoqda...</span>
// 										</div>
// 									)}
// 									{!isLoading && (
// 										<button type="submit" className="btn btn-info  ">
// 											Qo'shish
// 										</button>
// 									)}
// 								</div>
// 							</div>
// 						</form>
// 					</Box>
// 				</>
// 			) : (
// 				navigate("/login")
// 			)}
// 		</div>
// 	);
// };

// export default AdminAddAdmin;
