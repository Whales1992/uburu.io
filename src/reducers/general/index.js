import {
	HIDE_ERROR_MODAL,
	SHOW_ERROR_MODAL,
	SHOW_DELETE_MODAL,
	CLOSE_DELETE_MODAL
} from "../../actions/general/constants";

const initialState = {
	errorModal: {
		showing: false,
		message: null
	},
	deleteModalShowing: null,
	backdropShowing: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SHOW_ERROR_MODAL:
			return {
				...state,
				errorModal: {
					showing: true,
					message: action.message
				}
			};
		case HIDE_ERROR_MODAL:
			return {
				...state,
				errorModal: {
					showing: false,
					message: null
				}
			};
		case SHOW_DELETE_MODAL:
			return {
				...state,
				backdropShowing: true,
				deleteModalShowing: action.id
			};
		case CLOSE_DELETE_MODAL:
			return {
				...state,
				backdropShowing: false,
				deleteModalShowing: null
			};

		default:
			return state;
	}
}
