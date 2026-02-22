<template>
  <div class="timetable-view">
    <v-container fluid class="tt-container">
      <!-- ========== Page Header ========== -->
      <header class="tt-header">
        <div class="tt-header-left">
          <div class="tt-header-icon-ring">
            <v-icon size="28" color="primary">mdi-calendar-month-outline</v-icon>
          </div>
          <div>
            <h1 class="tt-title">My Timetable</h1>
            <p class="tt-subtitle">
              <v-icon size="14" class="mr-1" color="primary">mdi-calendar-range</v-icon>
              {{ currentWeek }}
            </p>
          </div>
        </div>
      </header>

      <!-- ========== Stats Strip ========== -->
      <div class="stats-strip">
        <div v-for="(s, i) in statCards" :key="i" class="stat-tile" :class="'stat-tile--' + s.accent">
          <div class="stat-tile-icon" :class="'sti-' + s.accent">
            <v-icon size="24" color="white">{{ s.icon }}</v-icon>
          </div>
          <div class="stat-tile-body">
            <span class="stat-tile-val">{{ s.value }}</span>
            <span class="stat-tile-lbl">{{ s.label }}</span>
          </div>
        </div>
      </div>

      <!-- ========== Calendar Card ========== -->
      <div class="cal-card">
        <div class="cal-card-head">
          <v-icon size="20" color="primary" class="mr-2">mdi-calendar-month</v-icon>
          <span class="cal-card-title">Class Schedule</span>
        </div>
        <div class="cal-card-body">
          <StudentCalendar />
        </div>
      </div>

      <!-- ========== Today's Classes (Mobile) ========== -->
      <div class="today-card d-lg-none" v-if="todayLessons.length > 0">
        <div class="today-card-head">
          <v-icon size="20" color="primary" class="mr-2">mdi-calendar-today</v-icon>
          <span class="cal-card-title">Today's Schedule</span>
          <v-chip color="primary" variant="tonal" size="x-small" class="ml-auto font-weight-bold">
            {{ todayLessons.length }} class{{ todayLessons.length > 1 ? 'es' : '' }}
          </v-chip>
        </div>

        <div class="today-list">
          <div v-for="(lesson, index) in todayLessons" :key="lesson.id" class="today-item" :class="{ 'today-item--border': index > 0 }">
            <div class="today-time-badge" :style="{ background: getLessonColor(lesson.lesson_type) }">
              {{ formatTime(lesson.starting_time) }}
            </div>
            <div class="today-item-body">
              <div class="today-item-code">{{ lesson.course_code }}</div>
              <div class="today-item-title">{{ lesson.course_title }}</div>
              <div class="today-item-meta">
                <span><v-icon size="12" class="mr-1">mdi-map-marker-outline</v-icon>{{ lesson.room_details }}</span>
                <span><v-icon size="12" class="mr-1">mdi-account-outline</v-icon>{{ lesson.lecturer_name }}</span>
              </div>
            </div>
            <v-chip :color="getLessonColor(lesson.lesson_type)" variant="tonal" size="x-small" class="font-weight-bold">
              {{ lesson.lesson_type }}
            </v-chip>
          </div>
        </div>
      </div>

      <!-- Empty state for today (mobile) -->
      <div class="today-card today-card--empty d-lg-none" v-else>
        <v-icon size="52" color="#CBD5E1" class="mb-3">mdi-calendar-blank-outline</v-icon>
        <p class="today-empty-text">No classes scheduled for today</p>
      </div>
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

const statCards = computed(() => [
  { icon: 'mdi-book-open-page-variant-outline', value: lessonStore.lessons.length, label: 'Total Classes', accent: 'blue' },
  { icon: 'mdi-calendar-today', value: todayLessonsCount.value, label: "Today's Classes", accent: 'green' },
  { icon: 'mdi-clock-outline', value: upcomingLessonsCount.value, label: 'This Week', accent: 'amber' },
  { icon: 'mdi-bell-ring-outline', value: 0, label: 'Notifications', accent: 'violet' },
])

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
/* ===== Layout ===== */
.timetable-view {
  min-height: 100vh;
  background: var(--bg-primary);
}
.tt-container {
  max-width: 1280px;
  padding: 2rem 1.5rem;
}

