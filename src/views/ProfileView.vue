<template>
  <div class="profile-view">
    <v-container fluid class="pv-container">

      <!-- ========== Header ========== -->
      <header class="pv-header">
        <div class="pv-header-icon-ring">
          <v-icon size="28" color="primary">mdi-account-circle-outline</v-icon>
        </div>
        <div>
          <h1 class="pv-title">My Profile</h1>
          <p class="pv-subtitle">Your student information at a glance</p>
        </div>
      </header>

      <div class="pv-grid">
        <!-- ========== LEFT — Profile Card + Status ========== -->
        <aside class="pv-sidebar">
          <!-- profile card -->
          <div class="pcard">
            <div class="pcard-bg"></div>
            <div class="pcard-body">
              <v-avatar size="96" color="primary" class="pcard-avatar">
                <span class="text-white" style="font-size:2rem;font-weight:800">{{ userInitials }}</span>
              </v-avatar>
              <h2 class="pcard-name">{{ authStore.user?.fullname }}</h2>
              <v-chip color="primary" variant="tonal" size="small" class="font-weight-bold">
                {{ authStore.user?.user_type_display }}
              </v-chip>
            </div>
          </div>

          <!-- account status -->
          <div class="status-card">
            <div class="status-card-head">
              <v-icon size="18" color="primary" class="mr-2">mdi-shield-check-outline</v-icon>
              <span class="status-card-title">Account Status</span>
            </div>

            <div class="status-row">
              <div class="status-dot status-dot--green"></div>
              <div>
                <div class="status-row-label">Account Active</div>
                <div class="status-row-sub">Verified student account</div>
              </div>
            </div>

            <div class="status-row">
              <div class="status-icon-box">
                <v-icon size="16" color="primary">mdi-calendar-clock-outline</v-icon>
              </div>
              <div>
                <div class="status-row-label">Enrolled Classes</div>
                <div class="status-row-sub">{{ lessonStore.lessons.length }} classes</div>
              </div>
            </div>
          </div>
        </aside>

        <!-- ========== RIGHT — Info + Stats ========== -->
        <main class="pv-main">
          <!-- student info -->
          <div class="info-card">
            <div class="info-card-head">
              <v-icon size="20" color="primary" class="mr-2">mdi-card-account-details-outline</v-icon>
              <span class="info-card-title">Student Information</span>
            </div>

            <div class="info-card-body">
              <v-row>
                <v-col cols="12" md="6">
                  <div class="info-field">
                    <label class="info-field-label">
                      <v-icon size="14" class="mr-1">mdi-account-outline</v-icon>Full Name
                    </label>
                    <div class="info-field-value">{{ authStore.user?.fullname || '—' }}</div>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="info-field">
                    <label class="info-field-label">
                      <v-icon size="14" class="mr-1">mdi-identifier</v-icon>Student ID
                    </label>
                    <div class="info-field-value">{{ authStore.user?.username || '—' }}</div>
                    <span class="info-field-hint">Your student identification number</span>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="info-field">
                    <label class="info-field-label">
                      <v-icon size="14" class="mr-1">mdi-email-outline</v-icon>Email Address
                    </label>
                    <div class="info-field-value">{{ authStore.user?.email || '—' }}</div>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="info-field">
                    <label class="info-field-label">
                      <v-icon size="14" class="mr-1">mdi-badge-account-outline</v-icon>Account Type
                    </label>
                    <div class="info-field-value">{{ authStore.user?.user_type_display || '—' }}</div>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="info-field">
                    <label class="info-field-label">
                      <v-icon size="14" class="mr-1">mdi-clock-outline</v-icon>Last Login
                    </label>
                    <div class="info-field-value">{{ formatLastLogin() }}</div>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="info-field">
                    <label class="info-field-label">
                      <v-icon size="14" class="mr-1">mdi-calendar-check-outline</v-icon>Account Created
                    </label>
                    <div class="info-field-value">{{ formatAccountCreated() }}</div>
                  </div>
                </v-col>
              </v-row>

              <div class="info-notice">
                <v-icon size="18" color="primary" class="mr-2">mdi-information-outline</v-icon>
                <div>
                  <strong>Need to update your information?</strong>
                  Please contact the administration office.
                </div>
              </div>
            </div>
          </div>

          <!-- class statistics -->
          <div class="stats-card">
            <div class="info-card-head">
              <v-icon size="20" color="primary" class="mr-2">mdi-chart-box-outline</v-icon>
              <span class="info-card-title">Class Statistics</span>
            </div>

            <div class="stats-grid">
              <div class="sg-item sg-item--blue">
                <div class="sg-val">{{ totalLectures }}</div>
                <div class="sg-lbl">Lectures</div>
                <div class="sg-icon"><v-icon size="32" color="#BFDBFE">mdi-school-outline</v-icon></div>
              </div>
              <div class="sg-item sg-item--green">
                <div class="sg-val">{{ totalTutorials }}</div>
                <div class="sg-lbl">Tutorials</div>
                <div class="sg-icon"><v-icon size="32" color="#A7F3D0">mdi-account-group-outline</v-icon></div>
              </div>
              <div class="sg-item sg-item--amber">
                <div class="sg-val">{{ totalLabs }}</div>
                <div class="sg-lbl">Labs</div>
                <div class="sg-icon"><v-icon size="32" color="#FDE68A">mdi-flask-outline</v-icon></div>
              </div>
              <div class="sg-item sg-item--violet">
                <div class="sg-val">{{ uniqueCourses }}</div>
                <div class="sg-lbl">Courses</div>
                <div class="sg-icon"><v-icon size="32" color="#DDD6FE">mdi-book-multiple-outline</v-icon></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </v-container>
  </div>
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

