// ─────────────────────────────────────────────────────────────
// 台灣電力島嶼 · 資料層
// 數據依台電年報 / 經濟部能源署公開統計整理之教學用概略值（2024–2025）
// ─────────────────────────────────────────────────────────────

export type EnergyType =
  | "nuclear"
  | "coal"
  | "gas"
  | "oil"
  | "hydro"
  | "wind"
  | "solar"
  | "geo";

export type PlantStatus = "運轉中" | "除役中" | "已除役" | "擴建中";

export interface EnergyMeta {
  key: EnergyType;
  label: string;
  en: string;
  color: string;
  co2PerKwh: number; // kg CO₂e / kWh 生命週期概估值
  blurb: string;
}

export const ENERGY_META: Record<EnergyType, EnergyMeta> = {
  nuclear: {
    key: "nuclear",
    label: "核能",
    en: "NUCLEAR",
    color: "#c084fc",
    co2PerKwh: 0.012,
    blurb: "低基載碳排，2025 年 5 月核三除役後歸零。",
  },
  coal: {
    key: "coal",
    label: "燃煤",
    en: "COAL",
    color: "#fb923c",
    co2PerKwh: 0.85,
    blurb: "傳統基載主力，碳排係數最高的能源。",
  },
  gas: {
    key: "gas",
    label: "燃氣",
    en: "LNG",
    color: "#22d3ee",
    co2PerKwh: 0.42,
    blurb: "複循環快速升降載，能源轉型期的橋接能源。",
  },
  oil: {
    key: "oil",
    label: "燃油",
    en: "OIL",
    color: "#a8a29e",
    co2PerKwh: 0.73,
    blurb: "成本與碳排皆高，逐漸退場轉型為燃氣。",
  },
  hydro: {
    key: "hydro",
    label: "水力",
    en: "HYDRO",
    color: "#60a5fa",
    co2PerKwh: 0.005,
    blurb: "慣常水力穩定、抽蓄水力如同巨型電池。",
  },
  wind: {
    key: "wind",
    label: "風力",
    en: "WIND",
    color: "#34d399",
    co2PerKwh: 0.011,
    blurb: "離岸風電是台灣綠能成長最快的引擎。",
  },
  solar: {
    key: "solar",
    label: "太陽能",
    en: "SOLAR",
    color: "#facc15",
    co2PerKwh: 0.045,
    blurb: "白日尖峰救星，但夜間仍需其他電力接手。",
  },
  geo: {
    key: "geo",
    label: "地熱",
    en: "GEO",
    color: "#f87171",
    co2PerKwh: 0.015,
    blurb: "台灣位於火環帶，地熱是尚未完全甦醒的基載綠能。",
  },
};

export interface Plant {
  id: string;
  name: string;
  short: string;
  type: EnergyType;
  status: PlantStatus;
  city: string;
  lon: number;
  lat: number;
  capacityMw: number;
  units: string;
  operator: string;
  commissioned: string;
  description: string;
  insight: string;
}

