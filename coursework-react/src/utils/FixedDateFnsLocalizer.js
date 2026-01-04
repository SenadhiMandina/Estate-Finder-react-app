import formatWithOptions from "date-fns/fp/formatWithOptions";
import parseWithOptions from "date-fns/fp/parseWithOptions";
import addYears from "date-fns/fp/addYears";
import enUS from "date-fns/locale/en-US";

const endOfDecade = addYears(10);
const endOfCentury = addYears(100);

export default class FixedDateFnsLocalizer {
  constructor(locale) {
    this.locale = locale || enUS;
    const { options } = this.locale;

    this.firstOfWeek = () => (options && options.weekStartsOn) || 0;
  }

  firstOfWeek() {
    return this.locale?.options?.weekStartsOn ?? 0;
  }

  date(date, format) {
    return this.format(date, format || "P");
  }

  time(date, format) {
    return this.format(date, format || "pp");
  }

  datetime(date, format) {
    return this.format(date, format || "Pp");
  }

  header(date, format) {
    return this.format(date, format || "MMMM yyyy");
  }

  weekday(date, format) {
    return this.format(date, format || "cccccc");
  }

  dayOfMonth(date, format) {
    return this.format(date, format || "d");
  }

  month(date, format) {
    return this.format(date, format || "MMM");
  }

  year(date, format) {
    return this.format(date, format || "yyyy");
  }

  decade(date, format) {
    return format
      ? this.format(date, format)
      : `${this.format(date, "yyyy")} - ${this.format(endOfDecade(date), "yyyy")}`;
  }

  century(date, format) {
    return format
      ? this.format(date, format)
      : `${this.format(date, "yyyy")} - ${this.format(endOfCentury(date), "yyyy")}`;
  }

  format(value, format) {
    return formatWithOptions({ locale: this.locale }, format, value);
  }

  parse(value, format) {
    const result = parseWithOptions({ locale: this.locale }, new Date(), format, value);
    if (result.toString() === "Invalid Date") return null;
    return result;
  }
}