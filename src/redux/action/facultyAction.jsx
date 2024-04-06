import axios from "../../api/axios";
import setAuthToken from "../utils/setAuthToken";
import { SET_FACULTY, SET_ERRORS, SET_ERRORS_HELPER } from "../actionTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url = "";

const setFaculty = (data) => {
	return {
		type: SET_FACULTY,
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

export const facultyUpdatePassword = (passwordData) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/faculty/updatePassword",
				data: passwordData,
			});
			if (
				!alert(
					`Old password Yangilandi, Yangilangan parol bilan Qayta tizimga kiring!`
				)
			) {
				dispatch(facultyLogout());
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
			// console.log(data.subjectName);
		} catch (err) {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		}
	};
};
export const markAttendence = (
	selectedStudents,
	subjectName,
	department,
	year,
	section
) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/faculty/markAttendence",
				data: { selectedStudents, subjectName, department, year, section },
			});
			alert(`Ma'lumotlar muvaffaqiyatli Yuklandi!!!`);
			dispatch(uploadMarkLoad(false));
			window.location.reload();
		} catch (err) {
			dispatch({
				type: SET_ERRORS_HELPER,
				payload: err.response.data,
			});
		}
	};
};
export const setFacultyUser = (data) => {
	return {
		type: SET_FACULTY,
		payload: data,
	};
};
export const facultyLogout = () => (dispatch) => {
	// Remove token from localStorage
	localStorage.removeItem("facultyJwtToken");
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to {} which will set isAuthenticated to false
	dispatch(setFaculty({}));
};
