import {
    SET_NEW_SCORE,
    GET_SCORE
} from "../actions/types";

const initialState = {
    highscore: {}
};
  
export default function(state = initialState, action) {
    switch (action.type) {
    case SET_NEW_SCORE:
        return {
            ...state,
            highscore: action.payload
        };
    case GET_SCORE:
        return {
            ...state,
            highscore: action.payload
        };
    default:
        return state;
    }
}