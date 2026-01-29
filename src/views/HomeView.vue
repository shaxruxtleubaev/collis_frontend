<template>
  <v-container fluid class="pa-4">
    <!-- Hero Section -->
    <v-card class="mb-6" color="primary" dark>
      <v-card-text class="pa-8">
        <v-row align="center">
          <v-col cols="12" md="8">
            <h1 class="text-h3 font-weight-bold mb-4">
              Welcome to ColliS Student Portal
            </h1>
            <p class="text-h6 mb-6">
              Access your class timetable and academic schedule at Xiamen University Malaysia.
            </p>
            <v-btn 
              color="white" 
              size="large"
              :to="{ name: 'timetable' }"
              prepend-icon="mdi-calendar"
              v-if="authStore.isAuthenticated"
            >
              View My Timetable
            </v-btn>
            <v-btn 
              color="white" 
              size="large"
              :to="{ name: 'login' }"
              prepend-icon="mdi-login"
              v-else
            >
              Student Login
            </v-btn>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-img
              :src="logo"
              alt="XMUM Logo"
              max-height="200"
              class="mx-auto"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    
    <!-- About XMUM -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-icon start>mdi-school</v-icon>
            About Xiamen University Malaysia
          </v-card-title>
          <v-card-text>
            <p class="mb-4">
              Xiamen University Malaysia (XMUM) is the first overseas branch set by a renowned Chinese university. 
              Located in Sepang, Selangor, it offers a world-class education with a multicultural environment.
            </p>
            
            <v-row>
              <v-col cols="12" md="4">
                <div class="text-center pa-4">
                  <v-icon size="48" color="primary" class="mb-4">mdi-account-group</v-icon>
                  <h3 class="text-h6 mb-2">Multicultural Campus</h3>
                  <p class="text-grey">Students from diverse backgrounds studying together.</p>
                </div>
              </v-col>
              
              <v-col cols="12" md="4">
                <div class="text-center pa-4">
                  <v-icon size="48" color="primary" class="mb-4">mdi-book-education</v-icon>
                  <h3 class="text-h6 mb-2">Quality Education</h3>
                  <p class="text-grey">Internationally recognized programs and qualifications.</p>
                </div>
              </v-col>
              
              <v-col cols="12" md="4">
                <div class="text-center pa-4">
                  <v-icon size="48" color="primary" class="mb-4">mdi-map-marker</v-icon>
                  <h3 class="text-h6 mb-2">Strategic Location</h3>
                  <p class="text-grey">Located in the heart of Malaysia's education hub.</p>
                </div>
              </v-col>
            </v-row>
            
            <div class="text-center mt-6">
              <v-btn
                color="primary"
                href="https://www.xmu.edu.my"
                target="_blank"
                prepend-icon="mdi-open-in-new"
              >
                Visit Official Website
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Quick Links -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card>
          <v-card-title>Quick Links</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" md="3">
                <v-btn
                  block
                  variant="outlined"
                  color="primary"
                  href="https://www.xmu.edu.my"
                  target="_blank"
                  class="mb-2"
                >
                  <v-icon start>mdi-school</v-icon>
                  XMUM Website
                </v-btn>
              </v-col>
              
              <v-col cols="6" md="3">
                <v-btn
                  block
                  variant="outlined"
                  color="primary"
                  :to="{ name: 'timetable' }"
                  class="mb-2"
                  v-if="authStore.isAuthenticated"
                >
                  <v-icon start>mdi-calendar</v-icon>
                  My Timetable
                </v-btn>
              </v-col>
              
              <v-col cols="6" md="3">
                <v-btn
                  block
                  variant="outlined"
                  color="primary"
                  :to="{ name: 'profile' }"
                  class="mb-2"
                  v-if="authStore.isAuthenticated"
                >
                  <v-icon start>mdi-account</v-icon>
                  My Profile
                </v-btn>
              </v-col>
              
              <v-col cols="6" md="3">
                <v-btn
                  block
                  variant="outlined"
                  color="primary"
                  :to="{ name: 'login' }"
                  class="mb-2"
                  v-if="!authStore.isAuthenticated"
                >
                  <v-icon start>mdi-login</v-icon>
                  Student Login
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import logo from '@/assets/logo.svg'

const authStore = useAuthStore()
</script>