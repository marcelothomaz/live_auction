import { USER_LOGGING_IN,
         AUTH_USER,
         AUTH_ERROR,
         USER_REG,
         USER_REG_LOADING,
         USER_REG_ERROR } from './types'
import axios from 'axios'

export function loginUser({ email, password }) {
   return async function(dispatch) {

      dispatch({ type: USER_LOGGING_IN })

      const res = await axios({
         method: 'POST',
         url: '/login',
         headers: {
            'Content-type':'application/json',
            'Accept':'application/json'
         },
         data: {email,password},
         responseType: 'json',
      })

      const data = res.data

      if (data.ok) {
         dispatch({ type: AUTH_USER, data:data })
         // show modal and redirect?
      } else {
         dispatch({ type: AUTH_ERROR, text: data.msg })
      }
   }
}

export function registerUser({ name, email, password }) {
   return async function(dispatch) {
      dispatch({ type: USER_REG_LOADING })
      const res = await axios({
         method: 'POST',
         url:'/api/users',
         headers: {
            'Content-type':'application/json',
            'Accept':'application/json'
         },
         data: {name, email, password},
         responseType: 'json'
      })

      const data = res.data

      if (data.ok) {
         dispatch({ type: USER_REG, text: data.msg })
      } else {
         dispatch({ type: USER_REG_ERROR, text: data.msg })
      }
   }
}

export function logoutUser() {
   return async function (dispatch) {
      dispatch({ type: UNAUTH_USER })
   }
}

/*export function getProtected(uri) {
   return async function (dispatch, getState) {
      dispatch({ type: DATA_GET_LOAD })
      const res = await axios.get(uri,{
         headers: {
            'Authorization': '' + getState().token
         },
      })

      const data = await res.json()

      if (data.ok) {
         dispatch({ type: DATA_GET_OK, data.content })
      } else {
         dispatch({ type: DATA_GET_ERROR, data.msg })
      }
   }
}*/
