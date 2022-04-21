import {REFRESH_INPUT_TODO,ADD_DATA,LOAD_DATA} from "../variables"

const initialState = {
    result: [],
    inputSearch : "",
    isLoadLocalData:false,
    keyLocalStorage:"data__search"
}

const reducerSearch = (state = initialState , action ) => {
console.log(action)
    switch(action.type){

        case REFRESH_INPUT_TODO: {

            return {
                ...state,
                inputSearch : action.inputSearch
            }
        }

        case ADD_DATA:{

            let tempObject = {
                id:Date.now().toString(),
                search : action.inputSearch,
                result : action.result,
                time_search:Date.now().toString()
            }
            return {
                ...state,
                result :  [...state.result,tempObject],
                
            }


        }

        case LOAD_DATA:{
           return {
            ...state,
            result : action.result,
            isLoadLocalData : action.isLoadLocalData
           }

        }


        default: 
        return state;
    }
}

export const RefreshInput = (inputSearch) => ({
    type : REFRESH_INPUT_TODO,
    inputSearch
    })

export const AddDataSeachToListAC = (inputSearch,result)  =>({
type : ADD_DATA,
inputSearch,
result
})  

export const LoadDataFromLocalStorage = (result,isLoadLocalData)  =>({
    type : LOAD_DATA,
    result,
    isLoadLocalData
    })  
    
// export const checkedTodo = (id:string):Object  =>({
// type : COMPLETE_TODO_ITEM,
// id
// })

// export const removeTodoAC = (id:string) :Object =>({
// type : REMOVE_TODO_ITEM,
// id
// })

// export const AddTodoAC = (inputTodo:string) :Object =>({
// type : ADD_NEW_TODO_ITEM,
// inputTodo
// })


// export const RefreshInput = (inputTodo:string) :Object => ({
//     type : REFRESH_INPUT_TODO,
//     inputTodo
//     })

// export const LoadToDOAC = (local : Array<IToDo>) =>({
//     type : LOAD_TODO_ITEM,
//     local
// })

export default reducerSearch;