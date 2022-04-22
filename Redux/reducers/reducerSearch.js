import { REFRESH_INPUT_SEARCH, ADD_DATA, LOAD_DATA } from "../variables";

const initialState = {
	result: [],
	inputSearch: "",
	isLoadLocalData: false,
	keyLocalStorage: "data__search",
};

const reducerSearch = (state = initialState, action) => {
	switch (action.type) {
		case REFRESH_INPUT_SEARCH: {
			return {
				...state,
				inputSearch: action.inputSearch,
			};
		}

		case ADD_DATA: {
			let tempObject = {
				id: Date.now().toString(),
				search: action.inputSearch,
				result: action.result,
				time_search: Date.now().toString(),
			};
			return {
				...state,
				result: [...state.result, tempObject],
			};
		}

		case LOAD_DATA: {
			return {
				...state,
				result: action.result,
				isLoadLocalData: action.isLoadLocalData,
			};
		}

		default:
			return state;
	}
};

export const RefreshInputAC = (inputSearch) => ({
	type: REFRESH_INPUT_SEARCH,
	inputSearch,
});

export const AddDataSeachToListAC = (inputSearch, result) => ({
	type: ADD_DATA,
	inputSearch,
	result,
});

export const LoadDataFromLocalStorageAC = (result, isLoadLocalData) => ({
	type: LOAD_DATA,
	result,
	isLoadLocalData,
});

export default reducerSearch;
