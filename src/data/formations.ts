import { DroneNode, LandmarkChapter, LightMode } from '../types/drone';

export const LIGHT_MODES: LightMode[] = [
  {
    id: 'heritage',
    name: '朱印古韻',
    subtitle: '古都宮殿金紅光影',
    description: '以孔廟經典朱砂紅、帝皇琉璃金與溫潤暖琥珀為主調，重現全臺首學三百年典雅古韻。',
    primaryGlow: 'rgba(239, 68, 68, 0.8)',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/30',
  },
  {
    id: 'zeelandia',
    name: '大航海琉璃',
    subtitle: '荷治城堡與大員碧海',
    description: '熱蘭遮城紅磚稜堡色澤搭配大員灣深邃靛藍與燈塔純白光束，呈現17世紀大航海時代磅礡史詩。',
    primaryGlow: 'rgba(56, 189, 248, 0.8)',
    badgeColor: 'border-sky-500/40 text-sky-300 bg-sky-950/30',
  },
  {
    id: 'festive',
    name: '慶典星芒',
    subtitle: '台南400璀璨火花',
    description: '高頻頻閃鑽石白、香檳金與鳳凰木烈焰紅交織，重現安平港璀璨煙火與百年盛典。',
    primaryGlow: 'rgba(251, 191, 36, 0.9)',
    badgeColor: 'border-yellow-500/40 text-yellow-300 bg-yellow-950/30',
  },
  {
    id: 'cyber',
    name: '幻彩夜空',
    subtitle: '當代夜景霓虹波紋',
    description: '電光青、洋紅紫與極光漸變，透過動態 CSS Keyframes 傳遞現代科技與歷史古蹟的交融。',
    primaryGlow: 'rgba(168, 85, 247, 0.8)',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/30',
  },
];

// Helper to interpolate points along a curve or line
function linePoints(
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number,
  count: number,
  color: string,
  glow: string,
  tag: string,
  group: string,
  startId: number
): DroneNode[] {
  const nodes: DroneNode[] = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    nodes.push({
      id: startId + i,
      x: x1 + (x2 - x1) * t,
      y: y1 + (y2 - y1) * t,
      z: z1 + (z2 - z1) * t,
      color,
      glowColor: glow,
      brightness: 0.9 + Math.sin(i * 1.3) * 0.2,
      pulseSpeed: 2 + (i % 5) * 0.4,
      strobeDelay: (i * 0.08) % 2,
      featureTag: tag,
      landmarkGroup: group,
    });
  }
  return nodes;
}

// -------------------------------------------------------------
// CHAPTER 1: 序幕 · 星宿啟航 (Launch & Celestial Galaxy Swarm)
// -------------------------------------------------------------
function generatePrologueDrones(): DroneNode[] {
  const drones: DroneNode[] = [];
  const TOTAL = 400;

  for (let i = 0; i < TOTAL; i++) {
    // Archimedean / Logarithmic spiral galaxy swarm
    const turns = 4.2;
    const progress = i / TOTAL;
    const angle = progress * Math.PI * 2 * turns;
    const radius = 6 + Math.pow(progress, 0.75) * 82;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * (radius * 0.65) - 5;
    const z = Math.sin(angle * 2) * 28 + (progress - 0.5) * 35;

    // Color gradient from center gold/white to deep nebula violet/cyan
    let color = '#FFFFFF';
    let glow = '#60A5FA';
    if (progress < 0.15) {
      color = '#FEF08A';
      glow = '#F59E0B';
    } else if (progress < 0.45) {
      color = '#93C5FD';
      glow = '#3B82F6';
    } else if (progress < 0.75) {
      color = '#C084FC';
      glow = '#8B5CF6';
    } else {
      color = '#38BDF8';
      glow = '#0284C7';
    }

    drones.push({
      id: i + 1,
      x,
      y,
      z,
      color,
      glowColor: glow,
      brightness: 0.8 + Math.random() * 0.4,
      pulseSpeed: 1.8 + (i % 7) * 0.3,
      strobeDelay: (i * 0.05) % 3,
      featureTag: progress < 0.2 ? '星系星核 (Galaxy Core)' : '星空旋臂 (Spiral Arm Drone)',
      landmarkGroup: '星河引航編隊',
    });
  }
  return drones;
}

