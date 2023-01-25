import UnitService from '@/services/UnitService'

export const unit = {
  namespaced: true,
  state: {
    response: undefined
  },
  actions: {
    async getUnits ({ dispatch, commit }, selected) {
      let response = await UnitService.getUnits(selected)
      commit('success', response)
      return response
    }
  },
  mutations: {
    success (state, selected) {
      state.response = selected.data.data
    }
  }
}
