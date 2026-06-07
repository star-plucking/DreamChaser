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

const robots = ref(shuffleArray([
  { 
    id: 1, 
    name: 'HERO | 英雄', 
    type: 'Destroy Turret', 
    img: withBase('imgs/robots/机器人2026抠图/1号英雄.webp'), 
    features: ['高伤害', '近战爆发', '建筑摧毁', '地形跨越']
  },
  { 
    id: 2, 
    name: 'INFANTRY | 轮腿步兵', 
    type: 'Main Assault', 
    img: withBase('imgs/robots/机器人2026抠图/3号轮腿步兵.webp'), 
    features: ['快速机动', '灵活打击', '前线突破']
  },
  { 
    id: 3, 
    name: 'SENTRY | 哨兵', 
    type: 'Auto Defense', 
    img: withBase('imgs/robots/机器人2026抠图/7号哨兵.webp'), 
    features: ['自主导航', '自主决策', '区域控制']
  },
  { 
    id: 4, 
    name: 'ENGINEER | 工程', 
    type: 'Economic Support', 
    img: withBase('imgs/robots/机器人2026抠图/2号工程.webp'), 
    features: ['地形跨越', '资源获取', '机械臂操作']
  },
  { 
    id: 5, 
    name: 'DART | 飞镖', 
    type: 'Long Range', 
    img: withBase('imgs/robots/机器人2026抠图/8号飞镖.webp'), 
    features: ['超远程打击', '超高伤害', '致盲效果']
  },
  { 
    id: 6, 
    name: 'RADAR | 雷达', 
    type: 'Surveillance', 
    img: withBase('imgs/robots/机器人2026抠图/9号雷达.webp'), 
    features: ['全场视野', '信息共享', '战术中心', '信息波解码', '无人机反制']
  },
  { 
    id: 7, 
    name: 'AERIAL | 空中', 
    type: 'Air Support', 
    img: withBase('imgs/robots/机器人2026抠图/6号无人机.webp'), 
    features: ['空中打击', '强化火力', '视野侦察']
  },
]))

const activeRobot = ref<number | null>(null)

const toggleRobot = (id: number) => {
  activeRobot.value = activeRobot.value === id ? null : id
}
</script>

<template>
  <div class="robots-container">
    <div class="header">
      <h1 class="page-title">MECHA ARSENAL <span class="count">[{{ robots.length }} UNITS DETECTED]</span></h1>
    </div>

    <TransitionGroup 
      tag="div" 
      name="robot-list" 
      class="robots-grid"
      :class="{ 'has-active': activeRobot !== null }"
    >
      <div 
        v-for="robot in robots" 
        :key="robot.id" 
        class="robot-card"
        :class="{ active: activeRobot === robot.id }"
        @click="toggleRobot(robot.id)"
      >
        <div class="card-main">
          <div class="card-bg"></div>
          <div class="robot-visual">
            <img :src="robot.img" :alt="robot.name" loading="lazy" />
          </div>
          
          <div class="robot-info">
            <h2 class="robot-name">{{ robot.name }}</h2>
            <div class="robot-type">{{ robot.type }}</div>
          </div>
        </div>

        <transition name="features-slide">
          <div class="features-panel" v-if="activeRobot === robot.id">
            <div class="features-list">
              <div v-for="(feature, idx) in robot.features" :key="idx" class="feature-tag">
                <span class="tag-icon">▸</span>
                {{ feature }}
              </div>
            </div>
          </div>
        </transition>
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.robots-container {
  padding: var(--page-padding-y) var(--page-padding-x);
  height: 100%;
  overflow-x: hidden;
}

.header {
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba($color-primary, 0.3);
  padding-bottom: 1rem;
}

.page-title {
  font-family: $font-title;
  color: $color-white;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  
  .count {
    color: $color-primary;
    font-size: 1rem;
    font-family: $font-code;
  }
}

.robots-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  transition: all 0.5s;
}

/* 当有卡片被激活时，锁定其他卡片的状态，防止呼吸效应和乱跳 */
.robots-grid.has-active .robot-card:not(.active) {
  flex-grow: 0; /* 禁止填充剩余空间 */
  flex-basis: 280px; /* 锁定为最小宽度 */
  max-width: 280px; /* 物理锁定宽度 */
  border-color: rgba($color-text-dim, 0.1); /* 稍微变暗淡一点，突出主体 */
  opacity: 0.7; /* 降低非主体卡片的视觉权重 */
}

