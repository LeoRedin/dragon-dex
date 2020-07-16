export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {email, password},
  }
}

export function signInSuccess(token, dragons) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {token, dragons},
  }
}

export function signUpRequest(name, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {name, email, password},
  }
}

export function signFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  }
}

export function logout() {
  return {
    type: '@auth/SIGN_OUT',
  }
}
