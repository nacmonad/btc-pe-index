import { UPDATE_DATA, UPDATE_PARAMS } from './actions'

const initialState = {
  bang:false,
  params:{
    items:100,
    currency:'USD'
  },
  data: {
    marketcap:[],
  }
}

export default function main(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch(action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        data:{
          marketcap:action.payload
        }
      }
    case UPDATE_PARAMS:
      const newState = Object.assign({}, state)
      newState.params[action.payload.name.toLowerCase()] = action.payload.value;
      return newState
    default:
      return state
  }

}
