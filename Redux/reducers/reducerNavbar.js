import {GET_DATA_FILMS_NAV} from "../variables"

const initialState = {
    filmsNav : []
}

const reducerNavbar = (state = initialState , action ) => {

    switch(action.type){

        case GET_DATA_FILMS_NAV: {

            return {
                ...state,
                filmsNav : action.filmsNav
            }
        }

       

        default: 
        return state;
    }
}



export const GetDataFilmsNavAC = (filmsNav) => ({
    type : GET_DATA_FILMS_NAV,
    filmsNav
    })


export default reducerNavbar;