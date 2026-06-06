<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const activePosition = ref<string | null>(null)

const localizedList = (path: string) => tm(path) as string[]

const contactMethods = [
  { icon: '📧', key: 'email', value: 'public@dreamchaser.ink' },
  { icon: '📱', key: 'phone', value: '+86 17511626718 (工作日)' },
  { icon: '🎮', key: 'qq', value: '106794812' },
  { icon: '📍', key: 'address', value: '北京市房山区北京理工大学良乡校区工训楼' }
]

const positions = [
  { key: 'mechanical', icon: '⚙️' },
  { key: 'electrical', icon: '💡' },
  { key: 'vision', icon: '👁️' },
  { key: 'operation', icon: '💻' }
]

const recruitmentUrl = 'https://dreamchaser.feishu.cn/wiki/ZEMSwWYs4iWZs4knENnczzMNnUd?from=from_copylink'

const openPosition = (key: string) => {
  activePosition.value = key
  document.body.style.overflow = 'hidden'
}

const closePosition = () => {
  activePosition.value = null
  document.body.style.overflow = ''
}

const openRecruitment = () => {
  window.open(recruitmentUrl, '_blank', 'noopener,noreferrer')
}

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="contact-container">
    <div class="contact-header">
      <h1 class="contact-title">{{ t('contact.title') }}</h1>
      <p class="contact-subtitle">{{ t('contact.subtitle') }}</p>
    </div>

    <div class="content-grid">
      <!-- 联系方式 -->
      <section class="contact-section">
        <h2 class="section-title">
          <span class="title-line"></span>
          {{ t('contact.contactInfo') }}
          <span class="title-line"></span>
        </h2>
        
        <div class="contact-cards">
          <div v-for="method in contactMethods" :key="method.key" class="contact-card">
            <div class="contact-icon">{{ method.icon }}</div>
            <div class="contact-details">
              <div class="contact-label">{{ t(`contact.${method.key}`) }}</div>
              <div class="contact-value">{{ method.value }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 加入我们 -->
      <section class="join-section">
        <h2 class="section-title">
          <span class="title-line"></span>
          {{ t('contact.joinUs') }}
          <span class="title-line"></span>
        </h2>
        
        <div class="join-banner">
          <div class="join-banner-content">
            <h3>{{ t('contact.joinTitle') }}</h3>
            <p>{{ t('contact.joinDesc') }}</p>
            <button class="join-btn" type="button" @click="openRecruitment">
              {{ t('contact.recruitment') }}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div class="positions-title">{{ t('contact.positions') }}</div>
        <div class="positions-grid">
          <button
            v-for="pos in positions"
            :key="pos.key"
            class="position-card"
            type="button"
            @click="openPosition(pos.key)"
          >
            <div class="position-icon">{{ pos.icon }}</div>
            <h4 class="position-name">{{ t(`contact.${pos.key}`) }}</h4>
            <p class="position-desc">{{ t(`contact.${pos.key}Desc`) }}</p>
            <span class="position-action">{{ t('contact.viewRequirements') }} →</span>
          </button>
        </div>

      </section>
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="activePosition"
          class="position-modal-backdrop"
          role="presentation"
          @click.self="closePosition"
          @keydown.esc="closePosition"
        >
          <section
            class="position-modal"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="`position-${activePosition}-title`"
          >
            <button class="modal-close" type="button" :aria-label="t('contact.close')" @click="closePosition">×</button>
            <div class="modal-index">RECRUITMENT FILE // {{ activePosition.toUpperCase() }}</div>
            <div class="modal-title-row">
              <span class="modal-icon">{{ positions.find(pos => pos.key === activePosition)?.icon }}</span>
              <div>
                <span>{{ t('contact.technicalPosition') }}</span>
                <h3 :id="`position-${activePosition}-title`">{{ t(`contact.${activePosition}`) }}</h3>
              </div>
            </div>

            <div class="recruitment-paths">
              <div>
                <span>{{ t('contact.generalRecruitment') }}</span>
                <p>{{ t('contact.generalRecruitmentDesc') }}</p>
              </div>
              <div class="special-path">
                <span>{{ t('contact.specialRecruitment') }}</span>
                <p>{{ t('contact.specialRecruitmentDesc') }}</p>
              </div>
            </div>

            <div class="requirement-grid">
              <div v-for="section in ['work', 'learn', 'special']" :key="section" class="requirement-block">
                <span class="requirement-number">0{{ ['work', 'learn', 'special'].indexOf(section) + 1 }}</span>
                <h4>{{ t(`contact.requirementSections.${section}`) }}</h4>
                <ul>
                  <li
                    v-for="item in localizedList(`contact.requirements.${activePosition}.${section}`)"
                    :key="item"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="modal-footer">
              <p>{{ t('contact.requirementNote') }}</p>
              <button type="button" class="join-btn" @click="openRecruitment">
                {{ t('contact.fullRequirements') }} <span aria-hidden="true">↗</span>
              </button>
            </div>
          </section>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.contact-container {
  min-height: 100%;
  padding: 4rem;
  background: $color-bg;
}

.contact-header {
  text-align: center;
  margin-bottom: 4rem;
  
  .contact-title {
    font-family: $font-title;
    font-size: 4rem;
    color: $color-primary;
    @include text-glow;
    margin: 0 0 1rem;
    text-transform: uppercase;
  }
  
  .contact-subtitle {
    font-family: $font-code;
    color: $color-text-dim;
    font-size: 1.2rem;
    letter-spacing: 2px;
  }
}

.content-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  gap: 4rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: $font-title;
  font-size: 2rem;
  color: $color-primary;
  margin-bottom: 2rem;
  text-transform: uppercase;
  
  .title-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent, $color-primary, transparent);
  }
}

