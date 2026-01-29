<template>
  <v-container fluid class="pa-4">
    <!-- Page Header -->
    <v-row class="mb-4">
      <v-col cols="12">
        <div class="d-flex align-center">
          <div>
            <h1 class="text-h4 font-weight-bold">My Timetable</h1>
            <p class="text-grey">
              View your class schedule for {{ currentWeek }}
            </p>
          </div>
          <v-spacer />
          <v-btn
            color="primary"
            prepend-icon="mdi-refresh"
            @click="refreshTimetable"
            :loading="lessonStore.isLoading"
          >
            Refresh
          </v-btn>
        </div>
      </v-col>
    </v-row>
    
    <!-- Calendar View -->
    <v-card>
      <StudentCalendar />
    </v-card>
    
    <!-- Quick Stats -->
    <v-row class="mt-6">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-text class="text-center">
            <div class="text-h2 mb-2">{{ lessonStore.lessons.length }}</div>
            <div class="text-grey">Total Classes</div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card>
          <v-card-text class="text-center">
            <div class="text-h2 mb-2">{{ todayLessonsCount }}</div>
            <div class="text-grey">Today's Classes</div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card>
          <v-card-text class="text-center">
            <div class="text-h2 mb-2">{{ upcomingLessonsCount }}</div>
            <div class="text-grey">Upcoming This Week</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Today's Classes (Mobile) -->
    <v-card class="mt-6 d-md-none">
      <v-card-title>
        <v-icon start>mdi-calendar-today</v-icon>
        Today's Classes
      </v-card-title>
      <v-card-text>
        <v-list v-if="todayLessons.length > 0" lines="two">
          <v-list-item
            v-for="lesson in todayLessons"
            :key="lesson.id"
          >
            <template v-slot:prepend>
              <v-avatar :color="getLessonColor(lesson.lesson_type)" size="40">
                <span class="text-white">{{ formatTime(lesson.starting_time) }}</span>
              </v-avatar>
            </template>
            
            <v-list-item-title class="font-weight-medium">
              {{ lesson.course_code }}
            </v-list-item-title>
            
            <v-list-item-subtitle>
              {{ lesson.course_title }} • {{ lesson.room_details }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
        
        <v-alert v-else type="info" variant="tonal">
          No classes scheduled for today.
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useLessonStore } from '@/stores/lesson'
import StudentCalendar from '@/components/calendar/StudentCalendar.vue'

const lessonStore = useLessonStore()

const currentWeek = computed(() => {
  const now = new Date()
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
  const endOfWeek = new Date(now.setDate(now.getDate() + 6))
  return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`
})

const todayLessons = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return lessonStore.lessons
    .filter(lesson => lesson.date === today)
    .sort((a, b) => a.starting_time.localeCompare(b.starting_time))
})

const todayLessonsCount = computed(() => todayLessons.value.length)

const upcomingLessonsCount = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)
  const nextWeekStr = nextWeek.toISOString().split('T')[0]
  
  return lessonStore.lessons.filter(lesson => 
    lesson.date >= today && lesson.date <= nextWeekStr
  ).length
})

onMounted(async () => {
  await lessonStore.fetchLessons()
})

async function refreshTimetable() {
  await lessonStore.fetchLessons()
}

function getLessonColor(type: string): string {
  switch (type) {
    case 'LECTURE': return 'primary'
    case 'TUTORIAL': return 'green'
    case 'LAB': return 'orange'
    default: return 'grey'
  }
}

function formatTime(timeString: string): string {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>

<style scoped>
/* Custom styles */
</style>