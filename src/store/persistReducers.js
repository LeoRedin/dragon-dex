import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'dragon-dex',
      storage,
      whitelist: ['auth', 'dragons'],
    },
    reducers,
  )

  return persistedReducer
}
