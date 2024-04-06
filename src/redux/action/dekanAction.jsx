import axios from "../../api/axios";
import setAuthToken from "../utils/setAuthToken";
import { SET_DEKAN, SET_ERRORS, SET_ERRORS_HELPER } from "../actionTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url = "";

const setDekan = (data) => {
	return {
		type: SET_DEKAN,
		payload: data,
	};
};
const dekanAddStudentFlag = (data) => {
	return {
		type: "DEKAN_ADD_STUDENT_FLAG",
		payload: data,
	};
};
const dekanAddSubjectFlag = (data) => {
	return {
		type: "DEKAN_ADD_SUBJECT_FLAG",
		payload: data,
	};
};
const dekanGetAllSubjectHelper = (data) => {
	return {
		type: "GET_ALL_SUBJECT",
		payload: data,
	};
};
const fetchStudentsHelper = (data) => {
	return {
		type: "FETCH_STUDENTS",
		payload: data,
	};
};
const subjectNameListHelper = (data) => {
	return {
		type: "GET_SUBJECTNAME_LIST",
		payload: data,
	};
};
const uploadMarkLoad = (data) => {
	return {
		type: "MARK_LOAD",
		payload: data,
	};
};
const loadingSearch = (data) => {
	return {
		type: "LOADING_SEARCH",
		payload: data,
	};
};

export const fetchStudents = (department, year, section) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/dekan/fetchStudents",
				data: { department, year, section },
			});
			dispatch(fetchStudentsHelper(data.result));
			dispatch(subjectNameListHelper(data.subjectName));
			dispatch(loadingSearch(true));
			setTimeout(() => {
				dispatch(loadingSearch(false));
			}, [2000]);
		} catch (err) {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		}
	};
};
export const uploadMarks = (
	subjectName,
	exam,
	totalMarks,
	marks,
	department,
	year,
	section
) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/dekan/uploadMarks",
				data: {
					subjectName,
					exam,
					totalMarks,
					marks,
					department,
					year,
					section,
				},
			});
			toast.success(`Baholash yuklandi!!`);
			dispatch(uploadMarkLoad(false));
			setInterval(function () {
				dispatch(uploadMarkLoad(true));
			}, 3000);
		} catch (err) {
			dispatch({
				type: SET_ERRORS_HELPER,
				payload: err.response.data,
			});
		}
	};
};
export const dekanAddStudent = (studentCredential) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/dekan/addStudent",
				data: studentCredential,
			});
			dispatch(dekanAddStudentFlag(true));
			setTimeout(() => {
				dispatch(dekanAddStudentFlag(false));
			}, 2000);
			toast.success(`Talaba muvaffaqiyatli qo'shildi!`);
		} catch (err) {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		}
	};
};
export const dekanAddSubject = (subjectCredential) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/dekan/addSubject",
				data: subjectCredential,
			});
			dispatch(dekanAddSubjectFlag(true));
			setTimeout(() => {
				dispatch(dekanAddSubjectFlag(false));
			}, 3000);
			toast.success(data.message);
		} catch (err) {
			toast.error(err.response.data.department);
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		}
	};
};
export const dekanUpdatePassword = (passwordData) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/dekan/updatePassword",
				data: passwordData,
			});
			if (
				!alert(
					`Old password Yangilandi, Yangilangan parol bilan Qayta tizimga kiring!`
				)
			) {
				dispatch(dekanLogout());
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
export const dekanGetAllSubject = (department) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/dekan/getAllSubject",
				data: department,
			});
			dispatch(dekanGetAllSubjectHelper(data.result));
		} catch (err) {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		}
	};
};
export const setDekanUser = (data) => {
	return {
		type: SET_DEKAN,
		payload: data,
	};
};
export const dekanLogout = () => (dispatch) => {
	// Remove token from localStorage
	localStorage.removeItem("dekanJwtToken");
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to {} which will set isAuthenticated to false
	dispatch(setDekan({}));
};
