import axios from "axios";
// const BASE_URL = "http://localhost:5000";
// const BASE_URL = "";
export default axios.create({
	// baseURL: BASE_URL,
	// withCredentials: true,
});
export const axiosImage = axios.create({
	// baseURL: BASE_URL,
});