// -------------------------------------------------------------
// CHAPTER 2: 全臺首學 · 台南孔廟大成殿 (Tainan Confucian Temple)
// -------------------------------------------------------------
function generateConfucianTempleDrones(): DroneNode[] {
  const drones: DroneNode[] = [];
  let curId = 1;

  // 1. Upper Roof Ridge & Double Eave Swallowtail (大成殿重簷燕尾脊頂) - 80 drones
  const roofRidgeCount = 36;
  for (let i = 0; i < roofRidgeCount; i++) {
    const t = i / (roofRidgeCount - 1);
    const x = -70 + t * 140;
    // Upward graceful curvature at swallowtail tips
    const curve = Math.pow(Math.abs(x) / 70, 2.5) * 16;
    const y = -45 - curve;
    const z = -5 + Math.sin(t * Math.PI) * 12;

    const isTip = Math.abs(x) > 55;
    drones.push({
      id: curId++,
      x,
      y,
      z,
      color: isTip ? '#F59E0B' : '#FBBF24',
      glowColor: '#D97706',
      brightness: 1.2,
      pulseSpeed: 2.2,
      strobeDelay: (i * 0.1) % 2,
      featureTag: isTip ? '燕尾翹角飛簷 (Swallowtail Eave Tip)' : '正脊金黃琉璃瓦 (Main Roof Ridge)',
      landmarkGroup: '大成殿重簷屋頂',
    });
  }

  // Roof Central Treasure Pagoda & Twin Dragon Finials (脊頂螭吻與寶塔) - 14 drones
  for (let i = 0; i < 6; i++) {
    drones.push({
      id: curId++,
      x: 0,
      y: -50 - i * 4.2,
      z: 5,
      color: '#FEF08A',
      glowColor: '#F59E0B',
      brightness: 1.4,
      pulseSpeed: 1.5,
      strobeDelay: 0.1 * i,
      featureTag: '通天寶塔 (Sky-Pointing Treasure Pagoda)',
      landmarkGroup: '大成殿重簷屋頂',
    });
  }
  // Finials left & right
  for (let side of [-1, 1]) {
    for (let j = 0; j < 4; j++) {
      drones.push({
        id: curId++,
        x: side * (62 + j * 3),
        y: -60 - j * 2.5,
        z: 0,
        color: '#F97316',
        glowColor: '#EA580C',
        brightness: 1.2,
        pulseSpeed: 1.8,
        strobeDelay: j * 0.2,
        featureTag: '螭吻吻獸 (Ornamental Dragon Finial)',
        landmarkGroup: '大成殿重簷屋頂',
      });
    }
  }

  // 2. Lower Eaves of Dacheng Hall (下簷歇山頂) - 44 drones
  const lowerEaveCount = 44;
  for (let i = 0; i < lowerEaveCount; i++) {
    const t = i / (lowerEaveCount - 1);
    const x = -82 + t * 164;
    const curve = Math.pow(Math.abs(x) / 82, 2.2) * 12;
    const y = -24 - curve;
    const z = 8 + Math.sin(t * Math.PI) * 10;
    drones.push({
      id: curId++,
      x,
      y,
      z,
      color: '#EF4444',
      glowColor: '#B91C1C',
      brightness: 1.0,
      pulseSpeed: 2.0,
      strobeDelay: (i * 0.08) % 2,
      featureTag: '下簷飛簷弧線 (Lower Swallowtail Eaves)',
      landmarkGroup: '大成殿重簷屋頂',
    });
  }

  // 3. Wooden Bracket System (斗栱裝飾) - 24 drones
  for (let i = 0; i < 12; i++) {
    const x = -60 + i * 11;
    drones.push(
      {
        id: curId++,
        x,
        y: -20,
        z: 4,
        color: '#F59E0B',
        glowColor: '#D97706',
        brightness: 0.9,
        pulseSpeed: 2.4,
        strobeDelay: 0.15 * i,
        featureTag: '重昂斗栱 (Bracket System Dou-gong)',
        landmarkGroup: '樑枋斗栱構造',
      },
      {
        id: curId++,
        x,
        y: -16,
        z: 2,
        color: '#DC2626',
        glowColor: '#991B1B',
        brightness: 0.85,
        pulseSpeed: 2.4,
        strobeDelay: 0.15 * i + 0.1,
        featureTag: '大成殿額枋 (Ceremonial Architrave)',
        landmarkGroup: '樑枋斗栱構造',
      }
    );
  }

  // 4. "全臺首學" Imperial Tablet Hovering in the Sky (全臺首學御匾) - 56 drones
  // 4 characters: 全 臺 首 學
  const plaqueLetters = [
    // 全 (Quan)
    { x: -45, y: -78 },
    { x: -45, y: -74 },
    { x: -50, y: -70 },
    { x: -40, y: -70 },
    { x: -52, y: -66 },
    { x: -38, y: -66 },
    { x: -45, y: -66 },
    { x: -45, y: -62 },
    { x: -52, y: -62 },
    { x: -38, y: -62 },
    { x: -45, y: -70 },
    { x: -47, y: -75 },
    { x: -43, y: -75 },
    { x: -45, y: -82 },
    // 臺 (Tai)
    { x: -15, y: -82 },
    { x: -15, y: -77 },
    { x: -21, y: -77 },
    { x: -9, y: -77 },
    { x: -15, y: -72 },
    { x: -21, y: -67 },
    { x: -9, y: -67 },
    { x: -15, y: -67 },
    { x: -20, y: -62 },
    { x: -10, y: -62 },
    { x: -15, y: -62 },
    { x: -21, y: -72 },
    { x: -9, y: -72 },
    { x: -15, y: -85 },
    // 首 (Shou)
    { x: 15, y: -82 },
    { x: 11, y: -85 },
    { x: 19, y: -85 },
    { x: 9, y: -77 },
    { x: 21, y: -77 },
    { x: 15, y: -77 },
    { x: 10, y: -71 },
    { x: 20, y: -71 },
    { x: 15, y: -71 },
    { x: 10, y: -65 },
    { x: 20, y: -65 },
    { x: 15, y: -65 },
    { x: 10, y: -60 },
    { x: 20, y: -60 },
    // 學 (Xue)
    { x: 45, y: -85 },
    { x: 39, y: -83 },
    { x: 51, y: -83 },
    { x: 45, y: -78 },
    { x: 38, y: -78 },
    { x: 52, y: -78 },
    { x: 45, y: -72 },
    { x: 41, y: -68 },
    { x: 49, y: -68 },
    { x: 45, y: -64 },
    { x: 39, y: -61 },
    { x: 51, y: -61 },
    { x: 45, y: -61 },
    { x: 45, y: -88 },
  ];

  plaqueLetters.forEach((p, idx) => {
    drones.push({
      id: curId++,
      x: p.x,
      y: p.y,
      z: 15,
      color: '#FEF08A',
      glowColor: '#EAB308',
      brightness: 1.4,
      pulseSpeed: 1.6,
      strobeDelay: (idx * 0.05) % 1.5,
      featureTag: '「全臺首學」御筆題匾 (First Academy Plaque)',
      landmarkGroup: '全臺首學金匾',
    });
  });

  // Plaque Border Frame - 22 drones
  const pFrameLeft = -60;
  const pFrameRight = 60;
  for (let i = 0; i < 11; i++) {
    const t = i / 10;
    drones.push(
      {
        id: curId++,
        x: pFrameLeft + t * (pFrameRight - pFrameLeft),
        y: -92,
        z: 14,
        color: '#D97706',
        glowColor: '#B45309',
        brightness: 1.1,
        pulseSpeed: 2.0,
        strobeDelay: 0.1 * i,
        featureTag: '御匾九龍金雕邊框 (Gilded Dragon Frame)',
        landmarkGroup: '全臺首學金匾',
      },
      {
        id: curId++,
        x: pFrameLeft + t * (pFrameRight - pFrameLeft),
        y: -56,
        z: 14,
        color: '#D97706',
        glowColor: '#B45309',
        brightness: 1.1,
        pulseSpeed: 2.0,
        strobeDelay: 0.1 * i + 0.05,
        featureTag: '御匾九龍金雕邊框 (Gilded Dragon Frame)',
        landmarkGroup: '全臺首學金匾',
      }
    );
  }

  // 5. Grand Vermilion Pillars (大成殿朱紅大柱) - 8 pillars x 8 drones = 64 drones
  const pillarXList = [-58, -42, -26, -10, 10, 26, 42, 58];
  pillarXList.forEach((px, pIdx) => {
    for (let j = 0; j < 8; j++) {
      const y = -14 + j * 5.2;
      drones.push({
        id: curId++,
        x: px,
        y,
        z: 5 - (Math.abs(px) / 60) * 8,
        color: '#DC2626',
        glowColor: '#991B1B',
        brightness: 0.95,
        pulseSpeed: 2.2,
        strobeDelay: (pIdx * 0.2 + j * 0.05) % 2,
        featureTag: `大成殿朱紅立柱 (Column ${pIdx + 1})`,
        landmarkGroup: '前廊殿柱與門扉',
      });
    }
  });

  // 6. Central Ceremony Doors & Latticed Windows (櫺星門花欞木門) - 28 drones
  for (let i = 0; i < 7; i++) {
    const y = -10 + i * 5.5;
    drones.push(
      {
        id: curId++,
        x: -4,
        y,
        z: 2,
        color: '#B91C1C',
        glowColor: '#7F1D1D',
        brightness: 0.85,
        pulseSpeed: 2.5,
        strobeDelay: 0.2 * i,
        featureTag: '中港朱漆格扇門 (Central Lattice Door)',
        landmarkGroup: '前廊殿柱與門扉',
      },
      {
        id: curId++,
        x: 4,
        y,
        z: 2,
        color: '#B91C1C',
        glowColor: '#7F1D1D',
        brightness: 0.85,
        pulseSpeed: 2.5,
        strobeDelay: 0.2 * i + 0.1,
        featureTag: '中港朱漆格扇門 (Central Lattice Door)',
        landmarkGroup: '前廊殿柱與門扉',
      },
      {
        id: curId++,
        x: -18,
        y,
        z: 2,
        color: '#F59E0B',
        glowColor: '#B45309',
        brightness: 0.8,
        pulseSpeed: 2.5,
        strobeDelay: 0.2 * i + 0.15,
        featureTag: '欞花透窗 (Carved Lattice Window)',
        landmarkGroup: '前廊殿柱與門扉',
      },
      {
        id: curId++,
        x: 18,
        y,
        z: 2,
        color: '#F59E0B',
        glowColor: '#B45309',
        brightness: 0.8,
        pulseSpeed: 2.5,
        strobeDelay: 0.2 * i + 0.2,
        featureTag: '欞花透窗 (Carved Lattice Window)',
        landmarkGroup: '前廊殿柱與門扉',
      }
    );
  }

  // 7. Stone Moon Terrace Base & Balustrades (月台丹墀石欄杆) - 48 drones
  for (let i = 0; i < 32; i++) {
    const t = i / 31;
    const x = -72 + t * 144;
    drones.push({
      id: curId++,
      x,
      y: 28,
      z: 10,
      color: '#E2E8F0',
      glowColor: '#94A3B8',
      brightness: 0.9,
      pulseSpeed: 2.6,
      strobeDelay: (i * 0.05) % 2,
      featureTag: '月台白石欄杆 (White Stone Balustrade)',
      landmarkGroup: '月台丹墀基座',
    });
  }
  // Base floor and steps
  for (let i = 0; i < 16; i++) {
    const t = i / 15;
    const x = -50 + t * 100;
    drones.push({
      id: curId++,
      x,
      y: 36,
      z: 14,
      color: '#CBD5E1',
      glowColor: '#64748B',
      brightness: 0.8,
      pulseSpeed: 2.8,
      strobeDelay: (i * 0.1) % 2,
      featureTag: '御路石階 (Imperial Stone Steps)',
      landmarkGroup: '月台丹墀基座',
    });
  }

  // 8. Temple Palace Lanterns flanking the Hall (孔廟典雅宮燈) - 20 drones (10 left, 10 right)
  for (let side of [-1, 1]) {
    const centerX = side * 75;
    for (let k = 0; k < 10; k++) {
      const angle = (k / 10) * Math.PI * 2;
      const lx = centerX + Math.cos(angle) * 5.5;
      const ly = 2 + Math.sin(angle) * 7.5;
      drones.push({
        id: curId++,
        x: lx,
        y: ly,
        z: 6,
        color: '#F97316',
        glowColor: '#EA580C',
        brightness: 1.3,
        pulseSpeed: 1.2, // fast warm lantern flicker
        strobeDelay: (k * 0.15) % 1.2,
        featureTag: side < 0 ? '西側祈願宮燈 (West Lantern)' : '東側祈願宮燈 (East Lantern)',
        landmarkGroup: '古廟宮燈光影',
      });
    }
  }

  // Fill up to exactly 400 with ambient sacred stars / incense smoke particles
  const remaining = 400 - drones.length;
  for (let i = 0; i < remaining; i++) {
    const t = i / remaining;
    const x = -85 + Math.random() * 170;
    const y = -95 + Math.random() * 35;
    const z = -10 + Math.random() * 30;
    drones.push({
      id: curId++,
      x,
      y,
      z,
      color: '#FDE68A',
      glowColor: '#F59E0B',
      brightness: 0.7 + Math.random() * 0.4,
      pulseSpeed: 2.0 + Math.random() * 1.5,
      strobeDelay: Math.random() * 2,
      featureTag: '泮池祥雲星芒 (Confucian Auspicious Cloud)',
      landmarkGroup: '大成殿重簷屋頂',
    });
  }

  return drones;
}

