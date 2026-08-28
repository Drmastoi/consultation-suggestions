import Fuse from 'fuse.js';
import rawData from '../../assets/consultation_data.json';
import { ConsultationEntry, ConsultationData, CategoryCount } from '../types/consultation';

// ── Module-level cache ──────────────────────────────────────────────
let _entries: ConsultationEntry[] | null = null;
let _fuse: Fuse<ConsultationEntry> | null = null;
let _categories: CategoryCount[] | null = null;

/**
 * Returns all consultation entries (loaded once, cached).
 */
export function getAllEntries(): ConsultationEntry[] {
  if (!_entries) {
    _entries = (rawData as ConsultationData).diseases;
  }
  return _entries;
}

/**
 * Returns deduplicated categories with counts, sorted alphabetically.
 */
export function getCategories(): CategoryCount[] {
  if (!_categories) {
    const counts: Record<string, number> = {};
    for (const entry of getAllEntries()) {
      const cat = entry.category || 'Other';
      counts[cat] = (counts[cat] || 0) + 1;
    }
    _categories = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  return _categories;
}

/**
 * Returns a Fuse.js instance configured for fuzzy search
 * across disease_name, category, history, plan, and consultation_sample.
 */
function getFuse(): Fuse<ConsultationEntry> {
  if (!_fuse) {
    _fuse = new Fuse(getAllEntries(), {
      keys: [
        { name: 'disease_name', weight: 3 },
        { name: 'category', weight: 2 },
        { name: 'title', weight: 2 },
        { name: 'history', weight: 1 },
        { name: 'plan', weight: 1 },
        { name: 'consultation_sample', weight: 0.5 },
      ],
      threshold: 0.35,       // fairly strict — avoid irrelevant matches
      includeScore: true,
      ignoreLocation: true,   // match anywhere in the string
      minMatchCharLength: 2,
    });
  }
  return _fuse;
}

/**
 * Fuzzy search across all entries.
 * Returns results sorted by relevance score.
 */
export function searchEntries(query: string): ConsultationEntry[] {
  const trimmed = query.trim();
  if (!trimmed) return getAllEntries();

  const fuse = getFuse();
  const results = fuse.search(trimmed);
  return results.map((r) => r.item);
}

/**
 * Filter entries by category name.
 * Pass null or empty string to get all entries.
 */
export function filterByCategory(category: string | null): ConsultationEntry[] {
  if (!category) return getAllEntries();
  return getAllEntries().filter(
    (e) => e.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Combined search + category filter.
 * If both query and category are provided, results must match both.
 */
export function searchAndFilter(
  query: string,
  category: string | null
): ConsultationEntry[] {
  const hasQuery = query.trim().length > 0;
  const hasCategory = !!category;

  if (!hasQuery && !hasCategory) return getAllEntries();

  if (hasQuery && hasCategory) {
    const fuseResults = searchEntries(query);
    return fuseResults.filter(
      (e) => e.category.toLowerCase() === category!.toLowerCase()
    );
  }

  if (hasQuery) return searchEntries(query);
  return filterByCategory(category);
}

/**
 * Get a single entry by disease_name (exact match).
 */
export function getEntryByName(name: string): ConsultationEntry | undefined {
  return getAllEntries().find(
    (e) => e.disease_name.toLowerCase() === name.toLowerCase()
  );
}
