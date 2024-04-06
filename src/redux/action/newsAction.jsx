import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
	SET_NEWS,
	SET_ERRORS_NEWS,
	SET_ADMIN,
	SET_DEKAN,
	SET_STUDENT,
	SET_FACULTY,
} from "../actionTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../api/axios";
const url = "";

export const setChatHistory = (data) => {
	return {
		type: "SET_CHAT",
		payload: data,
	};
};
const newsAddPostFlag = (data) => {
	return {
		type: "NEWS_ADD_POST_FLAG",
		payload: data,
	};
};
const setNews = (data) => {
	return {
		type: SET_NEWS,
		payload: data,
	};
};
const setAdmin = (data) => {
	return {
		type: SET_ADMIN,
		payload: data,
	};
};
const setDekan = (data) => {
	return {
		type: SET_DEKAN,
		payload: data,
	};
};
const setStudent = (data) => {
	return {
		type: SET_STUDENT,
		payload: data,
	};
};
const setFaculty = (data) => {
	return {
		type: SET_FACULTY,
		payload: data,
	};
};

export const newsLogin = (newsCredential) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/login",
				data: newsCredential,
			});
			const { token } = data;
			// Set token to local Storage
			const decoded = jwt_decode(token);
			if (decoded.text === "news") {
				localStorage.setItem("newsJwtToken", token);
				// Set token to Auth header
				setAuthToken(token);
				// Decode token to get user data
				// Set current user
				dispatch(setNews(decoded));
			} else if (decoded.text === "admin") {
				localStorage.setItem("adminJwtToken", token);
				// Set token to Auth header
				setAuthToken(token);
				// Decode token to get user data
				// Set current user
				dispatch(setAdmin(decoded));
			} else if (decoded.text === "dekan") {
				localStorage.setItem("dekanJwtToken", token);
				// Set token to Auth header
				setAuthToken(token);
				// Decode token to get user data
				// Set current user
				dispatch(setDekan(decoded));
			} else if (decoded.text === "faculty") {
				localStorage.setItem("facultyJwtToken", token);
				// Set token to Auth header
				setAuthToken(token);
				// Decode token to get user data
				// Set current user
				dispatch(setFaculty(decoded));
			} else if (decoded.text === "student") {
				localStorage.setItem("studentJwtToken", token);
				// Set token to Auth header
				setAuthToken(token);
				// Decode token to get user data
				// Set current user
				dispatch(setStudent(decoded));
			}
		} catch (err) {
			dispatch({
				type: SET_ERRORS_NEWS,
				payload: err.response.data,
			});
		}
	};
};
export const newsUpdatePassword = (passwordData) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/news/updatePassword",
				data: passwordData,
			});
			if (
				!alert(
					`Old password Yangilandi. Yangilanishlarni ko'rish uchun qayta kiring!`
				)
			) {
				dispatch(newsLogout());
				window.location.reload();
			}
		} catch (err) {
			dispatch({
				type: SET_ERRORS_NEWS,
				payload: err.response.data,
			});
		}
	};
};
export const newsAddPost = (newsPost) => {
	return async (dispatch) => {
		// console.log(newsPost);
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/news/addPost",
				data: newsPost,
			});
			dispatch(newsAddPostFlag(true));
			if (!alert("Post Uplaod Successfully")) {
				setTimeout(() => {
					dispatch(newsAddPostFlag(false));
				}, 2000);
			}
		} catch (err) {
			dispatch({
				type: SET_ERRORS_NEWS,
				payload: err.response.data,
			});
		}
	};
};
export const newsAddGallery = (newsPost) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "Post",
				url: url + "/api/news/addGallery",
				data: newsPost,
			});
			if (!alert(`Post Uplaod Successfully`)) {
				dispatch(galleryLoader(true));
				// window.location.reload();
			}
			setTimeout(() => {
				dispatch(galleryLoader(false));
			}, 1000);
		} catch (err) {
			dispatch({
				type: SET_ERRORS_NEWS,
				payload: err.response.data,
			});
		}
	};
};
export const galleryLoader = (data) => {
	return {
		type: "GALLERY_LOADER",
		payload: data,
	};
};
export const setNewsUser = (data) => {
	return {
		type: SET_NEWS,
		payload: data,
	};
};
export const newsLogout = () => (dispatch) => {
	// Remove token from localStorage
	localStorage.removeItem("newsJwtToken");
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to {} which will set isAuthenticated to false
	dispatch(setNews({}));
};
