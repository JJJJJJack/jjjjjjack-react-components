import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"; // TODO: remove and recreate
import { Grid } from "../Composition/Grid";
import { Label } from "./Label";

interface DateCalendarProps {
  idDate?: string;
  isRange?: boolean;
  showTime?: boolean;
  placeholder?: string | { start?: string; end?: string };
  label: string;
  value: { start: string; end?: string };
  onChange: (value: string | { start: string; end: string }) => void;
}

const testDate = new Date(Date.UTC(2025, 0, 2));
const formatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "UTC",
});
function getUserDateFormatPattern(): string {
  const formatted = formatter.format(testDate);

  // Match numbers and separators
  const parts = formatted.match(/(\d+|\D+)/g);

  if (!parts) return "MM/dd/yyyy"; // fallback

  return parts
    .map(part => {
      if (/^\d+$/.test(part)) {
        switch (part) {
          case "01":
            return "MM";
          case "02":
            return "dd";
          case "2025":
            return "yyyy";
          default:
            return part;
        }
      }
      return part;
    })
    .join("");
}

// TODO: fix {start: string; end: string} with a better solution
//  and fix rotating pages when selecting dates outside the current month (maybe?)
export function Calendar({
  isRange = false,
  showTime = false,
  idDate,
  label,
  placeholder,
  value,
  onChange,
}: DateCalendarProps) {
  const parseDate = (dateString?: string | null): Date | null => {
    if (!dateString || dateString === "null") return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  // Set time to 12:00 (noon) to avoid timezone confusion when time is not shown
  const normalizeDate = (date: Date): Date => {
    if (showTime) return date;
    const normalized = new Date(date);
    normalized.setHours(12, 0, 0, 0);
    return normalized;
  };

  const [range, setRange] = useState<[Date | null, Date | null]>([parseDate(value.start), parseDate(value.end)]);

  useEffect(() => {
    if (isRange) {
      setRange([parseDate(value.start), parseDate(value.end)]);
    }
  }, [value.start, value.end, isRange]);

  const handleChangeSingle = (date: Date | null) => {
    if (date && !isNaN(date.getTime())) {
      onChange(normalizeDate(date).toISOString());
    }
  };

  const handleChangeRange = (dates: [Date | null, Date | null]) => {
    setRange(dates);
    let [start, end] = dates;

    // Swap if user manually entered dates in wrong order
    if (start && end && start > end) {
      [start, end] = [end, start];
    }

    onChange({
      start: start ? normalizeDate(start).toISOString() : "",
      end: end ? normalizeDate(end).toISOString() : "",
    });
  };

  const dateFormat = showTime ? `${getUserDateFormatPattern()} HH:mm` : getUserDateFormatPattern();

  const placeholderText =
    typeof placeholder === "string" ? placeholder : isRange ? "Select range date" : "Select a date";

  return (
    <Grid className="jrc-Calendar">
      {label && <Label text={label} htmlFor={idDate} />}
      <div>
        {isRange ? (
          <DatePicker
            selectsRange
            startDate={range[0]}
            endDate={range[1]}
            dateFormat={dateFormat}
            onChange={handleChangeRange}
            className="jrc-Calendar__DatePicker"
            placeholderText={placeholderText}
            autoComplete="off"
          />
        ) : (
          <DatePicker
            selected={parseDate(value.start)}
            onChange={handleChangeSingle}
            showTimeSelect={showTime}
            timeIntervals={15}
            todayButton={showTime ? "Today" : undefined}
            dateFormat={dateFormat}
            className="jrc-Calendar__DatePicker"
            placeholderText={placeholderText}
            id={idDate}
            autoComplete="off"
          />
        )}
      </div>
    </Grid>
  );
}
