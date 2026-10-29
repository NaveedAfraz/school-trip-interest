/**
 * CSV Export Utility
 * Generates RFC-4180 compliant CSV strings and triggers instant browser downloads.
 */

/**
 * Escapes a cell value for CSV formatting
 * @param {any} val
 * @returns {string}
 */
function escapeCSV(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  // If string contains comma, quote, or newline, escape double quotes and wrap in quotes
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

/**
 * Exports submissions array to a downloadable .csv file
 * @param {Array<Object>} submissions - Submissions list
 * @param {string} [filename] - Optional filename
 */
export function exportSubmissionsToCSV(submissions = [], filename) {
  if (!submissions || submissions.length === 0) return false;

  const headers = [
    'Registration ID',
    'Teacher Name',
    'School Name',
    'Email',
    'Phone',
    'Trip Name',
    'Destination',
    'Number of Students',
    'Submitted At',
  ];

  const rows = submissions.map((s) => {
    const tripName = Array.isArray(s.trips)
      ? s.trips[0]?.name
      : s.trips?.name || '—';

    const tripDest = Array.isArray(s.trips)
      ? s.trips[0]?.destination
      : s.trips?.destination || '';

    return [
      escapeCSV(s.id),
      escapeCSV(s.teacher_name),
      escapeCSV(s.school_name),
      escapeCSV(s.email),
      escapeCSV(s.phone),
      escapeCSV(tripName),
      escapeCSV(tripDest),
      escapeCSV(s.number_of_students),
      escapeCSV(s.created_at),
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  const defaultName = `mb-learning-trip-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
  link.href = url;
  link.setAttribute('download', filename || defaultName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return true;
}

