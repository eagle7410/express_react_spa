/* eslint-disable */

const initialState = {
	isSend: false,
	isSendCreate: false,
	errors: {},
	data: {}
};

const home = (state = initialState, action) => {

	switch (action.type) {
		case 'homeSetErrors':
			return {
				... state,
				isSend : false,
				errors : action.data
			};
		case 'homeOnSend':
			return {
				... state,
				isSend : true,
				data : action.data
			};
		case 'homeOnSendSuccess':
			return {
				... state,
				errors: {},
				isSendCreate: true,
				isSend: false
			};
		case 'homeOnReset':
			return {
				... state,
				isSend: false,
				isSendCreate: false,
				errors: {},
				data: {}
			};
	}

	return state;
};

export {home};