// -------------------------------------------------------------
// CHAPTER 3: 世紀滄桑 · 1624 熱蘭遮城 (Fort Zeelandia & Dutch Galleon)
// -------------------------------------------------------------
function generateZeelandiaDrones(): DroneNode[] {
  const drones: DroneNode[] = [];
  let curId = 1;

  // 1. Fort Zeelandia Observation Tower & Beacon Lighthouse (安平古堡白燈塔與圓形瞭望台) - 52 drones
  const towerHeightCount = 14;
  for (let i = 0; i < towerHeightCount; i++) {
    const y = -70 + i * 5;
    const radius = 9 - (i / towerHeightCount) * 2;
    // Ring of 3 points per level to give 3D cylinder depth
    [-radius, 0, radius].forEach((rx, rIdx) => {
      drones.push({
        id: curId++,
        x: 35 + rx,
        y,
        z: rIdx === 1 ? 16 : 6,
        color: '#F8FAFC',
        glowColor: '#38BDF8',
        brightness: 1.3,
        pulseSpeed: 2.0,
        strobeDelay: (i * 0.1) % 1.8,
        featureTag: '安平古堡圓形瞭望台 (White Observation Tower)',
        landmarkGroup: '熱蘭遮城核心要塞',
      });
    });
  }

  // Lighthouse Beacon Dome & Light Beam Emitter (燈塔圓頂與旋轉探照光源) - 10 drones
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2;
    drones.push({
      id: curId++,
      x: 35 + Math.cos(angle) * 7,
      y: -76 + Math.sin(angle) * 3,
      z: 18,
      color: '#38BDF8',
      glowColor: '#0284C7',
      brightness: 1.5,
      pulseSpeed: 1.0, // High-speed rotating beacon effect
      strobeDelay: (i * 0.1) % 1.0,
      featureTag: '安平燈塔旋轉光束 (Anping Lighthouse Beacon)',
      landmarkGroup: '熱蘭遮城核心要塞',
    });
  }

  // 2. 1624 Dutch Star Bastion Red-Brick Walls (熱蘭遮城星形紅磚稜堡) - 96 drones
  // Terraced red brick walls with Dutch angled bastions (荷蘭稜堡尖角)
  const bastionCorners = [
    { x: -5, y: -25 },
    { x: 15, y: -30 },
    { x: 55, y: -30 },
    { x: 75, y: -25 },
    { x: 85, y: -5 },
    { x: 65, y: 15 },
    { x: 15, y: 15 },
    { x: -10, y: 5 },
  ];

  bastionCorners.forEach((pt, idx) => {
    const nextPt = bastionCorners[(idx + 1) % bastionCorners.length];
    const segCount = 10;
    for (let k = 0; k < segCount; k++) {
      const t = k / segCount;
      const bx = pt.x + (nextPt.x - pt.x) * t;
      const by = pt.y + (nextPt.y - pt.y) * t;
      drones.push({
        id: curId++,
        x: bx,
        y: by,
        z: 8 - (k % 3) * 3,
        color: '#E11D48', // Historic Dutch red brick / terracotta
        glowColor: '#BE123C',
        brightness: 1.0,
        pulseSpeed: 2.4,
        strobeDelay: (idx * 0.2 + k * 0.05) % 2,
        featureTag: '熱蘭遮城1624荷蘭紅磚稜堡 (Dutch Brick Bastion Wall)',
        landmarkGroup: '熱蘭遮城核心要塞',
      });
    }
  });

  // Inner upper wall terrace - 20 drones
  for (let i = 0; i < 20; i++) {
    const t = i / 19;
    const x = 10 + t * 50;
    drones.push({
      id: curId++,
      x,
      y: -10,
      z: 14,
      color: '#FB923C',
      glowColor: '#EA580C',
      brightness: 1.1,
      pulseSpeed: 2.2,
      strobeDelay: 0.1 * i,
      featureTag: '內城主堡殘蹟女兒牆 (Parapet Rampart of Fort)',
      landmarkGroup: '熱蘭遮城核心要塞',
    });
  }

  // 3. Antique Fort Cannons (安平古堡前膛古砲) - 18 drones
  for (let i = 0; i < 12; i++) {
    const t = i / 11;
    drones.push({
      id: curId++,
      x: 58 + t * 24,
      y: 0 - t * 4,
      z: 12,
      color: '#94A3B8',
      glowColor: '#64748B',
      brightness: 1.1,
      pulseSpeed: 1.6,
      strobeDelay: 0.08 * i,
      featureTag: '守護大員古砲管 (Bronze Cannon Barrel)',
      landmarkGroup: '古蹟文物意象',
    });
  }
  // Cannon carriage wheels
  for (let w = 0; w < 6; w++) {
    const angle = (w / 6) * Math.PI * 2;
    drones.push({
      id: curId++,
      x: 62 + Math.cos(angle) * 4,
      y: 5 + Math.sin(angle) * 4,
      z: 10,
      color: '#D97706',
      glowColor: '#B45309',
      brightness: 0.9,
      pulseSpeed: 2.0,
      strobeDelay: 0.1 * w,
      featureTag: '古砲木質輪軸 (Cannon Wheel)',
      landmarkGroup: '古蹟文物意象',
    });
  }

  // 4. 17th-Century 3-Masted Dutch VOC Galleon Sailing Ship (荷蘭東印度公司三桅帆船) - 110 drones
  // Hull profile (船身弧線) - 34 drones
  for (let i = 0; i < 34; i++) {
    const t = i / 33;
    const x = -82 + t * 58;
    // Curving galleon hull profile
    const hullY = 12 + Math.pow(Math.abs(t - 0.45) * 1.8, 2) * 10;
    drones.push({
      id: curId++,
      x,
      y: hullY,
      z: 18 - Math.abs(t - 0.5) * 12,
      color: '#D97706',
      glowColor: '#B45309',
      brightness: 1.1,
      pulseSpeed: 2.1,
      strobeDelay: (i * 0.06) % 2,
      featureTag: '大航海三桅帆船龍骨木身 (Galleon Ship Hull)',
      landmarkGroup: '荷蘭大航海帆船',
    });
  }

  // Three tall masts: Fore, Main, Mizzen (前桅、主桅、後桅) - 36 drones
  const masts = [
    { x: -68, height: 42, label: '前桅 (Fore-mast)' },
    { x: -52, height: 54, label: '主桅 (Main-mast)' },
    { x: -36, height: 38, label: '後桅 (Mizzen-mast)' },
  ];

  masts.forEach((m, mIdx) => {
    const mastSteps = 12;
    for (let j = 0; j < mastSteps; j++) {
      const y = 8 - (j / mastSteps) * m.height;
      drones.push({
        id: curId++,
        x: m.x,
        y,
        z: 14,
        color: '#E0F2FE',
        glowColor: '#38BDF8',
        brightness: 1.2,
        pulseSpeed: 1.8,
        strobeDelay: (mIdx * 0.3 + j * 0.1) % 2,
        featureTag: m.label,
        landmarkGroup: '荷蘭大航海帆船',
      });
    }
  });

  // Billowing Square Sails (鼓風白帆) - 40 drones
  masts.forEach((m, mIdx) => {
    const sailCount = mIdx === 1 ? 16 : 12;
    for (let s = 0; s < sailCount; s++) {
      const st = s / (sailCount - 1);
      const span = mIdx === 1 ? 16 : 12;
      const sx = m.x - span / 2 + st * span;
      const sy = -14 - Math.sin(st * Math.PI) * 5 - (mIdx === 1 ? 10 : 0);
      drones.push({
        id: curId++,
        x: sx,
        y: sy,
        z: 22,
        color: '#F8FAFC',
        glowColor: '#0EA5E9',
        brightness: 1.3,
        pulseSpeed: 1.5,
        strobeDelay: (mIdx * 0.2 + s * 0.08) % 1.6,
        featureTag: '迎風鼓滿之橫帆 (Billowing Square Sail)',
        landmarkGroup: '荷蘭大航海帆船',
      });
    }
  });

  // 5. Ocean Waves of Tayouan Harbor (大員灣波濤起伏) - 60 drones
  for (let waveRow = 0; waveRow < 2; waveRow++) {
    const count = 30;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const x = -88 + t * 176;
      const wave = Math.sin(t * Math.PI * 4.5 + waveRow * 1.5) * 4;
      const y = 30 + waveRow * 8 + wave;
      drones.push({
        id: curId++,
        x,
        y,
        z: 15 + waveRow * 5,
        color: waveRow === 0 ? '#38BDF8' : '#0284C7',
        glowColor: '#0369A1',
        brightness: 0.95,
        pulseSpeed: 1.4 + waveRow * 0.4,
        strobeDelay: (i * 0.1) % 2,
        featureTag: '大員灣波浪漣漪 (Tayouan Bay Waves)',
        landmarkGroup: '大員灣碧海潮汐',
      });
    }
  }

  // Fill remainder up to 400 with coastal starlight / lighthouse beams
  const rem = 400 - drones.length;
  for (let i = 0; i < rem; i++) {
    const angle = (i / rem) * Math.PI * 2;
    const r = 40 + Math.random() * 45;
    drones.push({
      id: curId++,
      x: 35 + Math.cos(angle) * r,
      y: -70 + Math.sin(angle) * (r * 0.4),
      z: -10 + Math.random() * 30,
      color: '#BAE6FD',
      glowColor: '#38BDF8',
      brightness: 0.75 + Math.random() * 0.35,
      pulseSpeed: 1.9 + Math.random(),
      strobeDelay: Math.random() * 2,
      featureTag: '安平天際光暈 (Skyline Ambient Starlight)',
      landmarkGroup: '熱蘭遮城核心要塞',
    });
  }

  return drones;
}

