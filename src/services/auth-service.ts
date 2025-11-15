import { useAuthStore } from '../storage/auth'
import type { LoginData, User, LoginResponse } from '../types/authTypes'
import { Api } from './api'

export class AuthService {
  private api = Api.getInstance()

  async login(data: LoginData): Promise<LoginResponse> {
    const response = await this.api.post<LoginResponse>('/api/login', data)
    return response.data
  }

  // async register(data: RegisterData): Promise<void> {
  //   await this.api.post('/register', data)
  // }

  async logout(): Promise<void> {
    await this.api.post('/api/logout')
  }

  async getUser(): Promise<User> {
    const { data } = await this.api.get<User>('/api/user')
    return data
  }
}

// Exporta uma instância única (padrão singleton)
export const authService = new AuthService()
