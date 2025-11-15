import { defineStore } from 'pinia'

interface User {
  id?: number
  name?: string
  email?: string
  // adicione mais campos conforme sua API
}

interface AuthState {
  token: string | null
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token,
    getUser: (state): User | null => state.user,
  },

  actions: {
    login(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    setUser(user: User) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
  },
})
