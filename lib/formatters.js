/**
 * Formatter Utilities
 * Clean, pure JavaScript helpers for dates, avatars, and text formatting.
 */

const AVATAR_GRADIENTS = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-cyan-500 to-blue-600',
  'from-rose-500 to-red-600',
];

/**
 * Formats an ISO date string into a user-friendly format (e.g. "29 Oct 2026, 15:11")
 * @param {string|Date} dateString - ISO string or Date instance
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '—';
  }
}

/**
 * Extracts 1-2 uppercase initials from a person or school name
 * @param {string} name - Full name (e.g. "Dr. Jane Smith")
 * @param {number} maxChars - Maximum initials to return (default: 2)
 * @returns {string} Uppercase initials (e.g. "JS")
 */
export function getInitials(name = '', maxChars = 2) {
  if (!name || typeof name !== 'string') return 'T';
  const clean = name.trim().replace(/^Dr\.\s*|^Prof\.\s*|^Mr\.\s*|^Ms\.\s*|^Mrs\.\s*/i, '');
  const parts = clean.split(/\s+/).filter(Boolean);

  if (parts.length === 0) return 'T';
  if (parts.length === 1) return parts[0].slice(0, maxChars).toUpperCase();

  return (parts[0][0] + parts[parts.length - 1][0]).slice(0, maxChars).toUpperCase();
}

/**
 * Returns a consistent gradient background string for a given name hash
 * @param {string} name - Name to hash
 * @returns {string} Tailwind CSS gradient classes
 */
export function getAvatarColor(name = '') {
  if (!name || typeof name !== 'string') return AVATAR_GRADIENTS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}

