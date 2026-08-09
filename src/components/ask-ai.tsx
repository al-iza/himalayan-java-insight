import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { npr, kpis, products, outlets } from "@/lib/dummy-data";

const top = outlets[0]!;
const best = products[0]!;
const fastest = products[3]!;

const examples: { q: string; a: string }[] = [
  {
    q: "What was today's sales?",
    a: `Today's sales so far are ${npr(79070)} across 558 orders, with an average order value of NPR 141.70. That's tracking about 6% ahead of last Thursday.`,
  },
  {
    q: "Which outlet performed best?",
    a: `${top.name} leads this month with ${npr(top.sales)} from ${top.orders.toLocaleString()} orders and +${top.growth}% growth.`,
  },
  {
    q: "What is our best-selling product?",
    a: `${best.name} — ${best.qty} cups sold generating ${npr(best.revenue)}. ${fastest.name} is the fastest growing at +${fastest.growth}%.`,
  },
  {
    q: "Show me the lowest-selling products.",
    a: "Lowest movers this month: Masala Chiya (198), Blueberry Muffin (254) and Cold Brew (412). Masala Chiya is down 6.2% — worth reviewing placement.",
  },
  {
    q: "Compare outlet performance.",
    a: "Tridevi Marg (NPR 486,300) > Panipokhari (NPR 412,800) > International Club (NPR 368,450) > Durbar Mall (NPR 324,120) > Bikers Cafe Naxal (NPR 250,830, down 2.3%).",
  },
];

type Msg = { role: "user" | "bot"; text: string };

export function AskAi() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: `Namaste! I can summarise sales, products and outlets. This month you've done ${npr(kpis.totalSales)} (+${kpis.salesGrowth}%). Try one of the questions below.`,
    },
  ]);

  const ask = (q: string) => {
    const found = examples.find((e) => e.q === q);
    setMsgs((m) => [
      ...m,
      { role: "user", text: q },
      {
        role: "bot",
        text:
          found?.a ??
          "This is a prototype assistant — connected business answers will be available in the next phase.",
      },
    ]);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-40 flex h-[520px] w-[min(380px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <div className="flex items-center gap-3 border-b border-border bg-gold-soft/60 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-primary-foreground">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Himalayan Java Business Assistant</p>
              <p className="text-[11px] text-muted-foreground">Prototype preview</p>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-espresso px-3.5 py-2.5 text-sm text-background"
                    : "max-w-[90%] text-sm leading-relaxed text-foreground"
                }
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {examples.map((e) => (
                <button
                  key={e.q}
                  onClick={() => ask(e.q)}
                  className="rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] transition hover:border-gold hover:bg-gold-soft/50"
                >
                  {e.q}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
              <input
                disabled
                placeholder="Ask about sales, products or outlets…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <Send className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold transition hover:brightness-105"
      >
        <MessageCircle className="h-4 w-4" />
        Ask AI
      </button>
    </>
  );
}
