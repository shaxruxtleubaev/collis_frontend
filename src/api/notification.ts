import apiClient from './index'

export interface Notification {
  id: number
  lesson: number | null
  lesson_details: string
  course_code: string
  course_title: string
  lesson_date: string
  lesson_time: string
  group_names: string
  message_type: 'ANNOUNCEMENT' | 'CANCELLATION' | 'RESCHEDULE'
  message_type_display: string
  message_text: string
  is_sent: boolean
  created_at: string
}

export interface NotificationFilters {
  page?: number
  ordering?: string
  message_type?: string
  is_sent?: boolean
}

export const notificationApi = {
  async getNotifications(filters: NotificationFilters = {}): Promise<{count: number, results: Notification[]}> {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value))
      }
    })
    
    const response = await apiClient.get(`/notifications/?${params.toString()}`)
    return response.data
  },

  async getUnreadNotifications(): Promise<Notification[]> {
    const response = await this.getNotifications({ is_sent: false, ordering: '-created_at' })
    return response.results
  },

  async markAsRead(id: number): Promise<void> {
    // If API supports marking as read, implement here
    // For now, we'll just filter client-side
    console.log(`Marking notification ${id} as read`)
  }
}