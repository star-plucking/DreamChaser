<script setup lang="ts">
import { ref } from 'vue'

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

// 随机打乱数组的工具函数
const shuffleArray = <T>(array: T[]): T[] => {
  const newArr = [...array]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  return newArr
}

interface Member {
  id: number;
  name: string;
  role: string;
  groups: string[]; // 分类：MANAGEMENT、OPERATORS 等
  img: string;
  title: string; // 队内职务
  technicalGroup: string; // 技术组
  description: string; // 个人介绍
}

const members = ref<Member[]>(shuffleArray([
  { 
    id: 1, name: '王倍卓', role: '项目管理 / 英雄操作手', groups: ['OPERATORS', 'MANAGEMENT', 'MECHANICS'], 
    img: withBase('imgs/北京理工大学/北京理工大学-人员/北京理工大学人员（主）/1号-操作手-王倍卓.webp'),
    title: '项目管理，英雄操作手',
    technicalGroup: '机械组',
    description: '工程机械，安德森电竞椅指定使用人。'
  },
  { 
    id: 2, name: '宋昊润', role: '英雄电控工程师', groups: ['EMBEDDED SOFTWARE'], 
    img: withBase('imgs/北京理工大学/北京理工大学-人员/北京理工大学人员（主）/1号-研发代表-宋昊润.webp'),
    title: '英雄机器人研发',
    technicalGroup: '电控组',
    description: '英雄电控，喜欢玩原神。'
  },
  { 
    id: 3, name: '潘志榛', role: '工程操作手 / 工程机械工程师', groups: ['OPERATORS', 'MECHANICS'], 
    img: withBase('imgs/北京理工大学/北京理工大学-人员/北京理工大学人员（主）/2号-操作手-潘志榛.webp'),
    title: '工程操作手，工程机器人研发',
    technicalGroup: '机械组',
    description: '工程机械，工程操作手，牢潘。'
  },
  { 
    id: 4, name: '王博', role: '工程电控工程师', groups: ['EMBEDDED SOFTWARE'], 
    img: withBase('imgs/北京理工大学/北京理工大学-人员/北京理工大学人员（主）/2号-研发代表-王博.webp'),
    title: '工程机器人研发',
    technicalGroup: '电控组',
    description: '工程电控，牢博。'
  },
  { 
    id: 5, name: '陈志鸿', role: '队长 / 步兵操作手', groups: ['OPERATORS', 'MANAGEMENT'], 
    img: withBase('imgs/北京理工大学/北京理工大学-人员/北京理工大学人员（主）/3号-操作手-陈志鸿.webp'),
    title: '3号操作手，队长',
    technicalGroup: '电控组',
    description: '队长大人，步兵操作手，隐藏烟宝宝。'
  },
  { 
    id: 6, name: '苏铭宇', role: '步兵电控工程师', groups: ['EMBEDDED SOFTWARE'], 
    img: withBase('imgs/北京理工大学/北京理工大学-人员/北京理工大学人员（主）/3号-研发代表-苏铭宇.webp'),
    title: '步兵机器人研发',
    technicalGroup: '电控组',
    description: '步兵电控。'
  },
  { 
    id: 7, name: '李韦俊', role: '步兵操作手 / 步兵机械工程师', groups: ['OPERATORS', 'MECHANICS'], 
    img: withBase('imgs/北京理工大学/北京理工大学-人员/北京理工大学人员（主）/4号-操作手-李韦俊.webp'),
    title: '步兵机器人研发，步兵操作手',
    technicalGroup: '机械组',
    description: '步兵机械和操作手，备场区禁止吸烟饮食。'
  },
  { 
    id: 8, name: '岑之初', role: '步兵电控工程师', groups: ['EMBEDDED SOFTWARE'], 
    img: withBase('imgs/北京理工大学/北京理工大学-人员/北京理工大学人员（主）/4号-研发代表-岑之初.webp'),
    title: '步兵机器人研发',
    technicalGroup: '电控组',
    description: '步兵电控。'
  },
  { 
    id: 9, name: '闫博程', role: '无人机机械工程师', groups: ['MECHANICS'], 
    img: withBase('imgs/北京理工大学/北京理工大学-人员/北京理工大学人员（主）/6号-研发代表-闫博程.webp'),
    title: '无人机研发',
    technicalGroup: '机械组',
    description: '无人机电控。'
  },
  { 
    id: 10, name: '郑杰心', role: '无人机飞手 / 工程机械工程师', groups: ['OPERATORS', 'MECHANICS'], 
    img: withBase('imgs/北京理工大学/北京理工大学-人员/北京理工大学人员（主）/6号-飞手-郑杰心.webp'),
    title: '无人机飞手，工程机械',
    technicalGroup: '机械组',
    description: '无人机飞手，工程机械。'
  },
  { 
    id: 11, name: '王瑶程', role: '哨兵电控工程师', groups: ['EMBEDDED SOFTWARE'], 
    img: withBase('imgs/北京理工大学/北京理工大学-人员/北京理工大学人员（主）/7号-研发代表-王瑶程.webp'),
    title: '哨兵机器人研发',
    technicalGroup: '电控组',
    description: '哨兵电控，全队唯一指定PBB。'
  },
  { 
    id: 12, name: '施宇翔', role: '飞镖机械工程师', groups: ['MECHANICS'], 
    img: withBase('imgs/北京理工大学/北京理工大学-人员/北京理工大学人员（主）/8号-研发代表-施宇翔.webp'),
    title: '飞镖机械',
    technicalGroup: '机械组',
    description: '飞镖机械食欲xiang。'
  },
  { 
    id: 13, name: '秦沐阳', role: '雷达算法工程师', groups: ['VISION'], 
    img: withBase('imgs/北京理工大学/北京理工大学-人员/北京理工大学人员（主）/9号-研发代表-秦沐阳.webp'),
    title: '雷达研发代表',
    technicalGroup: '雷达组',
    description: '雷达组最强工程师。'
  }
]))

