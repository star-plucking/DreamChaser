<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

interface Member {
  id: number;
  name: string;
  role: string;
  roleEn: string;
  groups: string[]; // 分类：MANAGEMENT、OPERATORS 等
  img: string;
  title: string; // 队内职务
  titleEn: string;
  technicalGroup: string; // 技术组
  technicalGroupEn: string;
  description: string; // 个人介绍
  descriptionEn: string;
}

const members = ref<Member[]>([
  { 
    id: 2, name: '宋昊润', role: '英雄电控工程师', groups: ['EMBEDDED SOFTWARE'], 
    roleEn: 'Hero Electrical Engineer',
    img: withBase('imgs/北京理工大学/北京理工大学-人员/北京理工大学人员（主）/1号-研发代表-宋昊润.webp'),
    title: '英雄机器人研发',
    titleEn: 'Hero Robot Development',
    technicalGroup: '电控组',
    technicalGroupEn: 'Electrical',
    description: '英雄电控。',
    descriptionEn: 'Electrical systems engineer for the hero robot.'
  },
  { 
    id: 5, name: '魏洲航', role: '队长', groups: ['MANAGEMENT'], 
    roleEn: 'Captain',
    img: withBase('imgs/people/北京理工大学_人员/魏洲航.png'),
    title: '队长，硬件组负责人',
    titleEn: 'Captain and Hardware Group Lead',
    technicalGroup: '硬件组',
    technicalGroupEn: 'Hardware',
    description: '硬件组负责人。',
    descriptionEn: 'Leads the hardware group.'
  },
  { 
    id: 7, name: '李伟俊', role: '副队长', groups: ['OPERATORS', 'MANAGEMENT', 'MECHANICS'], 
    roleEn: 'Vice Captain',
    img: withBase('imgs/people/北京理工大学_人员/4号-操作手-李韦俊.webp'),
    title: '副队长，步兵机器人研发，步兵操作手',
    titleEn: 'Vice Captain, Infantry Developer and Operator',
    technicalGroup: '机械组',
    technicalGroupEn: 'Mechanical',
    description: '步兵机械和操作手。',
    descriptionEn: 'Works on infantry mechanics and operates the infantry robot.'
  },
  { 
    id: 8, name: '岑之初', role: '步兵电控工程师', groups: ['EMBEDDED SOFTWARE'], 
    roleEn: 'Infantry Electrical Engineer',
    img: withBase('imgs/people/北京理工大学_人员/4号-研发代表-岑之初.webp'),
    title: '步兵机器人研发',
    titleEn: 'Infantry Robot Development',
    technicalGroup: '电控组',
    technicalGroupEn: 'Electrical',
    description: '步兵电控。',
    descriptionEn: 'Electrical systems engineer for the infantry robot.'
  },
  { 
    id: 10, name: '郑杰心', role: '无人机飞手 / 工程机械工程师', groups: ['OPERATORS', 'MECHANICS'], 
    roleEn: 'Drone Pilot / Engineer Mechanic',
    img: withBase('imgs/people/北京理工大学_人员/6号-飞手-郑杰心.webp'),
    title: '无人机飞手，工程机械',
    titleEn: 'Drone Pilot and Engineer Mechanic',
    technicalGroup: '机械组',
    technicalGroupEn: 'Mechanical',
    description: '无人机飞手，工程机械。',
    descriptionEn: 'Pilots the drone and works on engineer-robot mechanics.'
  },
  { 
    id: 11, name: '王瑶程', role: '项目管理', groups: ['MANAGEMENT'], 
    roleEn: 'Project Manager',
    img: withBase('imgs/people/北京理工大学_人员/7号-研发代表-王瑶程.webp'),
    title: '项目管理',
    titleEn: 'Project Management',
    technicalGroup: '管理组',
    technicalGroupEn: 'Management',
    description: '哨兵电控，全队唯一指定PBB。',
    descriptionEn: 'Sentry electrical systems and the team’s designated PBB.'
  },
  { 
    id: 13, name: '秦沐阳', role: '雷达算法工程师', groups: ['VISION'], 
    roleEn: 'Radar Algorithm Engineer',
    img: withBase('imgs/people/北京理工大学_人员/9号-研发代表-秦沐阳.webp'),
    title: '雷达研发代表',
    titleEn: 'Radar Development Representative',
    technicalGroup: '雷达组',
    technicalGroupEn: 'Radar',
    description: '雷达组最强工程师。',
    descriptionEn: 'Develops algorithms for the radar system.'
  }
].sort((a, b) => {
  if (a.name === '魏洲航') return -1
  if (b.name === '魏洲航') return 1
  return 0
}))

