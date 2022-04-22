import { REFRESH_CURRENT_FILM, REFRESH_CURRENT_CHARACTER, REFRESH_CURRENT_PLANET, REFRESH_CURRENT_STARSHIP } from "../variables";

const initialState = {
	currentCharacter: {},
	currentFilm: {},
	currentPlanet: {},
	currentStarship: {},
};

const reducerCurrentItem = (state = initialState, action) => {
	switch (action.type) {
		case REFRESH_CURRENT_FILM: {
			return {
				...state,
				currentFilm: action.currentFilm,
			};
		}

		case REFRESH_CURRENT_CHARACTER: {
			return {
				...state,
				currentCharacter: action.currentCharacter,
			};
		}

		case REFRESH_CURRENT_PLANET: {
			return {
				...state,
				currentPlanet: action.currentPlanet,
			};
		}

		case REFRESH_CURRENT_STARSHIP: {
			return {
				...state,
				currentStarship: action.currentStarship,
			};
		}

		default:
			return state;
	}
};

export const RefreshCurrentFilmAC = (currentFilm) => ({
	type: REFRESH_CURRENT_FILM,
	currentFilm,
});

export const RefreshCurrentCharacterAC = (currentCharacter) => ({
	type: REFRESH_CURRENT_CHARACTER,
	currentCharacter,
});

export const RefreshCurrentPlanetAC = (currentPlanet) => ({
	type: REFRESH_CURRENT_PLANET,
	currentPlanet,
});

export const RefreshCurrentStarshipAC = (currentStarship) => ({
	type: REFRESH_CURRENT_STARSHIP,
	currentStarship,
});

export default reducerCurrentItem;
