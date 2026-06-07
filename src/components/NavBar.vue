<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const route = useRoute()
const isMenuOpen = ref(false)

const navItems = computed(() => [
  { to: '/', label: t('nav.dashboard') },
  { to: '/robots', label: t('nav.arsenal') },
  { to: '/about', label: t('nav.about') },
  { to: '/team', label: t('nav.crew') },
  { to: '/sparks', label: t('nav.knowledge') },
  { to: '/merch', label: t('nav.ipStore') }
])

const toggleLanguage = () => {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

watch(() => route.fullPath, closeMenu)
</script>

<template>
  <nav class="nav-bar" :class="{ 'menu-open': isMenuOpen }">
    <div class="brand">
      <div class="logo-icon">
        <img src="/imgs/logo.png" alt="DreamChaser Logo" />
      </div>
      <span class="logo-text">DreamChaser</span>
    </div>

    <div class="actions">
      <button class="lang-btn" @click="toggleLanguage">
        {{ locale === 'zh-CN' ? 'EN' : '中' }}
      </button>
      <button
        class="menu-btn"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-label="Toggle navigation menu"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="links" :class="{ open: isMenuOpen }">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        @click="closeMenu"
      >
        [ {{ item.label }} ]
      </router-link>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 2rem;
  height: 100%;
  gap: 1rem;
  position: relative;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  margin-right: auto;

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
    white-space: nowrap;
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: 0.5rem;
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
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      border-left: 2px solid $color-accent;
      transition: height 0.2s;
      height: 0;
    }

    &:hover::before {
      height: 100%;
    }
  }
}

.lang-btn,
.menu-btn {
  font-family: $font-code;
  font-size: 0.9rem;
  padding: 4px 12px;
  background: rgba($color-primary, 0.1);
  border: 1px solid rgba($color-primary, 0.3);
  color: $color-primary;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
}

.lang-btn:hover,
.menu-btn:hover {
  background: rgba($color-primary, 0.2);
  border-color: $color-primary;
  @include text-glow;
}

.menu-btn {
  width: 42px;
  height: 42px;
  padding: 0;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  span {
    width: 18px;
    height: 2px;
    background: currentColor;
    transition: transform 0.25s ease, opacity 0.25s ease;
  }
}

.menu-open .menu-btn span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-open .menu-btn span:nth-child(2) {
  opacity: 0;
}

.menu-open .menu-btn span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 1024px) {
  .nav-bar {
    padding: 0 1.5rem;
  }

  .links {
    gap: 1rem;

    a {
      font-size: 0.82rem;
    }
  }
}

@media (max-width: 768px) {
  .nav-bar {
    padding: 0 1rem;
    justify-content: space-between;
  }

  .brand .logo-icon {
    width: 34px;
    height: 34px;
  }

  .brand .logo-text {
    font-size: 1rem;
  }

  .menu-btn {
    display: inline-flex;
  }

  .actions {
    margin-left: 0;
  }

  .links {
    position: absolute;
    top: calc(100% + 1px);
    left: 0;
    right: 0;
    z-index: 120;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    max-height: calc(100dvh - var(--top-bar-height) - 1rem);
    padding: 0.5rem 1rem 1rem;
    overflow-y: auto;
    border-bottom: 1px solid rgba($color-primary, 0.2);
    background: rgba($color-bg, 0.96);
    backdrop-filter: blur(12px);

    &.open {
      display: flex;
    }

    a {
      padding: 0.9rem 0.75rem;
      border-bottom: 1px solid rgba($color-primary, 0.12);
      font-size: 0.95rem;
    }
  }
}

@media (max-width: 480px) {
  .nav-bar {
    padding: 0 0.875rem;
  }

  .brand {
    gap: 0.625rem;
  }

  .brand .logo-text {
    max-width: 150px;
    text-overflow: ellipsis;
  }

  .lang-btn {
    padding-inline: 10px;
  }
}
</style>
