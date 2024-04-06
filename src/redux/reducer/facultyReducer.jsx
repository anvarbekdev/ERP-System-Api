import { SET_FACULTY } from "../actionTypes";

import isEmpty from "../validation/is-empty";

const initialState = {
	isAuthenticated: false,
	markLoad: true,
	faculty: {},
	flag: false,
	allSubjectCodeList: [],
	allSubjectName: [],
	fetchedStudents: [],
	fetchedStudentsHelper: true,
};

const facultyReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_FACULTY: {
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				faculty: action.payload,
			};
		}
		case "FETCH_STUDENTS": {
			return {
				...state,
				fetchedStudentsHelper: false,
				fetchedStudents: action.payload,
			};
		}
		case "MARK_LOAD": {
			return {
				...state,
				markLoad: action.payload,
			};
		}
		case "GET_SUBJECTNAME_LIST": {
			return {
				...state,
				allSubjectName: action.payload,
			};
		}
		case "HELPER": {
			return {
				...state,
				fetchedStudentsHelper: action.payload,
			};
		}
		default:
			return state;
	}
};

export default facultyReducer;
