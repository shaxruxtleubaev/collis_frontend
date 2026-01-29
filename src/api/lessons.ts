import apiClient from './client'

export interface Lesson {
  id: number
  course: number
  course_code: string
  course_title: string
  lecturer: string
  lecturer_name: string
  groups: number[]
  group_names: string
  room: number
  room_details: string
  lesson_type: 'LECTURE' | 'TUTORIAL' | 'LAB'
  date: string
  starting_time: string
  ending_time: string
  duration: string
  created_at: string
  updated_at: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export const lessonApi = {
  async getLessons(): Promise<Lesson[]> {
    console.log('API: Fetching lessons...')
    
    try {
      const response = await apiClient.get<PaginatedResponse<Lesson>>('/lessons/')
      console.log('API: Received', response.data.results.length, 'lessons')
      console.log('API: Lessons data:', response.data.results)
      return response.data.results
    } catch (error) {
      console.error('API: Error fetching lessons:', error)
      throw error
    }
  },

  async getTodayLessons(): Promise<Lesson[]> {
    const today = new Date().toISOString().split('T')[0]
    console.log('API: Fetching today\'s lessons for', today)
    
    try {
      const response = await apiClient.get<PaginatedResponse<Lesson>>('/lessons/', {
        params: { date: today, ordering: 'starting_time' }
      })
      return response.data.results
    } catch (error) {
      console.error('API: Error fetching today lessons:', error)
      return []
    }
  },

  async getUpcomingLessons(days: number = 7): Promise<Lesson[]> {
    const today = new Date().toISOString().split('T')[0]
    console.log('API: Fetching upcoming lessons')
    
    try {
      const response = await apiClient.get<PaginatedResponse<Lesson>>('/lessons/', {
        params: { ordering: 'date,starting_time' }
      })
      
      // Filter client-side for upcoming lessons
      const upcoming = response.data.results.filter(lesson => 
        lesson.date >= today
      ).slice(0, 20) // Limit to 20 upcoming lessons
      
      console.log('API: Found', upcoming.length, 'upcoming lessons')
      return upcoming
    } catch (error) {
      console.error('API: Error fetching upcoming lessons:', error)
      return []
    }
  }
}