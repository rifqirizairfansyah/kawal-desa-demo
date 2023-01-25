export const combobox = {
  namespaced: true,
  state: {
    type: undefined,
    selected: {
      additional: {
        role: undefined,
        report_type: undefined,
        total_attendance: false,
        date: undefined,
        page: 1
      }
    }
  },
  actions: {
    store_selected ({ commit }, message) {
      if (message.type === 'company') {
        commit('getCompanyState', message)
      } else if (message.type === 'partial-supervisor') {
        commit('getPartialState', message)
      } else {
        commit('getSupervisorState', message)
      }
    },
    clear_selected ({ commit }, message) {
      commit('clear')
    }
  },
  mutations: {
    getCompanyState (state, message) {
      state.type = message.type
      state.selected = {
        unit: message.data.unit,
        additional: {
          report_type: message.data.additional.report_type,
          total_attendance: false,
          ...(message.minified) && { minified: true },
          role: message.data.additional.role,
          date: message.data.additional.date,
          page: 1
        }
      }
    },
    getSupervisorState (state, message) {
      state.type = message.type
      state.selected = {
        area: message.data.area,
        district: message.data.district,
        unit: message.data.unit,
        company: message.data.company,
        additional: {
          ...(message.minified) && { minified: true },
          role: message.data.additional.role,
          date: message.data.additional.date,
          page: 1
        }
      }
    },
    getPartialState (state, message) {
      state.type = message.type
      state.selected = {
        unit: message.data.unit,
        company: message.data.company,
        additional: {
          ...(message.minified) && { minified: true },
          date: message.data.additional.date,
          page: 1
        }
      }
    },
    clear (state, message) {
      state.selected = {
        area: undefined,
        district: undefined,
        unit: undefined,
        company: undefined,
        additional: {
          role: undefined,
          date: undefined,
          page: 1
        }
      }
    }
  }
}
