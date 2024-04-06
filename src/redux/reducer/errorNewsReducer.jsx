import { SET_ERRORS_NEWS } from "../actionTypes";

const initialState = {};

const setErrorsNews = (state = initialState, action) => {
	switch (action.type) {
		case SET_ERRORS_NEWS:
			return action.payload;
		default:
			return state;
	}
};

export default setErrorsNews;
