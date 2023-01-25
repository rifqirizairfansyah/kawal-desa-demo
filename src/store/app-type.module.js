export const getApplicationType = {
  namespaced: true,
  state: {
    appType: 'kawal-desa'
  },
  actions: {
    async getApplicationType ({ dispatch, commit }) {
      commit('GetApplicationType')
    }
  },
  mutations: {
    GetApplicationType (state) {
      state.appType = state.appType
    }
  }
}
