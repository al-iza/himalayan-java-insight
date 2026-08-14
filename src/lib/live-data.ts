import { useSyncExternalStore } from "react";
import { liveTransactions, outlets, products, todayLive } from "@/lib/dummy-data";

export type LiveTxn = {
  id: string;
  outlet: string;
  items: string;
  amount: number;
  time: string;
};

export type LiveState = {
  sales: number;
  orders: number;
  avg: number;
  transactions: LiveTxn[];
  updatedAt: string;
};

const clock = () =>
  new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

let counter = 88_215;

const initialState: LiveState = {
  sales: todayLive.sales,
  orders: todayLive.orders,
  avg: todayLive.avg,
  transactions: liveTransactions,
  updatedAt: "--:--",
};

let state: LiveState = initialState;

const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;

function nextTxn(): LiveTxn {
  const outlet = outlets[Math.floor(Math.random() * outlets.length)]!;
  const product = products[Math.floor(Math.random() * products.length)]!;
  const qty = 1 + Math.floor(Math.random() * 2);
  const amount = Math.round((120 + Math.random() * 260) * qty);
  counter += 1;
  return {
    id: `#TXN-${counter}`,
    outlet: outlet.name,
    items: qty > 1 ? `${product.name} ×${qty}` : product.name,
    amount,
    time: clock(),
  };
}

export function tick() {
  const txn = nextTxn();
  const orders = state.orders + 1;
  const sales = state.sales + txn.amount;
  state = {
    sales,
    orders,
    avg: Number((sales / orders).toFixed(1)),
    transactions: [txn, ...state.transactions].slice(0, 8),
    updatedAt: clock(),
  };
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!timer) timer = setInterval(tick, 5000);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

const getSnapshot = () => state;
const getServerSnapshot = () => initialState;

export function useLiveData() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
