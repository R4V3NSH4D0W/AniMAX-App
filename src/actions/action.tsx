export const UPDATE_NOTIFICATION_COUNT = 'UPDATE_NOTIFICATION_COUNT';

export const updateNotificationCount = count => ({
  type: UPDATE_NOTIFICATION_COUNT,
  payload: count,
});

export const STORE_EPISODES = 'STORE_EPISODES';

export const storeEpisodes = (episodes, image) => ({
  type: STORE_EPISODES,
  payload: {
    episodes: episodes,
    image: image,
  },
});
