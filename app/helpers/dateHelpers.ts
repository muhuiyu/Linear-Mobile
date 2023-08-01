export const toDueDateString = (date: Date): string => {
  const now = new Date()
  if (now.getFullYear !== date.getFullYear) {
    return date.toLocaleDateString()
  }
  return `${date.toLocaleString(undefined, { month: 'short', day: 'numeric' })}`
}
