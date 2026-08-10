import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Coffee, Lock } from "lucide-react";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign In | Himalayan Java Analytics" },
      {
        name: "description",
        content: "Sign in to the Himalayan Java sales and outlet analytics dashboard.",
      },
      { property: "og:title", content: "Sign In | Himalayan Java Analytics" },
      {
        property: "og:description",
        content: "Secure sign in for Himalayan Java management analytics.",
      },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("aliza.shrestha@gmail.com");
  const [password, setPassword] = useState("");

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center">
      <div className="card-surface p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-primary-foreground shadow-gold">
            <Coffee className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold">Himalayan Java</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Analytics
            </p>
          </div>
        </div>

        <h1 className="mt-7 font-display text-2xl font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Use your Himalayan Java management account.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/" });
          }}
        >
          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted/50 px-4 text-sm outline-none focus:border-gold focus:bg-background"
            />
          </label>
          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted/50 px-4 text-sm outline-none focus:border-gold focus:bg-background"
            />
          </label>
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gold text-sm font-semibold text-primary-foreground shadow-gold transition hover:opacity-90"
          >
            <Lock className="h-4 w-4" /> Sign in
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Prototype only — no account is required.{" "}
          <Link to="/" className="font-medium text-espresso underline">
            Back to dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}
