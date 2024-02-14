import {STORE_EPISODES} from '../actions/action';

const initialState = {
  episodes: [],
};

const episodesReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_EPISODES:
      return {
        ...state,
        episodes: action.payload,
      };
    default:
      return state;
  }
};

export default episodesReducer;
