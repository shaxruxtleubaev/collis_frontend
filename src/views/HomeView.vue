<template>
  <div class="home-view">
    <!-- Hero Section -->
    <v-card class="hero-card mb-8" flat>
      <div class="hero-background"></div>
      <div class="hero-content">
        <v-container>
          <v-row align="center" class="py-12">
            <v-col cols="12" md="7">
              <div class="hero-text">
                <div class="subtitle">Welcome back</div>
                <h1 class="text-h2 font-weight-700 mb-4">
                  ColliS Student Portal
                </h1>
                <p class="text-h6 text-white mb-8 font-weight-400 hero-description">
                  Your comprehensive academic timetable and scheduling system for Xiamen University Malaysia.
                </p>
                <div class="action-buttons">
                  <v-btn
                    v-if="authStore.isAuthenticated"
                    :to="{ name: 'timetable' }"
                    color="primary"
                    size="x-large"
                    prepend-icon="mdi-calendar-check"
                    class="mr-4"
                  >
                    View My Timetable
                  </v-btn>
                  <v-btn
                    v-else
                    :to="{ name: 'login' }"
                    color="primary"
                    size="x-large"
                    prepend-icon="mdi-login-variant"
                  >
                    Student Login
                  </v-btn>
                  <v-btn
                    href="https://www.xmu.edu.my"
                    target="_blank"
                    variant="elevated"
                    color="white"
                    size="x-large"
                    prepend-icon="mdi-open-in-new"
                    class="text-primary"
                  >
                    Visit XMUM
                  </v-btn>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="5" class="text-center">
              <div class="hero-icon-container">
                <div class="floating-icon">
                  <v-icon size="200" color="primary">mdi-school</v-icon>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-card>

    <v-container fluid class="px-4 px-md-8">
      <!-- Features Section -->
      <section class="features-section mb-12">
        <div class="section-header mb-10">
          <h2 class="text-h3 font-weight-700 mb-2">Key Features</h2>
          <p class="text-h6 text-secondary">Everything you need to manage your academic schedule</p>
        </div>

        <v-row :gutter="6">
          <v-col cols="12" sm="6" lg="3">
            <v-card class="feature-card h-100" flat>
              <div class="feature-icon-box">
                <div class="feature-icon">📅</div>
              </div>
              <v-card-text class="pt-6">
                <h3 class="text-h6 font-weight-600 mb-2">Smart Timetable</h3>
                <p class="text-secondary text-sm">View your personalized class schedule at a glance with our intuitive calendar interface.</p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <v-card class="feature-card h-100" flat>
              <div class="feature-icon-box">
                <div class="feature-icon">🔔</div>
              </div>
              <v-card-text class="pt-6">
                <h3 class="text-h6 font-weight-600 mb-2">Notifications</h3>
                <p class="text-secondary text-sm">Get instant notifications about class changes, cancellations, and important updates.</p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <v-card class="feature-card h-100" flat>
              <div class="feature-icon-box">
                <div class="feature-icon">👤</div>
              </div>
              <v-card-text class="pt-6">
                <h3 class="text-h6 font-weight-600 mb-2">Profile Management</h3>
                <p class="text-secondary text-sm">Manage your profile, update password, and keep your information secure.</p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <v-card class="feature-card h-100" flat>
              <div class="feature-icon-box">
                <div class="feature-icon">⚡</div>
              </div>
              <v-card-text class="pt-6">
                <h3 class="text-h6 font-weight-600 mb-2">Real-time Sync</h3>
                <p class="text-secondary text-sm">Your schedule updates instantly across all devices in real-time.</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- About Section -->
      <section class="about-section mb-12">
        <v-row :gutter="8">
          <v-col cols="12" lg="6" class="d-flex align-center">
            <div class="about-content">
              <div class="section-label">About XMUM</div>
              <h2 class="text-h3 font-weight-700 mb-4">Xiamen University Malaysia</h2>
              <p class="text-secondary mb-4">
                Xiamen University Malaysia (XMUM) is the first overseas branch campus of Xiamen University, 
                a leading research university in China. Located in Sepang, Selangor, we provide world-class education 
                in a multicultural environment.
              </p>
              <p class="text-secondary mb-6">
                Our commitment to academic excellence, innovative teaching methods, and student-centered learning 
                creates an environment where students thrive both academically and personally.
              </p>
              <v-btn
                href="https://www.xmu.edu.my"
                target="_blank"
                color="primary"
                size="large"
                prepend-icon="mdi-open-in-new"
              >
                Learn More About XMUM
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" lg="6">
            <v-card class="about-card" flat>
              <v-row class="h-100">
                <v-col cols="12" sm="6" class="d-flex flex-column">
                  <div class="stat-box">
                    <div class="stat-icon">
                      <v-icon size="32" color="primary">mdi-account-multiple</v-icon>
                    </div>
                    <div class="stat-value">8000+</div>
                    <div class="stat-label">Students</div>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="d-flex flex-column">
                  <div class="stat-box">
                    <div class="stat-icon">
                      <v-icon size="32" color="primary">mdi-book-multiple</v-icon>
                    </div>
                    <div class="stat-value">50+</div>
                    <div class="stat-label">Programs</div>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="d-flex flex-column">
                  <div class="stat-box">
                    <div class="stat-icon">
                      <v-icon size="32" color="primary">mdi-earth</v-icon>
                    </div>
                    <div class="stat-value">50</div>
                    <div class="stat-label">Countries</div>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="d-flex flex-column">
                  <div class="stat-box">
                    <div class="stat-icon">
                      <v-icon size="32" color="primary">mdi-star</v-icon>
                    </div>
                    <div class="stat-value">Top</div>
                    <div class="stat-label">Tier 1 University</div>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- CTA Section -->
      <v-card class="cta-card" flat v-if="!authStore.isAuthenticated">
        <div class="cta-background"></div>
        <v-card-text class="cta-content text-center py-12 px-6">
          <h2 class="text-h4 font-weight-700 mb-4 text-white">Ready to Get Started?</h2>
          <p class="text-h6 mb-8 max-w-2xl mx-auto text-white">
            Login with your student credentials to access your personalized timetable and manage your academic schedule.
          </p>
          <v-btn
            :to="{ name: 'login' }"
            color="primary"
            size="x-large"
            prepend-icon="mdi-login-variant"
          >
            Go to Login
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import campusImage from '@/assets/xmum_campus.webp'

