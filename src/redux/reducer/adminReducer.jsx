import { SET_ADMIN, GET_SUBJECTS } from "../actionTypes";
import isEmpty from "../validation/is-empty";

const initialState = {
	isAuthenticated: false,
	admin: {},
	adminAddFacultyFlag: false,
	adminAddDekanFlag: false,
	adminAddAdminFlag: false,
	adminAddNewsFlag: false,
	allSubject: [],
	allFaculty: [],
};

const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ADMIN:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				admin: action.payload,
			};
		case "ADMIN_ADD_DEKAN_FLAG": {
			return {
				...state,
				adminAddDekanFlag: action.payload,
			};
		}
		case "ADMIN_ADD_FACULTY_FLAG": {
			return {
				...state,
				adminAddFacultyFlag: action.payload,
			};
		}
		case "ADMIN_ADD_ADMIN_FLAG": {
			return {
				...state,
				adminAddAdminFlag: action.payload,
			};
		}
		case "ADMIN_ADD_NEWS_FLAG": {
			return {
				...state,
				adminAddNewsFlag: action.payload,
			};
		}
		case "GET_ALL_FACULTY": {
			return {
				...state,
				allFaculty: action.payload,
			};
		}
		case "GET_ALL_SUBJECT": {
			return {
				...state,
				allSubject: action.payload,
			};
		}
		default:
			return state;
	}
};

export default adminReducer;
