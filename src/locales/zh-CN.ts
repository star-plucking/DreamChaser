export default {
  nav: {
    dashboard: '仪表盘',
    logs: '历史',
    arsenal: '机器人介绍',
    about: '关于队伍',
    crew: '队员',
    knowledge: '知识库',
    ipStore: '联系我们'
  },
  common: {
    language: '语言',
    chinese: '中文',
    english: 'English'
  },
  home: {
    title: 'DreamChaser RoboMaster',
    subtitle: '>>> 追梦无限，挑战至上。',
    accessArsenal: '了解我们的机器人',
    latestIntel: '/// 最新情报',
    stats: {
      coreCodeLines: '核心代码行数',
      totalPoints: '累计积分',
      ranking: '排名',
      activeOperatives: '活跃人员'
    },
    units: {
      loc: '行',
      points: '分',
      rank: '名',
      personnel: '人'
    }
  },
  contact: {
    title: '联系我们',
    subtitle: '赞助/加入DreamChaser，一起追逐梦想',
    contactInfo: '联系方式',
    email: '邮箱',
    phone: '电话',
    qq: 'QQ群',
    address: '地址',
    joinUs: '加入我们',
    joinTitle: '想要加入我们？',
    joinDesc: '欢迎加入追梦战队，与我们一起探索机器人技术与工程实践。',
    recruitment: '加入我们',
    positions: '招募岗位',
    mechanical: '机械组',
    electrical: '电控组',
    vision: '视觉组',
    operation: '硬件组',
    mechanicalDesc: '负责机器人结构设计、绘图、加工',
    electricalDesc: '负责机器人嵌入式程序开发控制算法',
    visionDesc: '负责机器人视觉算法、图像识别',
    operationDesc: '负责机器人硬件开发、电路设计、信号调试',
    viewRequirements: '查看方向详情',
    technicalPosition: '技术方向',
    close: '关闭',
    fullRequirements: '查看完整招新说明',
    requirementNote: '具体时间、考核安排和报名方式以当期正式通知为准。',
    generalRecruitment: '普通招新 · 零基础可报名',
    generalRecruitmentDesc: '面向对机器人比赛感兴趣、能力尚不足以独立开发模块的同学。可参加薪火培训，必须通过“追梦杯”校内赛初赛，最终经面试入队。',
    specialRecruitment: '特殊招新 · 入队即开发',
    specialRecruitmentDesc: '面向有相关比赛或项目经验、能够完成对应机器人模块开发的同学。特招名额较少，未通过仍可参加普通招新。',
    requirementSections: {
      work: '主要负责',
      learn: '你将学到',
      special: '特殊招新要求'
    },
    requirements: {
      mechanical: {
        work: ['机器人机械结构的设计、组装与优化', '机器人零件的加工、装配与维护', '场地道具的加工、组装与日常维护'],
        learn: ['机械原理、机械制图、机器人动力及结构学', 'SolidWorks 等工业三维制图软件', '底盘、云台等常用机械结构的设计及装配方法'],
        special: ['能熟练使用 SolidWorks 建模', '能较快发现不完善机构的关键问题并提出可行改进方案', '了解常用机构设计方法、常用材料性质与使用场景，并有实物装配经验', '认真负责，能够有效交流协作']
      },
      electrical: {
        work: ['嵌入式主控单元开发', '各类电驱设备的选型和驱动', '执行逻辑、控制算法的设计、实现与调试'],
        learn: ['嵌入式开发知识', '传感器应用', '自动控制算法'],
        special: ['掌握 C/C++，理解数组、指针、结构体、内存分布和寄存器', '熟悉嵌入式开发流程，会使用 STM32 基本外设', '动手、资料检索和学习能力强，认真负责且善于沟通', '大二及以上需要掌握控制理论和机器人学', '有 FRC、RoboCup、RMYC、智能车或机器人项目经验者优先']
      },
      vision: {
        work: ['机器人智能感知与高阶决策算法设计', '机器视觉目标检测与自主打击决策', '根据赛题开展自主定位、导航等任务'],
        learn: ['深度学习、SLAM 建图、传统机器视觉与 ROS', '使用 C++、Python 开发算法', '部署 YOLO 系列及轻量化网络，并进行模型优化加速'],
        special: ['以下满足任意一点即可', '熟练训练神经网络，使用过 YOLO，能讲解网络结构并在 Linux 下训练', '熟悉 OpenCV 和常见数字图像处理算法，具备独立开发能力', '熟悉 GPU 编程，能够独立编写 CUDA 内核', '有机械臂仿真、强化学习或其他仿真项目经验', '有前后端、数据库开发经验，独立开发过网站或 App 更佳']
      },
      operation: {
        work: ['各类 PCB 的设计、制作与测试', '电路模块底层控制代码的编写和维护', '机器人硬件电路的日常维护，涉及数字电源、电机驱控、信号处理、射频通信等领域'],
        learn: ['电路分析、模电、数电、嵌入式原理和数字信号处理', 'EDA、PCB、开关电源、热设计、单片机程序与算法', '焊接维修及万用表、示波器、逻辑分析仪等设备的使用'],
        special: ['以下满足任意一点即可', '有大功率纯数字电源经验，或精通开关电源环路理论及优化', '掌握无刷电机 FOC，有驱动软硬件设计经验', '有大功率无线充电系统或 LLC 拓扑开关电源经验', '有电力线载波、射频通信等硬件实物制作经验', '了解通信原理并有软件无线电开发经验', '有 DDR 高速接口或复杂 SoC/FPGA 核心板设计经验']
      }
    }
  },
  knowledge: {
    title: '知识库',
    subtitle: '开源薪火 · 技术传承',
    docs: '开源文档',
    training: '薪火培训视频',
    watchOnBilibili: '在B站观看培训视频',
    trainingDesc: '观看我们在Bilibili上的薪火培训系列视频，学习机器人研发知识'
  },
  history: {
    title: '队伍历史',
    subtitle: '追梦之路 · 荣耀时刻',
    journey: '发展历程',
    honors: '过往荣誉'
  }
}
