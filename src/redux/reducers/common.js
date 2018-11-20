import actions from "../actions/common";

const initialState = {
  phase: 0,
  currency: "jpy",
  trip_id: undefined
};

export default (state = initialState, action) => {
  if (action.type === actions.SET_PHASE) {
    return { ...state, phase: action.payload };
  } else if (action.type === actions.SET_CURRENCY) {
    return { ...state, currency: action.payload };
  } else if (action.type === actions.SET_TRIP_ID) {
    return { ...state, trip_id: action.payload };
  } else {
    return state;
  }
};
