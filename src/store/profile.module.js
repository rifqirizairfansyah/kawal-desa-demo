import CompanyService from '@/services/CompanyService'

export const profile = {
  namespaced: true,
  state: {
    name: null
  },
  actions: {
    async getProfileName ({ dispatch, commit }) {
      let response = await CompanyService.getCompanyProfile()
      commit('getName', response)
      return response
    },
    clearProfile ({commit}) {
      commit('clearProfile')
    }
  },
  mutations: {
    getName (state, selected) {
      state.name = selected.data.data.NAME
    },
    clearProfile (state, selected) {
      state.name = null
    }
  }
}
