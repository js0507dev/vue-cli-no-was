import * as types from './types'

export const issueAccessToken = ({commit}, payload) => {
  commit(types.ISSUE_ACCESS_TOKEN, payload)
}
export const readAccessToken = ({commit}, name) => {
  return commit(types.READ_ACCESS_TOKEN, name)
}
export const writeCookie = ({commit}, payload) => {
  commit(types.WRITE_COOKIE, payload)
}