// -------------------------------------------------------------
// CHAPTER 4: 府城榮耀 · 台南 400 與盛開鳳凰花 (Tainan 400 & Phoenix Flower)
// -------------------------------------------------------------
function generateTainan400Drones(): DroneNode[] {
  const drones: DroneNode[] = [];
  let curId = 1;

  // 1. Five-Petal Blossoming Phoenix Flower (盛開之府城市花 鳳凰木花) - 140 drones
  const petalCount = 5;
  for (let p = 0; p < petalCount; p++) {
    const baseAngle = (p / petalCount) * Math.PI * 2 - Math.PI / 2;
    const dronesPerPetal = 24;

    for (let k = 0; k < dronesPerPetal; k++) {
      const kt = k / (dronesPerPetal - 1);
      // teardrop / flame shaped petal
      const petalDist = 12 + kt * 44;
      const spread = Math.sin(kt * Math.PI) * 14;
      const angle = baseAngle + (Math.random() - 0.5) * (spread / petalDist);

      const x = Math.cos(angle) * petalDist;
      const y = -15 + Math.sin(angle) * petalDist * 0.9;
      const z = Math.sin(kt * Math.PI) * 14;

      // Special top petal has distinctive white/yellow flaming patterns (旗瓣)
      const isBannerPetal = p === 0;
      let col = '#EF4444';
      let gl = '#B91C1C';
      if (isBannerPetal && kt > 0.4) {
        col = '#FEF08A';
        gl = '#F59E0B';
      } else if (kt > 0.6) {
        col = '#F97316';
        gl = '#EA580C';
      }

      drones.push({
        id: curId++,
        x,
        y,
        z,
        color: col,
        glowColor: gl,
        brightness: 1.25,
        pulseSpeed: 1.6 + (k % 4) * 0.2,
        strobeDelay: (p * 0.3 + k * 0.05) % 2,
        featureTag: isBannerPetal ? '鳳凰花旗瓣 (Phoenix Banner Petal)' : `鳳凰木艷紅花瓣 (Petal ${p + 1})`,
        landmarkGroup: '府城市花鳳凰木',
      });
    }
  }

  // Flower Center Stamen & Pistils (金黃花蕊心) - 20 drones
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    const r = 2 + (i % 3) * 3.5;
    drones.push({
      id: curId++,
      x: Math.cos(a) * r,
      y: -15 + Math.sin(a) * r,
      z: 16,
      color: '#FEF08A',
      glowColor: '#EAB308',
      brightness: 1.5,
      pulseSpeed: 1.2,
      strobeDelay: 0.08 * i,
      featureTag: '鳳凰花金黃雄蕊 (Golden Stamen Core)',
      landmarkGroup: '府城市花鳳凰木',
    });
  }

  // 2. Bold "台南 400" Typography & Emblem (台南 400 標誌意象) - 130 drones
  // Digit 4 - 36 drones
  const digit4Points = [
    // vertical left
    ...linePoints(-54, 22, 10, -54, 38, 10, 10, '#FEF08A', '#F59E0B', '台南400數字「4」', '台南400紀年字型', curId),
  ];
  curId += 10;
  digit4Points.push(
    // horizontal bar
    ...linePoints(-54, 38, 10, -32, 38, 10, 12, '#FEF08A', '#F59E0B', '台南400數字「4」', '台南400紀年字型', curId)
  );
  curId += 12;
  digit4Points.push(
    // long vertical right
    ...linePoints(-36, 18, 10, -36, 52, 10, 14, '#FEF08A', '#F59E0B', '台南400數字「4」', '台南400紀年字型', curId)
  );
  curId += 14;
  digit4Points.forEach((d) => drones.push(d));

  // First Digit 0 (Center) - 28 drones
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2;
    drones.push({
      id: curId++,
      x: -12 + Math.cos(a) * 11,
      y: 35 + Math.sin(a) * 16,
      z: 10,
      color: '#FDE047',
      glowColor: '#EAB308',
      brightness: 1.3,
      pulseSpeed: 1.8,
      strobeDelay: (i * 0.08) % 2,
      featureTag: '台南400數字「0」',
      landmarkGroup: '台南400紀年字型',
    });
  }

  // Second Digit 0 (Right) - 28 drones
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2;
    drones.push({
      id: curId++,
      x: 18 + Math.cos(a) * 11,
      y: 35 + Math.sin(a) * 16,
      z: 10,
      color: '#FDE047',
      glowColor: '#EAB308',
      brightness: 1.3,
      pulseSpeed: 1.8,
      strobeDelay: (i * 0.08) % 2,
      featureTag: '台南400數字「0」',
      landmarkGroup: '台南400紀年字型',
    });
  }

  // Subtitle "1624 - 2024" or "TAINAN" Arc - 38 drones
  for (let i = 0; i < 38; i++) {
    const t = i / 37;
    const x = -60 + t * 120;
    const y = 62 + Math.sin(t * Math.PI) * 4;
    drones.push({
      id: curId++,
      x,
      y,
      z: 6,
      color: '#38BDF8',
      glowColor: '#0284C7',
      brightness: 1.1,
      pulseSpeed: 2.0,
      strobeDelay: (i * 0.05) % 1.5,
      featureTag: '「1624 - 2024」大員跨越400年歷史軌跡',
      landmarkGroup: '台南400紀年字型',
    });
  }

  // 3. Fireworks & Celebration Light Strobe Burst Ring (慶典煙火星芒爆發) - Remaining up to 400
  const rem = 400 - drones.length;
  for (let i = 0; i < rem; i++) {
    const burst = i % 4; // 4 bursts around
    const burstCenters = [
      { x: -68, y: -55 },
      { x: 68, y: -55 },
      { x: -70, y: 10 },
      { x: 70, y: 10 },
    ];
    const center = burstCenters[burst];
    const angle = Math.random() * Math.PI * 2;
    const dist = 6 + Math.random() * 26;

    const colors = ['#F43F5E', '#FB923C', '#FACC15', '#38BDF8', '#C084FC'];
    const chosenColor = colors[i % colors.length];

    drones.push({
      id: curId++,
      x: center.x + Math.cos(angle) * dist,
      y: center.y + Math.sin(angle) * dist,
      z: Math.random() * 25,
      color: chosenColor,
      glowColor: chosenColor,
      brightness: 1.4,
      pulseSpeed: 0.8 + Math.random() * 0.8, // rapid firework strobe!
      strobeDelay: Math.random() * 1.5,
      featureTag: '慶典高空煙火閃爍點 (Celebration Firework Spark)',
      landmarkGroup: '安平慶典煙火',
    });
  }

  return drones;
}

