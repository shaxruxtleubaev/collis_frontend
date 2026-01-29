<template>
  <v-container fluid class="pa-4">
    <!-- Header -->
    <v-row class="mb-6">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold">My Profile</h1>
        <p class="text-grey">Your student information</p>
      </v-col>
    </v-row>
    
    <v-row>
      <!-- Profile Card -->
      <v-col cols="12" md="4">
        <v-card class="mb-6">
          <v-card-text class="text-center pa-6">
            <!-- Avatar -->
            <v-avatar size="120" color="primary" class="mb-4">
              <span class="text-white text-h3">{{ userInitials }}</span>
            </v-avatar>
            
            <!-- Name & Role -->
            <h2 class="text-h5 mb-2">{{ authStore.user?.fullname }}</h2>
            <v-chip color="primary" variant="outlined" class="mb-4">
              {{ authStore.user?.user_type_display }}
            </v-chip>
          </v-card-text>
        </v-card>
        
        <!-- Account Status -->
        <v-card>
          <v-card-title>Account Status</v-card-title>
          <v-card-text>
            <v-list lines="two">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </template>
                <v-list-item-title>Account Active</v-list-item-title>
                <v-list-item-subtitle>Verified student account</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="info">mdi-calendar-clock</v-icon>
                </template>
                <v-list-item-title>Enrolled Classes</v-list-item-title>
                <v-list-item-subtitle>{{ lessonStore.lessons.length }} classes</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      
      <!-- Student Information -->
      <v-col cols="12" md="8">
        <v-card class="mb-6">
          <v-card-title>
            <v-icon start>mdi-account-details</v-icon>
            Student Information
          </v-card-title>
          
          <v-card-text>
            <v-row>
              <!-- Full Name -->
              <v-col cols="12" md="6">
                <v-text-field
                  :model-value="authStore.user?.fullname"
                  label="Full Name"
                  variant="outlined"
                  readonly
                />
              </v-col>
              
              <!-- Student ID (was Username) -->
              <v-col cols="12" md="6">
                <v-text-field
                  :model-value="authStore.user?.username"
                  label="Student ID"
                  variant="outlined"
                  readonly
                  hint="Your student identification number"
                  persistent-hint
                />
              </v-col>
              
              <!-- Email -->
              <v-col cols="12" md="6">
                <v-text-field
                  :model-value="authStore.user?.email"
                  label="Email Address"
                  variant="outlined"
                  readonly
                />
              </v-col>
              
              <!-- User Type -->
              <v-col cols="12" md="6">
                <v-text-field
                  :model-value="authStore.user?.user_type_display"
                  label="Account Type"
                  variant="outlined"
                  readonly
                />
              </v-col>
              
              <!-- Last Login -->
              <v-col cols="12" md="6">
                <v-text-field
                  :model-value="formatLastLogin()"
                  label="Last Login"
                  variant="outlined"
                  readonly
                />
              </v-col>
              
              <!-- Account Created -->
              <v-col cols="12" md="6">
                <v-text-field
                  :model-value="formatAccountCreated()"
                  label="Account Created"
                  variant="outlined"
                  readonly
                />
              </v-col>
            </v-row>
            
            <!-- Help Text -->
            <v-alert type="info" variant="tonal" class="mt-4">
              <div class="d-flex align-center">
                <v-icon class="mr-2">mdi-information</v-icon>
                <div>
                  <strong>Need to update your information?</strong> 
                  Please contact the administration office.
                </div>
              </div>
            </v-alert>
          </v-card-text>
        </v-card>
        
        <!-- Class Statistics -->
        <v-card>
          <v-card-title>
            <v-icon start>mdi-chart-bar</v-icon>
            Class Statistics
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" md="3">
                <div class="text-center">
                  <div class="text-h4 mb-2">{{ totalLectures }}</div>
                  <div class="text-caption text-grey">Lectures</div>
                </div>
              </v-col>
              
              <v-col cols="6" md="3">
                <div class="text-center">
                  <div class="text-h4 mb-2">{{ totalTutorials }}</div>
                  <div class="text-caption text-grey">Tutorials</div>
                </div>
              </v-col>
              
              <v-col cols="6" md="3">
                <div class="text-center">
                  <div class="text-h4 mb-2">{{ totalLabs }}</div>
                  <div class="text-caption text-grey">Labs</div>
                </div>
              </v-col>
              
              <v-col cols="6" md="3">
                <div class="text-center">
                  <div class="text-h4 mb-2">{{ uniqueCourses }}</div>
                  <div class="text-caption text-grey">Courses</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useLessonStore } from '@/stores/lesson'

const authStore = useAuthStore()
const lessonStore = useLessonStore()

const userInitials = computed(() => {
  if (!authStore.user?.fullname) return '?'
  return authStore.user.fullname
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

const totalLectures = computed(() => {
  return lessonStore.lessons.filter(l => l.lesson_type === 'LECTURE').length
})

const totalTutorials = computed(() => {
  return lessonStore.lessons.filter(l => l.lesson_type === 'TUTORIAL').length
})

const totalLabs = computed(() => {
  return lessonStore.lessons.filter(l => l.lesson_type === 'LAB').length
})

const uniqueCourses = computed(() => {
  const courses = new Set(lessonStore.lessons.map(l => l.course_code))
  return courses.size
})

function formatLastLogin(): string {
  return 'Today'
}

function formatAccountCreated(): string {
  return 'This semester'
}
</script>