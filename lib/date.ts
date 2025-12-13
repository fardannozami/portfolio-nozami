const defaultDateOptions: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
}

/**
 * Format dates with a fixed timezone so SSR and CSR output stay in sync.
 */
export function formatDate(
  value: string | number | Date,
  options: Intl.DateTimeFormatOptions = defaultDateOptions,
) {
  const date = typeof value === "string" || typeof value === "number" ? new Date(value) : value

  if (Number.isNaN(date.getTime())) {
    return ""
  }

  return new Intl.DateTimeFormat("id-ID", { timeZone: "UTC", ...options }).format(date)
}
