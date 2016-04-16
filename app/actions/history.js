export const ADD_HISTORY = Symbol()

export function addHistory(href) {
  return {
    type: ADD_HISTORY,
    href: href
  }
}