// -------------------------------------------------------------
// CHAPTER 5: 鯤鯓躍浪 · 台灣古地圖與羅盤 (Kunshen Whale & Maritime Compass)
// -------------------------------------------------------------
function generateKunshenDrones(): DroneNode[] {
  const drones: DroneNode[] = [];
  let curId = 1;

  // 1. Giant Kunshen Whale Leaping over Waves (鯤鯓神鯨躍浪) - 160 drones
  // Whale spine & back curve - 45 drones
  for (let i = 0; i < 45; i++) {
    const t = i / 44;
    const x = -65 + t * 120;
    // Arch of leaping whale
    const y = -25 - Math.sin(t * Math.PI) * 45;
    const z = 10 + Math.sin(t * Math.PI) * 20;
    drones.push({
      id: curId++,
      x,
      y,
      z,
      color: '#38BDF8',
      glowColor: '#0284C7',
      brightness: 1.25,
      pulseSpeed: 2.0,
      strobeDelay: (i * 0.05) % 2,
      featureTag: '一鯤鯓巨鯨背脊稜線 (Kunshen Whale Spine)',
      landmarkGroup: '鯤鯓神鯨意象',
    });
  }

  // Whale belly curve - 40 drones
  for (let i = 0; i < 40; i++) {
    const t = i / 39;
    const x = -60 + t * 105;
    const y = -18 - Math.sin(t * Math.PI) * 28;
    const z = 6;
    drones.push({
      id: curId++,
      x,
      y,
      z,
      color: '#E0F2FE',
      glowColor: '#7DD3FC',
      brightness: 1.15,
      pulseSpeed: 2.2,
      strobeDelay: (i * 0.06) % 2,
      featureTag: '白腹鯨腹波紋 (Whale Ventral Grooves)',
      landmarkGroup: '鯤鯓神鯨意象',
    });
  }

  // Whale Fluke / Tail Fins (鯨尾巨鰭) - 35 drones
  for (let side of [-1, 1]) {
    for (let k = 0; k < 17; k++) {
      const kt = k / 16;
      const x = 50 + kt * 24;
      const y = -24 + side * (kt * 22);
      drones.push({
        id: curId++,
        x,
        y,
        z: 14 + side * 4,
        color: '#60A5FA',
        glowColor: '#2563EB',
        brightness: 1.2,
        pulseSpeed: 1.8,
        strobeDelay: (k * 0.1) % 1.5,
        featureTag: side > 0 ? '巨鯨右尾鰭 (Right Fluke)' : '巨鯨左尾鰭 (Left Fluke)',
        landmarkGroup: '鯤鯓神鯨意象',
      });
    }
  }

  // Pectoral Fin (鯨魚側胸鰭) - 20 drones
  for (let j = 0; j < 20; j++) {
    const jt = j / 19;
    drones.push({
      id: curId++,
      x: -15 + jt * 22,
      y: -8 + jt * 18,
      z: 22 - jt * 6,
      color: '#93C5FD',
      glowColor: '#3B82F6',
      brightness: 1.1,
      pulseSpeed: 1.9,
      strobeDelay: 0.1 * j,
      featureTag: '展翅如翼之胸鰭 (Pectoral Fin)',
      landmarkGroup: '鯤鯓神鯨意象',
    });
  }

  // Water Spout (神鯨吐水潮汐) - 20 drones
  for (let s = 0; s < 20; s++) {
    const st = s / 19;
    const angle = (st - 0.5) * 1.2 - Math.PI / 2;
    const r = 8 + st * 28;
    drones.push({
      id: curId++,
      x: -45 + Math.cos(angle) * r,
      y: -52 + Math.sin(angle) * r,
      z: 15,
      color: '#BAE6FD',
      glowColor: '#0284C7',
      brightness: 1.35,
      pulseSpeed: 1.2,
      strobeDelay: (s * 0.08) % 1.4,
      featureTag: '鯨豚噴水高空水霧 (Water Vapor Blow)',
      landmarkGroup: '鯤鯓神鯨意象',
    });
  }

  // 2. 16-Point Maritime Compass Rose in the Background (十六芒星航海羅盤) - 120 drones
  const compassPoints = 16;
  for (let pt = 0; pt < compassPoints; pt++) {
    const angle = (pt / compassPoints) * Math.PI * 2;
    const isCardinal = pt % 4 === 0;
    const isInterCardinal = pt % 2 === 0;
    const maxR = isCardinal ? 72 : isInterCardinal ? 55 : 42;
    const dronesOnRay = isCardinal ? 10 : 6;

    for (let rIdx = 0; rIdx < dronesOnRay; rIdx++) {
      const radius = 22 + (rIdx / (dronesOnRay - 1)) * (maxR - 22);
      drones.push({
        id: curId++,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * (radius * 0.7) - 5,
        z: -15, // recessed into background
        color: isCardinal ? '#FEF08A' : '#F59E0B',
        glowColor: '#D97706',
        brightness: isCardinal ? 1.3 : 0.9,
        pulseSpeed: 2.2,
        strobeDelay: (pt * 0.2 + rIdx * 0.1) % 2,
        featureTag: isCardinal ? '大員航海主指北針星 (Cardinal Compass Ray)' : '大航海羅盤方位星 (Compass Ray)',
        landmarkGroup: '航海羅盤與海圖',
      });
    }
  }

  // Compass Outer Circular Dial - 40 drones
  for (let c = 0; c < 40; c++) {
    const a = (c / 40) * Math.PI * 2;
    drones.push({
      id: curId++,
      x: Math.cos(a) * 44,
      y: Math.sin(a) * 31 - 5,
      z: -12,
      color: '#CBD5E1',
      glowColor: '#64748B',
      brightness: 0.8,
      pulseSpeed: 2.5,
      strobeDelay: (c * 0.05) % 2,
      featureTag: '大航海時代羅盤刻度環 (Compass Degree Ring)',
      landmarkGroup: '航海羅盤與海圖',
    });
  }

  // Fill remainder up to 400 with wave ripples
  const rem = 400 - drones.length;
  for (let i = 0; i < rem; i++) {
    const t = i / rem;
    const x = -85 + t * 170;
    const y = 35 + Math.sin(t * Math.PI * 6) * 6;
    drones.push({
      id: curId++,
      x,
      y,
      z: 20,
      color: '#0284C7',
      glowColor: '#0369A1',
      brightness: 0.9,
      pulseSpeed: 1.7,
      strobeDelay: (i * 0.1) % 2,
      featureTag: '七鯤鯓外海潮汐 (Anping Coastal Waters)',
      landmarkGroup: '鯤鯓神鯨意象',
    });
  }

  return drones;
}

