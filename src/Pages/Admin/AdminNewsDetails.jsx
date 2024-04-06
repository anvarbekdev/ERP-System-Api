import { Box, CircularProgress } from "@mui/material";
import axios from "../../api/axios";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import InputGroup from "../../Components/InputGroup";

function AdminNewsDetails() {
	const [form, setForm] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const { t } = useTranslation();

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const getStudentDetails = useCallback(async () => {
		setIsLoading(true);
		try {
			const { data } = await axios({
				method: "Get",
				url: `/api/admin/getNewsAdmin/${id}`,
			});
			setForm(data);
			setIsLoading(false);
		} catch (err) {
			setErrors(err.response.data);
			setIsLoading(false);
		}
	}, [id]);

	useEffect(() => {
		getStudentDetails();
	}, [getStudentDetails, id]);

	const formHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		axios
			.put(`/api/admin/getNewsAdmin/${id}`, form)
			.then((res) => {
				toast(`${res.data.message}`);
				setIsLoading(false);
				/* hide form after save */
				setForm({});
				/* hide errors after save */
				setErrors({});
				setTimeout(() => {
					navigate("/admin/allDekans");
					window.location.reload();
				}, 4000);
			})
			.catch((err) => setErrors(err.response.data));
	};

	useEffect(() => {
		if (errors.length !== 0) {
			setIsLoading(false);
		}
	}, [errors]);
	return (
		<>
			<ToastContainer />
			{isLoading && (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						height: "calc(100vh - 60px)",
					}}>
					<CircularProgress />
				</Box>
			)}
			<form noValidate onSubmit={formHandler}>
				{!isLoading && (
					<Box
						sx={{
							maxWidth: 500,
							display: "flex",
							mt: 3,
							alignItems: "center",
							textAlign: "center",
							alignContent: "center",
							flexWrap: "wrap",
							justifyContent: "space-evenly",
						}}>
						<InputGroup
							label="Email"
							type="text"
							name="email"
							onChangeHandler={onChangeHandler}
							errors={errors.email}
							value={form.email}
						/>

						<InputGroup
							label={t("full_name")}
							type="text"
							name="name"
							onChangeHandler={onChangeHandler}
							errors={errors.name}
							value={form.name}
						/>

						<InputGroup
							label={t("academic_year")}
							type="text"
							name="batch"
							onChangeHandler={onChangeHandler}
							errors={errors.joiningYear}
							value={form.joiningYear}
						/>

						<div className="col-md-6">
							<div className="row justify-content-center text-center">
								<div className="">
									{isLoading && (
										<div className="spinner-border text-primary" role="status">
											<span className="sr-only"></span>
										</div>
									)}
									{!isLoading && (
										<button type="submit" className="btn btn-info  ">
											{t("update")}
										</button>
									)}
								</div>
							</div>
						</div>
					</Box>
				)}
			</form>
		</>
	);
}

export default AdminNewsDetails;
