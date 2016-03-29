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


export function failToFetchMemo(idOrTitle) {
  return {
    type: FAIL_TO_FETCH_MEMO,
    noMatched: idOrTitle,
  }
}


export function fetchMemo(idOrTitle) {
  return (dispatch)=> {
    dispatch(showLoader())
    return Http().get(`/api/memos/${idOrTitle}`)
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
      dispatch(failToFetchMemo(idOrTitle))
    })
  }
}

export function getMemo(idOrTitle) {
  return (dispatch, getState)=> {
    const state = getState().memo.detail
    console.log(state)
    const memo = findMemo(state.items, idOrTitle)
    const notMathed = state.noMatches.indexOf(idOrTitle) > -1

    if (memo || notMathed) {
      return Promise.resolve(memo)
    } else {
      return dispatch(fetchMemo(idOrTitle))
    }
  }
}