<style scoped>
/* ===== Layout ===== */
.profile-view {
  min-height: 100vh;
  background: var(--bg-primary);
}
.pv-container {
  max-width: 1200px;
  padding: 2rem 1.5rem;
}

/* ===== Header ===== */
.pv-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 2rem;
  animation: fadeIn 0.4s ease-out;
}
.pv-header-icon-ring {
  width: 52px; height: 52px;
  border-radius: 14px;
  background: #EFF6FF;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.pv-title {
  font-size: 1.85rem; font-weight: 800;
  color: var(--text-primary); letter-spacing: -0.5px; line-height: 1.15;
}
.pv-subtitle {
  font-size: 0.82rem; color: var(--text-secondary); font-weight: 500; margin-top: 2px;
}

/* ===== Grid ===== */
.pv-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  align-items: start;
}

/* ===== Sidebar ===== */
.pv-sidebar { display: flex; flex-direction: column; gap: 16px; }

/* profile card */
.pcard {
  background: white;
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  animation: slideUp 0.4s ease-out 0.05s both;
}
.pcard-bg {
  height: 80px;
  background: linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #3B82F6 100%);
}
.pcard-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px 28px;
  margin-top: -48px;
}
.pcard-avatar {
  border: 4px solid white;
  box-shadow: 0 4px 14px rgba(37,99,235,0.2);
  margin-bottom: 14px;
}
.pcard-name {
  font-size: 1.15rem; font-weight: 700;
  color: var(--text-primary); margin-bottom: 6px;
  text-align: center;
}

/* status card */
.status-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  animation: slideUp 0.4s ease-out 0.15s both;
}
.status-card-head {
  display: flex; align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}
.status-card-title { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); }

.status-row {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border);
}
.status-row:last-child { border-bottom: none; }

.status-dot {
  width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0;
}
.status-dot--green {
  background: #10B981;
  box-shadow: 0 0 0 3px rgba(16,185,129,0.25);
}

.status-icon-box {
  width: 28px; height: 28px; border-radius: 8px;
  background: #EFF6FF;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.status-row-label { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.status-row-sub { font-size: 0.75rem; color: var(--text-tertiary); }

/* ===== Main ===== */
.pv-main { display: flex; flex-direction: column; gap: 20px; }

/* info card */
.info-card, .stats-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
}
.info-card { animation: slideUp 0.4s ease-out 0.1s both; }
.stats-card { animation: slideUp 0.4s ease-out 0.2s both; }

.info-card-head {
  display: flex; align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
}
.info-card-title { font-size: 1rem; font-weight: 700; color: var(--text-primary); }

.info-card-body { padding: 24px; }

/* info fields */
.info-field {
  padding: 14px 16px;
  border-radius: 12px;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  height: 100%;
}
.info-field-label {
  display: flex; align-items: center;
  font-size: 0.72rem; font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase; letter-spacing: 0.5px;
  margin-bottom: 6px;
}
.info-field-value {
  font-size: 0.95rem; font-weight: 600;
  color: var(--text-primary);
  word-break: break-word;
}
.info-field-hint {
  display: block;
  font-size: 0.7rem; color: var(--text-tertiary);
  margin-top: 4px;
}

/* info notice */
.info-notice {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  margin-top: 20px;
  padding: 14px 18px;
  border-radius: 12px;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* stats grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}

.sg-item {
  position: relative;
  text-align: center;
  padding: 28px 12px;
  border-right: 1px solid var(--border);
  overflow: hidden;
  transition: background 0.2s ease;
}
.sg-item:last-child { border-right: none; }
.sg-item:hover { background: var(--bg-primary); }

.sg-val {
  font-size: 2rem; font-weight: 800;
  color: var(--text-primary); line-height: 1;
  position: relative; z-index: 1;
}
.sg-lbl {
  font-size: 0.75rem; font-weight: 600;
  color: var(--text-tertiary); margin-top: 6px;
  text-transform: uppercase; letter-spacing: 0.5px;
  position: relative; z-index: 1;
}
.sg-icon {
  position: absolute;
  top: 10px; right: 8px;
  opacity: 0.25;
}

/* ===== Animations ===== */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ===== Responsive ===== */
@media (max-width: 960px) {
  .pv-grid {
    grid-template-columns: 1fr;
  }
  .pv-sidebar { flex-direction: row; flex-wrap: wrap; }
  .pcard, .status-card { flex: 1; min-width: 260px; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .sg-item:nth-child(2) { border-right: none; }
  .sg-item:nth-child(1), .sg-item:nth-child(2) { border-bottom: 1px solid var(--border); }
}

@media (max-width: 600px) {
  .pv-container { padding: 1.25rem 1rem; }
  .pv-title { font-size: 1.5rem; }
  .pv-sidebar { flex-direction: column; }
  .pcard, .status-card { min-width: auto; }
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .sg-val { font-size: 1.5rem; }
  .sg-item { padding: 20px 10px; }
}
</style>