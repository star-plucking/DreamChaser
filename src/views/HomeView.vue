<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const stats = computed(() => [
  { label: t('home.stats.coreCodeLines'), value: '10,543,855', unit: t('home.units.loc') },
  { label: t('home.stats.totalPoints'), value: '11.300', unit: t('home.units.points') },
  { label: t('home.stats.ranking'), value: '43', unit: t('home.units.rank') },
  { label: t('home.stats.activeOperatives'), value: '50+', unit: t('home.units.personnel') }
])

const news = ref([
  { id: 1, date: '2026-08-01', title: 'RMUC机甲大师曹集对抗赛超级对抗赛全国赛', category: 'COMPETITION' },
  { id: 2, date: '2026-05-29', title: 'RMUC机甲大师超级对抗赛北部分区赛', category: 'COMPETITION' },
  { id: 3, date: '2026-03-29', title: 'RMUL机甲大师高校联盟赛亚军', category: 'COMPETITION' },
  { id: 4, date: '2025-11-30', title: '“追梦杯”机器人校内赛决赛', category: 'COMPETITION' },
  { id: 5, date: '2025-09-13', title: '机器人队秋招正式启动', category: 'EVENT' },
  { id: 6, date: '2025-05-26', title: 'RMUC机甲大师超级对抗赛东部分区赛', category: 'COMPETITION' }
])
</script>

<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      
      <div class="hero-content">
        <div class="hero-text">
          <div class="title-wrapper">
            <h1 class="glitch-title" :data-text="t('home.title')">{{ t('home.title') }}</h1>
          </div>
          <p class="subtitle">{{ t('home.subtitle') }}</p>
        </div>
        
        <div class="action-btn">
          <router-link to="/robots" class="cyber-btn">
            <span class="btn-content">{{ t('home.accessArsenal') }}</span>
            <span class="btn-glitch"></span>
          </router-link>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <div class="stat-value">{{ stat.value }}<span class="stat-unit">{{ stat.unit }}</span></div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-deco"></div>
        </div>
      </div>
    </section>

    <!-- News Ticker / Quick Access -->
    <section class="quick-news">
      <div class="section-title">{{ t('home.latestIntel') }}</div>
      <div class="news-list">
        <div v-for="item in news" :key="item.id" class="news-item">
          <span class="news-date">[{{ item.date }}]</span>
          <span class="news-category">_{{ item.category }}_</span>
          <span class="news-title">{{ item.title }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.hero-section {
  position: relative;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 4rem;
  overflow: hidden;

  /* Hero Background */
  .hero-bg {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-image: url('/imgs/hjy.webp');
    background-size: cover;
    background-position: center;
    filter: grayscale(80%) contrast(120%) brightness(0.6);
    z-index: -2;
  }

  /* Grid Overlay */
  .hero-overlay {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: 
      linear-gradient(90deg, rgba($color-bg, 0.8) 0%, rgba($color-bg, 0.2) 50%, rgba($color-bg, 0.8) 100%),
      repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba($color-primary, 0.1) 3px);
    z-index: -1;
  }
}

.hero-content {
  z-index: 2;
  max-width: 800px;
  
  .subtitle {
    font-family: $font-code;
    color: $color-primary;
    margin-top: 1rem;
    letter-spacing: 2px;
    opacity: 0.8;
  }
}

.title-wrapper {
  overflow: hidden;
  display: inline-block;
  position: relative;
  contain: paint;
}

.glitch-title {
  font-family: $font-title;
  font-size: 5rem;
  font-weight: 900;
  text-transform: uppercase;
  position: relative;
  color: #fff;
  line-height: 1;
  display: inline-block;
  
  /* Simple Glitch Effect */
  &::before, &::after {
    content: attr(data-text);
    position: absolute;
    top: 0; 
    left: 0; 
    right: 0;
    bottom: 0;
    background: transparent;
    clip-path: inset(0);
  }
  
  &::before {
    transform: translateX(2px);
    text-shadow: -1px 0 $color-secondary;
    clip: rect(44px, 9999px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
  }
  
  &::after {
    transform: translateX(-2px);
    text-shadow: -1px 0 $color-primary;
    clip: rect(44px, 9999px, 56px, 0);
    animation: glitch-anim2 5s infinite linear alternate-reverse;
  }
}

@keyframes glitch-anim {
  0% { clip: rect(31px, 9999px, 92px, 0); }
  20% { clip: rect(4px, 9999px, 3px, 0); }
  40% { clip: rect(28px, 9999px, 86px, 0); }
  60% { clip: rect(11px, 9999px, 34px, 0); }
  80% { clip: rect(98px, 9999px, 60px, 0); }
  100% { clip: rect(74px, 9999px, 14px, 0); }
}
@keyframes glitch-anim2 {
  0% { clip: rect(21px, 9999px, 12px, 0); }
  20% { clip: rect(84px, 9999px, 90px, 0); }
  40% { clip: rect(6px, 9999px, 43px, 0); }
  60% { clip: rect(54px, 9999px, 6px, 0); }
  80% { clip: rect(18px, 9999px, 55px, 0); }
  100% { clip: rect(34px, 9999px, 9px, 0); }
}

/* Cyber Button */
.cyber-btn {
  display: inline-block;
  margin-top: 3rem;
  padding: 1rem 3rem;
  background: transparent;
  border: 1px solid $color-primary;
  color: $color-primary;
  font-family: $font-title;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
  
  &:hover {
    background: rgba($color-primary, 0.1);
    box-shadow: 0 0 20px rgba($color-primary, 0.4);
    text-shadow: 0 0 8px $color-primary;
  }
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: auto;
  margin-bottom: 2rem;
  z-index: 2;
  
  .stat-card {
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba($color-text-dim, 0.3);
    padding: 1rem;
    position: relative;
    backdrop-filter: blur(5px);
    
    .stat-value {
      font-family: $font-title;
      font-size: 2rem;
      color: $color-white;
      font-weight: bold;
    }
    
    .stat-unit {
      font-size: 0.8rem;
      color: $color-primary;
      margin-left: 0.5rem;
    }
    
    .stat-label {
      font-size: 0.8rem;
      color: $color-text-dim;
      letter-spacing: 1px;
    }
    
    .stat-deco {
      position: absolute;
      top: 0; right: 0;
      width: 10px; height: 10px;
      border-top: 2px solid $color-primary;
      border-right: 2px solid $color-primary;
    }
  }
}

.quick-news {
  background: $color-bg;
  padding: 2rem 4rem;
  border-top: 1px solid rgba($color-primary, 0.2);
  
  .section-title {
    color: $color-accent;
    font-family: $font-title;
    margin-bottom: 1rem;
  }
  
  .news-item {
    display: flex;
    gap: 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    font-family: $font-code;
    font-size: 0.9rem;
    color: $color-text-dim;
    transition: 0.2s;
    cursor: pointer;
    
    &:hover {
      color: $color-primary;
      padding-left: 10px;
    }
    
    .news-category {
      color: $color-text-main;
    }
  }
}
</style>