const activeMember = ref<Member>(members.value[0])

const selectMember = (m: Member) => {
  activeMember.value = m
}

const hasGroup = (m: Member, group: string) => m.groups.includes(group)
const membersInGroup = (group: string) => members.value.filter((member) => {
  const isManager = hasGroup(member, 'MANAGEMENT')
  const isOperator = hasGroup(member, 'OPERATORS')
  if (group === 'MANAGEMENT') return isManager
  if (group === 'OPERATORS') return !isManager && isOperator
  return !isManager && !isOperator
})
</script>

<template>
  <div class="team-page">
    <header v-reveal class="team-intro">
      <p class="team-eyebrow">PEOPLE / DREAMCHASER</p>
      <h1>{{ locale === 'zh-CN' ? '追梦，始于我们。' : 'The people behind the dream.' }}</h1>
      <p class="team-lead">{{ locale === 'zh-CN' ? '不同的专长，同一个方向。在这里，让彼此的热爱成为团队的力量。' : 'Different skills. One direction. Our shared passion is what makes us a team.' }}</p>
    </header>
    <div class="team-container">
    <div class="roster-panel">
      <h2 class="panel-title">{{ t('team.title') }}</h2>
      
      <div class="group-section">
        <h3 class="group-title">{{ t('team.management') }}</h3>
        <div class="member-list">
          <div
            v-for="m in membersInGroup('MANAGEMENT')"
            :key="m.id"
            class="member-entry"
            :class="{ active: activeMember.id === m.id }"
          >
            <button class="member-card-mini" type="button" :aria-pressed="activeMember.id === m.id" @click="selectMember(m)">
              <span class="avatar-thumb">
                <img :src="m.img" alt="" loading="lazy" decoding="async" />
              </span>
              <span class="info">
                <span class="name">{{ m.name }}</span>
                <span class="role">{{ locale === 'zh-CN' ? m.role : m.roleEn }}</span>
              </span>
            </button>

            <transition name="member-expand">
              <div v-if="activeMember.id === m.id" class="member-mobile-detail">
                <div class="detail-photo">
                  <img :src="m.img" :alt="m.name" />
                </div>
                <div class="detail-meta">
                  <div class="detail-item">
                    <label>{{ t('team.role') }}</label>
                    <div class="detail-content">{{ locale === 'zh-CN' ? m.title : m.titleEn }}</div>
                  </div>
                  <div class="detail-item">
                    <label>{{ t('team.technicalGroup') }}</label>
                    <div class="detail-content">{{ locale === 'zh-CN' ? m.technicalGroup : m.technicalGroupEn }}</div>
                  </div>
                  <div class="detail-item">
                    <label>{{ t('team.bio') }}</label>
                    <div class="detail-content">{{ locale === 'zh-CN' ? m.description : m.descriptionEn }}</div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div class="group-section">
        <h3 class="group-title">{{ t('team.operators') }}</h3>
        <div class="member-list">
          <div 
            v-for="m in membersInGroup('OPERATORS')"
            :key="m.id"
            class="member-entry"
            :class="{ active: activeMember.id === m.id }"
          >
            <button class="member-card-mini" type="button" :aria-pressed="activeMember.id === m.id" @click="selectMember(m)">
              <span class="avatar-thumb">
                <img :src="m.img" alt="" loading="lazy" decoding="async" />
              </span>
              <span class="info">
                <span class="name">{{ m.name }}</span>
                <span class="role">{{ locale === 'zh-CN' ? m.role : m.roleEn }}</span>
              </span>
            </button>

            <transition name="member-expand">
              <div v-if="activeMember.id === m.id" class="member-mobile-detail">
                <div class="detail-photo">
                  <img :src="m.img" :alt="m.name" />
                </div>
                <div class="detail-meta">
                  <div class="detail-item">
                    <label>{{ t('team.role') }}</label>
                    <div class="detail-content">{{ locale === 'zh-CN' ? m.title : m.titleEn }}</div>
                  </div>
                  <div class="detail-item">
                    <label>{{ t('team.technicalGroup') }}</label>
                    <div class="detail-content">{{ locale === 'zh-CN' ? m.technicalGroup : m.technicalGroupEn }}</div>
                  </div>
                  <div class="detail-item">
                    <label>{{ t('team.bio') }}</label>
                    <div class="detail-content">{{ locale === 'zh-CN' ? m.description : m.descriptionEn }}</div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div class="group-section">
        <h3 class="group-title">{{ t('team.engineering') }}</h3>
        <div class="member-list">
          <div 
            v-for="m in membersInGroup('ENGINEERING')"
            :key="m.id"
            class="member-entry"
            :class="{ active: activeMember.id === m.id }"
          >
            <button class="member-card-mini" type="button" :aria-pressed="activeMember.id === m.id" @click="selectMember(m)">
              <span class="avatar-thumb">
                <img :src="m.img" alt="" loading="lazy" decoding="async" />
              </span>
              <span class="info">
                <span class="name">{{ m.name }}</span>
                <span class="role">{{ locale === 'zh-CN' ? m.role : m.roleEn }}</span>
              </span>
            </button>

            <transition name="member-expand">
              <div v-if="activeMember.id === m.id" class="member-mobile-detail">
                <div class="detail-photo">
                  <img :src="m.img" :alt="m.name" />
                </div>
                <div class="detail-meta">
                  <div class="detail-item">
                    <label>{{ t('team.role') }}</label>
                    <div class="detail-content">{{ locale === 'zh-CN' ? m.title : m.titleEn }}</div>
                  </div>
                  <div class="detail-item">
                    <label>{{ t('team.technicalGroup') }}</label>
                    <div class="detail-content">{{ locale === 'zh-CN' ? m.technicalGroup : m.technicalGroupEn }}</div>
                  </div>
                  <div class="detail-item">
                    <label>{{ t('team.bio') }}</label>
                    <div class="detail-content">{{ locale === 'zh-CN' ? m.description : m.descriptionEn }}</div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <div class="profile-panel">
      <div class="profile-card">
        <div class="profile-header">
          <div class="id-tag">ID: 00{{ activeMember.id }}</div>
          <h2 class="full-name">{{ activeMember.name }}</h2>
          <div class="rank">{{ t('team.role') }}: {{ locale === 'zh-CN' ? activeMember.role : activeMember.roleEn }}</div>
        </div>
        
        <div class="profile-body">
          <div class="photo-large">
            <img :src="activeMember.img" :alt="activeMember.name" />
          </div>
          
          <div class="bio-section">
            <div class="bio-item">
              <label>{{ t('team.role') }}</label>
              <div class="bio-content">{{ locale === 'zh-CN' ? activeMember.title : activeMember.titleEn }}</div>
            </div>
            
            <div class="bio-item">
              <label>{{ t('team.technicalGroup') }}</label>
              <div class="bio-content">{{ locale === 'zh-CN' ? activeMember.technicalGroup : activeMember.technicalGroupEn }}</div>
            </div>
            
            <div class="bio-item">
              <label>{{ t('team.bio') }}</label>
              <div class="bio-content bio-description">{{ locale === 'zh-CN' ? activeMember.description : activeMember.descriptionEn }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.team-container {
  display: flex;
  height: calc(100dvh - var(--top-bar-height) - var(--status-bar-height));
  box-sizing: border-box;
  padding: var(--page-padding-y);
  gap: 2rem;
  overflow-x: hidden;
}

.roster-panel {
  width: 300px;
  border-right: 1px solid rgba($color-primary, 0.2);
  padding-right: 2rem;
  overflow-y: auto;
  
  .panel-title {
    color: $color-accent;
    font-family: $font-title;
    margin-bottom: 2rem;
  }
  
  .group-title {
    color: $color-text-dim;
    font-size: .875rem;
    margin: 1.5rem 0 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
}

.member-card-mini {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  background: rgba(0,0,0,0.3);
  color: inherit;
  font: inherit;
  text-align: left;
  margin-bottom: 8px;
  transition: 0.2s;
  
  &:hover {
    background: rgba($color-primary, 0.1);
  }
  
  .member-entry.active & {
    border-color: $color-primary;
    background: rgba($color-primary, 0.15);
    
    .name { color: $color-primary; }
  }
  
  .avatar-thumb {
    display: block;
    width: 40px; height: 40px;
    flex: 0 0 40px;
    background: #333;
    overflow: hidden;
    img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
  }
  
  .info { display: block; flex: 1; min-width: 0; }
  .name { display: block; font-family: $font-title; color: white; font-size: 0.9rem; }
  .role { display: block; font-size: .875rem; color: $color-text-dim; }
}

.member-card-mini:focus-visible {
  outline: 2px solid $color-accent;
  outline-offset: 2px;
}

.member-mobile-detail {
  display: none;
}

.profile-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-card {
  width: 100%;
  max-width: 800px;
  background: rgba(13, 13, 14, 0.8);
  border: 1px solid $color-primary;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px; left: -5px; right: -5px; bottom: -5px;
    border: 1px dashed rgba($color-primary, 0.3);
    z-index: -1;
  }
}

.profile-header {
  border-bottom: 2px solid $color-primary;
  padding-bottom: 1rem;
  
  .id-tag { color: $color-text-dim; font-family: $font-code; }
  .full-name { font-family: $font-title; font-size: 3rem; margin: 0; color: white; text-transform: uppercase; }
  .rank { color: $color-accent; font-family: $font-code; letter-spacing: 2px; }
}

.profile-body {
  display: flex;
  gap: 3rem;
  height: 400px;
}

.photo-large {
  flex: 0 1 auto;
  height: 100%;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
  
  img {
    display: block;
    width: auto;
    height: 100%;
    max-width: 100%;
    object-fit: contain;
    object-position: center top;
    filter: contrast(110%);
  }
  
}

.bio-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
  padding-right: 1rem;
  
  .bio-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    label {
      color: $color-accent;
      font-family: $font-title;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .bio-content {
      color: $color-text-dim;
      font-size: 0.95rem;
      line-height: 1.6;
      padding: 0.75rem;
      background: rgba(255,255,255,0.05);
      border-left: 2px solid $color-primary;
      padding-left: 1rem;
    }
    
    .bio-description {
      min-height: 80px;
    }
  }
}

