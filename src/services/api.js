import axios from 'axios'

export const fakeApi = axios.create({
  baseURL: 'http://localhost:3001',
})

export const api = axios.create({
  baseURL: 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon',
})

export async function fetchAll() {
  try {
    const {data} = await api.get('/')
    return {success: true, dragons: data}
  } catch (err) {
    return {success: false, err}
  }
}
