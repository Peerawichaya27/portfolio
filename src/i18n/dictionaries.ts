export const LANGS = ['en', 'th'] as const;
export type Lang = (typeof LANGS)[number];

/** Base path of each language's home page. English is the default at the root. */
export const HOME: Record<Lang, string> = { en: '/', th: '/th' };

export const langFromPath = (pathname: string | null): Lang =>
  pathname === '/th' || pathname?.startsWith('/th/') ? 'th' : 'en';

const en = {
  meta: {
    title: 'Peerawichaya Pholwiset — Full-Stack Engineer | tarpp.dev',
    description:
      'Full-stack engineer building React interfaces, backend APIs, enterprise integrations, and cloud-native deployments.',
    locale: 'en_US',
  },
  nav: {
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    research: 'Research',
    contact: 'Contact',
    main: 'Main navigation',
    open: 'Open menu',
    close: 'Close menu',
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
    language: 'Language',
    skip: 'Skip to content',
    home: 'tarpp.dev home',
  },
  hero: {
    label: 'Introduction',
    eyebrow: 'Peerawichaya Pholwiset / Developer at PTT Digital',
    title: 'Full-stack',
    accent: 'engineer',
    pitch:
      'I design and build web applications end to end: responsive interfaces, reliable APIs, and the cloud infrastructure behind them.',
    primary: 'See experience',
    secondary: 'Get in touch',
    outroEyebrow: 'Frontend / Backend / Cloud',
    outroTitle: ['Interfaces, APIs,', 'infrastructure'],
    outroLines: [
      'Developer at PTT Digital.',
      'TypeScript, React, Node.js, and cloud-native systems.',
    ],
    bottom: 'Full-stack & cloud engineering',
    scroll: 'Scroll through the portfolio',
    replay: 'Replay the opening ↺',
    editor: 'Code editor rendering the guitar',
    run: 'Run',
  },
  about: {
    eyebrow: '01 / The approach',
    title: ['From API design', 'to deployment'],
    tag: 'Frontend / Backend / Cloud',
    statement:
      'I’m Peerawichaya Pholwiset, a full-stack engineer working as a developer at PTT Digital. I work across the stack, from frontend features and backend services to databases, deployment, and identity integrations.',
    photoAlt:
      'Peerawichaya Pholwiset standing in a sunny park in New York, with tall trees and city towers behind.',
    photoScene: 'Scene 02',
    photoPlace: 'New York',
  },
  experience: {
    eyebrow: '02 / Work history',
    title: ['Engineering', 'experience'],
    current: 'Current',
    /** Role summaries keyed by role period; English falls back to data/site. */
    summaries: {} as Record<string, string>,
  },
  setup: {
    eyebrow: '03 / The setup',
    title: ['The stack', 'I build with'],
    copy: ['Languages, frameworks, and infrastructure', 'I’ve worked with across these platforms.'],
    nowPlaying: 'Now loading',
    categories: {} as Record<string, string>,
  },
  research: {
    eyebrow: '04 / Publications',
    title: ['Research', '& publications'],
    copy: ['Published work on authentication,', 'privacy, and digital trust.'],
    view: 'View on IEEE Xplore',
    newTab: '(opens in a new tab)',
  },
  contact: {
    eyebrow: 'Have something in mind?',
    title: ['Let’s talk', 'engineering'],
    copy: 'Open to engineering opportunities and conversations about full-stack systems, cloud, and secure software.',
    profiles: 'Profiles',
    copyButton: 'Copy',
    copied: 'Copied',
    copyLabel: 'Copy email address',
    copiedStatus: 'Email address copied',
  },
  film: {
    presents: 'tarpp.dev presents',
    kicker: 'Frontend · Backend · Cloud',
    role: 'Full-Stack Engineer',
    skip: 'Skip intro ↘',
  },
};

export type Dictionary = typeof en;