export const PLANTS: Plant[] = [
  // ── 核能 ─────────────────────────────────────────────
  {
    id: "nuclear-1",
    name: "第一核能發電廠（金山）",
    short: "核一廠",
    type: "nuclear",
    status: "已除役",
    city: "新北市・金山",
    lon: 121.66,
    lat: 25.3,
    capacityMw: 1272,
    units: "沸水式 BWR × 2（各 636 MW）",
    operator: "台灣電力公司",
    commissioned: "1978 / 1979 商轉，2019 屆齡除役",
    description:
      "台灣第一座核電廠，兩部奇異沸水式機組。一號機因燃料池滿載自 2014 年起停機，兩部機組運轉執照雙雙屆滿後正式進入除役程序。",
    insight:
      "除役一座核電廠預計需 25 年：乾式貯存、反應爐除污拆解、廠址復原——核廢料最終處置場址至今仍是未解的政策難題。",
  },
  {
    id: "nuclear-2",
    name: "第二核能發電廠（國聖）",
    short: "核二廠",
    type: "nuclear",
    status: "已除役",
    city: "新北市・萬里",
    lon: 121.7,
    lat: 25.21,
    capacityMw: 1970,
    units: "沸水式 BWR-6 × 2（各 985 MW）",
    operator: "台灣電力公司",
    commissioned: "1981 / 1983 商轉，2023 屆齡除役",
    description:
      "曾是北台灣最大的單一電源之一。一號機 2021 年因用過燃料池容量受限提前停機，二號機 2023 年 3 月運轉執照屆滿停止運轉。",
    insight:
      "「燃料池滿了就只能停機」——核二的命運揭示了電廠工程與核廢料治理如何緊密耦合，是能源政策課的經典案例。",
  },
  {
    id: "nuclear-3",
    name: "第三核能發電廠（馬鞍山）",
    short: "核三廠",
    type: "nuclear",
    status: "除役中",
    city: "屏東縣・恆春",
    lon: 120.75,
    lat: 21.96,
    capacityMw: 1902,
    units: "壓水式 PWR × 2（各 951 MW）",
    operator: "台灣電力公司",
    commissioned: "1984 / 1985 商轉，2025.05 全面停機",
    description:
      "台灣最後運轉的核電廠，西屋三迴路壓水式機組。一號機於 2024 年 7 月屆齡停機，二號機 2025 年 5 月停止運轉，台灣正式進入「非核家園」時代。",
    insight:
      "核三歲末占全國發電量約 5%。它的退場考驗電網韌性：備轉容量、燃氣接收站擴建與綠能佈局必須無縫接手。",
  },

  // ── 燃煤 ─────────────────────────────────────────────
  {
    id: "taichung",
    name: "台中發電廠",
    short: "台中電廠",
    type: "coal",
    status: "運轉中",
    city: "台中市・龍井",
    lon: 120.48,
    lat: 24.21,
    capacityMw: 5824,
    units: "燃煤 × 10（各 550 MW）＋氣渦輪 × 4",
    operator: "台灣電力公司",
    commissioned: "1989–1997 陸續商轉",
    description:
      "全球規模數一數二的燃煤電廠，總裝置容量近 5.8 GW，尖峰時期供應全台近兩成電力。廠區正加建燃氣複循環機組，規劃逐步退場部分燃煤機組。",
    insight:
      "中部空污治理的核心熱區：府會「生煤管制自治條例」與中央供電安全的拉鋸，是環境政策與能源經濟交鋒的教科書現場。",
  },
  {
    id: "hsinta",
    name: "興達發電廠",
    short: "興達電廠",
    type: "coal",
    status: "運轉中",
    city: "高雄市・永安／茄萣",
    lon: 120.2,
    lat: 22.86,
    capacityMw: 4326,
    units: "燃煤 × 4・燃氣複循環 × 5",
    operator: "台灣電力公司",
    commissioned: "1982 起商轉",
    description:
      "南台灣供電樞紐，燃煤與燃氣機組並存。正執行「興達燃氣機組更新改建計畫」，新機組上線後燃煤機組將轉為備用、逐步退休。",
    insight:
      "一部電廠讀懂台灣能源轉型：同一個廠址上，燃煤基載 → 燃氣接替 → 預留氫能混燒空間，是「無縫接軌」策略的縮影。",
  },
  {
    id: "linkou",
    name: "林口發電廠",
    short: "林口電廠",
    type: "coal",
    status: "運轉中",
    city: "新北市・林口",
    lon: 121.29,
    lat: 25.12,
    capacityMw: 2400,
    units: "超超臨界燃煤 × 3（各 800 MW）",
    operator: "台灣電力公司",
    commissioned: "2016–2019 新機商轉",
    description:
      "全台發電效率最高的燃煤電廠之一，超超臨界（USC）鍋爐效率逾 44%。機組緊鄰大台北負載中心，直接支援北台灣用電。",
    insight:
      "同樣是煤，效率從 38% 提到 44%，一年可少燒數十萬噸煤——「煤電的終結」與「煤電的升級」在能源轉型期同時進行。",
  },
  {
    id: "mailiao",
    name: "麥寮發電廠",
    short: "麥寮電廠",
    type: "coal",
    status: "運轉中",
    city: "雲林縣・麥寮",
    lon: 120.11,
    lat: 23.79,
    capacityMw: 1800,
    units: "燃煤 × 3（各 600 MW）",
    operator: "麥寮汽電（台塑集團）",
    commissioned: "1999–2000 商轉",
    description:
      "台灣最早的民營燃煤電廠之一（IPP），位於六輕工業區填海造陸新生地，售電併入台電電網，契約容量曾是民營電廠標竿。",
    insight:
      "IPP（獨立發電業者）制度示範點：政府保證收購費率如何換取民間資本快速蓋電廠？台灣 1990 年代電力自由化的起點。",
  },
  {
    id: "heping",
    name: "和平發電廠",
    short: "和平電廠",
    type: "coal",
    status: "運轉中",
    city: "花蓮縣・秀林",
    lon: 121.76,
    lat: 24.3,
    capacityMw: 1320,
    units: "燃煤 × 2（各 660 MW）",
    operator: "和平電力（台泥集團）",
    commissioned: "2002 商轉",
    description:
      "東部唯一的燃煤電廠，電力經 345kV 超高壓線直送北部使用。與和平水泥廠、和平工業港構成「電廠—水泥—港口」循環園區。",
    insight:
      "「東電北送」代表什麼？電網拓撲與區域公平議題：發電在花蓮、用電在台北，誰承擔污染、誰享受電力？",
  },
  {
    id: "dalin",
    name: "大林發電廠",
    short: "大林電廠",
    type: "coal",
    status: "運轉中",
    city: "高雄市・小港",
    lon: 120.42,
    lat: 22.5,
    capacityMw: 2400,
    units: "超超臨界燃煤 × 2（各 800 MW）＋氣渦輪",
    operator: "台灣電力公司",
    commissioned: "2018 / 2019 新機商轉",
    description:
      "高雄小港的老電廠退場重生，新機採超超臨界技術並強化除污設備。廠區同步布局燃氣機組，承接南台灣工業用電需求。",
    insight:
      "重工業城市 × 電廠 × 空污：大林與小港臨海工業區是研究「環境正義」與「能源轉型空間政治」的理想田野。",
  },

  // ── 燃氣 ─────────────────────────────────────────────
  {
    id: "tatan",
    name: "大潭發電廠",
    short: "大潭電廠",
    type: "gas",
    status: "擴建中",
    city: "桃園市・觀音",
    lon: 121.05,
    lat: 25.02,
    capacityMw: 4400,
    units: "燃氣複循環 × 6（7–9 號機擴建中）",
    operator: "台灣電力公司",
    commissioned: "2006 起商轉",
    description:
      "北部最大燃氣基地，現有約 4.4 GW；7–9 號機陸續併網後將成為全台最大的天然氣電源。毗鄰的第三天然氣接收站（觀塘）牽動藻礁保育爭議。",
    insight:
      "「三接 vs 藻礁」公投（2021）是能源基礎建設與生態保育正面對撞的指標事件——同學可思辨：基礎建設選址程序該如何設計？",
  },
  {
    id: "tungshiao",
    name: "通霄發電廠",
    short: "通霄電廠",
    type: "gas",
    status: "擴建中",
    city: "苗栗縣・通霄",
    lon: 120.72,
    lat: 24.48,
    capacityMw: 3600,
    units: "燃氣複循環機組群（更新擴建中）",
    operator: "台灣電力公司",
    commissioned: "1983 起商轉／新機 2017 起",
    description:
      "中台灣的燃氣主力。既有複循環約 3.6 GW，「更新擴建計畫」新增高效率機組後總容量將突破 6 GW，是承接核電退場的關鍵拼圖。",
    insight:
      "燃氣機組從點火到滿載只需約 30–60 分鐘，升降載速度遠優於燃煤與核能，因此成為太陽能下山後的「接力棒」。",
  },
  {
    id: "nanpu",
    name: "南部發電廠",
    short: "南部電廠",
    type: "gas",
    status: "運轉中",
    city: "高雄市・前鎮",
    lon: 120.32,
    lat: 22.58,
    capacityMw: 1117,
    units: "燃氣複循環 × 3",
    operator: "台灣電力公司",
    commissioned: "1955 建廠／2003 燃氣複循環商轉",
    description:
      "高雄市區的老電廠，從燃油、燃煤一路轉型為燃氣複循環。位於人口稠密的市區邊緣，是都市電廠轉型的示範案例。",
    insight:
      "電廠就在你家隔壁：都市型電廠承擔南部尖峰，其噪音、熱排放與景觀爭議是「鄰避設施」研究的經典場域。",
  },

  // ── 燃油 ─────────────────────────────────────────────
  {
    id: "hsiehho",
    name: "協和發電廠",
    short: "協和電廠",
    type: "oil",
    status: "運轉中",
    city: "基隆市・中山",
    lon: 121.8,
    lat: 25.13,
    capacityMw: 2000,
    units: "燃油汽力 × 4（各 500 MW）",
    operator: "台灣電力公司",
    commissioned: "1977–1985 商轉",
    description:
      "北台灣僅存的大型燃油電廠，重油機組成本與碳排雙高。「第四天然氣接收站」計畫擬於協和廠區改建燃氣機組，但港址與生態議題爭議不斷。",
    insight:
      "燃油機組是電價的「邊際定價者」：夏季尖峰只要它一上場，系統邊際成本立刻飆高——用來理解電力市場定價再好不過。",
  },
  {
    id: "chienshan",
    name: "尖山發電廠",
    short: "尖山電廠",
    type: "oil",
    status: "運轉中",
    city: "澎湖縣・湖西",
    lon: 119.62,
    lat: 23.56,
    capacityMw: 52,
    units: "柴油機組 × 7（＋風機並聯）",
    operator: "台灣電力公司",
    commissioned: "2002 商轉",
    description:
      "澎湖的主要電源。離島電網獨立運轉、柴油成本極高，每度發電成本數倍於本島，是推動澎湖打造「低碳風光大縣」的經濟動機。",
    insight:
      "「一度電在澎湖值多少錢？」離島微電網是研究風光儲能整合、電網韌性與能源公平的最佳實驗場。",
  },

  // ── 水力 ─────────────────────────────────────────────
  {
    id: "mingtan",
    name: "大觀發電廠・明潭抽蓄",
    short: "明潭電廠",
    type: "hydro",
    status: "運轉中",
    city: "南投縣・魚池／水里",
    lon: 120.87,
    lat: 23.84,
    capacityMw: 2602,
    units: "明潭抽蓄 1,602 MW＋明湖抽蓄 1,000 MW",
    operator: "台灣電力公司",
    commissioned: "1985／1995 商轉",
    description:
      "以日月潭為上池、水里溪為下池的抽蓄水力系統，合計 2.6 GW，是全台最大的「水力電池」：夜間抽水蓄能，白天放水發電支援尖峰。",
    insight:
      "抽蓄水力是電網級儲能的王者：反應快、容量大、壽命逾 40 年。理解它，就能理解為何鋰電池儲能不是唯一的答案。",
  },
  {
    id: "tachia",
    name: "大甲溪發電廠群",
    short: "大甲溪電廠",
    type: "hydro",
    status: "運轉中",
    city: "台中市・和平",
    lon: 121.17,
    lat: 24.25,
    capacityMw: 1100,
    units: "德基・青山・谷關・天輪・馬鞍等梯級開發",
    operator: "台灣電力公司",
    commissioned: "1956 起陸續商轉",
    description:
      "沿大甲溪 170 公里、落差逾千公尺的梯級水力系統，從德基水庫高水頭慣常式到下游調整池式電廠，一滴水可發電多次。",
    insight:
      "「一滴水發七次電」：流域梯級開發展現水資源 Multipurpose 策略，也牽動原住民部落、農業用水與河道生態的分配政治。",
  },

  // ── 風力 ─────────────────────────────────────────────
  {
    id: "taipower-offshore1",
    name: "台電離岸一期風場",
    short: "離岸一期",
    type: "wind",
    status: "運轉中",
    city: "彰化外海（王功外海 8 km）",
    lon: 120.0,
    lat: 24.06,
    capacityMw: 109,
    units: "離岸風機 × 21（5.2 MW）",
    operator: "台灣電力公司",
    commissioned: "2020 商轉",
    description:
      "台電首座離岸風場，21 部風機佇立彰化外海。從環評到商轉歷時超過十年，為台灣海床地質、颱風工況與海事工程累積寶貴經驗。",
    insight:
      "為什麼選在彰化外海？台灣海峽冬季東北季風強勁，全球前十大風場有六處在這裡、水深又淺——先天條件世界級。",
  },
  {
    id: "formosa1",
    name: "海洋風電（Formosa 1）",
    short: "海洋風場",
    type: "wind",
    status: "運轉中",
    city: "苗栗外海（竹南—後龍外海 6 km）",
    lon: 119.98,
    lat: 24.72,
    capacityMw: 128,
    units: "離岸風機 × 22",
    operator: "上緯新能源／沃旭等",
    commissioned: "2019 商轉",
    description:
      "台灣第一座商業規模離岸風場，由示範計畫兩部風機擴展至 128 MW。它的融資結構與在地化供應鏈布局，為後續 GW 級風場開路。",
    insight:
      "PF（專案融資）怎麼為海上風機買單？無擔保融資 × 20 年購電協議的風險配置，是綠能金融的入門範本。",
  },
  {
    id: "formosa2",
    name: "海能風電（Formosa 2）",
    short: "海能風場",
    type: "wind",
    status: "運轉中",
    city: "苗栗外海",
    lon: 119.97,
    lat: 24.58,
    capacityMw: 376,
    units: "離岸風機 × 47（8 MW）",
    operator: "JERA／麥格理等",
    commissioned: "2021 商轉",
    description:
      "日本與澳洲資本合資的 376 MW 風場，開啟潛力場址階段的規模化開發。風機基樁、海纜與運維基地帶動苗栗港轉型為風電母港。",
    insight:
      "一座風場 = 一條產業鏈：水下基礎、海纜、葉片、運維船艦…「國產化政策」如何塑造新的綠色產業聚落？",
  },
  {
    id: "changfang",
    name: "彰芳暨西島風場",
    short: "彰芳西島",
    type: "wind",
    status: "運轉中",
    city: "彰化外海",
    lon: 119.95,
    lat: 23.94,
    capacityMw: 552,
    units: "離岸風機 × 62（9.5 MW）",
    operator: "CIP（哥本哈根基礎建設基金）",
    commissioned: "2023–2024 商轉",
    description:
      "台灣首座大型在地化比例最高的離岸風場之一，62 部接近 10 MW 等級的風機，年發電量可供約 65 萬戶家庭使用。",
    insight:
      "風機越做越大：單機容量從 5 MW→15 MW，掃風面積呈平方成長。該如何思考「量體經濟」與生態衝擊之間的權衡？",
  },
  {
    id: "yunlin",
    name: "雲林離岸風場",
    short: "雲林風場",
    type: "wind",
    status: "運轉中",
    city: "雲林外海",
    lon: 119.98,
    lat: 23.6,
    capacityMw: 640,
    units: "離岸風機 × 80（8 MW）",
    operator: "達德能源等國際合資",
    commissioned: "2024–2025 商轉",
    description:
      "80 部風機構成全台規模名列前茅的風場。建置期曾面對打樁噪音對白海豚的爭議，導入水下噪音緩解工法與監測系統。",
    insight:
      "台灣白海豚 Sousa chinensis taiwanensis 是西岸特有亞種——風場開發與海洋保育的 EIA（環評）攻防，值得寫成一份個案報告。",
  },
  {
    id: "taichungharbor",
    name: "台中港風力發電站",
    short: "台中港風場",
    type: "wind",
    status: "運轉中",
    city: "台中市・清水／梧棲",
    lon: 120.44,
    lat: 24.32,
    capacityMw: 72,
    units: "陸域風機 × 18",
    operator: "台灣電力公司",
    commissioned: "2007 起商轉",
    description:
      "台電陸域風力的代表場址，18 部風機沿台中港北堤排列，是國道三號與高美濕地旁的醒目地標。陸域適宜場址漸趨飽和，開發重心轉向海上。",
    insight:
      "陸域風機的社會課題：低頻噪音、光影閃爍與地景變遷——為何同樣是綠能，陸域風機的社會接受度遠低於太陽能？",
  },

  // ── 太陽能 ───────────────────────────────────────────
  {
    id: "changbin-solar",
    name: "彰濱太陽光電場",
    short: "彰濱光電",
    type: "solar",
    status: "運轉中",
    city: "彰化縣・鹿港（彰濱工業區）",
    lon: 120.34,
    lat: 24.05,
    capacityMw: 100,
    units: "地面型光電 ≈ 310,000 片模組",
    operator: "台灣電力公司",
    commissioned: "2019 啟用",
    description:
      "台電最大的地面型光電場之一，位處崙尾區填海新生地。曾為全台最大單一地面光電案場，年發電量約 1.3 億度。",
    insight:
      "填海地＋光電板＝土地利用新解？新型態的「一地多用」（如漁電共生、屋頂光電）考驗土地治理的創新能力。",
  },
  {
    id: "tainan-salt",
    name: "台南鹽田太陽光電場",
    short: "台南鹽光",
    type: "solar",
    status: "運轉中",
    city: "台南市・七股／將軍",
    lon: 120.1,
    lat: 23.19,
    capacityMw: 150,
    units: "地面型光電 ≈ 46 萬片模組",
    operator: "台電 × 台鹽綠能",
    commissioned: "2020–2023 分期啟用",
    description:
      "廢曬鹽田的重生：七股大寮、將軍鹽田鋪上光電板，並保留埤塘生態。同時是黑面琵鷺度冬棲地周邊，生態敏感區設計備受關注。",
    insight:
      "文化地景 × 生態 × 再生能源三方協商：鹽田光電案如何劃設緩衝區、保留曬鹽文化展示？值得做一場利害關係人分析。",
  },

  // ── 地熱 ─────────────────────────────────────────────
  {
    id: "qingshui-geo",
    name: "清水地熱發電廠",
    short: "清水地熱",
    type: "geo",
    status: "運轉中",
    city: "宜蘭縣・大同",
    lon: 121.63,
    lat: 24.61,
    capacityMw: 4.2,
    units: "地熱發電機組（ORC）",
    operator: "結元科技／中油合作",
    commissioned: "2021 重新啟用",
    description:
      "沉寂 28 年後重生的地熱電廠：1981 年台電曾在此運轉示範機組，因結垢問題停運；2021 年由民間與中油合作，以有機朗肯循環再度點亮。",
    insight:
      "地熱是「24 小時綠能」——不受天候影響、可當基載。台灣地熱潛能估逾 30 GW，但要跨過探勘風險與原住民土地諮商的門檻。",
  },
];

