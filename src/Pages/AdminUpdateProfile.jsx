import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "../api/axios";
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputGroup from "../Components/InputGroup";
import { adminLogout } from "../redux/action/adminAction";

const AdminUpdateProfile = () => {
	const store = useSelector((store) => store);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [avatar, setAvatar] = useState("");
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const imagehandler = (e) => {
		if (e.target.files && e.target.files[0]) {
			let img = e.target.files[0];
			setAvatar(img);
		}
	};

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const getProfile = useCallback(async () => {
		setIsLoading(true);
		try {
			const { data } = await axios({
				method: "Get",
				url: `/api/admin/getProfile`,
			});
			setForm(data);
			setIsLoading(false);
		} catch (err) {
			setErrors(err.response.data);
			setIsLoading(false);
		}
	}, []);
	useEffect(() => {
		getProfile();
	}, [getProfile]);

	const formImageHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const formData = new FormData();
		formData.append("avatar", avatar);
		axios
			.put(`/api/admin/updateImage`, formData)
			.then((res) => {
				toast.success(`${res.data.message}`);
				setIsLoading(false);
				setTimeout(() => {
					dispatch(adminLogout());
					navigate("/login");
				}, 4000);
			})
			.catch((err) => {
				toast.error(`${err.response.data.message}`);
				setIsLoading(false);
			});
	};
	const formHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		axios
			.put(`/api/admin/updateProfile`, form)
			.then((res) => {
				toast.success(`${res.data.message}`);
				setIsLoading(false);
				setForm({});
				setErrors({});
				setTimeout(() => {
					dispatch(adminLogout());
					navigate("/login");
				}, 4000);
			})
			.catch((err) => {
				setErrors(err.response.data);
				setIsLoading(false);
			});
	};

	return (
		<div>
			{store.admin.isAuthenticated ? (
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
									<form noValidate onSubmit={formHandler}>
										<InputGroup
											label={t("full_name")}
											type="text"
											name="name"
											onChangeHandler={onChangeHandler}
											errors={errors.name}
											value={form.name}
										/>
										<InputGroup
											label="Email"
											type="email"
											name="email"
											onChangeHandler={onChangeHandler}
											value={form.email}
											errors={errors.email}
										/>
										<InputGroup
											label={t("date_of_birth")}
											type="date"
											name="dob"
											onChangeHandler={onChangeHandler}
											value={form.dob}
											errors={errors.dob}
										/>
										<InputGroup
											label={t("phone_number")}
											type="number"
											name="contactNumber"
											onChangeHandler={onChangeHandler}
											value={form.contactNumber}
											errors={errors.contactNumber}
										/>
										{!isLoading && (
											<button type="submit" className="btn btn-info mb-5">
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

export default AdminUpdateProfile;
