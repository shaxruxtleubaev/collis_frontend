<template>
  <div class="home-view">
    <!-- =============================================
         HERO — Full-bleed gradient + campus backdrop
         ============================================= -->
    <section class="hero">
      <div class="hero-bg"></div>

      <!-- floating decorative blobs -->
      <div class="hero-blob blob-1"></div>
      <div class="hero-blob blob-2"></div>

      <v-container class="hero-container">
        <v-row align="center" class="hero-row">
          <!-- ---- Text column ---- -->
          <v-col cols="12" md="6" lg="7" class="hero-left">
            <v-chip color="white" variant="flat" size="small" class="hero-chip mb-5" elevation="0">
              <v-icon start size="16" color="primary">mdi-school</v-icon>
              <span class="text-primary font-weight-bold">XMUM Student Portal</span>
            </v-chip>

            <h1 class="hero-heading">
              Manage Your&nbsp;Academic
              <span class="hero-heading-accent">Schedule&nbsp;Smarter</span>
            </h1>

            <p class="hero-body">
              Timetables, real-time notifications, and student tools — unified in one
              lightning-fast portal built exclusively for Xiamen&nbsp;University&nbsp;Malaysia.
            </p>

            <div class="hero-cta">
              <v-btn
                v-if="authStore.isAuthenticated"
                :to="{ name: 'timetable' }"
                color="white"
                size="x-large"
                rounded="lg"
                class="cta-primary"
                elevation="6"
              >
                <v-icon start>mdi-calendar-check</v-icon>
                View My Timetable
              </v-btn>
              <v-btn
                v-else
                :to="{ name: 'login' }"
                color="white"
                size="x-large"
                rounded="lg"
                class="cta-primary"
                elevation="6"
              >
                <v-icon start>mdi-login-variant</v-icon>
                Student Login
              </v-btn>

              <v-btn
                href="https://www.xmu.edu.my"
                target="_blank"
                variant="outlined"
                color="white"
                size="x-large"
                rounded="lg"
                class="cta-secondary"
              >
                <v-icon start>mdi-open-in-new</v-icon>
                Visit XMUM
              </v-btn>
            </div>

            <!-- trust bar -->
            <div class="hero-trust">
              <div class="trust-item">
                <v-icon size="18" color="white">mdi-shield-check-outline</v-icon>
                <span>Secure Auth</span>
              </div>
              <div class="trust-sep"></div>
              <div class="trust-item">
                <v-icon size="18" color="white">mdi-cloud-sync-outline</v-icon>
                <span>Real-time Sync</span>
              </div>
              <div class="trust-sep"></div>
              <div class="trust-item">
                <v-icon size="18" color="white">mdi-devices</v-icon>
                <span>Any Device</span>
              </div>
            </div>
          </v-col>

          <!-- ---- Right visual column ---- -->
          <v-col cols="12" md="6" lg="5" class="d-none d-md-flex hero-right">
            <div class="hero-cards-stack">
              <!-- card 1 -->
              <div class="hc hc-1">
                <div class="hc-icon hc-icon-blue">
                  <v-icon color="white" size="22">mdi-calendar-month-outline</v-icon>
                </div>
                <div class="hc-body">
                  <div class="hc-label">Today's Schedule</div>
                  <div class="hc-value">5 classes</div>
                </div>
                <v-icon color="#94A3B8" size="18">mdi-chevron-right</v-icon>
              </div>
              <!-- card 2 -->
              <div class="hc hc-2">
                <div class="hc-icon hc-icon-amber">
                  <v-icon color="white" size="22">mdi-bell-ring-outline</v-icon>
                </div>
                <div class="hc-body">
                  <div class="hc-label">Notifications</div>
                  <div class="hc-value">3 unread</div>
                </div>
                <v-icon color="#94A3B8" size="18">mdi-chevron-right</v-icon>
              </div>
              <!-- card 3 -->
              <div class="hc hc-3">
                <div class="hc-icon hc-icon-green">
                  <v-icon color="white" size="22">mdi-account-check-outline</v-icon>
                </div>
                <div class="hc-body">
                  <div class="hc-label">Profile Status</div>
                  <div class="hc-value">Up to date</div>
                </div>
                <v-icon color="#94A3B8" size="18">mdi-chevron-right</v-icon>
              </div>
              <!-- card 4 -->
              <div class="hc hc-4">
                <div class="hc-icon hc-icon-violet">
                  <v-icon color="white" size="22">mdi-lightning-bolt-outline</v-icon>
                </div>
                <div class="hc-body">
                  <div class="hc-label">Sync Status</div>
                  <div class="hc-value">Live</div>
                </div>
                <div class="live-dot"></div>
              </div>

              <!-- glow behind cards -->
              <div class="cards-glow"></div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- =============================================
         FEATURES — 4 rich cards
         ============================================= -->
    <section class="features">
      <v-container>
        <div class="sec-head text-center mb-12">
          <v-chip color="primary" variant="tonal" size="small" class="mb-3">
            <v-icon start size="14">mdi-star-four-points-outline</v-icon>
            Features
          </v-chip>
          <h2 class="sec-title">Everything You Need</h2>
          <p class="sec-sub">Tools built to simplify your academic life at XMUM</p>
        </div>

        <v-row>
          <v-col v-for="(f, i) in featureCards" :key="i" cols="12" sm="6" lg="3">
            <div class="f-card" :class="'f-card--' + f.accent">
              <div class="f-card-icon" :class="f.bgClass">
                <v-icon :color="f.color" size="28">{{ f.icon }}</v-icon>
              </div>
              <h3 class="f-card-title">{{ f.title }}</h3>
              <p class="f-card-desc">{{ f.desc }}</p>
              <div class="f-card-bar" :class="'bar-' + f.accent"></div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- =============================================
         ABOUT XMUM — split layout
         ============================================= -->
    <section class="about">
      <v-container>
        <v-row align="center">
          <!-- text -->
          <v-col cols="12" lg="6" class="about-text">
            <v-chip color="primary" variant="tonal" size="small" class="mb-3">
              <v-icon start size="14">mdi-information-outline</v-icon>
              About
            </v-chip>
            <h2 class="sec-title text-left">Xiamen University Malaysia</h2>
            <p class="about-p">
              XMUM is the first overseas branch campus of Xiamen University — a leading
              research university in China. Located in Sepang, Selangor, it provides
              world-class education in a multicultural environment.
            </p>
            <p class="about-p mb-8">
              Our commitment to academic excellence and student-centered learning creates
              an environment where students thrive both academically and personally.
            </p>
            <v-btn
              href="https://www.xmu.edu.my"
              target="_blank"
              color="primary"
              size="large"
              rounded="lg"
              class="about-btn"
              elevation="2"
            >
              <v-icon start>mdi-open-in-new</v-icon>
              Learn More About XMUM
            </v-btn>
          </v-col>

          <!-- stat cards -->
          <v-col cols="12" lg="6">
            <div class="stats-grid">
              <div v-for="(s, i) in stats" :key="i" class="stat-card">
                <div class="stat-icon-ring" :class="s.ringClass">
                  <v-icon size="26" :color="s.iconColor">{{ s.icon }}</v-icon>
                </div>
                <div class="stat-val">{{ s.value }}</div>
                <div class="stat-lbl">{{ s.label }}</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- =============================================
         CTA — Guest only
         ============================================= -->
    <section class="cta-band" v-if="!authStore.isAuthenticated">
      <div class="cta-blob cta-blob-1"></div>
      <div class="cta-blob cta-blob-2"></div>
      <v-container class="cta-inner">
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <v-icon size="44" color="white" class="mb-4">mdi-rocket-launch-outline</v-icon>
            <h2 class="cta-heading">Ready to Get Started?</h2>
            <p class="cta-sub-text mb-8">
              Login with your student credentials to access your personalized
              timetable and manage your academic schedule.
            </p>
            <v-btn
              :to="{ name: 'login' }"
              color="white"
              size="x-large"
              rounded="lg"
              class="cta-main-btn"
              elevation="4"
            >
              <v-icon start color="primary">mdi-login-variant</v-icon>
              <span class="text-primary font-weight-bold">Go to Login</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<!-- ================================================================ -->
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const featureCards = [
  {
    icon: 'mdi-calendar-month-outline',
    title: 'Smart Timetable',
    desc: 'View your personalised class schedule at a glance with our intuitive calendar interface.',
    color: '#2563EB', accent: 'blue', bgClass: 'fi-blue'
  },
  {
    icon: 'mdi-bell-ring-outline',
    title: 'Notifications',
    desc: 'Get instant alerts about class changes, cancellations, and important announcements.',
    color: '#F59E0B', accent: 'amber', bgClass: 'fi-amber'
  },
  {
    icon: 'mdi-account-circle-outline',
    title: 'Profile Management',
    desc: 'Manage your profile, update your password, and keep your information always secure.',
    color: '#10B981', accent: 'green', bgClass: 'fi-green'
  },
  {
    icon: 'mdi-lightning-bolt-outline',
    title: 'Real-time Sync',
    desc: 'Your schedule updates instantly across every device — no manual refresh needed.',
    color: '#8B5CF6', accent: 'violet', bgClass: 'fi-violet'
  }
]