// ── 全國能源結構（2024 概略值，教學用）──────────────────
export interface MixDatum {
  type: EnergyType | "other";
  label: string;
  color: string;
  gen: number; // 發電量占比 %
  cap: number; // 裝置容量占比 %
  gw: number; // 裝置容量 GW
}

export const MIX_DATA: MixDatum[] = [
  { type: "gas", label: "燃氣", color: ENERGY_META.gas.color, gen: 42.6, cap: 27, gw: 19.4 },
  { type: "coal", label: "燃煤", color: ENERGY_META.coal.color, gen: 39.2, cap: 24, gw: 17.6 },
  { type: "solar", label: "太陽能", color: ENERGY_META.solar.color, gen: 4.9, cap: 19, gw: 13.4 },
  { type: "nuclear", label: "核能", color: ENERGY_META.nuclear.color, gen: 4.7, cap: 4, gw: 2.9 },
  { type: "wind", label: "風力", color: ENERGY_META.wind.color, gen: 3.3, cap: 4, gw: 2.9 },
  { type: "oil", label: "燃油", color: ENERGY_META.oil.color, gen: 1.6, cap: 4.5, gw: 3.1 },
  { type: "hydro", label: "水力", color: ENERGY_META.hydro.color, gen: 2.0, cap: 7, gw: 4.9 },
  { type: "other", label: "其他再生・儲能等", color: "#94a3b8", gen: 1.7, cap: 10.5, gw: 7.5 },
];

