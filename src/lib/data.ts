/** Mock biznes ma'lumotlari — kelajakda API dan keladi (src/lib/api.ts orqali). */

export const revenueSeries = [182, 195, 176, 210, 224, 205, 238, 226, 252, 244, 268, 249];
export const expenseSeries = [128, 136, 125, 142, 150, 146, 158, 152, 166, 171, 178, 168];
export const cashflowSeries = [24, 31, -12, 38, 26, -8, 44, 30, 36, -14, 42, 34];
export const salesWeekly = [42, 58, 51, 66, 72, 60, 78];
export const profitSeries = [54, 59, 51, 68, 74, 59, 80, 74, 86, 73, 90, 81];

export const kpis = [
  { key: "revenue", label: "Tushum", value: "248.6 mln", delta: "+12.4%", up: true, spark: revenueSeries.slice(-8) },
  { key: "expenses", label: "Xarajatlar", value: "168.2 mln", delta: "+8.4%", up: false, spark: expenseSeries.slice(-8) },
  { key: "profit", label: "Sof foyda", value: "80.4 mln", delta: "+6.1%", up: true, spark: profitSeries.slice(-8) },
  { key: "cash", label: "Cash Flow", value: "+34.2 mln", delta: "+3.8%", up: true, spark: [20, 26, 18, 32, 28, 36, 30, 34] },
];

export const transactions = [
  { id: "TR-1042", who: "Artel Distribution MChJ", type: "Kirim", amount: "+18 400 000", date: "27-sen", status: "To'landi" },
  { id: "TR-1041", who: "Toshkent Logistika XK", type: "Chiqim", amount: "-4 250 000", date: "27-sen", status: "To'landi" },
  { id: "TR-1040", who: "Mega Retail Group", type: "Kirim", amount: "+9 800 000", date: "26-sen", status: "Kutilmoqda" },
  { id: "TR-1039", who: "Ish haqi — sentyabr", type: "Chiqim", amount: "-32 600 000", date: "26-sen", status: "To'landi" },
  { id: "TR-1038", who: "Chirchiq Savdo MChJ", type: "Kirim", amount: "+12 150 000", date: "25-sen", status: "Kechikkan" },
  { id: "TR-1037", who: "Reklama — Meta Ads", type: "Chiqim", amount: "-6 900 000", date: "25-sen", status: "To'landi" },
];

export const inventoryAlerts = [
  { name: "Plastik granula PP-500", left: "420 kg", min: "1 000 kg", level: 0.32 },
  { name: "Karton quti 40×40", left: "180 dona", min: "500 dona", level: 0.21 },
  { name: "Etiketka rulon (oq)", left: "2 400 dona", min: "3 000 dona", level: 0.66 },
];

export const aiInsights = [
  { tone: "bad", title: "Xarajatlar 8.4% oshgan", body: "Asosiy o'sish: logistika (+14%) va reklama (+11%). O'tgan 3 oy o'rtachasidan yuqori." },
  { tone: "warn", title: "3 ta invoice muddati o'tgan", body: "Mega Retail, Chirchiq Savdo va Baraka Trade bo'yicha jami 28.4 mln so'm kutilmoqda." },
  { tone: "good", title: "Savdo tezligi oshmoqda", body: "PP-500 mahsuloti bo'yicha talab +22%. Zaxirani 2 hafta ichida to'ldirish tavsiya etiladi." },
];

export const receivables = [
  { client: "Mega Retail Group", amount: "9 800 000", due: "3 kun kechikkan", risk: "warn" },
  { client: "Chirchiq Savdo MChJ", amount: "12 150 000", due: "6 kun kechikkan", risk: "bad" },
  { client: "Baraka Trade", amount: "6 450 000", due: "1 kun kechikkan", risk: "warn" },
  { client: "Samarqand Optom XK", amount: "22 000 000", due: "12 kundan so'ng", risk: "good" },
];

export const expenseBreakdown = [
  { label: "Xomashyo", value: 38, color: "var(--vio)" },
  { label: "Ish haqi", value: 27, color: "var(--mag)" },
  { label: "Logistika", value: 14, color: "var(--blue)" },
  { label: "Marketing", value: 11, color: "var(--cyan)" },
  { label: "Boshqa", value: 10, color: "var(--faint)" },
];

export const productionRows = [
  { name: "PP-500 granula", plan: "12 000 kg", fact: "11 460 kg", cost: "8 420 so'm/kg", progress: 0.955 },
  { name: "PE quvur 32mm", plan: "8 500 m", fact: "8 120 m", cost: "6 180 so'm/m", progress: 0.955 },
  { name: "Idish qopqog'i №4", plan: "40 000 dona", fact: "33 800 dona", cost: "420 so'm/dona", progress: 0.845 },
];

export const employees = [
  { name: "Dilshod Karimov", role: "Ishlab chiqarish boshlig'i", status: "Ishda", salary: "9.5 mln" },
  { name: "Malika Yusupova", role: "Bosh buxgalter", status: "Ishda", salary: "11 mln" },
  { name: "Sardor Aliyev", role: "Savdo menejeri", status: "Ta'tilda", salary: "7.2 mln" },
  { name: "Nodira Rashidova", role: "Omborchi", status: "Ishda", salary: "5.8 mln" },
];
