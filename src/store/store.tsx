import {configureStore} from '@reduxjs/toolkit';
import notificationReducer from '../reducers/notificationReducer';
import episodesReducer from '../reducers/episodeReducer';
import modeReducer from '../reducers/toggleReducer';
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    episodes: episodesReducer,
    mode: modeReducer,
  },
});

export default store;
