import Api from '@/services/Api'
import { authHeader } from '../helpers/auth-header'

export default {
  getArea () {
    return Api().get(`admin/areas`, { headers: authHeader() })
  },
  getAreaByUsers (type) {
    return Api().get(`users/areas/${type}`)
  },
  getCompanies (params) {
    return Api().get(`admin/companies/${params.area ? params.area + '/' : ''}${params.district ? params.district + '/' : ''}`, { headers: authHeader() })
  }
}
