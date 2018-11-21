import actions from "../actions/common";

let parsed = undefined;

if (window.localStorage && typeof window.localStorage.getItem === "function") {
  const serializedData = window.localStorage.getItem("_exilee_entire_data");

  try {
    parsed = JSON.parse(serializedData);
  } catch (e) {}
}

const initialState = {
  phase: 0,
  currency: undefined,
  trip_id: undefined
};

export default (state = (parsed && parsed.common) || initialState, action) => {
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
