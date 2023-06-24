import { authRequest } from "../api/req"
export const state = () => ({
  loggedIn: localStorage.loggedIn === 'false' ? false : true,
})

export const mutations = {
  setLoggedIn(state, loggedIn) {
    state.loggedIn = loggedIn
    localStorage.loggedIn = loggedIn;
  },
}
export const actions = {
  async login({ state }, cred) {
    let res = await authRequest(process.env.loginPath, { name: cred.name, email: cred.email })
    let ok = !res.error;
    if (!ok) return ok;
    this.commit('auth/setLoggedIn', true)
    window.$nuxt.$router.replace('/')
    return ok;
  },

  async logout({ state }) {
    await authRequest(process.env.logoutPath)
    this.commit('auth/setLoggedIn', false)
    window.$nuxt.$router.replace('/')
  }
}
