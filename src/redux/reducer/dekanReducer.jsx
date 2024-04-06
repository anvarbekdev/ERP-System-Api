import { SET_DEKAN, GET_SUBJECTS } from "../actionTypes";
import isEmpty from "../validation/is-empty";

const initialState = {
	isAuthenticated: false,
	dekan: {},
	dekanAddStudentFlag: false,
	dekanAddSubjectFlag: false,
	loadingSearch: false,
	fetchedStudentsHelper: true,
	markLoad: true,
	allSubject: [],
	fetchedStudents: [],
};

const dekanReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DEKAN:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				dekan: action.payload,
			};
		case GET_SUBJECTS: {
			return {
				...state,
				allSubject: action.payload,
			};
		}
		case "LOADING_SEARCH": {
			return {
				...state,
				loadingSearch: action.payload,
			};
		}
		case "FETCH_STUDENTS": {
			return {
				...state,
				fetchedStudentsHelper: false,
				fetchedStudents: action.payload,
			};
		}
		case "GET_SUBJECTNAME_LIST": {
			return {
				...state,
				allSubjectName: action.payload,
			};
		}
		case "MARK_LOAD": {
			return {
				...state,
				markLoad: action.payload,
			};
		}
		case "DEKAN_ADD_STUDENT_FLAG": {
			return {
				...state,
				dekanAddStudentFlag: action.payload,
			};
		}
		case "DEKAN_ADD_SUBJECT_FLAG": {
			return {
				...state,
				dekanAddSubjectFlag: action.payload,
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

export default dekanReducer;
