import {TOGGLE_MODE} from '../actions/action';
const initialState = {
  mode: 'Anime',
};

const modeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODE:
      return {
        ...state,
        mode: state.mode === 'Anime' ? 'Manga' : 'Anime', // Toggle between Anime and Manga modes
      };
    default:
      return state;
  }
};

export default modeReducer;
