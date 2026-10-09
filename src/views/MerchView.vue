<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue'
import { Mail, Phone, MessageSquare, MapPin, Cog, CircuitBoard, ScanEye, Code2 } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const recruitmentImage = `url("${import.meta.env.BASE_URL}imgs/photo_wall/photo_01.webp")`
const activePosition = ref<string | null>(null)
const modalRef = ref<HTMLElement | null>(null)
const modalCloseButton = ref<HTMLButtonElement | null>(null)
let previousFocus: HTMLElement | null = null
let previousBodyOverflow = ''

const localizedList = (path: string) => tm(path) as string[]

const contactMethods = [
  { icon: Mail, key: 'email', value: 'public@dreamchaser.ink', href: 'mailto:public@dreamchaser.ink' },
  { icon: Phone, key: 'phone', valueKey: 'phoneValue', href: 'tel:+8617511626718' },
  { icon: MessageSquare, key: 'qq', value: '1092034753' },
  { icon: MapPin, key: 'address', valueKey: 'addressValue' }
]

const positions = [
  { key: 'mechanical', icon: Cog },
  { key: 'electrical', icon: CircuitBoard },
  { key: 'vision', icon: ScanEye },
  { key: 'operation', icon: Code2 }
]

const recruitmentUrl = 'https://dreamchaser.feishu.cn/wiki/IxOswfobAixXuUkcq73cLyQZney?share_token=3626e26e-bc03-4ae1-839c-08be0ff94aa0&qq_aio_chat_type=3'

const openPosition = (key: string) => {
  previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
  previousBodyOverflow = document.body.style.overflow
  activePosition.value = key
  document.body.style.overflow = 'hidden'
  nextTick(() => modalCloseButton.value?.focus())
}

const closePosition = () => {
  if (!activePosition.value) return
  activePosition.value = null
  document.body.style.overflow = previousBodyOverflow
  nextTick(() => previousFocus?.focus())
}

const onPositionKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    closePosition()
    return
  }

  if (event.key !== 'Tab' || !modalRef.value) return
  const focusable = Array.from(modalRef.value.querySelectorAll<HTMLElement>(
    'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
  ))
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (!first || !last) return

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

const openRecruitment = () => {
  window.open(recruitmentUrl, '_blank', 'noopener,noreferrer')
}

onBeforeUnmount(() => {
  document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <div class="contact-container" :style="{ '--recruitment-image': recruitmentImage }">
    <div v-reveal class="contact-header"><p class="page-eyebrow">CONNECT / JOIN DREAMCHASER</p>
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
          <component
            v-for="method in contactMethods"
            :key="method.key"
            :is="method.href ? 'a' : 'div'"
            v-bind="method.href ? { href: method.href } : {}"
            v-surface class="contact-card motion-surface"
            :class="{ 'is-link': method.href }"
          >
            <div class="contact-icon" aria-hidden="true"><component :is="method.icon" :size="24" /></div>
            <div class="contact-details">
              <div class="contact-label">{{ t(`contact.${method.key}`) }}</div>
              <div class="contact-value">{{ method.valueKey ? t(`contact.${method.valueKey}`) : method.value }}</div>
            </div>
          </component>
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
            <button v-magnetic class="join-btn" type="button" @click="openRecruitment">
              {{ t('contact.recruitment') }}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div class="positions-title">{{ t('contact.positions') }}</div>
        <div class="positions-grid">
          <article
            v-for="pos in positions"
            :key="pos.key"
            v-surface v-reveal class="position-card motion-surface"
          >
            <div class="position-icon"><component :is="pos.icon" :size="28" /></div>
            <h4 class="position-name">{{ t(`contact.${pos.key}`) }}</h4>
            <p class="position-desc">{{ t(`contact.${pos.key}Desc`) }}</p>
            <button class="position-action" type="button" @click="openPosition(pos.key)">
              {{ t('contact.viewRequirements') }} →
            </button>
          </article>
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
        >
          <section
            ref="modalRef"
            class="position-modal"
            role="dialog"
            aria-modal="true"
            tabindex="-1"
            :aria-labelledby="`position-${activePosition}-title`"
            @keydown="onPositionKeydown"
          >
            <button ref="modalCloseButton" class="modal-close" type="button" :aria-label="t('contact.close')" @click="closePosition">×</button>
            <div class="modal-index">RECRUITMENT FILE // {{ activePosition.toUpperCase() }}</div>
            <div class="modal-title-row">
              <span class="modal-icon"><component :is="positions.find(pos => pos.key === activePosition)?.icon" :size="30" /></span>
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
              <button type="button" v-magnetic class="join-btn" @click="openRecruitment">
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
    font-family: $font-body;
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
  color: $color-white;
  text-decoration: none;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s;

  &.is-link {
    cursor: pointer;
  }
  
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
      font-family: $font-body;
      color: $color-accent;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
    }
    
    .contact-value {
      font-family: $font-body;
      color: $color-white;
      font-size: 1.1rem;
      word-break: break-all;
    }
  }
}

