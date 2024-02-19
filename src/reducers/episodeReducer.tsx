import {STORE_EPISODES} from '../actions/action';

const initialState = {
  episodes: [],
  additionalData: null,
  image: null,
};

const episodesReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_EPISODES:
      const {episodes, image, id} = action.payload;
      return {
        ...state,
        episodes: episodes,
        image: image,
        animeID: id,
      };
    default:
      return state;
  }
};

export default episodesReducer;
