import Api from '@/services/Api'
import { authHeader } from '../helpers/auth-header'
import querystring from 'querystring'

export default {
  getPartialCompanies (params) {
    return Api().get(`admin/companies/${params.area ? params.area + '/' : ''}${params.district ? params.district + '/' : ''}`, { headers: authHeader() })
  },
  updateCompanyProfile (params) {
    return Api().put(`admin/company/profile/update`, params, { headers: authHeader() })
  },
  getCompanyProfile () {
    return Api().get(`admin/company/profile`, { headers: authHeader() })
  },
  createCompanyProfile (params) {
    return Api().post(`companies/profile/create`, params)
  },
  getCompanies () {
    return Api().get(`companies/general`)
  },
  getRegisteredCompany (params) {
    return Api().get(`companies/?${querystring.stringify(params.additional)}`)
  },
  getCompanyPeople (params) {
    return Api().get(`company/${params.company}/people`)
  },
  getCompanyProfileByGuid (params) {
    return Api().get(`company/${params.company}/profile`)
  },
  getCompanyByCompanyGuid (companyGuid) {
    return Api().get(`companies/${companyGuid}`)
  }
}
