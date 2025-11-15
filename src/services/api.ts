import axios, { type AxiosInstance } from 'axios'

export class Api {
  private static instance: AxiosInstance

  static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })

      this.instance.interceptors.request.use(config => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      })
    }

    return this.instance
  }
}
