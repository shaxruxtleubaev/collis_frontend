import { defineStore } from 'pinia'
import { ref } from 'vue'
import { lessonApi, type Lesson } from '@/api/lessons'

export const useLessonStore = defineStore('lesson', () => {
  const lessons = ref<Lesson[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchLessons() {
    isLoading.value = true
    error.value = null
    
    try {
      lessons.value = await lessonApi.getLessons()
      return lessons.value
    } catch (err: any) {
      error.value = err.message || 'Failed to load timetable'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchTodayLessons() {
    try {
      return await lessonApi.getTodayLessons()
    } catch (err) {
      console.error('Failed to fetch today lessons:', err)
      return []
    }
  }

  // Format time for display
  function formatTime(timeString: string): string {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  // Get lessons for a specific date
  function getLessonsForDate(date: string): Lesson[] {
    return lessons.value.filter(lesson => lesson.date === date)
      .sort((a, b) => a.starting_time.localeCompare(b.starting_time))
  }

  return {
    lessons,
    isLoading,
    error,
    fetchLessons,
    fetchTodayLessons,
    formatTime,
    getLessonsForDate
  }
})