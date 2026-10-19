/** Homepage content. Keep each robot's technical notes next to its display data. */
export interface HeroMachine {
  id: string
  composition: 'infantry' | 'hero' | 'engineer'
  name: string
  en: string
  file: string
  tag: string
  tagEn: string
  notes: readonly { zh: string; en: string }[]
}

export const heroMachines: readonly HeroMachine[] = [
  {
    id: '03',
    composition: 'infantry',
    name: '轮腿步兵',
    en: 'WHEELED-LEG INFANTRY',
    file: '3号轮腿步兵',
    tag: '主动悬挂 / 高机动底盘',
    tagEn: 'ACTIVE SUSPENSION / HIGH MOBILITY',
    notes: [
      { zh: '主动悬挂', en: 'ACTIVE SUSPENSION' },
      { zh: '串联腿构型', en: 'SERIAL-LEG CHASSIS' },
      { zh: '翻倒自救', en: 'SELF-RIGHTING' }
    ]
  },
  {
    id: '01',
    composition: 'hero',
    name: '英雄机器人',
    en: 'HERO ROBOT',
    file: '1号英雄',
    tag: '地形跨越 / 精准火力',
    tagEn: 'TERRAIN TRAVERSAL / PRECISION FIRE',
    notes: [
      { zh: '快拆三摩擦云台', en: 'QUICK-RELEASE TURRET' },
      { zh: '双相机自瞄', en: 'DUAL-CAMERA AIMING' },
      { zh: '地形跨越', en: 'TERRAIN TRAVERSAL' }
    ]
  },
  {
    id: '02',
    composition: 'engineer',
    name: '工程机器人',
    en: 'ENGINEER ROBOT',
    file: '2号工程',
    tag: '六轴机械臂 / 资源作业',
    tagEn: 'SIX-AXIS ARM / RESOURCE OPERATIONS',
    notes: [
      { zh: '六轴串联机械臂', en: 'SIX-AXIS ARM' },
      { zh: '主动锁紧存储舱', en: 'LOCKING STORAGE BAY' },
      { zh: '精确搬运', en: 'PRECISION HANDLING' }
    ]
  }
]

export interface HomeNews {
  date: string
  title: string
  en: string
  category: 'event' | 'competition'
  to: string
}

export const homeNews: readonly HomeNews[] = [
  {
    date: '2026.09.20',
    title: '2026 秋招启动',
    en: '2026 Fall Recruitment Opens',
    category: 'event',
    to: '/merch'
  },
  {
    date: '2026.08.01',
    title: 'RMUC 机甲大师超级对抗赛全国赛',
    en: 'RMUC National Competition',
    category: 'competition',
    to: '/about'
  },
  {
    date: '2026.05.29',
    title: 'RMUC 机甲大师超级对抗赛北部分区赛',
    en: 'RMUC Northern Regional Competition',
    category: 'competition',
    to: '/about'
  },
  {
    date: '2026.03.29',
    title: 'RMUL 机甲大师高校联盟赛亚军',
    en: 'RMUL University League Runner-up',
    category: 'competition',
    to: '/about'
  },
  {
    date: '2025.11.30',
    title: '“追梦杯”机器人校内赛决赛',
    en: 'DreamChaser Cup Campus Final',
    category: 'competition',
    to: '/about'
  },
  {
    date: '2025.09.13',
    title: '机器人队秋招正式启动',
    en: 'Fall Recruitment Opens',
    category: 'event',
    to: '/merch'
  },
  {
    date: '2025.05.26',
    title: 'RMUC 机甲大师超级对抗赛东部分区赛',
    en: 'RMUC Eastern Regional Competition',
    category: 'competition',
    to: '/about'
  }
]