.contact-card:focus-visible {
  outline: 2px solid $color-accent;
  outline-offset: 3px;
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
      var(--recruitment-image) center 42% / cover no-repeat;

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
      font-family: $font-body;
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
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-4px) scale(1.01);
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
    padding: 0.25rem 0;
    border: 0;
    background: transparent;
    color: $color-accent;
    font-family: $font-code;
    font-size: .875rem;
    letter-spacing: 0.08em;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid $color-primary;
      outline-offset: 3px;
    }
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
  font-size: .875rem;
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
    font-size: .875rem;
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
    font-size: .875rem;
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
    font-size: .875rem;
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
    font-size: .875rem;
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
    font-size: .875rem;
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
    padding: var(--page-padding-y) var(--page-padding-x);
  }

  .contact-header {
    margin-bottom: 3rem;

    .contact-title {
      font-size: 2.5rem;
    }
  }

  .join-section .join-banner {
    min-height: 360px;
    padding: 2rem 1.5rem;
    align-items: flex-end;
    background:
      linear-gradient(0deg, rgba($color-bg, 0.98) 0%, rgba($color-bg, 0.72) 62%, rgba($color-bg, 0.2) 100%),
      var(--recruitment-image) center / cover no-repeat;
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

@media (max-width: 480px) {
  .contact-container {
    padding-inline: 0.875rem;
  }

  .section-title {
    font-size: 1.3rem;
    gap: 0.5rem;
  }

  .section-title .title-line {
    min-width: 1.25rem;
  }

  .contact-card,
  .position-card {
    padding: 1.25rem;
  }

  .join-section .join-banner {
    min-height: 320px;
    padding: 1.5rem 1rem;

    h3 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1rem;
    }

    .join-btn {
      width: 100%;
    }
  }

  .modal-title-row {
    align-items: flex-start;
    gap: 0.75rem;

    .modal-icon {
      font-size: 2.5rem;
    }

    h3 {
      font-size: 1.5rem;
    }
  }

  .modal-close {
    top: 0.75rem;
    right: 0.75rem;
  }
}


