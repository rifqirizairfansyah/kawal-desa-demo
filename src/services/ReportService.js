import Api from '@/services/Api'
import { authHeader } from '../helpers/auth-header'
import querystring from 'querystring'

export default {
  getReports (params, type) {
    if (type === 'company') {
      return Api().get(`admin/report/company/${params.unit ? encodeURIComponent(params.unit) : ''}?${querystring.stringify(params.additional)}`, { headers: authHeader() })
    } else if (type === 'partial-supervisor') {
      return Api().get(`admin/report/supervisor/${params.company ? params.company + '/' : ''}${params.unit ? encodeURIComponent(params.unit) : ''}?${querystring.stringify(params.additional)}`, { headers: authHeader() })
    } else {
      return Api().get(`admin/report/hierarchical/${params.area ? params.area + '/' : ''}${params.district ? params.district + '/' : ''}${params.company ? params.company + '/' : ''}${encodeURIComponent(params.unit || '')}?${querystring.stringify(params.additional)}`, { headers: authHeader() })
    }
  },
  fetchDetailReport (id) {
    return Api().get('admin/report/by-id/' + id, { headers: authHeader() })
  },
  reportExcel (params, type) {
    if (type === 'company') {
      return Api().get(`admin/report/export/company/${encodeURIComponent(params.unit)}/?${querystring.stringify(params.additional)}`, { headers: authHeader() })
    } else if (type === 'partial-supervisor') {
      return Api().get(`admin/report/export/${params.company}/${encodeURIComponent(params.unit)}?${querystring.stringify(params.additional)}`, { headers: authHeader() })
    } else {
      return Api().get(`admin/report/export/hierarchical/${params.area}/${params.district}/${params.company}/${encodeURIComponent(params.unit)}?${querystring.stringify(params.additional)}`, { headers: authHeader() })
    }
  },
  reportTypes (params) {
    return Api().get(`admin/report-types/?${querystring.stringify(params)}`, { headers: authHeader() })
  },
  getReportWeekly (params) {
    return Api().get(`admin/exported-report/${params.unit ? encodeURIComponent(params.unit) : ''}?${querystring.stringify(params.additional)}`, { headers: authHeader() })
  },
  getReportWeeklyByUnit (params, unit) {
    return Api().get(`admin/exported-report/${unit}?${querystring.stringify(params.additional)}`, { headers: authHeader() })
  }
}
