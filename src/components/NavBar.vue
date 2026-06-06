<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const toggleLanguage = () => {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}
</script>

<template>
  <nav class="nav-bar">
    <div class="brand">
      <div class="logo-icon">
        <img src="/imgs/logo.png" alt="DreamChaser Logo" />
      </div>
      <span class="logo-text">DreamChaser</span>
    </div>
    <div class="links">
      <router-link to="/">[ {{ t('nav.dashboard') }} ]</router-link>
      <router-link to="/robots">[ {{ t('nav.arsenal') }} ]</router-link>
      <router-link to="/about">[ {{ t('nav.about') }} ]</router-link>
      <router-link to="/team">[ {{ t('nav.crew') }} ]</router-link>
      <router-link to="/sparks">[ {{ t('nav.knowledge') }} ]</router-link>
      <router-link to="/merch">[ {{ t('nav.ipStore') }} ]</router-link>
      <button class="lang-btn" @click="toggleLanguage">
        {{ locale === 'zh-CN' ? 'EN' : '中' }}
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 100%;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  
  .logo-icon {
    width: 40px;
    height: 40px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 4px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .logo-text {
    font-family: $font-title;
    font-weight: 700;
    font-size: 1.2rem;
    letter-spacing: 1px;
    display: inline-block;
    overflow: hidden;
    
    .highlight {
      color: $color-primary;
    }
  }
}

.links {
  display: flex;
  gap: 2rem;
  align-items: center;

  a {
    font-family: $font-code;
    font-size: 0.9rem;
    position: relative;
    padding: 4px 8px;
    
    &.router-link-active {
      color: $color-primary;
      background: rgba($color-primary, 0.1);
      border: 1px solid rgba($color-primary, 0.3);
      @include text-glow;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 0; height: 100%;
      border-left: 2px solid $color-accent;
      transition: height 0.2s;
      height: 0;
    }
    
    &:hover::before {
      height: 100%;
    }
  }

  .lang-btn {
    font-family: $font-code;
    font-size: 0.9rem;
    padding: 4px 12px;
    background: rgba($color-primary, 0.1);
    border: 1px solid rgba($color-primary, 0.3);
    color: $color-primary;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: bold;

    &:hover {
      background: rgba($color-primary, 0.2);
      border-color: $color-primary;
      @include text-glow;
    }
  }
}
</style>
