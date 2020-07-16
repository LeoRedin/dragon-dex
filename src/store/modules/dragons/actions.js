export function setDragonsRequest() {
  return {
    type: '@dragons/LOAD_ALL',
  }
}

export function setDragons(dragons) {
  return {
    type: '@dragons/SET_ALL',
    payload: {dragons},
  }
}

export function addDragon(name, type) {
  return {
    type: '@dragons/ADD',
    payload: {name, type},
  }
}

export function updateDragon(id, name, type) {
  return {
    type: '@dragons/UPDATE',
    payload: {id, name, type},
  }
}

export function deleteDragon(id) {
  return {
    type: '@dragons/DELETE',
    payload: {id},
  }
}

export function dragonSuccess() {
  return {
    type: '@dragons/SUCCESS',
  }
}
export function dragonError() {
  return {
    type: '@dragons/ERROR',
  }
}
