export interface LoginData {
  email: string
  password: string
}

// export interface RegisterData {
//   name: string
//   email: string
//   password: string
//   password_confirmation: string
// }

export interface User {
  id: number
  name: string
  email: string
  created_at?: string
  updated_at?: string
  avatar: string
}

export interface LoginResponse {
    response_code: number,
    status: string,
    message: string,
    user_info: [
        id: number,
        name: string,
        email: string,
    ],
    token: string,
    token_type: string,
}
