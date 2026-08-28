// ── Types ──────────────────────────────────────────────────────────
export type {
  ConsultationEntry,
  ConsultationData,
  CategoryCount,
} from './types/consultation';

// ── Data ───────────────────────────────────────────────────────────
export {
  getAllEntries,
  getCategories,
  searchEntries,
  filterByCategory,
  searchAndFilter,
  getEntryByName,
} from './data/consultationLoader';

// ── Components ─────────────────────────────────────────────────────
export { CategoryChips } from './components/CategoryChips';
export { ConsultationCard } from './components/ConsultationCard';
export { DisclaimerBanner } from './components/DisclaimerBanner';

// ── Screens ────────────────────────────────────────────────────────
export { ConsultationSuggestionsScreen } from './screens/ConsultationSuggestionsScreen';
export { ConsultationDetailScreen } from './screens/ConsultationDetailScreen';
