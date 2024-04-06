import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { studentUpdatePassword } from "../redux/action/studentAction";
import "react-toastify/dist/ReactToastify.css";

import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

const StudentUpdatePassword = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [error, setError] = useState({});
	const { t } = useTranslation();
	const formHandler = (e) => {
		e.preventDefault();
		setIsLoading(true);
		dispatch(
			studentUpdatePassword({
				registrationNumber: store.student.student.student.registrationNumber,
				oldPassword,
				newPassword,
				confirmNewPassword,
			})
		);
	};

	useEffect(() => {
		if (store.errorHelper.length !== 0) {
			setError(store.errorHelper);
			setIsLoading(false);
		}
		setTimeout(() => {
			setError({});
			setIsLoading(false);
		}, 5000);
	}, [store.errorHelper]);
	return (
		<div>
			{store.student.isAuthenticated ? (
				<>
					<ToastContainer />
					<Box
						color={"text.primary"}
						bgcolor="background.default"
						sx={{
							height: "calc(100vh - 60px)",
							display: "flex",
							alignItems: "center",
							width: 300,
							textAlign: "center",
						}}>
						<form noValidate onSubmit={formHandler}>
							<FormControl sx={{ my: 2 }} fullWidth>
								<TextField
									required
									style={{ color: "red" }}
									id="Eski parol"
									label={t("oldPassword")}
									onChange={(e) => setOldPassword(e.target.value)}
									type="password"
									value={oldPassword}
									className={classNames("", {
										"is-invalid": error.oldPassword,
									})}
								/>
								{error.oldPassword && (
									<Typography color="red">{error.oldPassword}</Typography>
								)}
							</FormControl>
							<FormControl sx={{ mb: 2 }} fullWidth>
								<TextField
									onChange={(e) => setNewPassword(e.target.value)}
									value={newPassword}
									type="password"
									id="New password"
									label={t("new_password")}
									className={classNames("", {
										"is-invalid": error.newPassword,
									})}
								/>
								{error.newPassword && (
									<Typography color="red">{error.newPassword}</Typography>
								)}
							</FormControl>
							<FormControl sx={{ mb: 2 }} fullWidth>
								<TextField
									label={t("confirm_password")}
									onChange={(e) => setConfirmNewPassword(e.target.value)}
									value={confirmNewPassword}
									className={classNames("", {
										"is-invalid": error.confirmNewPassword,
									})}
									type="password"
									id="password"
								/>
								{error.confirmNewPassword && (
									<Typography color="red">
										{error.confirmNewPassword}
									</Typography>
								)}
							</FormControl>
							<div className="row justify-content-center">
								<div className="col-md-1">
									{isLoading && (
										<div className="spinner-border text-primary" role="status">
											<span className="sr-only">Loading...</span>
										</div>
									)}
								</div>
							</div>
							{!isLoading && (
								<Button type="submit" variant="outlined">
									{t("update")}
								</Button>
							)}
						</form>
					</Box>
				</>
			) : (
				navigate("/login")
			)}
		</div>
	);
};

export default StudentUpdatePassword;
