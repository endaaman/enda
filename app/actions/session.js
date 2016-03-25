import { Http } from '../lib/http'

export const CREATE_SESSION = 'CREATE_SESSION'
export const DELETE_SESSION = 'DELETE_SESSION'

export function login(payload) {
  return (dispatch)=> {
    return Http().post('/api/session', payload)
    .then(res => {
      localStorage.setItem('token', res.data.token)
      dispatch({
        type: CREATE_SESSION,
        user: res.data.user,
        token: res.data.token,
      })
    })
  }
}


export function check() {
  return (dispatch, getState)=> {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    const state = getState().session
    if (state.user) {
      return
    }
    return Http().get('/api/session', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      dispatch({
        type: CREATE_SESSION,
        user: res.data.user,
        token: token,
      })
    })
  }
}



export function logout() {
  const token = localStorage.removeItem('token')
  return {
    type: DELETE_SESSION,
  }
}
