import {STORE_CHAPTERS} from '../actions/action';

const initialState = {
  chapters: [],
  additionalData: null,
  image: null,
};

const chaptersReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_CHAPTERS:
      const {chapters, image, id} = action.payload;
      return {
        ...state,
        chapters: chapters,
        image: image,
        animeID: id,
      };
    default:
      return state;
  }
};

export default chaptersReducer;
