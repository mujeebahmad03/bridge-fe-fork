/**
 * Shared text utility functions
 */

export function truncateContent(content: string, maxLength = 150): string {
  if (content.length <= maxLength) return content;
  return `${content.substring(0, maxLength)}...`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