/* FLIP 动画类 - 处理列表重排 */
.robot-list-move {
  transition: transform 1.2s cubic-bezier(0.18, 0.98, 0.22, 1);
}

.robot-list-leave-active {
  position: absolute; /* 确保离开的元素不占位，虽然这里主要是列表重排 */
}

.robot-card {
  position: relative;
  height: 400px;
  /* 移除容器本身背景和边框，由内部元素或伪元素接管，或者接受边框瞬变 */
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba($color-text-dim, 0.2);
  overflow: hidden;
  cursor: pointer;
  
  /* Flex 布局属性 - 移除过渡以启用即时布局计算 + FLIP */
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 280px;
  min-width: 280px; 
  max-width: 350px;
  
  /* 仅保留外观过渡，移除布局属性过渡 */
  transition: 
    background-color 0.4s,
    border-color 0.4s,
    box-shadow 0.4s,
    transform 0.4s; /* transform 用于 hover 效果，FLIP 会覆盖它 */
    
  transform-origin: center center;
  /* 移除 layout properties 的 will-change */
  will-change: transform;
  
  &:hover {
    border-color: $color-primary;
    box-shadow: 0 0 20px rgba($color-primary, 0.2);
    z-index: 10; 
    
    .robot-visual img {
      transform: scale(1.05);
      filter: drop-shadow(0 0 10px rgba($color-primary, 0.5));
    }
  }
  
  &.active {
    flex-grow: 10; 
    flex-basis: 600px; 
    min-width: 600px; 
    max-width: 800px;
    background: rgba($color-primary, 0.05);
    border-color: $color-accent;
    z-index: 20;
    
    .card-main {
      border-right-color: rgba($color-primary, 0.2);
    }
    
    .robot-visual img {
        /* 保持图片在激活状态下稳定 */
         transform: scale(1.05);
         filter: drop-shadow(0 0 10px rgba($color-primary, 0.5));
    }
  }
}

.card-main {
    position: relative;
    width: 350px; /* 设定固定理想宽度 */
    max-width: 100%; /* 允许缩窄以适应小屏幕或未展开状态 */
    height: 100%;
    flex-shrink: 0; /* 防止被挤压 */
    display: flex;
    flex-direction: column;
    border-right: 1px solid transparent;
    transition: border-right-color 0.4s;
}

.robot-visual {
  height: 70%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transition: 0.8s cubic-bezier(0.18, 0.98, 0.22, 1);
    filter: drop-shadow(0 10px 10px black);
  }
}

.robot-info {
  margin-top: auto; /* 推到底部 */
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  
  .robot-name {
    font-family: $font-title;
    color: $color-white;
    margin: 0;
    font-size: 1.5rem;
  }
  
  .robot-type {
    font-family: $font-code;
    color: $color-primary;
    font-size: 0.8rem;
  }
}

.features-panel {
  /* 不再绝对定位，作为 Flex 项目存在 */
  width: 0; /* 初始宽度 */
  flex-grow: 1; /* 占据剩余空间 */
  height: 100%;
  background: rgba(13, 13, 14, 0.6);
  /* border-left: 2px solid $color-accent; 移动到 active 状态或者 card-main 的右边框 */
  padding: 0; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden; /* 隐藏溢出内容 */
  
  .features-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem 1.5rem; /* Padding移动到内部容器以避免宽度为0时的溢出 */
    min-width: 300px; /* 防止内容换行 */
  }
  
  .feature-tag {
    font-family: $font-code;
    font-size: 1rem;
    color: $color-white;
    padding: 0.8rem 1rem;
    background: rgba($color-primary, 0.1);
    border-left: 3px solid $color-accent;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    transition: all 0.3s;
    
    &:hover {
      background: rgba($color-primary, 0.2);
      transform: translateX(5px);
    }
    
    .tag-icon {
      color: $color-accent;
      font-size: 1.2rem;
    }
  }
}

