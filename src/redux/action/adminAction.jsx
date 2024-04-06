import axios from "../../api/axios";
import setAuthToken from "../utils/setAuthToken";
import { SET_ADMIN, SET_ERRORS } from "../actionTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url = "";

const setAdmin = (data) => {
	return {
		type: SET_ADMIN,
		payload: data,
	};
};
const adminAddFacultyFlag = (data) => {
	return {
		type: "ADMIN_ADD_FACULTY_FLAG",
		payload: data,
	};
};
const adminAddAdminFlag = (data) => {
	return {
		type: "ADMIN_ADD_ADMIN_FLAG",
		payload: data,
	};
};
const adminAddNewsFlag = (data) => {
	return {
		type: "ADMIN_ADD_NEWS_FLAG",
		payload: data,
	};
};
const adminGetAllFacultyHelper = (data) => {
	return {
		type: "GET_ALL_FACULTY",
		payload: data,
	};
};
const adminGetAllSubjectHelper = (data) => {
	return {
		type: "GET_ALL_SUBJECT",
		payload: data,
	};
};
const adminAddDekanFlag = (data) => {
	return {
		type: "ADMIN_ADD_DEKAN_FLAG",
		payload: data,
	};
};

export const adminAddDekan = (dekanCredential) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/admin/addDekan",
				data: dekanCredential,
			});
			dispatch(adminAddDekanFlag(true));
			setTimeout(() => {
				dispatch(adminAddDekanFlag(false));
			}, 2000);
			toast.success("Dekan Added Successfully");
		} catch (err) {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		}
	};
};
export const adminAddFaculty = (facultyCredential) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/admin/addFaculty",
				data: facultyCredential,
			});
			dispatch(adminAddFacultyFlag(true));
			setTimeout(() => {
				dispatch(adminAddFacultyFlag(false));
			}, 5000);
			toast.success("Faculty Added Successfully");
		} catch (err) {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		}
	};
};
export const adminAddAdmin = (adminCredentails) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/admin/addAdmin",
				data: adminCredentails,
			});
			dispatch(adminAddAdminFlag(true));
			toast.success("Admin Added Successfully");
		} catch (err) {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		}
	};
};
export const adminAddNews = (newsCredentails) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/admin/addNewsAdmin",
				data: newsCredentails,
			});
			dispatch(adminAddNewsFlag(true));
			toast.success("Newa Admin Added Successfully");
		} catch (err) {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		}
	};
};
export const adminGetAllFaculty = (department) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/admin/getAllFaculty",
				data: department,
			});
			dispatch(adminGetAllFacultyHelper(data.result));
		} catch (err) {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		}
	};
};
export const adminUpdatePassword = (passwordData) => {
	return async (dispatch) => {
		console.log(passwordData);
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/admin/updatePassword",
				data: passwordData,
			});
			if (
				!alert(
					`Old password Yangilandi, Yangilangan parol bilan Qayta tizimga kiring!`
				)
			) {
				dispatch(adminLogout());
				window.location.reload();
			}
		} catch (err) {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		}
	};
};
export const adminGetAllSubject = (department) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/admin/getAllSubject",
				data: department,
			});
			dispatch(adminGetAllSubjectHelper(data.result));
		} catch (err) {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		}
	};
};
export const setAdminUser = (data) => {
	return {
		type: SET_ADMIN,
		payload: data,
	};
};
export const adminLogout = () => (dispatch) => {
	// Remove token from localStorage
	localStorage.removeItem("adminJwtToken");
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to {} which will set isAuthenticated to false
	dispatch(setAdmin({}));
};
