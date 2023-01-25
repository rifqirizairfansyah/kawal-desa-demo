import Api from '@/services/Api'
import { authHeader } from '../helpers/auth-header'

export default {
  addMapBoundary (params) {
    return Api().post(`admin/map/boundary`, params, { headers: authHeader() })
  },
  getMapBoundary () {
    return Api().get(`admin/map/boundaries`, { headers: authHeader() })
  },
  deleteMapBoundary (id) {
    return Api().delete(`admin/map/boundaries/${id}/delete`, { headers: authHeader() })
  }
}
