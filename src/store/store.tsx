import {configureStore} from '@reduxjs/toolkit';
import notificationReducer from '../reducers/notificationReducer';
import episodesReducer from '../reducers/episodeReducer';
import modeReducer from '../reducers/toggleReducer';
import chaptersReducer from '../reducers/chapterRedecer';
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    episodes: episodesReducer,
    chapters: chaptersReducer,
    mode: modeReducer,
  },
});

export default store;
