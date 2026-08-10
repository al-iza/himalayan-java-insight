import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, LogOut, Mail, Phone, User } from "lucide-react";
import { Link } from "@tanstack/react-router";
import avatar from "@/assets/aliza.jpg";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "User Profile | Himalayan Java Analytics" },
      {
        name: "description",
        content:
          "Manage the Himalayan Java analytics user profile: photo, full name, email, contact and role.",
      },
      { property: "og:title", content: "User Profile | Himalayan Java Analytics" },
      {
        property: "og:description",
        content: "Profile details for the Himalayan Java analytics account.",
      },
    ],
  }),
  component: ProfilePage,
});

const fields = [
  { key: "fullName", label: "Full Name", value: "Aliza Shrestha", icon: User, type: "text" },
  { key: "email", label: "Gmail", value: "aliza.shrestha@gmail.com", icon: Mail, type: "email" },
  { key: "contact", label: "Contact Number", value: "+977 9801-234567", icon: Phone, type: "tel" },
  { key: "role", label: "Role", value: "Operations Head", icon: User, type: "text" },
  { key: "outlet", label: "Primary Outlet", value: "Tridevi Marg", icon: User, type: "text" },
  { key: "location", label: "Location", value: "Kathmandu, Nepal", icon: User, type: "text" },
] as const;

function ProfilePage() {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.key, f.value])),
  );
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="card-surface flex flex-wrap items-center gap-5 p-6">
        <div className="relative">
          <img
            src={avatar}
            alt="Profile photo of Aliza Shrestha"
            loading="lazy"
            width={512}
            height={512}
            className="h-20 w-20 rounded-full object-cover ring-2 ring-gold/40"
          />
          <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-espresso">
            <Camera className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-xl font-semibold">{values.fullName}</h2>
          <p className="text-sm text-muted-foreground">{values.email}</p>
          <p className="text-xs text-muted-foreground">
            {values.role} · {values.contact}
          </p>
        </div>
        <Link
          to="/signin"
          className="ml-auto inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-4 py-2 text-xs font-semibold text-destructive transition hover:bg-destructive/15"
        >
          <LogOut className="h-4 w-4" /> Logout
        </Link>
      </div>

      <form
        className="card-surface p-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }}
      >
        <h3 className="font-display text-lg font-semibold">Profile Details</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          All fields are editable in this prototype.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <label key={f.key} className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {f.label}
              </span>
              <div className="relative mt-1.5">
                <f.icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={f.type}
                  value={values[f.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                  className="h-11 w-full rounded-xl border border-border bg-muted/50 pl-9 pr-4 text-sm outline-none focus:border-gold focus:bg-background"
                />
              </div>
            </label>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold transition hover:opacity-90"
          >
            Save changes
          </button>
          <button
            type="button"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
          >
            Upload photo
          </button>
          {saved && <span className="text-xs font-medium text-success">Profile saved</span>}
        </div>
      </form>
    </div>
  );
}
