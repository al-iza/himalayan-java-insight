export const npr = (n: number) =>
  "NPR " + n.toLocaleString("en-US", { maximumFractionDigits: 2 });

export const nprShort = (n: number) =>
  n >= 1_000_000
    ? "NPR " + (n / 1_000_000).toFixed(2) + "M"
    : n >= 1000
      ? "NPR " + (n / 1000).toFixed(0) + "K"
      : "NPR " + n;

export const LAST_UPDATED = "Today, 10:42 AM";

export const kpis = {
  totalSales: 1_842_500,
  totalOrders: 12_482,
  avgOrderValue: 147.6,
  bestOutlet: "Tridevi Marg",
  topProduct: "Caramel Latte",
  salesGrowth: 8.4,
  prevSales: 1_699_700,
  prevOrders: 11_640,
};

export type Product = {
  name: string;
  qty: number;
  revenue: number;
  growth: number;
};

export const products: Product[] = [
  { name: "Caramel Latte", qty: 892, revenue: 128_400, growth: 2.0 },
  { name: "Cappuccino", qty: 764, revenue: 109_200, growth: 8.7 },
  { name: "Iced Americano", qty: 790, revenue: 94_800, growth: 6.9 },
  { name: "Matcha Latte", qty: 584, revenue: 87_600, growth: 16.9 },
  { name: "Flat White", qty: 545, revenue: 76_400, growth: 10.4 },
  { name: "Espresso", qty: 498, revenue: 54_800, growth: -1.4 },
  { name: "Cold Brew", qty: 412, revenue: 61_800, growth: 12.2 },
  { name: "Butter Croissant", qty: 386, revenue: 42_460, growth: 4.1 },
  { name: "Blueberry Muffin", qty: 254, revenue: 27_940, growth: -3.6 },
  { name: "Masala Chiya", qty: 198, revenue: 15_840, growth: -6.2 },
];

export type Outlet = {
  name: string;
  sales: number;
  orders: number;
  growth: number;
  today: number;
  week: number;
  todayOrders: number;
  aov: number;
  topProduct: string;
  peak: string;
};

export const outlets: Outlet[] = [
  {
    name: "Tridevi Marg",
    sales: 486_300,
    orders: 3_240,
    growth: 12.6,
    today: 21_450,
    week: 118_900,
    todayOrders: 146,
    aov: 150.1,
    topProduct: "Caramel Latte",
    peak: "8:00 AM – 11:00 AM",
  },
  {
    name: "Panipokhari",
    sales: 412_800,
    orders: 2_890,
    growth: 9.1,
    today: 18_240,
    week: 101_600,
    todayOrders: 128,
    aov: 142.8,
    topProduct: "Cappuccino",
    peak: "9:00 AM – 12:00 PM",
  },
  {
    name: "International Club",
    sales: 368_450,
    orders: 2_410,
    growth: 6.4,
    today: 15_780,
    week: 89_300,
    todayOrders: 112,
    aov: 152.9,
    topProduct: "Flat White",
    peak: "5:00 PM – 8:00 PM",
  },
  {
    name: "Durbar Mall",
    sales: 324_120,
    orders: 2_180,
    growth: 4.2,
    today: 13_960,
    week: 78_400,
    todayOrders: 98,
    aov: 148.7,
    topProduct: "Iced Americano",
    peak: "1:00 PM – 4:00 PM",
  },
  {
    name: "Bikers Cafe Naxal",
    sales: 250_830,
    orders: 1_762,
    growth: -2.3,
    today: 9_640,
    week: 61_200,
    todayOrders: 74,
    aov: 142.4,
    topProduct: "Cold Brew",
    peak: "4:00 PM – 7:00 PM",
  },
];

export const TOTAL_OUTLET_COUNT = 92;

export const dailySales = [
  { label: "Mon 1", sales: 52_400, prev: 48_100 },
  { label: "Tue 2", sales: 58_900, prev: 51_300 },
  { label: "Wed 3", sales: 54_200, prev: 53_800 },
  { label: "Thu 4", sales: 61_700, prev: 55_400 },
  { label: "Fri 5", sales: 74_300, prev: 66_900 },
  { label: "Sat 6", sales: 89_600, prev: 81_200 },
  { label: "Sun 7", sales: 82_100, prev: 76_500 },
];

export const weeklySales = [
  { label: "Week 1", sales: 402_400, prev: 381_200 },
  { label: "Week 2", sales: 438_900, prev: 402_800 },
  { label: "Week 3", sales: 466_200, prev: 428_600 },
  { label: "Week 4", sales: 535_000, prev: 487_100 },
];

export const monthlySales = [
  { label: "Feb", sales: 1_402_000, prev: 1_298_000 },
  { label: "Mar", sales: 1_512_000, prev: 1_402_000 },
  { label: "Apr", sales: 1_486_000, prev: 1_512_000 },
  { label: "May", sales: 1_640_000, prev: 1_486_000 },
  { label: "Jun", sales: 1_699_700, prev: 1_640_000 },
  { label: "Jul", sales: 1_842_500, prev: 1_699_700 },
];

export const salesSeries = {
  Daily: dailySales,
  Weekly: weeklySales,
  Monthly: monthlySales,
};

export const liveTransactions = [
  { id: "#TXN-88214", outlet: "Tridevi Marg", items: "Caramel Latte ×2", amount: 620, time: "10:41 AM" },
  { id: "#TXN-88213", outlet: "Panipokhari", items: "Cappuccino, Croissant", amount: 495, time: "10:39 AM" },
  { id: "#TXN-88212", outlet: "Durbar Mall", items: "Iced Americano", amount: 280, time: "10:37 AM" },
  { id: "#TXN-88211", outlet: "International Club", items: "Flat White ×2", amount: 560, time: "10:35 AM" },
];

export const todayLive = {
  sales: 79_070,
  orders: 558,
  avg: 141.7,
};

export const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];
