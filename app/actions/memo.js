import Http from '../lib/http'
import { showLoader, hideLoader } from './loader'
import { findMemo } from '../util'

export const RECIEVE_MEMOLIST = Symbol()

export const START_FETCHING_MEMO = Symbol()
export const RECIEVE_MEMO = Symbol()
export const FAIL_TO_FETCH_MEMO = Symbol()



export function fetchMemos() {
  return (dispatch)=> {
    dispatch(showLoader())
    return Http().get('/api/memos')
    .then(res => {
      dispatch(hideLoader())
      dispatch({
        type: RECIEVE_MEMOLIST,
        items: res.data,
      })
      return res.data
    }, error => {
      dispatch(hideLoader())
    })
  }
}

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


export function failToFetchMemo(path) {
  return {
    type: FAIL_TO_FETCH_MEMO,
    noMatched: path,
  }
}


export function fetchMemo(path) {
  return (dispatch)=> {
    dispatch(showLoader())
    return Http().get(`/api/memos/${path}`)
    .then(res => {
      const memo = res.data
      dispatch(hideLoader())
      dispatch({
        type: RECIEVE_MEMO,
        item: memo,
      })
      return memo
    }, error => {
      dispatch(hideLoader())
      dispatch(failToFetchMemo(path))
    })
  }
}

export function getMemo(path) {
  return (dispatch, getState)=> {
    const state = getState().memo.detail
    const memo = findMemo(state.items, path)
    const notMathed = state.noMatches.indexOf(path) > -1

    if (memo || notMathed) {
      return Promise.resolve(memo)
    } else {
      return dispatch(fetchMemo(path))
    }
  }
}
