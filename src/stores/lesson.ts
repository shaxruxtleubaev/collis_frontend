import { defineStore } from 'pinia'
import { ref } from 'vue'
import { lessonApi, type Lesson } from '@/api/lessons'

export const useLessonStore = defineStore('lesson', () => {
  const lessons = ref<Lesson[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  function loadFromStorage() {
    const storedLessons = localStorage.getItem('lessons')
    if (storedLessons) {
      try {
        lessons.value = JSON.parse(storedLessons)
        console.log('Lesson Store: Loaded', lessons.value.length, 'lessons from storage')
      } catch {
        localStorage.removeItem('lessons')
      }
    }
  }

  function saveToStorage() {
    localStorage.setItem('lessons', JSON.stringify(lessons.value))
  }

  async function fetchLessons() {
    isLoading.value = true
    error.value = null
    
    try {
      console.log('Lesson Store: Fetching lessons...')
      lessons.value = await lessonApi.getLessons()
      saveToStorage()
      console.log('Lesson Store: Successfully loaded', lessons.value.length, 'lessons')
      return lessons.value
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to load timetable'
      error.value = errorMsg
      console.error('Lesson Store: Error -', errorMsg)
      console.error('Lesson Store: Full error:', err)
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

  // Load from storage on store creation
  loadFromStorage()

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