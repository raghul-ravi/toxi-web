export function formatDate(value: string | undefined): string {
  return value ? new Date(value).toLocaleString() : '';
}
