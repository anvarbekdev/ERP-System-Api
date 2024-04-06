import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "../api/axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dekanLogout } from "../redux/action/dekanAction";

const DekanUpdateProfile = () => {
	const store = useSelector((store) => store);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [avatar, setAvatar] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { t } = useTranslation();

	const imagehandler = (e) => {
		if (e.target.files && e.target.files[0]) {
			let img = e.target.files[0];
			setAvatar(img);
		}
	};

	const formImageHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const formData = new FormData();
		formData.append("avatar", avatar);
		axios
			.put(`/api/dekan/updateImage`, formData)
			.then((res) => {
				toast.success(`${res.data.message}`);
				setIsLoading(false);
				setTimeout(() => {
					navigate("/login");
					dispatch(dekanLogout());
				}, 4000);
			})
			.catch((err) => {
				toast.error(`${err.response.data.message}`);
				setIsLoading(false);
			});
	};
	return (
		<div>
			{store.dekan.isAuthenticated ? (
				<>
					<ToastContainer />
					{isLoading ? (
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								height: "calc(100vh - 60px)",
							}}>
							<CircularProgress />
						</Box>
					) : (
						<div className="container mt-5">
							<div className="row ">
								<div className="col-md-5 text-center w-100 m-auto">
									<form noValidate onSubmit={formImageHandler}>
										<div className="form-group">
											<label htmlFor="inputId">{t("profile_picture")}</label>
											<input
												className="form-control"
												type="file"
												accept=".jpg,.png,.jpeg"
												id="inputId"
												onChange={imagehandler}
											/>
										</div>
										{avatar && (
											<img
												className="my-5"
												alt="Avatar"
												src={URL.createObjectURL(avatar)}
												style={{ width: 200, height: 200, borderRadius: 10 }}
											/>
										)}
										{!isLoading && (
											<button type="submit" className="btn btn-info my-3 ms-2">
												{t("update")}
											</button>
										)}
									</form>
								</div>
							</div>
						</div>
					)}
				</>
			) : (
				navigate("/login")
			)}
		</div>
	);
};

export default DekanUpdateProfile;