export const KEY_STATS = [
  { value: 288, decimals: 0, unit: "億度", label: "年發電量（2024 概略）" },
  { value: 41.6, decimals: 1, unit: "GW", label: "夏季尖峰負載・歷史新高" },
  { value: 1.23, decimals: 2, unit: "萬度", label: "每人每年平均用電" },
  { value: 0.494, decimals: 3, unit: "kg CO₂e", label: "每度電碳排係數" },
];

// ── 能源轉型時間線 ─────────────────────────────────────
export interface TimelineEvent {
  year: string;
  title: string;
  body: string;
  tag: string;
  color: string;
}

export const TIMELINE: TimelineEvent[] = [
  {
    year: "1978",
    title: "核一商轉・核電時代揭幕",
    body: "石油危機後的能源安全焦慮，讓台灣走向核能。三座核電廠全盛期供電占比達 28%。",
    tag: "起點",
    color: "#c084fc",
  },
  {
    year: "2009",
    title: "《再生能源發展條例》通過",
    body: "以躉購費率（FIT）保證收購綠電 20 年，為台灣風、光產業點燃第一把火。",
    tag: "法制",
    color: "#34d399",
  },
  {
    year: "2011",
    title: "福島核災・非核共識發酵",
    body: "日本 311 核災重創核能信任，「非核家園」成為主要政黨共同語彙。",
    tag: "轉折",
    color: "#f87171",
  },
  {
    year: "2016",
    title: "2025 能源轉型藍圖啟動",
    body: "設定燃氣 50%、燃煤 30%、再生能源 20% 的 2025 電力配比目標，同步推動離岸風電遴選。",
    tag: "政策",
    color: "#22d3ee",
  },
  {
    year: "2017",
    title: "《電業法》修正・綠電自由化",
    body: "開放綠電直供與轉供，台電分拆呼聲起，電力市場走向「廠網分離」長路。",
    tag: "市場",
    color: "#60a5fa",
  },
  {
    year: "2021",
    title: "三接遷離公投・能源基設公投戰",
    body: "核四商轉、三接遷離等四大公投皆未過關，能源選址的民主程序成為顯學。",
    tag: "治理",
    color: "#fb923c",
  },
  {
    year: "2022",
    title: "2050 淨零排放路徑發布",
    body: "規劃 2050 電力去碳：再生能源 60–70%、氫能 9–12%、火力＋CCUS 20–27%、抽蓄電池儲能補齊調度缺口。",
    tag: "願景",
    color: "#facc15",
  },
  {
    year: "2024",
    title: "核三 1 號機屆齡停機",
    body: "台灣最後一座核電廠開始退場倒數。同年夏季尖峰負載刷新紀錄，備轉容量率拉警報。",
    tag: "交接",
    color: "#c084fc",
  },
  {
    year: "2025.05",
    title: "核三 2 號機停機・非核家園",
    body: "台灣進入無核電運轉時代。燃氣、風光與儲能能否穩住電網？這是全台共同的即時實驗。",
    tag: "現在",
    color: "#f0fdf4",
  },
];

