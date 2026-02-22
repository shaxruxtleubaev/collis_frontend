<template>
  <div class="collis-app-landing">
    <!-- ========== SECTION 1: HERO + MOCKUPS + DOWNLOAD ========== -->
    <section class="hero-section">
      <div class="hero-bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
      </div>
      <v-container>
        <v-row align="center" class="hero-row">
          <!-- Left: Text + Download -->
          <v-col cols="12" md="6" class="hero-text-col">
            <v-chip color="primary" variant="flat" size="small" class="mb-4">
              <v-icon start size="14">mdi-cellphone</v-icon>
              Mobile App — MVP
            </v-chip>
            <h1 class="hero-title">
              Your Campus Life,<br />
              <span class="gradient-text">Right in Your Pocket</span>
            </h1>
            <p class="hero-subtitle">
              College Live Schedule Mobile brings your timetable, notifications, and academic tools
              together in one beautifully designed Android app. Stay organized and never
              miss a class.
            </p>

            <!-- Download Button -->
            <v-btn
              size="x-large"
              color="primary"
              class="download-btn mb-6"
              :href="apkDownloadUrl"
              download
              rounded="lg"
              elevation="8"
            >
              <v-icon start>mdi-download</v-icon>
              Download APK
            </v-btn>

            <!-- Info chips -->
            <div class="info-chips">
              <v-chip variant="tonal" color="primary" size="small">
                <v-icon start size="14">mdi-android</v-icon>
                Android
              </v-chip>
              <v-chip variant="tonal" color="success" size="small">
                <v-icon start size="14">mdi-currency-usd-off</v-icon>
                Free
              </v-chip>
              <v-chip variant="tonal" color="secondary" size="small">
                <v-icon start size="14">mdi-tag-outline</v-icon>
                v1.0 MVP
              </v-chip>
              <v-chip variant="tonal" color="warning" size="small">
                <v-icon start size="14">mdi-shield-check</v-icon>
                Secure
              </v-chip>
            </div>
          </v-col>

          <!-- Right: Phone Mockups -->
          <v-col cols="12" md="6" class="hero-mockup-col">
            <div class="mockup-container">
              <!-- Back Phone: Notifications -->
              <div class="phone-mockup phone-back">
                <div class="phone-frame">
                  <div class="phone-notch"></div>
                  <div class="phone-screen">
                    <div class="screen-content screen-notifications">
                      <div class="mock-status-bar">
                        <span>9:41</span>
                        <div class="mock-status-icons"><span>📶</span><span>🔋</span></div>
                      </div>
                      <div class="mock-header-bar notification-header">
                        <v-icon size="18" color="white">mdi-bell</v-icon>
                        <span>Notifications</span>
                      </div>
                      <div class="mock-notification-list">
                        <div class="mock-notification-item" v-for="n in notifications" :key="n.title">
                          <div class="notif-icon-circle" :class="n.bg">
                            <v-icon size="14" color="white">{{ n.icon }}</v-icon>
                          </div>
                          <div class="notif-text">
                            <div class="notif-title">{{ n.title }}</div>
                            <div class="notif-desc">{{ n.desc }}</div>
                          </div>
                          <div class="notif-time">{{ n.time }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Front Phone: Timetable -->
              <div class="phone-mockup phone-front">
                <div class="phone-frame">
                  <div class="phone-notch"></div>
                  <div class="phone-screen">
                    <div class="screen-content screen-timetable">
                      <div class="mock-status-bar">
                        <span>9:41</span>
                        <div class="mock-status-icons"><span>📶</span><span>🔋</span></div>
                      </div>
                      <div class="mock-header-bar timetable-header">
                        <v-icon size="18" color="white">mdi-calendar</v-icon>
                        <span>My Timetable</span>
                      </div>
                      <div class="mock-day-tabs">
                        <span class="day-tab">Mon</span>
                        <span class="day-tab active">Tue</span>
                        <span class="day-tab">Wed</span>
                        <span class="day-tab">Thu</span>
                        <span class="day-tab">Fri</span>
                      </div>
                      <div class="mock-timetable-list">
                        <div v-for="c in classes" :key="c.name" class="mock-class-card" :class="c.color">
                          <div class="class-time">{{ c.time }}</div>
                          <div class="class-name">{{ c.name }}</div>
                          <div class="class-detail">
                            <v-icon size="12" color="white">mdi-map-marker</v-icon>
                            {{ c.room }}
                          </div>
                        </div>
                      </div>
                      <div class="mock-bottom-nav">
                        <div class="bnav-item active">
                          <v-icon size="18" color="primary">mdi-calendar</v-icon>
                          <span>Timetable</span>
                        </div>
                        <div class="bnav-item">
                          <v-icon size="18" color="#94A3B8">mdi-bell-outline</v-icon>
                          <span>Alerts</span>
                        </div>
                        <div class="bnav-item">
                          <v-icon size="18" color="#94A3B8">mdi-account-outline</v-icon>
                          <span>Profile</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ========== SECTION 2: COMPACT FEATURES + FOOTER ========== -->
    <section class="features-strip">
      <v-container>
        <div class="strip-header text-center mb-8">
          <h2 class="strip-title">What's Inside</h2>
          <p class="strip-subtitle">Key capabilities packed into the mobile experience</p>
        </div>
        <v-row>
          <v-col v-for="(f, i) in features" :key="i" cols="6" sm="4" md="2">
            <div class="feature-tile text-center">
              <div class="tile-icon" :class="f.bg">
                <v-icon :color="f.iconColor" size="26">{{ f.icon }}</v-icon>
              </div>
              <div class="tile-label">{{ f.title }}</div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <footer class="app-footer">
      <v-container>
        <p class="footer-text text-center">
          © {{ currentYear }} College Live Schedule — Xiamen University Malaysia. All rights reserved.
        </p>
      </v-container>
    </footer>
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

// ===== APK download path (served from public/) =====
const apkDownloadUrl = '/collis.apk'

const notifications = [
  { icon: 'mdi-calendar-alert', title: 'Class Rescheduled', desc: 'CSC3100 moved to Room B203', time: '2m', bg: 'bg-blue' },
  { icon: 'mdi-check-circle', title: 'Attendance Marked', desc: 'MAT2010 - Present', time: '15m', bg: 'bg-green' },
  { icon: 'mdi-alert', title: 'Venue Change', desc: 'ENG2001 at Hall A', time: '1h', bg: 'bg-orange' },
  { icon: 'mdi-bullhorn', title: 'Announcement', desc: 'Mid-term schedule published', time: '3h', bg: 'bg-purple' },
]

const classes = [
  { time: '08:00 - 10:00', name: 'CSC3100 - Data Structures', room: 'Room A301', color: 'card-blue' },
  { time: '10:30 - 12:30', name: 'MAT2010 - Linear Algebra', room: 'Room B102', color: 'card-green' },
  { time: '14:00 - 16:00', name: 'ENG2001 - Academic Writing', room: 'Hall C', color: 'card-purple' },
]

const features = [
  { icon: 'mdi-calendar-clock', title: 'Timetable', bg: 'tile-blue', iconColor: '#2563EB' },
  { icon: 'mdi-bell-ring', title: 'Notifications', bg: 'tile-orange', iconColor: '#F59E0B' },
  { icon: 'mdi-account-circle', title: 'Profile', bg: 'tile-green', iconColor: '#10B981' },
  { icon: 'mdi-cloud-sync', title: 'Cloud Sync', bg: 'tile-purple', iconColor: '#8B5CF6' },
  { icon: 'mdi-shield-lock', title: 'Secure', bg: 'tile-red', iconColor: '#EF4444' },
  { icon: 'mdi-lightning-bolt', title: 'Fast', bg: 'tile-cyan', iconColor: '#06B6D4' },
]
</script>

<style scoped>
/* ==============================
   HERO
   ============================== */
.hero-section {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 50%, #E0E7FF 100%);
  padding: 70px 0 50px;
  min-height: 85vh;
  display: flex;
  align-items: center;
}
.hero-bg-shapes .shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.07;
}
.shape-1 { width: 550px; height: 550px; background: var(--primary); top: -180px; right: -80px; }
.shape-2 { width: 380px; height: 380px; background: #8B5CF6; bottom: -100px; left: -120px; }

.hero-row { min-height: 480px; }
.hero-text-col { z-index: 2; }

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.15;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
  letter-spacing: -1.5px;
}
.gradient-text {
  background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-subtitle {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 500px;
  margin-bottom: 1.75rem;
}
.download-btn {
  text-transform: none !important;
  font-weight: 600;
  letter-spacing: 0;
  padding: 0 32px !important;
}
.info-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* ==============================
   PHONE MOCKUPS
   ============================== */
.hero-mockup-col { z-index: 2; }
.mockup-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}
.phone-mockup { position: absolute; }
.phone-front {
  z-index: 3;
  right: 20%;
  animation: floatFront 6s ease-in-out infinite;
}
.phone-back {
  z-index: 2;
  right: 2%;
  transform: perspective(800px) rotateY(-12deg) scale(0.92);
  opacity: 0.85;
  animation: floatBack 6s ease-in-out infinite;
}
@keyframes floatFront {
  0%, 100% { transform: perspective(800px) rotateY(-5deg) translateY(0); }
  50% { transform: perspective(800px) rotateY(-5deg) translateY(-12px); }
}
@keyframes floatBack {
  0%, 100% { transform: perspective(800px) rotateY(-12deg) scale(0.92) translateY(0); }
  50% { transform: perspective(800px) rotateY(-12deg) scale(0.92) translateY(-8px); }
}
.phone-frame {
  width: 230px;
  height: 470px;
  background: #1A1A2E;
  border-radius: 30px;
  padding: 7px;
  box-shadow: 0 25px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset;
  position: relative;
}
.phone-notch {
  position: absolute;
  top: 7px;
  left: 50%;
  transform: translateX(-50%);
  width: 76px;
  height: 20px;
  background: #1A1A2E;
  border-radius: 0 0 13px 13px;
  z-index: 10;
}
.phone-screen {
  width: 100%;
  height: 100%;
  border-radius: 23px;
  overflow: hidden;
  background: #F8FAFC;
}
.screen-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Status & Header Bars */
.mock-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 12px;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  z-index: 5;
}
.mock-status-icons { display: flex; gap: 4px; font-size: 8px; }
.mock-header-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 700;
  color: white;
}
.timetable-header { background: linear-gradient(135deg, #2563EB, #3B82F6); }
.notification-header { background: linear-gradient(135deg, #F59E0B, #FBBF24); }
.screen-timetable .mock-status-bar { background: #2563EB; }
.screen-notifications .mock-status-bar { background: #F59E0B; }

/* Day Tabs */
.mock-day-tabs { display: flex; justify-content: space-around; padding: 7px 8px; background: #F1F5F9; }
.day-tab { font-size: 10px; font-weight: 600; color: #94A3B8; padding: 4px 10px; border-radius: 12px; }
.day-tab.active { background: #2563EB; color: white; }

/* Timetable Cards */
.mock-timetable-list { flex: 1; padding: 8px 10px; display: flex; flex-direction: column; gap: 7px; overflow: hidden; }
.mock-class-card { border-radius: 10px; padding: 9px 11px; color: white; }
.card-blue { background: linear-gradient(135deg, #2563EB, #60A5FA); }
.card-green { background: linear-gradient(135deg, #10B981, #6EE7B7); }
.card-purple { background: linear-gradient(135deg, #8B5CF6, #C4B5FD); }
.class-time { font-size: 9px; font-weight: 600; opacity: 0.9; }
.class-name { font-size: 11px; font-weight: 700; margin: 2px 0; }
.class-detail { font-size: 9px; display: flex; align-items: center; gap: 3px; opacity: 0.85; }

/* Bottom Nav */
.mock-bottom-nav { display: flex; justify-content: space-around; padding: 7px 0; border-top: 1px solid #E2E8F0; background: white; }
.bnav-item { display: flex; flex-direction: column; align-items: center; gap: 2px; font-size: 8px; color: #94A3B8; }
.bnav-item.active { color: #2563EB; }
.bnav-item.active span { color: #2563EB; font-weight: 700; }

/* Notification list */
.mock-notification-list { flex: 1; padding: 8px 10px; display: flex; flex-direction: column; gap: 6px; overflow: hidden; }
.mock-notification-item { display: flex; align-items: center; gap: 8px; padding: 7px; background: white; border-radius: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.notif-icon-circle { width: 26px; height: 26px; min-width: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.bg-blue { background: #2563EB; }
.bg-green { background: #10B981; }
.bg-orange { background: #F59E0B; }
.bg-purple { background: #8B5CF6; }
.notif-text { flex: 1; min-width: 0; }
.notif-title { font-size: 10px; font-weight: 700; color: var(--text-primary); }
.notif-desc { font-size: 8px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.notif-time { font-size: 8px; color: var(--text-tertiary); white-space: nowrap; }

/* ==============================
   FEATURES STRIP
   ============================== */
.features-strip {
  padding: 60px 0;
  background: white;
}
.strip-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}
.strip-subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-top: 0.4rem;
}
.feature-tile {
  padding: 20px 8px;
  transition: transform 0.25s ease;
}
.feature-tile:hover { transform: translateY(-4px); }
.tile-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
}
.tile-blue { background: #EFF6FF; }
.tile-orange { background: #FFFBEB; }
.tile-green { background: #ECFDF5; }
.tile-purple { background: #F5F3FF; }
.tile-red { background: #FEF2F2; }
.tile-cyan { background: #ECFEFF; }
.tile-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* ==============================
   FOOTER
   ============================== */
.app-footer { padding: 20px 0; background: #0F172A; }
.footer-text { color: #64748B; font-size: 0.85rem; margin: 0; }

/* ==============================
   RESPONSIVE
   ============================== */
@media (max-width: 960px) {
  .hero-section { padding: 40px 0 30px; min-height: auto; }
  .hero-title { font-size: 2.2rem; }
  .mockup-container { height: 400px; margin-top: 32px; }
  .phone-frame { width: 195px; height: 400px; border-radius: 24px; }
  .phone-notch { width: 60px; height: 16px; }
  .phone-front { right: 15%; }
  .phone-back { right: 0%; }
}
@media (max-width: 600px) {
  .hero-title { font-size: 1.85rem; letter-spacing: -0.5px; }
  .hero-subtitle { font-size: 0.95rem; }
  .mockup-container { height: 360px; }
  .phone-frame { width: 165px; height: 340px; border-radius: 20px; }
  .phone-notch { width: 50px; height: 14px; }
  .phone-front { right: 10%; }
  .phone-back { right: -5%; }
  .features-strip { padding: 40px 0; }
}
</style>
