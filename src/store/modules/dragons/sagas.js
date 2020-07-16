import {takeLatest, call, put, all} from 'redux-saga/effects'
import {toast} from 'react-toastify'
import {api} from 'services/api'
import history from 'services/history'

import {setDragons, dragonError} from 'store/modules/dragons/actions'

export function* loadDragons() {
  try {
    const {data: dragons} = yield call(api.get, '/')

    const alphabetical = dragons.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
      return 0
    })

    yield put(setDragons(alphabetical))
  } catch (error) {
    return toast.error(error.response.data ?? 'Erro ao carregar dragões')
  }
}

export function* updateDragon({payload}) {
  try {
    const {id, name, type} = payload
    yield call(api.put, `/${id}`, {name, type})

    yield call(loadDragons)

    toast.success('Dragão atualizado')
  } catch (error) {
    yield put(dragonError())
    toast.error('Erro ao atualizar o dragão')
  }
}

export function* deleteDragon({payload}) {
  try {
    const {id} = payload

    yield call(api.delete, `/${id}`)

    yield call(loadDragons)

    toast.success('Dragão excluído. Voltando para dashboard')
    history.push('/dashboard')
    window.location.reload()
  } catch (error) {
    yield put(dragonError())
    toast.error('Eddo ao deletar dragão')
  }
}

export function* createDragon({payload}) {
  try {
    const {name, type} = payload

    yield call(api.post, '/', {name, type})

    yield call(loadDragons)

    toast.success('Dragão criado!')
  } catch (error) {
    toast.error('Erro ao criar dragão')
    yield call(dragonError())
  }
}

export default all([
  takeLatest('@dragons/LOAD_ALL', loadDragons),
  takeLatest('@dragons/UPDATE', updateDragon),
  takeLatest('@dragons/DELETE', deleteDragon),
  takeLatest('@dragons/ADD', createDragon),
])
