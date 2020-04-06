import { HIDE_ERROR_MODAL, SHOW_ERROR_MODAL, DETAIL } from "./constants";

export const showErrorModal = message => ({
	type: SHOW_ERROR_MODAL,
	message
});

export const hideErrorModal = () => ({
	type: HIDE_ERROR_MODAL
});

export const errorHandler = async (err, dispatch) => {
	if (err.message === "Failed to fetch") {
		dispatch(
			showErrorModal("Connection lost. Check your network and retry.")
		);
		await setTimeout(() => dispatch(hideErrorModal()), 3000);
	} else {
		dispatch(showErrorModal(`${err.message}`));
		await setTimeout(() => dispatch(hideErrorModal()), 3000);
	}
};

export const detailSubject = obj => ({
	type: DETAIL,
	toBeDetailed: obj
})