const activeMember = ref<Member>(members.value[0])

const selectMember = (m: Member) => {
  activeMember.value = m
}

const hasGroup = (m: Member, group: string) => m.groups.includes(group)
</script>

<template>
  <div class="team-container">
    <div class="roster-panel">
      <h2 class="panel-title">/// ACTIVE ROSTER</h2>
      
      <div class="group-section">
        <h3 class="group-title">MANAGEMENT</h3>
        <div class="member-list">
          <div
            v-for="m in members.filter(x => hasGroup(x, 'MANAGEMENT'))" 
            :key="m.id"
            class="member-entry"
            :class="{ active: activeMember.id === m.id }"
          >
            <div class="member-card-mini" @click="selectMember(m)">
              <div class="avatar-thumb">
                <img :src="m.img" alt="" />
              </div>
              <div class="info">
                <div class="name">{{ m.name }}</div>
                <div class="role">{{ m.role }}</div>
              </div>
            </div>

            <transition name="member-expand">
              <div v-if="activeMember.id === m.id" class="member-mobile-detail">
                <div class="detail-photo">
                  <img :src="m.img" :alt="m.name" />
                </div>
                <div class="detail-meta">
                  <div class="detail-item">
                    <label>队内职务</label>
                    <div class="detail-content">{{ m.title }}</div>
                  </div>
                  <div class="detail-item">
                    <label>技术组</label>
                    <div class="detail-content">{{ m.technicalGroup }}</div>
                  </div>
                  <div class="detail-item">
                    <label>个人介绍</label>
                    <div class="detail-content">{{ m.description }}</div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div class="group-section">
        <h3 class="group-title">OPERATORS</h3>
        <div class="member-list">
          <div 
            v-for="m in members.filter(x => hasGroup(x, 'OPERATORS'))" 
            :key="m.id"
            class="member-entry"
            :class="{ active: activeMember.id === m.id }"
          >
            <div class="member-card-mini" @click="selectMember(m)">
              <div class="avatar-thumb">
                <img :src="m.img" alt="" />
              </div>
              <div class="info">
                <div class="name">{{ m.name }}</div>
                <div class="role">{{ m.role }}</div>
              </div>
            </div>

            <transition name="member-expand">
              <div v-if="activeMember.id === m.id" class="member-mobile-detail">
                <div class="detail-photo">
                  <img :src="m.img" :alt="m.name" />
                </div>
                <div class="detail-meta">
                  <div class="detail-item">
                    <label>队内职务</label>
                    <div class="detail-content">{{ m.title }}</div>
                  </div>
                  <div class="detail-item">
                    <label>技术组</label>
                    <div class="detail-content">{{ m.technicalGroup }}</div>
                  </div>
                  <div class="detail-item">
                    <label>个人介绍</label>
                    <div class="detail-content">{{ m.description }}</div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div class="group-section">
        <h3 class="group-title">ENGINEERING</h3>
        <div class="member-list">
          <div 
            v-for="m in members.filter(x => x.groups.some(group => group !== 'OPERATORS' && group !== 'MANAGEMENT'))" 
            :key="m.id"
            class="member-entry"
            :class="{ active: activeMember.id === m.id }"
          >
            <div class="member-card-mini" @click="selectMember(m)">
              <div class="avatar-thumb">
                <img :src="m.img" alt="" />
              </div>
              <div class="info">
                <div class="name">{{ m.name }}</div>
                <div class="role">{{ m.role }}</div>
              </div>
            </div>

            <transition name="member-expand">
              <div v-if="activeMember.id === m.id" class="member-mobile-detail">
                <div class="detail-photo">
                  <img :src="m.img" :alt="m.name" />
                </div>
                <div class="detail-meta">
                  <div class="detail-item">
                    <label>队内职务</label>
                    <div class="detail-content">{{ m.title }}</div>
                  </div>
                  <div class="detail-item">
                    <label>技术组</label>
                    <div class="detail-content">{{ m.technicalGroup }}</div>
                  </div>
                  <div class="detail-item">
                    <label>个人介绍</label>
                    <div class="detail-content">{{ m.description }}</div>
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
          <h1 class="full-name">{{ activeMember.name }}</h1>
          <div class="rank">ROLE: {{ activeMember.role }}</div>
        </div>
        
        <div class="profile-body">
          <div class="photo-large">
            <img :src="activeMember.img" :alt="activeMember.name" />
          </div>
          
          <div class="bio-section">
            <div class="bio-item">
              <label>队内职务</label>
              <div class="bio-content">{{ activeMember.title }}</div>
            </div>
            
            <div class="bio-item">
              <label>技术组</label>
              <div class="bio-content">{{ activeMember.technicalGroup }}</div>
            </div>
            
            <div class="bio-item">
              <label>个人介绍</label>
              <div class="bio-content bio-description">{{ activeMember.description }}</div>
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
    font-size: 0.8rem;
    margin: 1.5rem 0 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
}

.member-card-mini {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  background: rgba(0,0,0,0.3);
  margin-bottom: 8px;
  transition: 0.2s;
  
  &:hover {
    background: rgba($color-primary, 0.1);
  }
  
  &.active {
    border-color: $color-primary;
    background: rgba($color-primary, 0.15);
    
    .name { color: $color-primary; }
  }
  
  .avatar-thumb {
    width: 40px; height: 40px;
    background: #333;
    overflow: hidden;
    img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
  }
  
  .name { font-family: $font-title; color: white; font-size: 0.9rem; }
  .role { font-size: 0.7rem; color: $color-text-dim; }
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
      font-size: 0.78rem;
      letter-spacing: 0.04em;
    }
  }

  .detail-content {
    color: $color-text-dim;
    font-size: 0.85rem;
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
</style>