/* ===== Header ===== */
.tt-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 1.75rem;
  animation: fadeInDown 0.4s ease-out;
}

.tt-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.tt-header-icon-ring {
  width: 52px; height: 52px;
  border-radius: 14px;
  background: #EFF6FF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tt-title {
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.5px;
  line-height: 1.15;
}

.tt-subtitle {
  display: flex;
  align-items: center;
  font-size: 0.82rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-top: 2px;
}

/* ===== Stats Strip ===== */
.stats-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 1.75rem;
  animation: fadeInUp 0.4s ease-out 0.1s both;
}

.stat-tile {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  background: white;
  border: 1px solid var(--border);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  overflow: hidden;
}
.stat-tile::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.stat-tile:hover { transform: translateY(-4px); box-shadow: 0 10px 26px rgba(15,23,42,0.08); }
.stat-tile:hover::after { opacity: 1; }

.stat-tile--blue::after  { background: #2563EB; }
.stat-tile--green::after { background: #10B981; }
.stat-tile--amber::after { background: #F59E0B; }
.stat-tile--violet::after{ background: #8B5CF6; }

.stat-tile-icon {
  width: 46px; height: 46px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.sti-blue   { background: linear-gradient(135deg, #2563EB, #3B82F6); }
.sti-green  { background: linear-gradient(135deg, #10B981, #34D399); }
.sti-amber  { background: linear-gradient(135deg, #F59E0B, #FBBF24); }
.sti-violet { background: linear-gradient(135deg, #8B5CF6, #A78BFA); }

.stat-tile-body { display: flex; flex-direction: column; }
.stat-tile-val {
  font-size: 1.5rem; font-weight: 800;
  color: var(--text-primary); line-height: 1;
}
.stat-tile-lbl {
  font-size: 0.75rem; font-weight: 500;
  color: var(--text-tertiary); margin-top: 3px;
}

/* ===== Calendar Card ===== */
.cal-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  animation: fadeInUp 0.4s ease-out 0.2s both;
}

.cal-card-head {
  display: flex;
  align-items: center;
  padding: 18px 24px;
  border-bottom: 1px solid var(--border);
}
.cal-card-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.cal-card-body { padding: 24px; }

/* ===== Today's Classes (mobile) ===== */
.today-card {
  margin-top: 1.5rem;
  background: white;
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  animation: fadeInUp 0.4s ease-out 0.3s both;
}
.today-card--empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
}
.today-empty-text { color: var(--text-tertiary); font-size: 0.9rem; }

.today-card-head {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}

.today-list { padding: 0; }

.today-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
}
.today-item--border { border-top: 1px solid var(--border); }

.today-time-badge {
  width: 50px; height: 50px; min-width: 50px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 0.72rem; font-weight: 700;
  text-align: center; line-height: 1.2;
}

.today-item-body { flex: 1; min-width: 0; }
.today-item-code { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); }
.today-item-title { font-size: 0.8rem; color: var(--text-secondary); margin-top: 1px; }
.today-item-meta {
  display: flex; gap: 12px; margin-top: 5px;
  font-size: 0.72rem; color: var(--text-tertiary);
}

/* ===== Animations ===== */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ===== Responsive ===== */
@media (max-width: 960px) {
  .stats-strip { grid-template-columns: repeat(2, 1fr); }
  .tt-container { padding: 1.25rem 1rem; }
  .tt-title { font-size: 1.5rem; }
}

@media (max-width: 600px) {
  .stats-strip { grid-template-columns: 1fr 1fr; gap: 10px; }
  .stat-tile { padding: 14px 14px; gap: 10px; }
  .stat-tile-val { font-size: 1.25rem; }
  .stat-tile-icon { width: 40px; height: 40px; }
  .cal-card-body { padding: 12px; }
}
</style>