// -------------------------------------------------------------
// MASTER CHAPTER DEFINITIONS
// -------------------------------------------------------------
export const LANDMARK_CHAPTERS: LandmarkChapter[] = [
  {
    id: 'prologue',
    index: 1,
    title: '序幕 · 星宿啟航',
    englishTitle: 'Prologue: Constellation Swarm',
    era: '現代群飛工程',
    duration: 12,
    description: '四百架無人機自安平夜空集結起飛，以螺旋星系動態隊形於大員灣天際懸停，開啟府城四百年歷史光影巡禮。',
    culturalNotes: [
      '透過精準 RTK 差分定位與動態網狀通訊，400架無人機於三維空間中形成對稱星雲流動。',
      '燈光呈現從星核高色溫純白漸變至外圍深海紫藍，象徵自無垠宇宙進入歷史長河。',
    ],
    features: ['螺旋星系對稱旋臂', '星核動態呼吸光', '三維縱深螺旋起伏', '高空信標頻閃矩陣'],
    recommendedLightMode: 'cyber',
    drones: generatePrologueDrones(),
  },
  {
    id: 'confucian-temple',
    index: 2,
    title: '全臺首學 · 台南孔廟大成殿',
    englishTitle: 'First Academy: Confucian Temple Dacheng Hall',
    era: '明鄭永曆十九年 (1665)',
    duration: 16,
    description: '重現台灣歷史上第一座文廟。無人機編隊勾勒大成殿重簷歇山頂、燕尾飛簷翹角，並以璀璨金光顯映「全臺首學」御匾與莊嚴八根朱紅立柱。',
    culturalNotes: [
      '台南孔廟由鄭經命諮議參軍陳永華於西元1665年籌建，為全臺灣文教制度之首，故稱「全臺首學」。',
      '建築特色為雙層重簷歇山屋頂，兩側燕尾向天空飛揚舒展，屋脊中央立有「通天寶塔」及避邪「螭吻」。',
      '殿前設有月台（丹墀），為祭孔大典八佾舞之展演舞台，四周圍繞白石雕花欄杆。',
    ],
    features: ['大成殿雙層燕尾飛簷', '「全臺首學」御筆懸金匾', '前廊八根朱紅立柱', '泮池宮燈暖金光暈', '通天寶塔與螭吻雙龍'],
    recommendedLightMode: 'heritage',
    drones: generateConfucianTempleDrones(),
  },
  {
    id: 'zeelandia',
    index: 3,
    title: '世紀滄桑 · 1624 熱蘭遮城',
    englishTitle: 'Epoch of Zeelandia: 1624 Fort & Maritime Galleon',
    era: '荷蘭統治時期 (1624)',
    duration: 18,
    description: '1624年荷蘭東印度公司於大員沙洲築起熱蘭遮城。無人機具象化呈現象徵性的紅磚稜堡、白色瞭望塔旋轉光束，以及迎風破浪的三桅大帆船。',
    culturalNotes: [
      '西元1624年，荷蘭人登陸大員（今安平），興築「奧倫治城」（後改稱熱蘭遮城 Fort Zeelandia），使台灣正式登上全球大航海時代舞台。',
      '堡壘採用當時歐洲先進的稜堡（Bastion）防禦設計，外牆由自巴達維亞運來的糯米紅磚厚砌而成。',
      '日治時期於主堡地基改建純白色圓形瞭望台與燈塔，即今日世人熟知的安平古堡地標。',
    ],
    features: ['1624荷蘭星形紅磚稜堡', '安平古堡白燈塔探照光束', '荷蘭VOC三桅帆船鼓帆破浪', '大員古砲威武鎮海', '安平港灣碧海夜浪'],
    recommendedLightMode: 'zeelandia',
    drones: generateZeelandiaDrones(),
  },
  {
    id: 'tainan-400',
    index: 4,
    title: '府城榮耀 · 台南 400 盛典',
    englishTitle: 'Tainan 400: Blossoming Phoenix & Celebration',
    era: '西元 1624 - 2024 四百週年',
    duration: 16,
    description: '象徵府城堅韌生命力的市花「鳳凰木花」於夜空中五瓣綻放，隨後轉化為宏偉的「台南 400」金色徽誌，周圍伴隨高空慶典煙火璀璨頻閃。',
    culturalNotes: [
      '鳳凰木於日治時期廣植於台南街道，初夏滿城赤紅如火，因此台南別名「鳳凰城」，鳳凰花亦被選為台南市市花。',
      '2024年為台南建城與台灣進入大航海時代的400週年，以「一起台南，世界交陪」精神展現深厚多元的海洋包容力。',
      '無人機群以高彩度烈焰紅與金黃漸層，搭配 CSS Keyframes 密集閃爍模擬現場煙火爆破之震撼。',
    ],
    features: ['五瓣盛開鳳凰木花', '「台南 400」紀念字型', '金黃雄蕊與火紅旗瓣', '慶典高空煙火閃爍環', '四百年歷史歲月流光'],
    recommendedLightMode: 'festive',
    drones: generateTainan400Drones(),
  },
  {
    id: 'kunshen',
    index: 5,
    title: '鯤鯓躍浪 · 台灣古地圖與羅盤',
    englishTitle: 'Kunshen Sea Whale & Navigational Rose',
    era: '大航海地理紀實',
    duration: 14,
    description: '巨鯨躍出大員灣浪濤，向南台灣外海七座沙洲「鯤鯓」致敬。背景浮現十六芒星大航海時代古海圖羅盤，展現台灣海洋立國的開闊胸襟。',
    culturalNotes: [
      '「鯤鯓」為台江內海特有的沙洲地形，自安平一鯤鯓延伸至南區七鯤鯓，形如大鯨魚脊背浮現海面，故稱鯤鯓。',
      '十六芒星航海羅盤源自大航海時代葡萄牙、荷蘭測繪之早期台灣海圖，標記著福爾摩沙航路要津。',
    ],
    features: ['一鯤鯓巨鯨凌波騰躍', '鯨魚水霧噴射流光', '十六芒星大航海時代古羅盤', '大員海圖度數環', '安平七鯤鯓潮浪光影'],
    recommendedLightMode: 'zeelandia',
    drones: generateKunshenDrones(),
  },
];
