import { Box, Button, CircularProgress } from "@mui/material";
import axios from "../../api/axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputGroup from "../../Components/InputGroup";
import SelectGroupDe from "../../Components/SelectGroup";
import SelectGroupYe from "../../Components/SelectGroupYe";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

function DekanStudentDetails({ onClose }) {
	const [form, setForm] = useState({});
	const { t } = useTranslation();

	const { id } = useParams();
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

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
				url: `/api/dekan/getStudentDetail/${id}`,
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
	}, [id]);

	const formHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		axios
			.put(`/api/dekan/getStudentDetail/${id}`, form)
			.then((res) => {
				toast.success(`${res.data.message}`);
				setIsLoading(false);
				/* hide form after save */
				setForm({});
				/* hide errors after save */
				setErrors({});
				navigate("/dekan/addStudent");
				window.location.reload();
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
				<>
					<form noValidate onSubmit={formHandler}>
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
								label="Reg Num"
								type="text"
								name="registrationNumber"
								onChangeHandler={onChangeHandler}
								errors={errors.registrationNumber}
								value={form.registrationNumber}
							/>
							<SelectGroupDe
								label={t("faculty")}
								name="department"
								onChangeHandler={onChangeHandler}
								errors={errors.department}
								optionValue={form.department}
							/>
							<SelectGroupYe
								label={t("year")}
								name="year"
								onChangeHandler={onChangeHandler}
								errors={errors.year}
								optionValue={form.year}
							/>

							<InputGroup
								label="Group"
								type="text"
								name="section"
								onChangeHandler={onChangeHandler}
								errors={errors.section}
								value={form.section}
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
								label={t("date_of_birth")}
								type="text"
								name="dob"
								onChangeHandler={onChangeHandler}
								errors={errors.dob}
								value={form.dob}
							/>

							<InputGroup
								label={t("academic_year")}
								type="text"
								name="batch"
								onChangeHandler={onChangeHandler}
								errors={errors.batch}
								value={form.batch}
							/>
							<InputGroup
								label={t("phone_number")}
								type="number"
								name="studentMobileNumber"
								onChangeHandler={onChangeHandler}
								errors={errors.studentMobileNumber}
								value={form.studentMobileNumber}
							/>
							<InputGroup
								label={t("father_name")}
								type="text"
								name="fatherName"
								onChangeHandler={onChangeHandler}
								errors={errors.fatherName}
								value={form.fatherName}
							/>
							<InputGroup
								label={t("father_phone_number")}
								type="number"
								name="fatherMobileNumber"
								onChangeHandler={onChangeHandler}
								errors={errors.fatherMobileNumber}
								value={form.fatherMobileNumber}
							/>

							<div className="col-md-6">
								<div className="row justify-content-center text-center">
									<div className="">
										{isLoading && (
											<div
												className="spinner-border text-primary"
												role="status">
												<span className="sr-only"></span>
											</div>
										)}
										{!isLoading && (
											<>
												<Button onClick={onClose}>{t("cancel")}</Button>
												<button type="submit" className="btn btn-info  ">
													{t("update")}
												</button>
											</>
										)}
									</div>
								</div>
							</div>
						</Box>
					</form>
				</>
			)}
		</>
	);
}

export default DekanStudentDetails;
