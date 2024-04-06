import { combineReducers } from "redux";
import facultyReducer from "./facultyReducer";
import adminReducer from "./adminReducer";
import newsReducer from "./newsReducer";
import studentReducer from "./studentReducer";
import errorReducerHelper from "./errorReducerHelper";
import errorReducer from "./errorReducer";
import errorNewsReducer from "./errorNewsReducer";
import dekanReducer from "./dekanReducer";

export default combineReducers({
	faculty: facultyReducer,
	admin: adminReducer,
	student: studentReducer,
	news: newsReducer,
	dekan: dekanReducer,
	error: errorReducer,
	errorHelper: errorReducerHelper,
	errorNewsHelper: errorNewsReducer,
});
