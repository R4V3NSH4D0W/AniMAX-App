import {
  RESET_NOTIFICATION_COUNT,
  UPDATE_NOTIFICATION_COUNT,
} from '../actions/action';

const initialState = {
  notificationCount: 0,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NOTIFICATION_COUNT:
      return {
        ...state,
        notificationCount: action.payload,
      };
    case RESET_NOTIFICATION_COUNT:
      return {
        ...state,
        notificationCount: 0,
      };
    default:
      return state;
  }
};

export default notificationReducer;
