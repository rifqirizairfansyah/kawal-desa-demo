import Api from '@/services/Api'
import { authHeader } from '../helpers/auth-header'
import querystring from 'querystring'

export default {
  createUser (params) {
    return Api().post(`admin/user/`, params, { headers: authHeader() })
  },
  getUsers (params) {
    return Api().get(`admin/user/?${querystring.stringify(params.additional)}`, { headers: authHeader() })
  },
  getUserById (id) {
    return Api().get(`admin/user/${id ? encodeURIComponent(id) : ''}/find`, { headers: authHeader() })
  },
  updateUser (id, params) {
    return Api().put(`admin/user/${id ? encodeURIComponent(id) : ''}/update`, params, { headers: authHeader() })
  },
  deleteUser (id) {
    return Api().delete(`admin/user/${id ? encodeURIComponent(id) : ''}/delete`, { headers: authHeader() })
  }
}
