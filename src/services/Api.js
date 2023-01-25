import axios from 'axios'
import router from '@/router'

const UNAUTHORIZED = 401
const INVALID_TOKEN = 'Invalid token'

const { NODE_ENV, VUE_APP_API, VUE_APP_API_DEV } = process.env
const instance = axios.create({
  baseURL: NODE_ENV === 'production' ? VUE_APP_API : VUE_APP_API_DEV
})

instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const { status } = error.response
  const responseMessage = error.response.data.message

  if (status === UNAUTHORIZED && responseMessage === INVALID_TOKEN) {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    router.push('/login')
  }
  return Promise.reject(error)
}
)

export default () => {
  return instance
}
