<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 发展历程时间线
const milestones = [
  {
    year: '2015-2018',
    title: '前身阶段',
    titleEn: 'Early Years',
    desc: '自动化学院成立RoboMaster和Robocon参赛队，Robocon战队在2016年和2017年分别获得全国三等奖和北部分区赛三等奖',
    descEn: 'School of Automation established RoboMaster and Robocon teams. Robocon team won National Third Prize in 2016 and Northern Regional Third Prize in 2017',
    image: ''
  },
  {
    year: '2018',
    title: '正式成立',
    titleEn: 'Official Establishment',
    desc: '2018年5月10日，北京理工大学机器人队正式挂牌成立，战队名称确定为Dream Chaser（追梦战队），释义为"我们都在努力奔跑，我们都是追梦人"',
    descEn: 'May 10, 2018, BIT Robot Team officially established as Dream Chaser, meaning "We are all running hard, we are all dream chasers"',
    image: ''
  },
  {
    year: '2019',
    title: '首战告捷',
    titleEn: 'First Victory',
    desc: '获得北部赛区二等奖，全国三等奖，步兵对抗单项赛全国冠军',
    descEn: 'Northern Regional Second Prize, National Third Prize, and National Champion in Infantry Combat',
    image: ''
  },
  {
    year: '2020',
    title: '线上突破',
    titleEn: 'Online Achievement',
    desc: '受疫情影响线下赛取消，线上评审获得全国二等奖，工程机器人获得线上评审一等奖',
    descEn: 'Due to COVID-19, won National Second Prize in online review, Engineering Robot won First Prize',
    image: ''
  },
  {
    year: '2021',
    title: '晋级八强',
    titleEn: 'Top 8 Achievement',
    desc: '北部赛区一等奖，以八强成绩晋级全国赛，获得全国二等奖',
    descEn: 'Northern Regional First Prize, advanced to nationals as Top 8, won National Second Prize',
    image: ''
  },
  {
    year: '2022',
    title: '多线开花',
    titleEn: 'Multiple Achievements',
    desc: '东部赛区二等奖、全国赛三等奖，高校联盟赛一等奖',
    descEn: 'Eastern Regional Second Prize, National Third Prize, University League First Prize',
    image: ''
  },
  {
    year: '2023',
    title: '稳步前行',
    titleEn: 'Steady Progress',
    desc: '北部分区赛三十二强',
    descEn: 'Top 32 in Northern Regional',
    image: ''
  },
  {
    year: '2024',
    title: '巅峰时刻',
    titleEn: 'Peak Moment',
    desc: '中部分区赛冠军，全国赛十六强，获得国家级一等奖',
    descEn: 'Central Regional Champion, National Top 16, National First Prize',
    image: ''
  },
  {
    year: '2025',
    title: '持续拼搏',
    titleEn: 'Continuous Effort',
    desc: '东部分区赛三十二强',
    descEn: 'Top 32 in Eastern Regional',
    image: ''
  }
]

// 荣誉展示
const honors = [
  {
    title: '2024中部赛区冠军',
    titleEn: '2024 Central Regional Champion',
    event: 'RoboMaster 2024 Regional Competition',
    eventEn: 'RoboMaster 2024 Regional Competition',
    image: ''
  },
  {
    title: '国家级一等奖',
    titleEn: 'National First Prize',
    event: 'RoboMaster 2024 National Competition',
    eventEn: 'RoboMaster 2024 National Competition',
    image: ''
  },
  {
    title: '高校联盟赛一等奖',
    titleEn: 'RMUL First Prize',
    event: 'RoboMaster 2022 University League',
    eventEn: 'RoboMaster 2022 University League',
    image: ''
  },
  {
    title: '北部赛区一等奖',
    titleEn: 'Northern Regional First Prize',
    event: 'RoboMaster 2021 Northern Regional Competition',
    eventEn: 'RoboMaster 2021 Northern Regional Competition',
    image: ''
  },
  {
    title: '步兵对抗全国冠军',
    titleEn: 'Infantry Combat National Champion',
    event: 'RoboMaster 2019',
    eventEn: 'RoboMaster 2019',
    image: ''
  },
  {
    title: 'Robocon全国三等奖',
    titleEn: 'Robocon National Third Prize',
    event: 'Robocon 2016',
    eventEn: 'Robocon 2016',
    image: ''
  }
]
</script>

