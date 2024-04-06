import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import axios from "../../api/axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputGroup from "../../Components/InputGroup";
import SelectGroupDe from "../../Components/SelectGroup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function AdminFacultyDetail({ onClose }) {
	const [form, setForm] = useState({});
	const { id } = useParams();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	const getAdminDetails = useCallback(async () => {
		setIsLoading(true);
		try {
			const { data } = await axios({
				method: "Get",
				url: `/api/admin/getAllFaculty/${id}`,
			});
			setForm(data);
			setIsLoading(false);
		} catch (err) {
			setErrors(err.response.data);
			setIsLoading(false);
		}
	}, [id]);

	useEffect(() => {
		getAdminDetails();
	}, [getAdminDetails, id]);

	const formHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		axios
			.put(`/api/admin/updateFaculty`, form)
			.then((res) => {
				toast.success(`${res.data.message}`);
				setIsLoading(false);
				/* hide form after save */
				setForm({});
				/* hide errors after save */
				setErrors({});
				navigate("/admin/addFaculty");
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
							label={t("full_name")}
							type="text"
							name="name"
							onChangeHandler={onChangeHandler}
							errors={errors.name}
							value={form.name}
						/>

						<SelectGroupDe
							label={t("faculty")}
							name="department"
							onChangeHandler={onChangeHandler}
							errors={errors.department}
							optionValue={form.department}
						/>

						<InputGroup
							label={t("academic_year")}
							type="text"
							name="batch"
							onChangeHandler={onChangeHandler}
							errors={errors.joiningYear}
							value={form.joiningYear}
						/>
						<FormControl sx={{ width: 130 }}>
							<InputLabel id="demo-simple-select-label">
								{form.gender}
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="Age"
								name="gender"
								onChange={onChangeHandler}>
								<MenuItem value="Male">{t("male")}</MenuItem>
								<MenuItem value="Female">{t("female")}</MenuItem>
							</Select>
							<FormHelperText sx={{ color: "red" }}>
								{errors.gender}
							</FormHelperText>
						</FormControl>
						<InputGroup
							label={t("phone_number")}
							type="number"
							name="facultyMobileNumber"
							onChangeHandler={onChangeHandler}
							errors={errors.facultyMobileNumber}
							value={form.facultyMobileNumber}
						/>
						<InputGroup
							label={t("secontNumber")}
							type="number"
							name="aadharCard"
							onChangeHandler={onChangeHandler}
							errors={errors.aadharCard}
							value={form.aadharCard}
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
				)}
			</form>
		</>
	);
}

export default AdminFacultyDetail;
