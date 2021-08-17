import initialState from '../initialState';

function documentReducer(state = initialState.document, action){
    // console.log(action,state)
    switch(action.type){
        case "SET_SKIN":
           return  action.payload;
        case "UPDATE_SKIN":
            return {
                ...state,
                skinCode: action.payload
            }
        default:
             return state;  
    }
}

export default documentReducer;