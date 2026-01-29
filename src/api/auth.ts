import apiClient from './client'

export interface LoginCredentials {
  username: string  // student_id
  password: string  // auto-generated password
}

export interface LoginResponse {
  token: string
  user_id: number
  username: string
  email: string
  user_type: 'STUDENT' | 'LECTURER' | 'ADMIN'
  user_type_display: string
  fullname: string
  student_id?: string
  lecturer_id?: string
}

export interface UserProfile {
  id: number
  username: string
  email: string
  user_type: 'STUDENT' | 'LECTURER' | 'ADMIN'
  user_type_display: string
  fullname: string
  user_id: string
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post('/token/', credentials)
    return response.data
  },

  async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get('/profiles/me/')
    return response.data
  },

  async logout(): Promise<void> {
    // Clear token on frontend only
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}