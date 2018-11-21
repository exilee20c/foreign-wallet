import actions from "../actions/jpy_trip";

let parsed = undefined;

if (window.localStorage && typeof window.localStorage.getItem === "function") {
  const serializedData = window.localStorage.getItem("_exilee_entire_data");

  try {
    parsed = JSON.parse(serializedData);
  } catch (e) {}
}

const initialUnits = {
  jpy_confirmed: false,
  jpy_title: "",
  jpy_1: 0,
  jpy_5: 0,
  jpy_10: 0,
  jpy_50: 0,
  jpy_100: 0,
  jpy_500: 0,
  jpy_1000: 0,
  jpy_2000: 0,
  jpy_5000: 0,
  jpy_10000: 0
};

export default (state = (parsed && parsed.jpy_trip) || {}, action) => {
  if (action.type === actions.INIT_TRIP) {
    return {
      ...state,
      [action.payload]: initialUnits
    };
  } else if (action.type === actions.SET_UNIT) {
    return {
      ...state,
      [action.payload.trip_id]: {
        ...state[action.payload.trip_id],
        [`jpy_${action.payload.key}`]: action.payload.value
      }
    };
  } else if (action.type === actions.SET_TITLE) {
    return {
      ...state,
      [action.payload.trip_id]: {
        ...state[action.payload.trip_id],
        jpy_title: action.payload.title
      }
    };
  } else if (action.type === actions.CONFIRM) {
    return {
      ...state,
      [action.payload.trip_id]: {
        ...state[action.payload.trip_id],
        jpy_confirmed: true
      }
    };
  } else {
    return state;
  }
};