// ── 關鍵概念卡 ─────────────────────────────────────────
export interface Concept {
  no: string;
  title: string;
  en: string;
  body: string;
  stat: string;
  statLabel: string;
}

export const CONCEPTS: Concept[] = [
  {
    no: "01",
    title: "裝置容量 ≠ 發電量",
    en: "CAPACITY vs GENERATION",
    body: "裝置容量是「最大出力」，發電量才是實際貢獻。太陽能裝置容量占比近兩成，但容量因數僅 14–17%，發電量占比不到 5%；核能以 4% 容量貢獻近 5% 電量。",
    stat: "× 4–5",
    statLabel: "核能與光電的實際出力倍率差距",
  },
  {
    no: "02",
    title: "基載・中載・尖載",
    en: "LOAD FOLLOWING",
    body: "一天當中用電曲線起伏巨大：核電與燃煤撐基載，燃氣機組調節中載，抽蓄水力、氣渦輪與儲能系統應付傍晚尖峰——電網是一場永不停歇的接力賽。",
    stat: "30 min",
    statLabel: "燃氣複循環從點火到滿載的時間",
  },
  {
    no: "03",
    title: "備轉容量率",
    en: "OPERATING RESERVE",
    body: "電力調度的安全氣囊。台電燈號：備轉容量率 ≥10% 供電充裕（綠燈）、6–10% 吃緊（黃燈）、<6% 警戒（橙燈）。夏季傍晚是最容易亮燈的時間窗。",
    stat: "10 %",
    statLabel: "綠燈門檻：可供電備用的餘裕比例",
  },
  {
    no: "04",
    title: "複循環燃氣機組",
    en: "COMBINED CYCLE",
    body: "燃氣渦輪發電後，450°C 以上的高溫廢氣再推動蒸汽渦輪二次發電，效率衝上 58–60%，每度電碳排約為燃煤一半，是能源轉型期的核心橋接能源。",
    stat: "60 %",
    statLabel: "複循環機組熱效率（傳統燃煤約 38%）",
  },
  {
    no: "05",
    title: "抽蓄水力＝巨型電池",
    en: "PUMPED STORAGE",
    body: "夜間離峰用多餘電力把下池的水抽回上池，白天尖峰放水發電。明潭＋明湖合計 2.6 GW，相當於 1.3 座核三廠的瞬時支援能力。",
    stat: "2.6 GW",
    statLabel: "明潭・明湖抽蓄合計裝置容量",
  },
  {
    no: "06",
    title: "淨零排放 2050",
    en: "NET ZERO ROADMAP",
    body: "2050 電力結構藍圖：再生能源 60–70%、氫能 9–12%、火力搭配碳捕捉（CCUS）約 20–27%。深度減碳的每一步都依賴電網升級、儲能與需量反應同步到位。",
    stat: "60–70%",
    statLabel: "2050 再生能源發電占比目標",
  },
];
