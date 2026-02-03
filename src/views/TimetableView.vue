<template>
  <div class="timetable-view">
    <v-container fluid>
      <!-- Header -->
      <div class="header-section mb-8">
        <div class="d-flex align-center justify-space-between flex-wrap gap-4">
          <div>
            <h1 class="text-h3 font-weight-700 mb-2">My Timetable</h1>
            <p class="text-secondary">
              <v-icon size="18" class="mr-2">mdi-calendar-range</v-icon>
              {{ currentWeek }}
            </p>
          </div>
          <v-btn
            color="primary"
            prepend-icon="mdi-refresh"
            @click="refreshTimetable"
            :loading="lessonStore.isLoading"
            size="large"
          >
            Refresh Schedule
          </v-btn>
        </div>
      </div>

      <!-- Stats Cards -->
      <v-row :gutter="6" class="mb-8">
        <v-col cols="12" sm="6" lg="3">
          <v-card class="stat-card" flat>
            <div class="stat-content">
              <div class="stat-icon-box primary">
                <v-icon size="32">mdi-book-open</v-icon>
              </div>
              <div>
                <div class="stat-value">{{ lessonStore.lessons.length }}</div>
                <div class="stat-label">Total Classes</div>
              </div>
            </div>
            <div class="stat-bar"></div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" lg="3">
          <v-card class="stat-card" flat>
            <div class="stat-content">
              <div class="stat-icon-box success">
                <v-icon size="32">mdi-calendar-today</v-icon>
              </div>
              <div>
                <div class="stat-value">{{ todayLessonsCount }}</div>
                <div class="stat-label">Today's Classes</div>
              </div>
            </div>
            <div class="stat-bar success"></div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" lg="3">
          <v-card class="stat-card" flat>
            <div class="stat-content">
              <div class="stat-icon-box warning">
                <v-icon size="32">mdi-clock-outline</v-icon>
              </div>
              <div>
                <div class="stat-value">{{ upcomingLessonsCount }}</div>
                <div class="stat-label">This Week</div>
              </div>
            </div>
            <div class="stat-bar warning"></div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" lg="3">
          <v-card class="stat-card" flat>
            <div class="stat-content">
              <div class="stat-icon-box info">
                <v-icon size="32">mdi-bell-outline</v-icon>
              </div>
              <div>
                <div class="stat-value">0</div>
                <div class="stat-label">Notifications</div>
              </div>
            </div>
            <div class="stat-bar info"></div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Calendar -->
      <v-card class="calendar-card" flat>
        <v-card-title class="px-8 pt-6">
          <v-icon start>mdi-calendar-month</v-icon>
          Class Schedule
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-8">
          <StudentCalendar />
        </v-card-text>
      </v-card>

      <!-- Today's Classes (Mobile) -->
      <v-card class="mt-8 d-lg-none" flat v-if="todayLessons.length > 0">
        <v-card-title class="px-8 pt-6">
          <v-icon start>mdi-calendar-today</v-icon>
          Today's Schedule
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-0">
          <v-list v-if="todayLessons.length > 0" lines="three">
            <template v-for="(lesson, index) in todayLessons" :key="lesson.id">
              <v-divider v-if="index > 0" />
              <v-list-item class="lesson-item">
                <template v-slot:prepend>
                  <v-avatar :color="getLessonColor(lesson.lesson_type)" size="56" class="mr-4">
                    <div class="text-center text-white text-xs">
                      <div class="font-weight-700">{{ formatTime(lesson.starting_time) }}</div>
                    </div>
                  </v-avatar>
                </template>

                <div class="lesson-content">
                  <div class="font-weight-600">{{ lesson.course_code }}</div>
                  <div class="text-secondary text-sm">{{ lesson.course_title }}</div>
                  <div class="text-tertiary text-xs d-flex gap-3 mt-1">
                    <span>📍 {{ lesson.room_details }}</span>
                    <span>👨‍🏫 {{ lesson.lecturer_name }}</span>
                  </div>
                </div>

                <template v-slot:append>
                  <v-chip
                    :color="getLessonColor(lesson.lesson_type)"
                    text-color="white"
                    size="small"
                  >
                    {{ lesson.lesson_type }}
                  </v-chip>
                </template>
              </v-list-item>
            </template>
          </v-list>
        </v-card-text>
      </v-card>

      <v-card class="mt-8 d-lg-none" flat v-else>
        <v-card-text class="text-center py-8">
          <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-calendar-blank</v-icon>
          <p class="text-secondary">No classes scheduled for today</p>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useLessonStore } from '@/stores/lesson'
import { useAuthStore } from '@/stores/auth'
import StudentCalendar from '@/components/calendar/StudentCalendar.vue'

const lessonStore = useLessonStore()
const authStore = useAuthStore()

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
  console.log('TimetableView: Component mounted')
  console.log('TimetableView: Current user:', authStore.user)
  console.log('TimetableView: Has token:', !!authStore.token)
  await lessonStore.fetchLessons()
})

async function refreshTimetable() {
  console.log('TimetableView: Manual refresh triggered')
  await lessonStore.fetchLessons()
}

function getLessonColor(type: string): string {
  switch (type) {
    case 'LECTURE': return '#2563EB'
    case 'TUTORIAL': return '#10B981'
    case 'LAB': return '#F59E0B'
    default: return '#64748B'
  }
}

function formatTime(timeString: string): string {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  })
}
</script>

<style scoped>
.timetable-view {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 2rem 0;
}

.header-section {
  animation: fadeInDown 0.5s ease-out;
}

.header-section h1 {
  color: var(--text-primary);
}

.header-section p {
  color: var(--text-secondary);
  font-weight: 500;
}

/* Stat Cards */
.stat-card {
  border: 1px solid var(--border) !important;
  border-radius: 12px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.1) !important;
}

.stat-content {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon-box {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-icon-box.primary {
  background: linear-gradient(135deg, #2563EB, #3B82F6);
}

.stat-icon-box.success {
  background: linear-gradient(135deg, #10B981, #34D399);
}

.stat-icon-box.warning {
  background: linear-gradient(135deg, #F59E0B, #FBBF24);
}

.stat-icon-box.info {
  background: linear-gradient(135deg, #3B82F6, #60A5FA);
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  margin-top: 0.25rem;
}

.stat-bar {
  height: 3px;
  background: linear-gradient(90deg, #2563EB, #3B82F6);
  width: 100%;
}

.stat-bar.success {
  background: linear-gradient(90deg, #10B981, #34D399);
}

.stat-bar.warning {
  background: linear-gradient(90deg, #F59E0B, #FBBF24);
}

.stat-bar.info {
  background: linear-gradient(90deg, #3B82F6, #60A5FA);
}

/* Calendar Card */
.calendar-card {
  border: 1px solid var(--border) !important;
  border-radius: 12px !important;
  box-shadow: var(--shadow-sm) !important;
  animation: fadeInUp 0.5s ease-out 0.1s both;
}

.calendar-card :deep(.v-card-title) {
  font-weight: 600;
  color: var(--text-primary);
}

/* Lesson Item */
.lesson-item {
  padding: 1rem;
}

.lesson-content {
  flex: 1;
}

.lesson-content > div:first-child {
  color: var(--text-primary);
}

.text-sm {
  font-size: 0.875rem;
}

.text-xs {
  font-size: 0.75rem;
}

.text-tertiary {
  color: var(--text-tertiary);
}

.gap-3 {
  gap: 0.75rem;
}

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 960px) {
  .timetable-view {
    padding: 1rem 0;
  }

  .header-section {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>