.contact-container { max-width: 1600px; margin: auto; padding: var(--page-padding-y) var(--page-padding-x); }
.contact-header { text-align: left; margin-bottom: 44px; }
.contact-header .page-eyebrow { font-family: $font-code; font-size: 14px; letter-spacing: 2px; color: #75958b; margin: 0 0 16px; }
.contact-header .contact-title { font-size: clamp(28px, 3vw, 42px); color: #e4ede8; font-weight: 500; letter-spacing: -1px; }
.contact-header .contact-subtitle { font-size: 14px; letter-spacing: .5px; }
.content-grid { max-width: none; gap: 52px; }
.section-title { font-size: 20px; color: #e4ede8; font-weight: 500; margin: 0 0 24px; }
.section-title .title-line { display: none; }
.contact-cards { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.contact-card { flex-direction: column; align-items: flex-start; gap: 16px; padding: 24px; border-radius: 4px; background: #111b1e; }
.contact-card:hover { transform: translateY(-3px); box-shadow: none; border-color: #a8e8cc55; }
.contact-card .contact-icon { font-size: 0; color: #9ec4b0; }
.contact-card .contact-details .contact-label { font-size: 14px; color: #729889; margin-bottom: 8px; }
.contact-card .contact-details .contact-value { font-size: 14px; word-break: break-word; }
.join-section .join-banner { border-color: #ffffff18; border-radius: 4px; padding: clamp(24px, 4vw, 56px); }
.join-section .join-banner::after { display: none; }
.join-section .join-banner h3 { font-size: clamp(24px, 3vw, 38px); font-weight: 500; color: #e8f3ee; }
.join-section .join-banner p { font-size: 14px; line-height: 1.9; color: #acbfb6; }
.join-section .join-banner .join-btn { font-size: 14px; font-weight: 500; border-radius: 3px; min-height: 46px; }
.join-section .join-banner .join-btn:hover { box-shadow: none; background: #cbf5df; color: #10241d; }
.join-section .positions-title { text-align: left; font-family: $font-body; font-size: 18px; font-weight: 500; color: #e4ede8; }
.positions-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.position-card { text-align: left; padding: 28px 24px; background: #111b1e; border-radius: 4px; }
.position-card:hover { box-shadow: none; transform: translateY(-3px); border-color: #a8e8cc55; }
.position-card .position-icon { font-size: 0; color: #8bbc9f; margin-bottom: 26px; }
.position-card .position-name { color: #e4ede8; font-size: 20px; font-weight: 500; }
.position-card .position-desc { font-family: $font-body; font-size: 14px; line-height: 1.9; }
.position-card .position-action { font-family: $font-body; font-size: 14px; }
.position-modal { background: #111b1e; border-color: #ffffff25; border-radius: 6px; box-shadow: 0 30px 100px #0008; }
.position-modal::before { display: none; }
.modal-icon { color: #a8e8cc; }
@media (max-width: 1000px) { .contact-cards, .positions-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 520px) { .contact-card { padding: 20px 16px; } .contact-card .contact-details .contact-value { font-size: 14px; } .positions-grid { grid-template-columns: 1fr; } .position-card { padding: 24px; } .position-card .position-icon { margin-bottom: 20px; } }


.contact-container { max-width: 1680px; padding-top: 80px; }
.contact-header { margin-bottom: 60px; padding-bottom: 40px; border-bottom: 1px solid #ffffff20; }
.contact-header .contact-title { font-size: var(--heading-page); font-weight: 600; letter-spacing: -2px; line-height: 1.25; }
.contact-header .contact-subtitle { font-size: 19px; color: #b0c4b6; line-height: 1.7; }
.contact-header .page-eyebrow { font-size: 14px; color: #a2c6b2; margin-bottom: 24px; }
.content-grid { gap: 80px; }
.section-title { font-size: 30px; font-weight: 500; margin-bottom: 32px; }
.contact-cards { gap: 24px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.contact-card { padding: 30px; flex-direction: row; align-items: center; gap: 24px; background: #111d18; min-height: 130px; }
.contact-card .contact-icon svg { width: 28px; height: 28px; }
.contact-card .contact-details .contact-label { font-size: 15px; color: #a0c4ac; margin-bottom: 12px; }
.contact-card .contact-details .contact-value { font-size: 20px; line-height: 1.6; }
.join-section .join-banner { min-height: 480px; }
.join-section .join-banner h3 { font-size: var(--heading-section); font-weight: 600; line-height: 1.35; }
.join-section .join-banner p { font-size: 19px; }
.join-section .join-banner .join-btn { font-size: 16px; min-height: 58px; padding: 15px 26px; }
.join-section .positions-title { font-size: 28px; margin-bottom: 32px; }
.positions-grid { gap: 24px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.position-card { padding: 36px; background: #111d18; }
.position-card .position-name { font-size: 30px; font-weight: 600; }
.position-card .position-icon svg { width: 34px; height: 34px; }
.position-card .position-desc { font-size: 18px; color: #acc1b3; }
.position-card .position-action { font-size: 16px; padding: 8px 0; margin-top: 28px; }
.position-modal { max-height: calc(100dvh - 64px); overflow-y: auto; }
.recruitment-paths p, .requirement-block li { font-size: 16px; line-height: 1.8; }
@media (max-width: 768px) { .contact-container { padding-top: 46px; } .contact-header { margin-bottom: 40px; padding-bottom: 30px; } .contact-header .contact-title { font-size: 44px; } .contact-header .contact-subtitle { font-size: 17px; } .contact-cards, .positions-grid { grid-template-columns: 1fr; gap: 18px; } .contact-card { padding: 26px; min-height: 120px; } .contact-card .contact-details .contact-value { font-size: 18px; } .contact-card .contact-details .contact-label { font-size: 14px; } .join-section .join-banner { min-height: 400px; padding: 28px; } .join-section .join-banner h3 { font-size: 34px; } .join-section .join-banner p { font-size: 17px; } .position-card { padding: 30px; } .position-card .position-desc { font-size: 16px; } .position-card .position-name { font-size: 28px; } .content-grid { gap: 60px; } .position-modal { max-height: calc(100dvh - 32px); } }

</style>
