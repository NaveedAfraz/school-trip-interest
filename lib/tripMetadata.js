import fs from 'fs';
import path from 'path';

const METADATA_FILE = path.join(process.cwd(), 'data', 'tripMetadata.json');

function readMetadataFile() {
  try {
    if (fs.existsSync(METADATA_FILE)) {
      const content = fs.readFileSync(METADATA_FILE, 'utf8');
      return JSON.parse(content || '{}');
    }
  } catch {
    // fallback to empty if read fails
  }
  return {};
}

function writeMetadataFile(data) {
  try {
    const dir = path.dirname(METADATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(METADATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch {
    // ignore in serverless read-only contexts
  }
}

export function saveTripMetadata(key, metadata = {}) {
  if (!key) return;
  const store = readMetadataFile();
  store[key] = {
    image_url: metadata.image_url,
    target_grades: metadata.target_grades,
    group_size: metadata.group_size,
    highlights: metadata.highlights,
  };
  writeMetadataFile(store);
}

export function packTripDescription(cleanDescription) {
  // Always keep description 100% clean plain text (no comments)
  return (cleanDescription || '').replace(/<!--[\s\S]*?-->/g, '').trim();
}

export function unpackTrip(trip) {
  if (!trip) return trip;

  const rawDesc = trip.description || '';
  // Clean any HTML comments completely from description
  const cleanDescription = rawDesc.replace(/<!--[\s\S]*?-->/g, '').trim();

  const store = readMetadataFile();
  const key = trip.id || trip.slug || trip.name;
  const stored = store[key] || store[trip.slug] || store[trip.name] || {};

  return {
    ...trip,
    description: cleanDescription,
    image_url: trip.image_url || stored.image_url || undefined,
    target_grades: trip.target_grades || stored.target_grades || undefined,
    group_size: trip.group_size || stored.group_size || undefined,
    highlights:
      Array.isArray(trip.highlights) && trip.highlights.length > 0
        ? trip.highlights
        : stored.highlights || undefined,
  };
}
