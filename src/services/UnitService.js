import Api from '@/services/Api'
import { authHeader } from '../helpers/auth-header'

export default {
  getUnits (params) {
    return Api().get(`admin/units/${params.company ? params.company + '/' : ''}`, { headers: authHeader() })
  },
  getCompanyCode (guid) {
    return Api().get(`unit/getCompanyCode/${guid}`)
  }
}
