import { router } from '../router'

const localToken = localStorage.getItem('token')
const localRole = localStorage.getItem('role')

const token = localToken || null
const role = localRole || null

const initialState = token
  ? { status: { loggedIn: true }, token, role }
  : { status: { loggedIn: false }, token: null, role: role }

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login ({ commit }, auth) {
      localStorage.setItem('token', auth.localToken)
      localStorage.setItem('role', auth.localRole)
      commit('loginSuccess', auth)
      router.push('/')
    },
    failed ({ commit, dispatch }, error) {
      dispatch('error', error, { root: true })
      commit('loginFailure')
    },
    logout ({ commit, dispatch }) {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      dispatch('profile/clearProfile', '', {root: true})
      commit('logout')
      router.push('/login')
    }
  },
  mutations: {
    loginSuccess (state, auth) {
      state.status = { loggedIn: true }
      state.token = auth.localToken
      state.role = auth.localRole
    },
    loginFailure (state) {
      state.status = { loggedIn: false }
      state.token = null
      state.role = null
    },
    logout (state) {
      state.status = { loggedIn: false }
      state.token = null
      state.role = null
    }
  }
}
