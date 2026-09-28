// 台灣本島輪廓 · 經緯投影與 SVG 路徑產生器
// 投影：線性近似（教學示意用途）

export const VIEW_W = 575;
export const VIEW_H = 850;

const X_OFF = 100;
const Y_OFF = 10;
const SX = 215;
const SY = 235;

export function project(lon: number, lat: number): [number, number] {
  return [(lon - 119.95) * SX + X_OFF, (25.35 - lat) * SY + Y_OFF];
}

// 本島海岸特徵點（順時針：北端富貴角 → 西海岸 → 南端 → 東海岸）
const COAST: Array<[number, number]> = [
  [121.5, 25.3], // 富貴角
  [121.42, 25.21],
  [121.32, 25.12], // 林口
  [121.05, 25.03],
  [120.98, 24.95], // 新屋
  [120.93, 24.85], // 新竹
  [120.78, 24.6], // 後龍
  [120.55, 24.3], // 台中港
  [120.35, 24.07], // 鹿港
  [120.1, 23.8], // 麥寮
  [120.15, 23.45], // 東石
  [120.03, 23.14], // 七股
  [120.12, 22.95], // 安平
  [120.25, 22.6], // 高雄
  [120.42, 22.45], // 林園
  [120.62, 22.35], // 枋寮
  [120.72, 22.07], // 車城
  [120.85, 21.9], // 鵝鑾鼻
  [120.9, 22.3], // 恆春東岸
  [121.07, 22.72], // 台東
  [121.37, 23.1], // 成功
  [121.6, 23.98], // 花蓮
  [121.75, 24.28], // 和平
  [121.85, 24.55], // 蘇澳
  [121.83, 24.86], // 頭城
  [121.98, 25.01], // 三貂角
  [121.78, 25.15], // 基隆
];

const PENGHU: Array<[number, number, number]> = [
  // [lon, lat, rx]
  [119.63, 23.57, 7],
  [119.6, 23.66, 4.5],
  [119.5, 23.6, 3.5],
];

function mid(a: [number, number], b: [number, number]): [number, number] {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function smoothClosed(pts: Array<[number, number]>): string {
  const mids = pts.map((p, i) => mid(p, pts[(i + 1) % pts.length]));
  let d = `M ${mids[0][0].toFixed(1)} ${mids[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` Q ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${mids[i][0].toFixed(1)} ${mids[i][1].toFixed(1)}`;
  }
  d += ` Q ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)} ${mids[0][0].toFixed(1)} ${mids[0][1].toFixed(1)} Z`;
  return d;
}

export const TAIWAN_PATH = smoothClosed(COAST.map(([lo, la]) => project(lo, la)));
export const CENTROID: [number, number] = [322, 420];
export const TROPIC_Y = project(121, 23.437)[1];

const CITIES: Array<{ name: string; lon: number; lat: number; dx: number; dy: number; anchor: "start" | "end" }> = [
  { name: "台北", lon: 121.56, lat: 25.03, dx: 8, dy: -6, anchor: "start" },
  { name: "台中", lon: 120.68, lat: 24.15, dx: 10, dy: 4, anchor: "start" },
  { name: "台南", lon: 120.22, lat: 23.0, dx: -8, dy: 4, anchor: "end" },
  { name: "高雄", lon: 120.34, lat: 22.64, dx: 10, dy: 4, anchor: "start" },
  { name: "花蓮", lon: 121.6, lat: 23.98, dx: 10, dy: 4, anchor: "start" },
  { name: "台東", lon: 121.15, lat: 22.75, dx: 10, dy: 4, anchor: "start" },
];

interface IslandProps {
  showContours?: boolean;
  showCities?: boolean;
  idPrefix?: string;
}

export function IslandBase({ showContours = true, showCities = true, idPrefix = "is" }: IslandProps) {
  const [cx, cy] = CENTROID;
  const sc = (s: number) => `translate(${cx * (1 - s)} ${cy * (1 - s)}) scale(${s})`;
  return (
    <g>
      <defs>
        <radialGradient id={`${idPrefix}-fill`} cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="#16233f" />
          <stop offset="70%" stopColor="#0e1830" />
          <stop offset="100%" stopColor="#0b1226" />
        </radialGradient>
      </defs>

      {/* 地形等高線（裝飾） */}
      {showContours &&
        [1.07, 1.15, 1.25].map((s, i) => (
          <path
            key={s}
            d={TAIWAN_PATH}
            transform={sc(1 + (s - 1))}
            fill="none"
            stroke="#3b4a6b"
            strokeOpacity={0.35 - i * 0.1}
            strokeWidth="1"
          />
        ))}

      {/* 島嶼本體 */}
      <path
        d={TAIWAN_PATH}
        fill={`url(#${idPrefix}-fill)`}
        stroke="#4a5b82"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* 澎湖群島 */}
      {PENGHU.map(([lo, la, r], i) => {
        const [px, py] = project(lo, la);
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py}
            rx={r}
            ry={r * 0.8}
            fill="#101c36"
            stroke="#4a5b82"
            strokeWidth="1"
          />
        );
      })}
      <text x={project(119.52, 23.72)[0]} y={project(119.52, 23.72)[1]} fontSize="10" fill="#5b6b8c" fontFamily="IBM Plex Mono" letterSpacing="2">
        澎湖
      </text>

      {/* 北回歸線 */}
      <line x1="96" y1={TROPIC_Y} x2="552" y2={TROPIC_Y} stroke="#64748b" strokeOpacity="0.5" strokeDasharray="3 7" strokeWidth="1" />
      <text x="548" y={TROPIC_Y - 7} textAnchor="end" fontSize="10" fill="#7d8aa8" fontFamily="IBM Plex Mono" letterSpacing="1.5">
        北回歸線 23.4°N
      </text>

      {/* 城市標記 */}
      {showCities &&
        CITIES.map((c) => {
          const [px, py] = project(c.lon, c.lat);
          return (
            <g key={c.name} opacity="0.9">
              <circle cx={px} cy={py} r="1.6" fill="#8896b3" />
              <text x={px + c.dx} y={py + c.dy} textAnchor={c.anchor} fontSize="11" fill="#8896b3" fontFamily="Noto Sans TC" fontWeight="500">
                {c.name}
              </text>
            </g>
          );
        })}
    </g>
  );
}

export function IslandOutline({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className={className} fill="none" aria-hidden>
      <path d={TAIWAN_PATH} stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