const th: Dictionary = {
  meta: {
    title: 'Peerawichaya Pholwiset — วิศวกรซอฟต์แวร์ฟูลสแตก | tarpp.dev',
    description:
      'วิศวกร Full-stack ที่พัฒนาอินเทอร์เฟซด้วย React, Backend API, การเชื่อมต่อระบบองค์กร และการ deploy ระบบบนคลาวด์',
    locale: 'th_TH',
  },
  nav: {
    about: 'เกี่ยวกับ',
    experience: 'ประสบการณ์',
    skills: 'ทักษะ',
    research: 'งานวิจัย',
    contact: 'ติดต่อ',
    main: 'เมนูหลัก',
    open: 'เปิดเมนู',
    close: 'ปิดเมนู',
    toLight: 'เปลี่ยนเป็นธีมสว่าง',
    toDark: 'เปลี่ยนเป็นธีมมืด',
    language: 'ภาษา',
    skip: 'ข้ามไปยังเนื้อหา',
    home: 'หน้าแรก tarpp.dev',
  },
  hero: {
    label: 'แนะนำตัว',
    eyebrow: 'Peerawichaya Pholwiset / Developer ที่ PTT Digital',
    title: 'วิศวกร',
    accent: 'ฟูลสแตก',
    pitch:
      'ออกแบบและพัฒนาเว็บแอปพลิเคชันแบบครบวงจร ตั้งแต่อินเทอร์เฟซที่ใช้งานง่าย API ที่เชื่อถือได้ ไปจนถึงโครงสร้างพื้นฐานบนคลาวด์',
    primary: 'ดูประสบการณ์',
    secondary: 'ติดต่อ',
    outroEyebrow: 'Frontend / Backend / Cloud',
    outroTitle: ['อินเทอร์เฟซ, API', 'และโครงสร้างพื้นฐาน'],
    outroLines: ['Developer ที่ PTT Digital', 'TypeScript, React, Node.js และระบบ cloud-native'],
    bottom: 'งาน Full-stack และคลาวด์',
    scroll: 'เลื่อนลงเพื่อดูผลงาน',
    replay: 'เล่นฉากเปิดอีกครั้ง ↺',
    editor: 'โปรแกรมแก้ไขโค้ดที่กำลังเรนเดอร์กีตาร์',
    run: 'รัน',
  },
  about: {
    eyebrow: '01 / แนวทางการทำงาน',
    title: ['ตั้งแต่ออกแบบ API', 'จนถึงการ deploy'],
    tag: 'Frontend / Backend / Cloud',
    statement:
      'Peerawichaya Pholwiset วิศวกร Full-stack ปัจจุบันทำงานในตำแหน่ง Developer ที่ PTT Digital ทำงานครอบคลุมทั้งระบบ ตั้งแต่ฟีเจอร์ฝั่ง Frontend และบริการฝั่ง Backend ไปจนถึงฐานข้อมูล การ deploy และการเชื่อมต่อระบบยืนยันตัวตน',
    photoAlt:
      'Peerawichaya Pholwiset ยืนอยู่ในสวนสาธารณะที่มีแดดจ้าในนิวยอร์ก มีต้นไม้สูงและตึกในเมืองอยู่ด้านหลัง',
    photoScene: 'ฉากที่ 02',
    photoPlace: 'นิวยอร์ก',
  },
  experience: {
    eyebrow: '02 / เส้นทางการทำงาน',
    title: ['ประสบการณ์', 'การทำงาน'],
    current: 'ปัจจุบัน',
    summaries: {
      'Aug 2026 — Present':
        'พัฒนาและดูแลบริการฝั่ง Backend สำหรับแพลตฟอร์มองค์กร ครอบคลุมการออกแบบ API การออกแบบฐานข้อมูลเชิงสัมพันธ์ การเชื่อมต่อกับระบบภายนอก การ deploy คอนเทนเนอร์บน Kubernetes และการทดสอบอัตโนมัติ',
      'Nov 2025 — Jul 2026':
        'พัฒนาเว็บแพลตฟอร์มองค์กรแบบ Full-stack ด้วย React และ NestJS ทั้ง Backend API ฟีเจอร์ฝั่ง Frontend การยืนยันตัวตนและการควบคุมสิทธิ์ และการเชื่อมต่อกับระบบขององค์กร',
      'Jan 2025 — May 2025':
        'พัฒนาระบบ Backend ด้วย Java และ Spring Boot รวมถึงการเชื่อมต่อฐานข้อมูลและการปรับประสิทธิภาพ SQL สนับสนุนการ deploy บนคลาวด์ และการเขียนโค้ดอย่างปลอดภัย',
    },
  },
  setup: {
    eyebrow: '03 / เครื่องมือ',
    title: ['เทคโนโลยี', 'ที่ใช้สร้างงาน'],
    copy: ['ภาษา เฟรมเวิร์ก และโครงสร้างพื้นฐาน', 'ที่ใช้งานจริงบนแพลตฟอร์มเหล่านี้'],
    nowPlaying: 'กำลังโหลด',
    categories: {
      Programming: 'ภาษาโปรแกรม',
      Databases: 'ฐานข้อมูล',
      'Testing & API Tooling': 'การทดสอบและเครื่องมือ API',
    },
  },
  research: {
    eyebrow: '04 / ผลงานตีพิมพ์',
    title: ['งานวิจัย', 'และผลงานตีพิมพ์'],
    copy: ['ผลงานด้านการยืนยันตัวตน', 'ความเป็นส่วนตัว และความน่าเชื่อถือดิจิทัล'],
    view: 'อ่านบน IEEE Xplore',
    newTab: '(เปิดในแท็บใหม่)',
  },
  contact: {
    eyebrow: 'มีโปรเจกต์หรือไอเดียอยากคุยกันไหม?',
    title: ['มาคุยกัน', 'เรื่องเทคโนโลยี'],
    copy: 'ยินดีรับโอกาสงานด้านวิศวกรรมซอฟต์แวร์ และพร้อมพูดคุยเรื่องระบบ Full-stack คลาวด์ และซอฟต์แวร์ที่ปลอดภัย',
    profiles: 'โปรไฟล์',
    copyButton: 'คัดลอก',
    copied: 'คัดลอกแล้ว',
    copyLabel: 'คัดลอกอีเมล',
    copiedStatus: 'คัดลอกอีเมลแล้ว',
  },
  film: {
    presents: 'tarpp.dev นำเสนอ',
    kicker: 'Frontend · Backend · Cloud',
    role: 'วิศวกรฟูลสแตก',
    skip: 'ข้ามฉากเปิด ↘',
  },
};

export const dictionaries: Record<Lang, Dictionary> = { en, th };
