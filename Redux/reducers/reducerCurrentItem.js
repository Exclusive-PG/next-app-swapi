import {REFRESH_CURRENT_FILM} from "../variables"

const initialState = {
    currentCharacter : {},
    currentFilm : {},
    currentPlanet : {} ,
    currentStarship : {}
}

const reducerCurrentItem = (state = initialState , action ) => {

    switch(action.type){

        case REFRESH_CURRENT_FILM: {

            return {
                ...state,
                currentFilm : action.currentFilm
            }
        }

       

        default: 
        return state;
    }
}



export const RefreshCurrentFilmAC = (currentFilm) => ({
    type : REFRESH_CURRENT_FILM,
    currentFilm
    })

    // export const RefreshCurrentFilmAC = (currentFilm) => ({
    //     type : REFRESH_CURRENT_FILM,
    //     currentFilm
    //     })

    //     export const RefreshCurrentFilmAC = (currentFilm) => ({
    //         type : REFRESH_CURRENT_FILM,
    //         currentFilm
    //         })

    //         export const RefreshCurrentFilmAC = (currentFilm) => ({
    //             type : REFRESH_CURRENT_FILM,
    //             currentFilm
    //             })
                        


export default reducerCurrentItem;