import produce from 'immer'

const INITIAL_STATE = {
  list: [],
  loading: false,
}

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@dragons/SET_ALL': {
        draft.list = action.payload.dragons
        draft.loading = false
        break
      }
      case '@dragons/ADD': {
        draft.loading = true
        break
      }
      case '@dragons/UPDATE': {
        draft.loading = true
        break
      }
      case '@dragons/DELETE': {
        draft.loading = true
        break
      }
      case '@dragons/SUCCESS': {
        draft.loading = false
        break
      }
      case '@dragons/ERROR': {
        draft.loading = false
        break
      }
      default:
        return INITIAL_STATE
    }
  })
}
