import axios from 'axios'

// baseURL: process.env.REACT_APP_SERVER_URL,
// baseURL: import.meta.env.VITE_SERVER_URL,

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  // send/use cookies with request?
  // include user credentials (e.g., cookies, authorization headers, etc.) with cross-site requests.
})

// export const makeRequest = (url, options) => {
//   return axios(url, options)
//     .then((res) => res.data)
//     .catch((error) => Promise.reject(error?.response?.data?.message ?? 'Error'))
// }

export const makeRequest = async (url, options) => {
  try {
    const res = await api(url, options)
    return res.data
  } catch (error) {
    return await Promise.reject(error?.response?.data?.message ?? 'Error')
  }
}
