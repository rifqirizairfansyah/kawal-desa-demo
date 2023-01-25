import Api from '@/services/Api'
import { authHeader } from '../helpers/auth-header'

export default {
  add (params) {
    return Api().post('admin/announcement', params, { headers: authHeader() })
  },
  get () {
    return Api().get('admin/announcement', { headers: authHeader() })
  },
  getById (id) {
    return Api().get(`admin/announcement/${id}`, { headers: authHeader() })
  },
  update (id, params) {
    return Api().put(`admin/announcement/${id}/update`, params, { headers: authHeader() })
  },
  delete (id) {
    return Api().delete(`admin/announcement/${id}/delete`, { headers: authHeader() })
  }
}
