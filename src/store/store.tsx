import {configureStore} from '@reduxjs/toolkit';
import notificationReducer from '../reducers/notificationReducer';
import episodesReducer from '../reducers/episodeReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    episodes: episodesReducer,
  },
});

export default store;
