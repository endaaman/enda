import { Http } from '../lib/http'

export const RECIEVE_MEMOLIST = 'RECIEVE_MEMOLIST'
export const RECIEVE_MEMO = 'RECIEVE_MEMO'



export function getMemos() {
  return (dispatch, getState)=> {
    let state = getState().memo.list
    if (state.items.length > 0) {
      return Promise.resolve(state)
    } else {
      return dispatch(fetchMemos())
    }
  }
}


export function fetchMemos() {
  return (dispatch)=> {
    return Http().get('/api/memos')
    .then(res => {
      dispatch({
        type: RECIEVE_MEMOLIST,
        items: res.data,
      })
    })
  }
}


export function getMemo(id) {
  return (dispatch, getState)=> {
    let state = getState().memo.detail
    if (state.items[id]) {
      return Promise.resolve(state)
    } else {
      return dispatch(fetchMemo(id))
    }
  }
}


export function fetchMemo(id) {
  return (dispatch)=> {
    return Http().get(`/api/memos/${id}`)
    .then(res => {
      dispatch({
        type: RECIEVE_MEMO,
        item: res.data,
        isFetched: true,
      })
    })
  }
}
