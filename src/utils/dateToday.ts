/**
 * Returns the current date in the format "YYYY-MM-DD".
 * @returns {string} The formatted date string.
 */

export default function getTodaysDate(): string {
  const today: Date = new Date();
  const yyyy: number = today.getFullYear();
  const mm: number = today.getMonth() + 1; // Months start at 0!
  const dd: number = today.getDate();

  // Ensure leading zeros for single-digit months and days
  const formattedMM: string = mm < 10 ? `0${mm}` : mm.toString();
  const formattedDD: string = dd < 10 ? `0${dd}` : dd.toString();

  return `${yyyy}-${formattedMM}-${formattedDD}`;
}
