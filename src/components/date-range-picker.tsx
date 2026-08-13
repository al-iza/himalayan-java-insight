import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DateRangePicker({
  value,
  onChange,
  className,
}: {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  const label =
    value?.from && value?.to
      ? `${format(value.from, "d MMM")} – ${format(value.to, "d MMM yyyy")}`
      : value?.from
        ? `${format(value.from, "d MMM yyyy")} – …`
        : "Pick date range";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex h-9 items-center gap-2 rounded-full border border-border bg-muted/60 px-4 text-xs font-medium transition hover:border-gold",
            value?.from && "border-gold bg-gold-soft/50 text-espresso",
            className,
          )}
        >
          <CalendarIcon className="h-3.5 w-3.5" />
          {label}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="range"
          numberOfMonths={2}
          {...(value?.from ? { defaultMonth: value.from } : {})}
          {...(value ? { selected: value } : {})}
          onSelect={(r) => {
            onChange(r);
            if (r?.from && r?.to) setOpen(false);
          }}
          disabled={{ after: new Date() }}
          initialFocus
          className={cn("pointer-events-auto p-3")}
        />
        <div className="flex justify-between border-t border-border px-3 py-2">
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-xs text-muted-foreground transition hover:text-foreground"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-xs font-semibold text-espresso"
          >
            Done
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
