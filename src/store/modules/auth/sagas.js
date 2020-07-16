import {takeLatest, call, put, all} from 'redux-saga/effects'
import {toast} from 'react-toastify'
import {fakeApi} from 'services/api'
import history from 'services/history'

import {signInSuccess, signFailure} from './actions'

export function* signIn({payload}) {
  const {email, password} = payload

  try {
    const {
      data: {accessToken},
    } = yield call(fakeApi.post, '/login', {
      email,
      password,
    })

    fakeApi.defaults.headers.Authorization = `Bearer ${accessToken}`
    yield put(signInSuccess(accessToken))
    history.push('/dashboard')
  } catch (error) {
    return toast.error(error.response.data ?? 'Erro ao fazer login')
  }
}

export function* signUp({payload}) {
  try {
    const {name, email, password} = payload
    const response = yield call(fakeApi.post, '/register', {
      name,
      email,
      password,
    })

    if (response.status === 201)
      yield put(signInSuccess(response.data.accessToken))
    history.push('/dashboard')
  } catch (error) {
    toast.error('Erro ao fazer cadastro')
    yield put(signFailure())
  }
}

export function setToken({payload}) {
  if (!payload) return

  const {token} = payload.auth

  if (token) {
    fakeApi.defaults.headers.Authorization = `Bearer ${token}`
  }
}

export function signOut() {
  localStorage.removeItem('persist:dragon-dex')
  history.push('/')
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
])