<template>
  <div class="history-container">
    <div class="header">
      <h1>{{ t('history.title') }}</h1>
      <p>{{ t('history.subtitle') }}</p>
    </div>

    <!-- 发展历程时间线 -->
    <section class="timeline-section">
      <h2 class="section-title">{{ t('history.journey') }}</h2>
      <div class="timeline">
        <div v-for="(milestone, index) in milestones" :key="index" class="timeline-item" :class="{ right: index % 2 === 1 }">
          <div class="timeline-content">
            <div class="timeline-year">{{ milestone.year }}</div>
            <div class="timeline-card">
              <div v-if="milestone.image" class="timeline-image">
                <img :src="milestone.image" :alt="milestone.title" />
              </div>
              <div class="timeline-info">
                <h3>{{ $i18n.locale === 'zh-CN' ? milestone.title : milestone.titleEn }}</h3>
                <p>{{ $i18n.locale === 'zh-CN' ? milestone.desc : milestone.descEn }}</p>
              </div>
            </div>
          </div>
          <div class="timeline-dot"></div>
        </div>
      </div>
    </section>

    <!-- 荣誉墙 -->
    <section class="honors-section">
      <h2 class="section-title">{{ t('history.honors') }}</h2>
      <div class="honors-grid">
        <div v-for="(honor, index) in honors" :key="index" class="honor-card">
          <div v-if="honor.image" class="honor-image">
            <img :src="honor.image" :alt="honor.title" />
          </div>
          <div v-else class="honor-placeholder">
            <div class="trophy-icon">🏆</div>
          </div>
          <div class="honor-info">
            <h3>{{ $i18n.locale === 'zh-CN' ? honor.title : honor.titleEn }}</h3>
            <p>{{ $i18n.locale === 'zh-CN' ? honor.event : honor.eventEn }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.history-container {
  padding: 2rem 4rem;
  height: 100%;
  overflow-y: auto;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
  
  h1 {
    font-family: $font-title;
    font-size: 4rem;
    color: $color-primary;
    @include text-glow;
    margin: 0;
    text-transform: uppercase;
  }
  
  p {
    color: $color-text-dim;
    font-family: $font-code;
    letter-spacing: 4px;
    margin-top: 1rem;
    font-size: 1.2rem;
  }
}

.section-title {
  font-family: $font-title;
  font-size: 2.5rem;
  color: $color-accent;
  text-align: center;
  margin-bottom: 3rem;
  text-transform: uppercase;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 3px;
    background: $color-accent;
    margin: 1rem auto 0;
  }
}

// 时间线样式
.timeline-section {
  max-width: 1200px;
  margin: 0 auto 6rem;
}

.timeline {
  position: relative;
  padding: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, transparent, $color-primary, transparent);
    transform: translateX(-50%);
  }
}

.timeline-item {
  display: flex;
  justify-content: flex-end;
  padding-right: 50%;
  position: relative;
  margin-bottom: 3rem;
  
  &.right {
    justify-content: flex-start;
    padding-right: 0;
    padding-left: 50%;
    
    .timeline-content {
      margin-left: 3rem;
    }
  }
  
  .timeline-content {
    margin-right: 3rem;
    max-width: 500px;
  }
}

.timeline-year {
  font-family: $font-title;
  font-size: 2rem;
  color: $color-primary;
  font-weight: bold;
  margin-bottom: 1rem;
  @include text-glow;
}

