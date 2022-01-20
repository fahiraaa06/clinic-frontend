import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    profile: {},
    isLoading: false,
    isLogin: false,
    isAdmin: false,
    role: null,
    access_token: null,
    refresh_token: null,
    company: {},
    categories: [],
    mediaSocial: [],
    serverError: false,
    errorMessage: 'Internal server error',
  },
  mutations: {
    setAdmin (state, data) {
      state.isAdmin = data
    },
    setRole (state, data) {
      state.role = data
    },
    setProfile (state, data) {
      state.profile = data
    },
    setServerError (state, data) {
      state.serverError = data.isError
      state.errorMessage = data.message
    },
    setLogin (state, data) {
      state.isLogin = data
    },
    setLoading (state, data) {
      state.isLoading = data
    },
    setAccessToken (state, data) {
      state.access_token = data
    },
    setRefreshToken (state, data) {
      state.refresh_token = data
    },
    setCompany (state, data) {
      state.company = data
    },
    setCategories (state, data) {
      state.categories = data
    },
    setMediaSocial (state, data) {
      state.mediaSocial = data
    }
  },
  actions: {
    role (context, data) {
      context.commit('setRole', data)
    },
    admin (context, data) {
      context.commit('setAdmin', data)
    },
    profile (context, data) {
      context.commit('setProfile', data)
    },
    warning (context, data) {
      context.commit('setServerError', data)
    },
    login (context, data) {
      context.commit('setLogin', data)
    },
    loading (context, data) {
      context.commit('setLoading', data)
    },
    accessToken (context, data) {
      context.commit('setAccessToken', data)
    },
    refreshToken (context, data) {
      context.commit('setRefreshToken', data)
    },
    company (context, data) {
      context.commit('setCompany', data)
    },
    categories (context, data) {
      context.commit('setCategories', data)
    },
    mediaSocial (context, data) {
      context.commit('setMediaSocial', data)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