// 联系方式卡片
.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.contact-card {
  @include glass-panel;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    border-color: $color-primary;
    box-shadow: 0 0 30px rgba($color-primary, 0.3);
  }
  
  .contact-icon {
    font-size: 3rem;
    flex-shrink: 0;
  }
  
  .contact-details {
    flex: 1;
    
    .contact-label {
      font-family: $font-code;
      color: $color-accent;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
    }
    
    .contact-value {
      font-family: $font-code;
      color: $color-white;
      font-size: 1.1rem;
      word-break: break-all;
    }
  }
}

// 加入我们
.join-section {
  .join-banner {
    min-height: 360px;
    padding: 3rem;
    margin-bottom: 3rem;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba($color-primary, 0.4);
    background:
      linear-gradient(90deg, rgba($color-bg, 0.96) 0%, rgba($color-bg, 0.78) 48%, rgba($color-bg, 0.25) 100%),
      url('/imgs/photo_wall/photo_01.webp') center 42% / cover no-repeat;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border: 1px solid rgba($color-primary, 0.18);
      pointer-events: none;
    }

    .join-banner-content {
      width: min(560px, 100%);
      position: relative;
      z-index: 1;
    }
    
    h3 {
      font-family: $font-title;
      font-size: 2.5rem;
      color: $color-primary;
      margin: 0 0 1rem;
      @include text-glow;
    }
    
    p {
      font-family: $font-code;
      color: $color-text-main;
      font-size: 1.2rem;
      margin: 0 0 2rem;
    }

    .join-btn {
      min-height: 52px;
      padding: 0.85rem 1.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      border: 1px solid $color-primary;
      background: $color-primary;
      color: $color-black;
      font-family: $font-title;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, box-shadow 0.2s;

      &:hover {
        background: $color-bg;
        color: $color-primary;
        box-shadow: 0 0 20px rgba($color-primary, 0.35);
      }
    }
  }
  
  .positions-title {
    font-family: $font-code;
    font-size: 1.5rem;
    color: $color-accent;
    text-align: center;
    margin-bottom: 2rem;
    text-transform: uppercase;
  }
}

.positions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.position-card {
  @include glass-panel;
  width: 100%;
  padding: 2rem;
  text-align: center;
  color: inherit;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: $color-accent;
    box-shadow: 0 0 40px rgba($color-accent, 0.3);
  }
  
  .position-icon {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }
  
  .position-name {
    font-family: $font-title;
    font-size: 1.5rem;
    color: $color-primary;
    margin: 0 0 1rem;
    text-transform: uppercase;
  }
  
  .position-desc {
    font-family: $font-code;
    color: $color-text-dim;
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
  }

  .position-action {
    margin-top: 1.5rem;
    display: inline-block;
    color: $color-accent;
    font-family: $font-code;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
  }
}

.position-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  padding: 2rem;
  display: grid;
  place-items: center;
  overflow-y: auto;
  background: rgba($color-black, 0.82);
  backdrop-filter: blur(8px);
}

