import actions from '../actions/jpy';

const initialState = {
  jpy100: 20,
  jpy500: 10,
  jpy1000: 10,
  jpy2000: 4,
  jpy5000: 1,
};

export default (state = initialState, action) => {
  
  if ( action.type === actions.ADD_UNIT ) {
    return Object.assign({}, state, {[`jpy${action.payload}`]: 0});
  }

  else if ( action.type === actions.SET_UNIT ) {
    return Object.assign({}, state, {[`jpy${action.payload.key}`] : action.payload.value});
  }

  else if ( action.type === actions.REMOVE_UNIT ) {
    let result = Object.assign({}, state);
    delete result[`jpy${action.payload}`];

    return result;
  }

  else {
    return state;
  }
};