const authStore = useAuthStore()
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background: var(--bg-primary);
}

/* Hero Section */
.hero-card {
  position: relative;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  overflow: hidden;
  margin-bottom: 0 !important;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.85) 0%, rgba(30, 64, 175, 0.85) 100%), 
              url('/src/assets/xmum_campus.webp') center/cover;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: 0;
}

.hero-background::before {
  content: '';
  position: absolute;
  top: 0;
  right: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.hero-background::after {
  content: '';
  position: absolute;
  bottom: -50px;
  left: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.hero-content {
  position: relative;
  z-index: 1;
  color: white;
}

.hero-text h1 {
  color: white;
  letter-spacing: -0.03em;
}

.hero-text p {
  color: rgba(255, 255, 255, 0.95) !important;
}

.subtitle {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-icon-container {
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-icon {
  animation: float 6s ease-in-out infinite;
  filter: drop-shadow(0 10px 30px rgba(37, 99, 235, 0.3));
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-30px); }
}

/* Features Section */
.features-section {
  animation: fadeInUp 0.6s ease-out;
}

.section-header {
  text-align: center;
}

.section-header h2 {
  margin-bottom: 0.5rem;
}

.feature-card {
  border: 1px solid var(--border) !important;
  border-radius: 12px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white !important;
  position: relative;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #2563EB, #3B82F6);
  border-radius: 12px 12px 0 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover {
  border-color: var(--primary) !important;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.15) !important;
  transform: translateY(-8px);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-icon-box {
  width: 70px;
  height: 70px;
  border-radius: 12px;
  background: linear-gradient(135deg, #DBEAFE, #EFF6FF);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon-box {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.25);
}

.feature-icon {
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* About Section */
.about-content {
  animation: fadeInLeft 0.6s ease-out;
}

.section-label {
  display: inline-block;
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.about-card {
  background: linear-gradient(135deg, white 0%, #F8FAFC 100%) !important;
  border: 1px solid var(--border) !important;
  border-radius: 12px !important;
  padding: 2rem;
  min-height: 400px;
}

.stat-box {
  text-align: center;
  padding: 2rem 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #F0F9FF, white);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  margin: 0.5rem 0;
}

.stat-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.1);
}

.stat-icon {
  margin-bottom: 1rem;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* CTA Section */
.cta-card {
  position: relative;
  border-radius: 16px !important;
  overflow: hidden;
  background: linear-gradient(135deg, #2563EB, #1E40AF) !important;
  color: white;
  border: none !important;
  margin-bottom: 4rem;
}

.cta-background {
  position: absolute;
  top: 0;
  right: -50px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-content h2,
.cta-content p {
  color: white;
}

/* Animations */
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

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 960px) {
  .action-buttons {
    flex-direction: column;
  }

  .action-buttons :deep(.v-btn) {
    width: 100%;
  }

  .about-card {
    min-height: auto;
  }
}
</style>