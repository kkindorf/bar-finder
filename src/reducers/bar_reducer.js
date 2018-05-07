import {
    FIND_BARS,
    HANDLE_USER_SUBMISSION,
    HANDLE_REVIEW_REQUEST,
    CLEAR_SEARCH_RESULTS
} from '../actions/types';

export default function(state = {businesses: [], loadingBars: true}, action) {
    switch(action.type) {
        case FIND_BARS: 
            return {...state, businesses: action.payload, loadingBars: false};
        case HANDLE_USER_SUBMISSION: 
            let updatedBars = state.businesses.map((bar, index) => {
                if(bar.alias !== action.payload.alias) {
                    return bar;
                }
                bar.numberGoing = action.payload.numberGoing;
                return bar;
            })
            return {...state, businesses: updatedBars};
        case HANDLE_REVIEW_REQUEST:
            let updatedBarsWithReviews = state.businesses.map((bar, index) => {
                if(bar.alias === action.payload['barAlias']) {
                    bar.review = action.payload['data'];
                    return bar;
                }
                else {
                    return bar;
                }
            })
            return {...state, businesses: updatedBarsWithReviews};
        case CLEAR_SEARCH_RESULTS:
            return {...state, businesses: []}
    }
    return state;
}