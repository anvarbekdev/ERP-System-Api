import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { newsUpdatePassword } from "../redux/action/newsAction";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

const NewsUpdatePassword = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const { t } = useTranslation();

	const formHandler = (e) => {
		e.preventDefault();
		setIsLoading(true);
		dispatch(
			newsUpdatePassword({
				registrationNumber: store.news.news.news.registrationNumber,
				oldPassword,
				newPassword,
				confirmNewPassword,
			})
		);
	};

	useEffect(() => {
		if (store.errorNewsHelper) {
			setIsLoading(false);
			setError(store.errorNewsHelper);
		}
		setTimeout(() => {
			setError({});
		}, 5000);
	}, [store.errorNewsHelper]);

	return (
		<div>
			{store.news.isAuthenticated ? (
				<>
					<ToastContainer />
					<Box
						sx={{
							height: "calc(100vh - 60px)",
							display: "flex",
							alignItems: "center",
							width: 300,
							textAlign: "center",
						}}>
						<form onSubmit={formHandler}>
							<FormControl sx={{ my: 2 }} fullWidth>
								<TextField
									required
									id="Eski Old password"
									label={t("oldPassword")}
									onChange={(e) => setOldPassword(e.target.value)}
									type="password"
									value={oldPassword}
									className={classnames("", {
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
									className={classnames("", {
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
									className={classnames("", {
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

export default NewsUpdatePassword;
