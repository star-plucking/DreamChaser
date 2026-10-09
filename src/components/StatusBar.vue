<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
  <div class="status-bar">
    <span class="footer-brand">{{ t('status.site') }}</span>
    <span class="footer-motto">{{ t('common.teamMotto') }}</span>
    <span class="footer-credit">© {{ new Date().getFullYear() }} DreamChaser</span>
  </div>
</template>
<style lang="scss" scoped>
.status-bar { height: 100%; max-width: 1680px; margin: auto; padding: 0 var(--page-padding-x); display: flex; align-items: center; justify-content: space-between; gap: 20px; color: #7d8d91; font-size: 14px; }
.footer-motto { letter-spacing: 2px; }
.footer-credit { font-family: $font-code; font-size: 14px; }
@media (max-width: 768px) { .footer-motto { display: none; } .status-bar { font-size: 14px; } .footer-credit { font-size: 14px; } }
</style>
