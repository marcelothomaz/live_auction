import { combineReducers } from 'redux'
import { USER_LOGGING_IN, AUTH_USER, AUTH_ERROR } from '../actions/types'

const initialState = {
   login: {
      name: '',
      logged: false,
      token: '',
      isLogging: false
   }
}

function login(state = initialState.login, action) {
   switch(action.type) {
      case USER_LOGGING_IN:
         return Object.assign({}, state, { isLogging: true })
      case AUTH_USER:
         return Object.assign({}, state, { name: action.data.name, token: action.data.token, logged: true })
      case AUTH_ERROR:
         return Object.assign({}, state, { errorMsg: action.text })
      default:
         return state
   }
}

const reducers = combineReducers({
   login
})

export default reducers
