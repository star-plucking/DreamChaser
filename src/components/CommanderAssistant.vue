<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { FolderClosed, Globe, Building2 } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isExpanded = ref(false)
const showMenu = ref(false)
const avatarButton = ref<HTMLButtonElement | null>(null)

const nasUrls = {
  internal: 'http://nas.dreamchaser.ink',
  external: 'http://nas2.dreamchaser.ink'
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
  isExpanded.value = !isExpanded.value
}

const closeMenu = () => {
  showMenu.value = false
  isExpanded.value = false
  nextTick(() => avatarButton.value?.focus())
}

const openNas = (type: 'internal' | 'external') => {
  window.open(nasUrls[type], '_blank', 'noopener,noreferrer')
  showMenu.value = false
  isExpanded.value = false
}
</script>

<template>
  <div class="assistant-container" :class="{ expanded: isExpanded }" @keydown.esc.prevent="closeMenu">
    <div v-show="showMenu" id="nas-menu" class="nas-menu" role="group" :aria-label="t('assistant.menuTitle')">
      <div class="menu-title">{{ t('assistant.menuTitle') }}</div>
      <button class="menu-item" type="button" @click="openNas('internal')">
        <Building2 :size="20" aria-hidden="true" />
        <span class="item-info">
          <span class="item-title">{{ t('assistant.internal') }}</span>
          <span class="item-url">nas.dreamchaser.ink</span>
        </span>
      </button>
      <button class="menu-item" type="button" @click="openNas('external')">
        <Globe :size="20" aria-hidden="true" />
        <span class="item-info">
          <span class="item-title">{{ t('assistant.external') }}</span>
          <span class="item-url">nas2.dreamchaser.ink</span>
        </span>
      </button>
    </div>
    <button
      class="avatar"
      ref="avatarButton"
      type="button"
      :aria-label="t('assistant.toggle')"
      :aria-expanded="showMenu"
      aria-controls="nas-menu"
      @click="toggleMenu"
    >
      <span class="avatar-placeholder">
        <FolderClosed :size="18" aria-hidden="true" />
      </span>

    </button>
  </div>
</template>

<style lang="scss" scoped>
.assistant-container { position: fixed; bottom: 24px; right: 24px; z-index: 200; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }
.avatar { width: 44px; height: 44px; padding: 0; display: grid; place-items: center; border: 1px solid #a8e8cc35; border-radius: 50%; background: #15231fe8; backdrop-filter: blur(12px); color: #b4d8c7; cursor: pointer; transition: background .2s, transform .2s; box-shadow: 0 8px 30px #0004; }
.avatar:hover { background: #243e33; transform: translateY(-2px); }
.nas-menu { padding: 16px; width: 280px; background: #111c1ff5; border: 1px solid #ffffff20; border-radius: 6px; box-shadow: 0 20px 60px #0007; }
.menu-title { color: #8aac9d; font-size: 14px; padding: 0 4px 12px; }
.menu-item { display: flex; align-items: center; gap: 14px; width: 100%; border: 0; border-radius: 3px; background: transparent; text-align: left; padding: 12px; cursor: pointer; color: #a8e8cc; }
.menu-item:hover { background: #ffffff08; }
.item-title { display: block; font-size: 14px; color: #dde9e2; }
.item-url { display: block; font-size: 14px; color: #69877b; margin-top: 3px; }
</style>
