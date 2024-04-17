export const thousondSeparator = (
    input: number | null | undefined,
    options: {
      separator?: string;
      dot?: string;
      decimalLength?: number;
      suffix?: string;
      prefix?: string;
      emptyString?: string;
      addPositiveSign?: boolean;
    } = {
        separator: ",",
        dot: "/",
        decimalLength: 2,
        emptyString: "-",
        addPositiveSign: false,
      }
  ) => {
    if (typeof input === "undefined" || input === null) return options.emptyString ?? "-";
    let str = input.toString();
    const hasDecimalPart = input % 1 !== 0;
    if (hasDecimalPart) {
      let rounded = parseFloat(input.toFixed(options.decimalLength ?? 2));
      if (rounded === -0) str = "0";
      else str = rounded.toString();
    }
    let arr = str.split(".");
    return `${options.prefix ?? ""}${options.addPositiveSign && input > 0 ? "+" : ""}${arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, options.separator ?? ",") + (arr.length === 2 ? `${options.dot ?? "/"}${arr[1]}` : "")
      }${options.suffix ?? ""}`;
  };