const stats = [
  { icon: 'mdi-account-group-outline', value: '8 000+', label: 'Students', iconColor: '#2563EB', ringClass: 'ring-blue' },
  { icon: 'mdi-book-open-page-variant-outline', value: '50+', label: 'Programs', iconColor: '#F59E0B', ringClass: 'ring-amber' },
  { icon: 'mdi-earth', value: '50', label: 'Countries', iconColor: '#10B981', ringClass: 'ring-green' },
  { icon: 'mdi-trophy-outline', value: 'Top', label: 'Tier 1 University', iconColor: '#8B5CF6', ringClass: 'ring-violet' },
]
</script>

<!-- ================================================================ -->
<style scoped>
/* ===================
   HERO
   =================== */
.hero {
  position: relative;
  min-height: 94vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(160deg, rgba(30, 64, 175, 0.94) 0%, rgba(37, 99, 235, 0.88) 40%, rgba(59, 130, 246, 0.85) 100%),
    url('/src/assets/xmum_campus.webp') center / cover no-repeat;
  background-attachment: fixed;
}

.hero-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.18;
  z-index: 1;
}
.blob-1 { width: 500px; height: 500px; background: #7C3AED; top: -120px; right: -60px; }
.blob-2 { width: 380px; height: 380px; background: #06B6D4; bottom: -80px; left: -80px; }

.hero-container { position: relative; z-index: 2; }
.hero-row { min-height: 520px; }

/* --- left text --- */
.hero-left { color: white; }

.hero-chip { backdrop-filter: blur(6px); }

.hero-heading {
  font-size: 3.6rem;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -2px;
  color: white;
  margin-bottom: 1.25rem;
}

.hero-heading-accent {
  display: block;
  background: linear-gradient(90deg, #93C5FD 0%, #C4B5FD 50%, #FDE68A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-body {
  font-size: 1.15rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.88);
  max-width: 520px;
  margin-bottom: 2rem;
}

.hero-cta { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 2.5rem; }

.cta-primary {
  text-transform: none !important;
  font-weight: 700;
  color: var(--primary) !important;
  letter-spacing: 0;
}
.cta-secondary {
  text-transform: none !important;
  font-weight: 600;
  letter-spacing: 0;
  border-color: rgba(255,255,255,0.45) !important;
}

/* trust bar */
.hero-trust {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255,255,255,0.72);
  font-size: 0.85rem;
  font-weight: 500;
}
.trust-sep { width: 1px; height: 18px; background: rgba(255,255,255,0.25); }

/* --- right visual cards --- */
.hero-right { justify-content: center; align-items: center; }

.hero-cards-stack {
  position: relative;
  width: 340px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cards-glow {
  position: absolute;
  inset: -30px;
  border-radius: 28px;
  background: radial-gradient(circle at center, rgba(255,255,255,0.07) 0%, transparent 70%);
  z-index: 0;
  pointer-events: none;
}

.hc {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  animation: slideUp 0.5s ease-out both;
}

.hc-1 { animation-delay: 0.1s; }
.hc-2 { animation-delay: 0.25s; }
.hc-3 { animation-delay: 0.4s; }
.hc-4 { animation-delay: 0.55s; }

@keyframes slideUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hc-icon {
  width: 42px; height: 42px; min-width: 42px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
}
.hc-icon-blue   { background: #2563EB; }
.hc-icon-amber  { background: #F59E0B; }
.hc-icon-green  { background: #10B981; }
.hc-icon-violet { background: #8B5CF6; }

.hc-body { flex: 1; min-width: 0; }
.hc-label { font-size: 0.8rem; color: rgba(255,255,255,0.65); font-weight: 500; }
.hc-value { font-size: 1rem; font-weight: 700; }

.live-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 0 3px rgba(16,185,129,0.35);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(16,185,129,0.35); }
  50%      { box-shadow: 0 0 0 7px rgba(16,185,129,0.15); }
}

/* ===================
   FEATURES
   =================== */
.features {
  padding: 100px 0;
  background: var(--bg-primary);
}

.sec-head { max-width: 540px; margin-left: auto; margin-right: auto; }

.sec-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -1px;
  line-height: 1.15;
}
.sec-sub {
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
  line-height: 1.6;
}

.f-card {
  position: relative;
  background: white;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 28px 24px 24px;
  height: 100%;
  transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
  overflow: hidden;
}
.f-card:hover {
  border-color: transparent;
  box-shadow: 0 20px 50px rgba(15,23,42,0.10);
  transform: translateY(-6px);
}

.f-card-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.f-card:hover .f-card-bar { opacity: 1; }
.bar-blue   { background: #2563EB; }
.bar-amber  { background: #F59E0B; }
.bar-green  { background: #10B981; }
.bar-violet { background: #8B5CF6; }

.f-card-icon {
  width: 54px; height: 54px;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}
.f-card:hover .f-card-icon { transform: scale(1.1); }

.fi-blue   { background: #EFF6FF; }
.fi-amber  { background: #FFFBEB; }
.fi-green  { background: #ECFDF5; }
.fi-violet { background: #F5F3FF; }

.f-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}
.f-card-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0;
}

/* ===================
   ABOUT
   =================== */
.about {
  padding: 100px 0;
  background: white;
}

.about-p {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 1rem;
}

.about-btn {
  text-transform: none !important;
  font-weight: 600;
  letter-spacing: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-card {
  text-align: center;
  padding: 30px 16px;
  border-radius: 18px;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}
.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 28px rgba(37,99,235,0.08);
}

.stat-icon-ring {
  width: 52px; height: 52px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 14px;
}
.ring-blue   { background: #DBEAFE; }
.ring-amber  { background: #FEF3C7; }
.ring-green  { background: #D1FAE5; }
.ring-violet { background: #EDE9FE; }

.stat-val {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 2px;
}
.stat-lbl {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
}

/* ===================
   CTA
   =================== */
.cta-band {
  position: relative;
  padding: 90px 0;
  background: linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #3B82F6 100%);
  overflow: hidden;
}

.cta-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.08;
  background: white;
}
.cta-blob-1 { width: 400px; height: 400px; top: -120px; right: -100px; }
.cta-blob-2 { width: 300px; height: 300px; bottom: -80px; left: -60px; }

.cta-inner { position: relative; z-index: 2; }

.cta-heading {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  letter-spacing: -1px;
  margin-bottom: 0.6rem;
}
.cta-sub-text {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.82);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.7;
}
.cta-main-btn {
  text-transform: none !important;
  font-weight: 700;
  letter-spacing: 0;
}

/* ===================
   RESPONSIVE
   =================== */
@media (max-width: 1264px) {
  .hero-heading { font-size: 3rem; }
}

@media (max-width: 960px) {
  .hero { min-height: auto; padding: 56px 0 48px; }
  .hero-heading { font-size: 2.5rem; letter-spacing: -1px; }
  .hero-body { font-size: 1rem; }
  .hero-row { min-height: auto; }
  .sec-title { font-size: 2rem; }
  .cta-heading { font-size: 2rem; }
}

@media (max-width: 600px) {
  .hero { padding: 36px 0 32px; }
  .hero-heading { font-size: 2rem; letter-spacing: -0.5px; }
  .hero-body { font-size: 0.95rem; }
  .hero-cta { flex-direction: column; }
  .hero-cta :deep(.v-btn) { width: 100%; }
  .hero-trust { gap: 10px; }
  .trust-sep { display: none; }
  .features, .about { padding: 60px 0; }
  .cta-band { padding: 60px 0; }
  .sec-title { font-size: 1.7rem; }
  .cta-heading { font-size: 1.7rem; }
  .stats-grid { gap: 10px; }
  .stat-card { padding: 20px 12px; }
}
</style>
