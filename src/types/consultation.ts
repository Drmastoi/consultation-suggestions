/**
 * Represents a single consultation suggestion entry.
 * Each entry provides a pre-formatted clinical consultation template
 * for a specific condition or scenario.
 */
export interface ConsultationEntry {
  /** Medical specialty or topic area, e.g. "Blood Test Results", "Cardiology" */
  category: string;

  /** Short condition/scenario identifier */
  disease_name: string;

  /** Display title (usually same as disease_name) */
  title: string;

  /** Clinical history section — presenting complaint, PMH, drug Hx, social Hx */
  history: string;

  /** Examination findings template */
  exam: string;

  /** Clinical impression / diagnosis */
  impression: string;

  /** Management plan */
  plan: string;

  /** Additional clinical information, guidelines, references */
  additional_info: string;

  /** Medical disclaimer — must be shown to the user */
  disclaimer: string;

  /**
   * The full pre-formatted consultation text.
   * This is what gets copied to clipboard.
   * Typically consolidates history + exam + impression + plan + additional_info.
   */
  consultation_sample: string;

  /** ISO date string of last update */
  updated_at: string;
}

/** Root data structure matching the JSON file */
export interface ConsultationData {
  diseases: ConsultationEntry[];
}

/** Category with count for filter UI */
export interface CategoryCount {
  name: string;
  count: number;
}
