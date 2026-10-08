const DEFAULT_API_URL =
  "https://adventurexp-dyg7gcfbbackhphq.spaincentral-01.azurewebsites.net";

export const API_URL = (
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_URL
).replace(/\/+$/, "");