import Api from '@/services/Api'

export default {
  login (params) {
    return Api().post('admin/login', params)
  },
  registration (params) {
    return Api().post('admin/registration', params)
  }
}