.position-modal {
  width: min(920px, 100%);
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba($color-primary, 0.65);
  background:
    linear-gradient(rgba($color-primary, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba($color-primary, 0.035) 1px, transparent 1px),
    #101214;
  background-size: 32px 32px;
  box-shadow: 0 0 60px rgba($color-primary, 0.18);

  &::before {
    content: '';
    width: 140px;
    height: 3px;
    position: absolute;
    top: 0;
    left: 0;
    background: $color-accent;
    box-shadow: 0 0 14px $color-accent;
  }
}

.modal-close {
  width: 42px;
  height: 42px;
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  border: 1px solid rgba($color-primary, 0.4);
  background: rgba($color-black, 0.55);
  color: $color-primary;
  font-size: 1.7rem;
  cursor: pointer;
}

.modal-index {
  color: $color-accent;
  font-family: $font-code;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
}

.modal-title-row {
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 1.25rem;

  .modal-icon {
    font-size: 3.5rem;
  }

  span {
    color: $color-text-dim;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
  }

  h3 {
    margin: 0.15rem 0 0;
    color: $color-primary;
    font-family: $font-title;
    font-size: 2.4rem;
    @include text-glow;
  }
}

.modal-summary {
  max-width: 760px;
  color: $color-text-main;
  line-height: 1.8;
}

.recruitment-paths {
  margin: 1.5rem 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  > div {
    padding: 1rem 1.15rem;
    border-left: 3px solid $color-primary;
    background: rgba($color-primary, 0.06);
  }

  .special-path {
    border-color: $color-accent;
    background: rgba($color-accent, 0.055);

    span {
      color: $color-accent;
    }
  }

  span {
    color: $color-primary;
    font-family: $font-title;
    font-size: 0.9rem;
  }

  p {
    margin: 0.4rem 0 0;
    color: $color-text-dim;
    font-size: 0.78rem;
    line-height: 1.6;
  }
}

.requirement-grid {
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.requirement-block {
  padding: 1.25rem;
  border: 1px solid rgba($color-primary, 0.2);
  background: rgba($color-black, 0.3);

  .requirement-number {
    color: $color-accent;
    font-size: 0.7rem;
  }

  h4 {
    margin: 0.35rem 0 1rem;
    color: $color-primary;
    font-family: $font-title;
    font-size: 1.05rem;
  }

  ul {
    margin: 0;
    padding-left: 1.1rem;
    color: $color-text-dim;
    font-size: 0.84rem;
    line-height: 1.75;
  }

  li::marker {
    color: $color-accent;
  }
}

.modal-footer {
  padding-top: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  border-top: 1px solid rgba($color-primary, 0.18);

  p {
    margin: 0;
    color: $color-text-dim;
    font-size: 0.78rem;
  }

  .join-btn {
    flex-shrink: 0;
    min-height: 46px;
    padding: 0.75rem 1.2rem;
    border: 1px solid $color-primary;
    background: $color-primary;
    color: $color-black;
    font-family: $font-title;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background: $color-bg;
      color: $color-primary;
      box-shadow: 0 0 20px rgba($color-primary, 0.35);
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;

  .position-modal {
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .position-modal {
    opacity: 0;
    transform: translateY(18px) scale(0.98);
  }
}

@media (max-width: 768px) {
  .contact-container {
    padding: 2rem 1rem;
  }

  .contact-header {
    margin-bottom: 3rem;

    .contact-title {
      font-size: 2.5rem;
    }
  }

  .join-section .join-banner {
    min-height: 420px;
    padding: 2rem 1.5rem;
    align-items: flex-end;
    background:
      linear-gradient(0deg, rgba($color-bg, 0.98) 0%, rgba($color-bg, 0.72) 62%, rgba($color-bg, 0.2) 100%),
      url('/imgs/photo_wall/photo_01.webp') center / cover no-repeat;
  }

  .position-modal-backdrop {
    padding: 0.75rem;
    place-items: start center;
  }

  .position-modal {
    margin-block: 0.75rem;
    padding: 1.5rem;
  }

  .modal-title-row h3 {
    font-size: 1.8rem;
  }

  .requirement-grid {
    grid-template-columns: 1fr;
  }

  .recruitment-paths {
    grid-template-columns: 1fr;
  }

  .modal-footer {
    align-items: stretch;
    flex-direction: column;
    gap: 1rem;
  }
}

</style>
