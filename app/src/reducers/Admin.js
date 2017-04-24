/* eslint-disable */

const initialState = {
	messBadServer: 'Sorry problem with server. :(',
	isLoad: false,
	isGetSends: false,
	error: false,
	data : {},
	sends: []
};

const admin = (state = initialState, action) => {

	switch (action.type) {
		case 'adminOnLoad':
			return {
				...state,
				isLoad: true,
				data: action.data,
				sends: []
			};
		case 'adminOnSetError':
			return {
				...state,
				isLoad: false,
				isGetSends : true,
				error: action.data
			};
		case 'adminOnLoadSuccess':
			return {
				...state,
				isLoad: false,
				sends: action.data,
				isGetSends : true,
				error: false
			};
	}

	return state;
};

export {admin};