/* 过渡动画 - 抽屉效果 */
.features-slide-enter-active,
.features-slide-leave-active {
  transition: all 1.2s cubic-bezier(0.18, 0.98, 0.22, 1);
  max-width: 500px; /* 目标最大宽度 */
}

.features-slide-enter-from,
.features-slide-leave-to {
  max-width: 0;
  opacity: 0;
}

.features-slide-enter-to,
.features-slide-leave-from {
  max-width: 500px;
  opacity: 1;
}

.features-panel .feature-tag {
  animation: feature-rise 1.3s cubic-bezier(0.18, 0.98, 0.22, 1) both;
}

.features-panel .feature-tag:nth-child(1) { animation-delay: 0.08s; }
.features-panel .feature-tag:nth-child(2) { animation-delay: 0.16s; }
.features-panel .feature-tag:nth-child(3) { animation-delay: 0.24s; }
.features-panel .feature-tag:nth-child(4) { animation-delay: 0.32s; }
.features-panel .feature-tag:nth-child(5) { animation-delay: 0.4s; }
.features-panel .feature-tag:nth-child(6) { animation-delay: 0.48s; }
.features-panel .feature-tag:nth-child(7) { animation-delay: 0.56s; }
.features-panel .feature-tag:nth-child(8) { animation-delay: 0.64s; }

.features-slide-enter-active,
.features-slide-leave-active {
  transition: opacity 1.3s ease-out, clip-path 1.3s cubic-bezier(0.18, 0.98, 0.22, 1);
}

.features-slide-enter-from,
.features-slide-leave-to {
  opacity: 0;
  clip-path: inset(0 100% 0 0);
}

.features-slide-enter-to,
.features-slide-leave-from {
  opacity: 1;
  clip-path: inset(0 0 0 0);
}

@keyframes feature-rise {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 1024px) {
  .robots-grid {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .robots-grid.has-active .robot-card:not(.active) .features-panel {
    display: none;
  }

  .robots-container {
    padding-top: 1.5rem;
  }

  .header {
    margin-bottom: 1.5rem;
  }

  .page-title {
    font-size: 1.6rem;
    gap: 0.5rem;

    .count {
      font-size: 0.78rem;
    }
  }

  .robots-grid,
  .robots-grid.has-active {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: stretch;
  }

  .robots-grid.has-active .robot-card:not(.active) {
    flex-basis: auto;
    max-width: none;
    opacity: 1;
  }

  .robot-card,
  .robot-card.active {
    display: block;
    width: 100%;
    min-width: 0;
    max-width: none;
    height: auto;
    flex-basis: auto;
    overflow: visible;
  }

  .card-main {
    width: 100%;
    height: auto;
    border-right: none;
  }

  .robot-visual {
    height: 220px;
    padding: 1.25rem;
  }

  .robot-info {
    padding: 1rem 1rem 1.25rem;

    .robot-name {
      font-size: 1.2rem;
    }
  }

  .features-panel,
  .features-slide-enter-active,
  .features-slide-leave-active,
  .features-slide-enter-to,
  .features-slide-leave-from {
    width: 100%;
    max-width: none;
  }

  .robot-card:not(.active) .features-panel {
    display: none;
  }

  .features-panel {
    height: auto;
    display: block;
    flex-grow: 0;
    background: rgba(13, 13, 14, 0.82);
    border-top: 1px solid rgba($color-primary, 0.18);
    overflow: visible;

    .features-list {
      display: grid;
      grid-template-columns: 1fr;
      min-width: 0;
      padding: 1rem;
      gap: 0.75rem;
    }

    .feature-tag {
      font-size: 0.92rem;
      padding: 0.75rem 0.85rem;
    }
  }

  .features-slide-enter-active,
  .features-slide-leave-active {
    transition: opacity 0.25s ease, max-height 0.25s ease;
    max-height: 480px;
    clip-path: none;
  }

  .features-slide-enter-from,
  .features-slide-leave-to {
    opacity: 0;
    max-height: 0;
    clip-path: none;
  }

  .features-slide-enter-to,
  .features-slide-leave-from {
    opacity: 1;
    max-height: 480px;
    clip-path: none;
  }

  .features-panel .feature-tag {
    animation: none;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.35rem;
  }

  .robot-visual {
    height: 180px;
    padding: 1rem;
  }
}
</style>