.timeline-card {
  @include glass-panel;
  padding: 1.5rem;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    border-color: $color-primary;
    box-shadow: 0 0 30px rgba($color-primary, 0.3);
  }
  
  .timeline-image {
    width: 100%;
    height: 200px;
    margin-bottom: 1rem;
    overflow: hidden;
    border: 1px solid rgba($color-primary, 0.3);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .timeline-info {
    h3 {
      font-family: $font-title;
      font-size: 1.5rem;
      color: $color-white;
      margin: 0 0 0.5rem;
    }
    
    p {
      font-family: $font-code;
      color: $color-text-dim;
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 0;
    }
  }
}

.timeline-dot {
  position: absolute;
  left: 50%;
  top: 0;
  width: 20px;
  height: 20px;
  background: $color-primary;
  border: 4px solid $color-bg;
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 20px $color-primary;
  z-index: 10;
}

// 荣誉墙样式
.honors-section {
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 8rem;
}

.honors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.honor-card {
  @include glass-panel;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  border-color: rgba($color-accent, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 0%, rgba($color-accent, 0.1), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-15px);
    border-color: $color-accent;
    box-shadow: 0 0 50px rgba($color-accent, 0.3);
    
    &::before {
      opacity: 1;
    }
    
    .honor-info h3::before, .honor-info h3::after {
      opacity: 1;
      filter: drop-shadow(0 0 8px $color-accent);
    }
  }
  
  .honor-image {
    width: 100%;
    height: 220px;
    margin-bottom: 2rem;
    overflow: hidden;
    border: 1px solid rgba($color-accent, 0.2);
    position: relative;
    clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
    }
    
    &:hover img {
      transform: scale(1.1);
    }
  }
  
  .honor-placeholder {
    width: 100%;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba($color-accent, 0.1) 0%, transparent 100%);
    border: 1px solid rgba($color-accent, 0.2);
    margin-bottom: 2rem;
    position: relative;
    clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
    
    .trophy-icon {
      font-size: 5rem;
      filter: drop-shadow(0 0 15px rgba($color-accent, 0.4));
      color: $color-accent;
      opacity: 0.8;
    }
  }
  
  .honor-info {
    h3 {
      font-family: $font-title;
      font-size: 1.4rem;
      color: $color-accent;
      margin: 0 0 0.8rem;
      text-transform: uppercase;
      position: relative;
      display: inline-block;
      padding: 0 4rem;
      @include text-glow($color-accent);
      
      &::before, &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 3.5rem;
        height: 3.5rem;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 60 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 95 C30 70 20 50 10 10' stroke='%23F0FF00' stroke-width='1.5' fill='none'/%3E%3Cpath d='M28 85 C15 82 8 75 5 65 C12 68 22 75 28 85' fill='%23F0FF00'/%3E%3Cpath d='M25 65 C12 62 5 55 2 45 C9 48 19 55 25 65' fill='%23F0FF00'/%3E%3Cpath d='M20 45 C8 42 2 35 0 25 C7 28 15 35 20 45' fill='%23F0FF00'/%3E%3Cpath d='M15 25 C5 22 1 15 0 5 C5 8 10 15 15 25' fill='%23F0FF00'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: contain;
        opacity: 0.7;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      
      &::before {
        left: 0;
        transform: translateY(-50%) rotate(-15deg);
      }
      
      &::after {
        right: 0;
        transform: translateY(-50%) scaleX(-1) rotate(-15deg);
      }
    }
    
    p {
      font-family: $font-code;
      color: $color-text-dim;
      font-size: 0.9rem;
      margin: 0;
      letter-spacing: 1px;
    }
  }
}

// 响应式适配
@media (max-width: 768px) {
  .timeline {
    &::before {
      left: 30px;
    }
  }
  
  .timeline-item {
    padding-right: 0;
    padding-left: 60px !important;
    
    .timeline-content {
      margin: 0 !important;
    }
  }
  
  .timeline-dot {
    left: 30px;
  }
}
</style>
