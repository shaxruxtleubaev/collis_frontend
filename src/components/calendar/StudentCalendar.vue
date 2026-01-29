<template>
  <div class="student-calendar">
    <!-- Loading State -->
    <div v-if="lessonStore.isLoading" class="text-center py-12">
      <v-progress-circular indeterminate color="primary" />
      <div class="text-grey mt-4">Loading timetable...</div>
    </div>
    
    <!-- Empty State -->
    <div v-else-if="lessonStore.lessons.length === 0" class="text-center py-12">
      <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-calendar-blank</v-icon>
      <h3 class="text-h6 mb-2">No classes scheduled</h3>
      <p class="text-grey">Your timetable is currently empty.</p>
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

// Import FullCalendar
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

const lessonStore = useLessonStore()
const calendarRef = ref<HTMLElement>()
let calendar: any = null
const currentDate = ref('')

onMounted(async () => {
  await loadLessons()
  await nextTick() // Wait for DOM to be ready
  initCalendar()
})

onUnmounted(() => {
  if (calendar) {
    calendar.destroy()
  }
})

async function loadLessons() {
  try {
    await lessonStore.fetchLessons()
  } catch (err) {
    console.error('Failed to load lessons:', err)
  }
}

function initCalendar() {
  if (!calendarRef.value) return
  
  // Clear any existing calendar
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

  console.log('Loading calendar with', lessons.length, 'lessons')
  console.log('Lessons:', lessons)

  // @ts-ignore - FullCalendar types
  calendar = new FullCalendar.Calendar(calendarRef.value, {
    plugins: [dayGridPlugin, timeGridPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: false, // Using our custom toolbar
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
    nowIndicator: true,
    navLinks: true,
    datesSet: function(info: any) {
      currentDate.value = info.view.title
    },
    eventClick: function(info: any) {
      showLessonDetails(info.event)
    }
  })

  calendar.render()
  updateCurrentDate()
}

function updateCurrentDate() {
  if (calendar) {
    currentDate.value = calendar.view.title
  }
}

function getEventColor(lessonType: string): string {
  switch (lessonType) {
    case 'LECTURE': return '#1976D2' // Blue
    case 'TUTORIAL': return '#4CAF50' // Green
    case 'LAB': return '#FF9800' // Orange
    default: return '#9C27B0' // Purple
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

// Watch for lesson changes and update calendar
watch(() => lessonStore.lessons, () => {
  if (calendar) {
    // Remove all events and add new ones
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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