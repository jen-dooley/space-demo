import { DateTime } from "luxon";

// Formatter functions, generally used as inline template filters
export const formatNumber = (
  value,
  config = { minDecimalsDigits: 0, maxDecimalsDigits: 0 }
) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: config.minDecimalsDigits,
    maximumFractionDigits: config.maxDecimalsDigits,
  }).format(value);
};

export const formatDate = (
  value,
  config = { inputFormat: "fromMillis", outputFormat: DateTime.DATETIME_MED }
) => {
  return DateTime[config.inputFormat](value).toLocaleString(
    config.outputFormat
  );
};