@media (max-width: 1024px) {
  .team-container {
    gap: 1.5rem;
  }

  .profile-body {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .team-container {
    flex-direction: column;
    height: auto;
  }

  .roster-panel {
    width: 100%;
    border-right: none;
    padding-right: 0;
    max-height: none;
  }

  .panel-title {
    margin-bottom: 1rem !important;
  }

  .group-section {
    margin-bottom: 1rem;
  }

  .member-card-mini {
    padding: 0.85rem;

    .role {
      line-height: 1.4;
    }
  }

  .member-entry {
    margin-bottom: 0.75rem;
    border: 1px solid rgba($color-primary, 0.12);
    background: rgba(0, 0, 0, 0.24);
  }

  .member-mobile-detail {
    display: grid;
    grid-template-columns: 92px 1fr;
    gap: 0.875rem;
    padding: 0 0.85rem 0.85rem;
    border-top: 1px solid rgba($color-primary, 0.12);
  }

  .detail-photo {
    align-self: start;
    overflow: hidden;
    border: 1px solid rgba($color-primary, 0.18);
    background: rgba(255, 255, 255, 0.03);

    img {
      display: block;
      width: 100%;
      height: 120px;
      object-fit: cover;
      object-position: center 35%;
    }
  }

  .detail-meta {
    display: grid;
    gap: 0.65rem;
  }

  .detail-item {
    display: grid;
    gap: 0.25rem;

    label {
      color: $color-accent;
      font-family: $font-title;
      font-size: .875rem;
      letter-spacing: 0.04em;
    }
  }

  .detail-content {
    color: $color-text-dim;
    font-size: .875rem;
    line-height: 1.55;
    padding: 0.6rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-left: 2px solid $color-primary;
  }

  .profile-panel {
    display: none;
  }

  .profile-card {
    padding: 1.25rem;
    gap: 1.25rem;
  }

  .profile-header .full-name {
    font-size: 2rem;
  }

  .profile-body {
    flex-direction: column;
    height: auto;
  }

  .photo-large {
    height: auto;
    max-height: 420px;

    img {
      width: 100%;
      height: auto;
      max-height: 420px;
    }
  }

  .bio-section {
    gap: 1rem;
    overflow: visible;
    padding-right: 0;
  }

  .member-expand-enter-active,
  .member-expand-leave-active {
    transition: opacity 0.22s ease, max-height 0.22s ease;
    max-height: 520px;
    overflow: hidden;
  }

  .member-expand-enter-from,
  .member-expand-leave-to {
    opacity: 0;
    max-height: 0;
  }

  .member-expand-enter-to,
  .member-expand-leave-from {
    opacity: 1;
    max-height: 520px;
  }
}

@media (max-width: 480px) {
  .team-container {
    padding-inline: 0.875rem;
  }

  .member-mobile-detail {
    grid-template-columns: 1fr;
  }

  .detail-photo img {
    height: 180px;
  }
}

.team-container { max-width: 1600px; margin: auto; padding: var(--page-padding-y) var(--page-padding-x); height: auto; min-height: calc(100dvh - var(--top-bar-height) - var(--status-bar-height)); gap: 48px; }
.roster-panel { width: 300px; flex-shrink: 0; border-color: #ffffff14; }
.roster-panel .panel-title { font-size: 20px; font-weight: 500; color: #e4ede8; margin-top: 0; }
.roster-panel .group-title { font-size: 14px; letter-spacing: 1px; padding-bottom: 8px; }
.member-card-mini { border-radius: 4px; padding: 12px; background: #111b1e; }
.member-card-mini .avatar-thumb { border-radius: 3px; }
.member-entry.active .member-card-mini { border-color: #a8e8cc44; background: #a8e8cc09; }
.profile-panel { align-items: flex-start; }
.profile-card { border-color: #ffffff16; border-radius: 5px; background: #111b1e; max-width: none; padding: clamp(24px, 3vw, 44px); }
.profile-card::before { display: none; }
.profile-header { border-bottom: 1px solid #ffffff18; padding-bottom: 24px; }
.profile-header .id-tag { font-size: 14px; letter-spacing: 2px; margin-bottom: 10px; }
.profile-header .full-name { font-size: 38px; font-weight: 500; margin-bottom: 8px; }
.profile-header .rank { font-family: $font-body; font-size: 14px; letter-spacing: 1px; color: #96b4a7; }
.profile-body { gap: 28px; height: auto; min-height: 340px; }
.photo-large { height: 340px; flex: 0 0 43%; border: 0; background: #0c1417; border-radius: 3px; }
.photo-large img { width: 100%; object-fit: cover; filter: none; }
.bio-section { gap: 26px; padding-right: 0; }
.bio-section .bio-item label { font-size: 14px; color: #83a494; letter-spacing: 1px; }
.bio-section .bio-item .bio-content { background: transparent; border: 0; padding: 0; font-size: 14px; line-height: 1.9; color: #b0beb8; }
@media (max-width: 1100px) and (min-width: 769px) { .team-container { gap: 28px; } .roster-panel { width: 240px; padding-right: 24px; } .profile-body { flex-direction: column; } .photo-large { flex: auto; width: 100%; height: 320px; } .photo-large img { object-fit: contain; } }
@media (max-width: 768px) { .team-container { padding: var(--page-padding-y) var(--page-padding-x); gap: 0; } .roster-panel { width: 100%; padding: 0; border: 0; } .member-mobile-detail { background: #111b1e; border-color: #ffffff16; border-radius: 4px; } .profile-panel { display: none; } }


.team-container { max-width: 1680px; gap: 54px; }
.roster-panel { width: 340px; padding-right: 32px; }
.roster-panel .panel-title { font-size: 27px; font-weight: 600; line-height: 1.4; margin-bottom: 32px; }
.roster-panel .group-title { font-size: 15px; color: #b1c6b9; }
.member-card-mini { padding: 16px; margin-bottom: 12px; }
.member-card-mini .avatar-thumb { width: 54px; height: 54px; flex-basis: 54px; }
.member-card-mini .name { font-size: 18px; line-height: 1.6; }
.member-card-mini .role { font-size: 14px; line-height: 1.6; color: #afc2b6; }
.profile-header .full-name { font-size: clamp(40px, 4vw, 60px); font-weight: 600; }
.profile-header .id-tag { font-size: 14px; color: #aac1b3; }
.profile-header .rank { font-size: 16px; }
.profile-panel { position: sticky; top: 120px; align-self: flex-start; }
.profile-body { min-height: 400px; }
.photo-large { height: 400px; }
.bio-section .bio-item label { font-size: 15px; color: #9dc4ac; }
.bio-section .bio-item .bio-content { font-size: 17px; color: #c3d1c7; }
@media (max-width: 1100px) and (min-width: 769px) { .roster-panel { width: 270px; padding-right: 24px; } .team-container { gap: 32px; } }
@media (max-width: 768px) { .roster-panel { width: 100%; padding: 0; } .roster-panel .panel-title { font-size: 34px; } .member-card-mini .name { font-size: 19px; } .detail-meta .detail-item label { font-size: 14px; } .detail-meta .detail-content { font-size: 16px; line-height: 1.8; } }


.team-page { max-width: 1680px; margin: auto; }
.team-intro { margin: 0 var(--page-padding-x); padding: 80px 0 50px; border-bottom: 1px solid #ffffff20; }
.team-eyebrow { color: #a2c6b2; font-family: $font-code; font-size: 14px; letter-spacing: 1.7px; margin: 0 0 24px; }
.team-intro h1 { font-size: var(--heading-page); line-height: 1.25; letter-spacing: -2px; font-weight: 600; margin: 0; }
.team-lead { font-size: 18px; color: #b0c4b6; margin: 28px 0 0; max-width: 760px; }
.team-container { padding-top: 48px; }
.profile-panel { position: relative; top: auto; align-self: stretch; display: block; }
.profile-card { position: sticky; top: 112px; }
@media (max-width: 768px) { .team-intro { padding: 46px 0 32px; } .team-intro h1 { font-size: 42px; letter-spacing: -1px; } .team-lead { font-size: 16px; margin-top: 22px; } .team-container { padding-top: 36px; } .profile-panel { display: none; } }
</style>
