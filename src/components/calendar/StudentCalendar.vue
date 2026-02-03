<template>
  <div class="student-calendar">
    <!-- Loading State -->
    <div v-if="lessonStore.isLoading" class="text-center py-12">
      <v-progress-circular indeterminate color="primary" />
      <div class="text-grey mt-4">Loading timetable...</div>
    </div>
    
    <!-- Error State -->
    <div v-else-if="lessonStore.error" class="text-center py-12">
      <v-alert type="error" variant="tonal" class="mb-4">
        <div class="font-weight-bold">Failed to load timetable</div>
        <div class="text-caption mt-2">{{ lessonStore.error }}</div>
      </v-alert>
      <v-btn @click="loadLessons" color="primary">
        Try Again
      </v-btn>
    </div>
    
    <!-- Empty State -->
    <div v-else-if="lessonStore.lessons.length === 0" class="text-center py-12">
      <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-calendar-blank</v-icon>
      <h3 class="text-h6 mb-2">No classes scheduled</h3>
      <p class="text-grey">Your timetable is currently empty.</p>
      <v-btn @click="loadLessons" color="primary" class="mt-4">
        Refresh
      </v-btn>
    </div>
    
    <!-- Calendar Container -->
    <div v-else>
      <!-- Calendar Toolbar -->
      <div class="d-flex justify-space-between align-center mb-4">
        <div>
          <v-btn 
            @click="goToToday"
            variant="outlined"
            color="primary"
            prepend-icon="mdi-calendar-today"
            size="small"
          >
            Today
          </v-btn>
        </div>
        
        <div class="text-h6">{{ currentDate }}</div>
        
        <div class="d-flex">
          <v-btn 
            icon
            @click="prev"
            :disabled="lessonStore.isLoading"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          
          <v-btn 
            icon
            @click="next"
            :disabled="lessonStore.isLoading"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>
      
      <!-- Calendar -->
      <div ref="calendarRef" class="calendar-container" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useLessonStore } from '@/stores/lesson'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

const lessonStore = useLessonStore()
const calendarRef = ref<HTMLElement>()
let calendar: Calendar | null = null
const currentDate = ref('')

onMounted(async () => {
  console.log('StudentCalendar: Component mounted')
  await loadLessons()
  await nextTick()
  initCalendar()
})

onUnmounted(() => {
  if (calendar) {
    calendar.destroy()
    calendar = null
  }
})

// Watch for changes in lessons array and reinitialize calendar
watch(
  () => lessonStore.lessons.length,
  async () => {
    console.log('StudentCalendar: Lessons changed, reinitializing calendar')
    await nextTick()
    initCalendar()
  }
)

async function loadLessons() {
  try {
    console.log('StudentCalendar: Loading lessons...')
    await lessonStore.fetchLessons()
    console.log('StudentCalendar: Loaded', lessonStore.lessons.length, 'lessons')
  } catch (err) {
    console.error('StudentCalendar: Failed to load lessons:', err)
  }
}

function initCalendar() {
  if (!calendarRef.value) {
    console.error('StudentCalendar: Calendar ref not available')
    return
  }
  
  if (calendar) {
    calendar.destroy()
  }

  const lessons = lessonStore.lessons.map(lesson => ({
    id: String(lesson.id),
    title: `${lesson.course_code} - ${lesson.lesson_type}`,
    start: `${lesson.date}T${lesson.starting_time}`,
    end: `${lesson.date}T${lesson.ending_time}`,
    extendedProps: {
      course: lesson.course_title,
      lecturer: lesson.lecturer_name,
      room: lesson.room_details,
      type: lesson.lesson_type
    },
    color: getEventColor(lesson.lesson_type),
    textColor: 'white'
  }))

  console.log('StudentCalendar: Initializing calendar with', lessons.length, 'events')

  try {
    const options: any = {
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: false,
      height: 'auto',
      events: lessons,
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      },
      slotMinTime: '07:00:00',
      slotMaxTime: '22:00:00',
      allDaySlot: false,
      firstDay: 1,
      nowIndicator: true,
      navLinks: true,
      datesSet: function(info: any) {
        currentDate.value = info.view.title
      },
      eventClick: function(info: any) {
        showLessonDetails(info.event)
      }
    }
    calendar = new Calendar(calendarRef.value, options)

    calendar.render()
    updateCurrentDate()
    console.log('StudentCalendar: Calendar rendered successfully')
  } catch (err) {
    console.error('StudentCalendar: Error initializing calendar:', err)
  }
}

function updateCurrentDate() {
  if (calendar) {
    currentDate.value = calendar.view.title
  }
}

function getEventColor(lessonType: string): string {
  switch (lessonType) {
    case 'LECTURE': return '#1976D2'
    case 'TUTORIAL': return '#4CAF50'
    case 'LAB': return '#FF9800'
    default: return '#9C27B0'
  }
}

function showLessonDetails(event: any) {
  const lesson = event.extendedProps
  const startTime = new Date(event.start).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  const endTime = new Date(event.end).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  
  alert(
    `📚 Course: ${lesson.course}\n` +
    `📝 Type: ${lesson.type}\n` +
    `👨‍🏫 Lecturer: ${lesson.lecturer}\n` +
    `📍 Room: ${lesson.room}\n` +
    `🕐 Time: ${startTime} - ${endTime}`
  )
}

function goToToday() {
  if (calendar) {
    calendar.today()
    updateCurrentDate()
  }
}

function prev() {
  if (calendar) {
    calendar.prev()
    updateCurrentDate()
  }
}

function next() {
  if (calendar) {
    calendar.next()
    updateCurrentDate()
  }
}

watch(() => lessonStore.lessons, () => {
  if (calendar) {
    calendar.removeAllEvents()
    
    const lessons = lessonStore.lessons.map(lesson => ({
      id: String(lesson.id),
      title: `${lesson.course_code} - ${lesson.lesson_type}`,
      start: `${lesson.date}T${lesson.starting_time}`,
      end: `${lesson.date}T${lesson.ending_time}`,
      extendedProps: {
        course: lesson.course_title,
        lecturer: lesson.lecturer_name,
        room: lesson.room_details,
        type: lesson.lesson_type
      },
      color: getEventColor(lesson.lesson_type),
      textColor: 'white'
    }))
    
    calendar.addEventSource(lessons)
  }
}, { deep: true })
</script>

<style scoped>
.calendar-container {
  min-height: 500px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .calendar-container {
    min-height: 400px;
    padding: 8px;
  }
}

:deep(.fc-event) {
  cursor: pointer;
  border: none;
  font-size: 0.85rem;
  padding: 2px 4px;
  border-radius: 4px;
}

:deep(.fc-event-title) {
  font-weight: 500;
  padding: 2px;
}

:deep(.fc-timegrid-slot) {
  height: 60px !important;
}

:deep(.fc-toolbar) {
  margin-bottom: 16px !important;
}
</style>
