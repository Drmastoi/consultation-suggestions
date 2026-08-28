# Consultation Suggestions

A clinical reference library with **292 pre-formatted consultation templates** across **42 medical categories**, designed for primary care doctors to quickly search, browse, and copy consultation notes.

## Features

- 🔍 **Fuzzy search** — find conditions by name, symptoms, or keywords
- 📂 **42 categories** — Blood Tests, Cardiology, Dermatology, ENT, and more
- 📋 **One-tap copy** — copies the full pre-formatted consultation text to clipboard
- ⚠️ **Disclaimer** — medical disclaimer always visible on every template
- 📱 **React Native / Expo** — works with your existing Expo app

## Installation

Copy the `consultation-suggestions` folder into your project, then install dependencies:

```bash
# From your project root
cd consultation-suggestions
npm install fuse.js

# In your main project
npx expo install expo-clipboard
```

## Integration

### 1. Add the tab to your navigation

In your navigation file (e.g., `App.tsx` or a tab navigator):

```tsx
import {
  ConsultationSuggestionsScreen,
  ConsultationDetailScreen,
} from './consultation-suggestions/src';

// In your navigation setup:
<Stack.Screen
  name="ConsultationSuggestions"
  component={ConsultationSuggestionsScreenWrapper}
/>

// Wrapper to pass navigation props:
function ConsultationSuggestionsScreenWrapper({ navigation }) {
  return (
    <ConsultationSuggestionsScreen
      onSelectEntry={(entry) =>
        navigation.navigate('ConsultationDetail', { entry })
      }
    />
  );
}

<Stack.Screen
  name="ConsultationDetail"
  options={{ headerShown: false }}
>
  {({ route, navigation }) => (
    <ConsultationDetailScreen
      entry={route.params.entry}
      onClose={() => navigation.goBack()}
    />
  )}
</Stack.Screen>
```

### 2. If using Expo Router (app/ directory)

Create `app/(tabs)/consultations.tsx`:

```tsx
import { useState } from 'react';
import { ConsultationSuggestionsScreen, ConsultationDetailScreen } from '../../consultation-suggestions/src';
import { ConsultationEntry } from '../../consultation-suggestions/src/types/consultation';

export default function ConsultationsTab() {
  const [selectedEntry, setSelectedEntry] = useState<ConsultationEntry | null>(null);

  if (selectedEntry) {
    return (
      <ConsultationDetailScreen
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
      />
    );
  }

  return (
    <ConsultationSuggestionsScreen
      onSelectEntry={setSelectedEntry}
    />
  );
}
```

### 3. Minimal standalone usage (no navigation)

```tsx
import { useState } from 'react';
import { ConsultationSuggestionsScreen, ConsultationDetailScreen } from './consultation-suggestions/src';

export default function App() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return <ConsultationDetailScreen entry={selected} onClose={() => setSelected(null)} />;
  }

  return <ConsultationSuggestionsScreen onSelectEntry={setSelected} />;
}
```

## Data Structure

Each entry contains:

| Field | Description |
|-------|-------------|
| `category` | Medical specialty area (e.g., "Blood Test Results") |
| `disease_name` | Condition identifier |
| `title` | Display title |
| `history` | Clinical history template |
| `exam` | Examination findings template |
| `impression` | Clinical impression / diagnosis |
| `plan` | Management plan |
| `additional_info` | Guidelines, references, extra info |
| `disclaimer` | Medical disclaimer text |
| `consultation_sample` | **Full pre-formatted text — what gets copied** |
| `updated_at` | Last update date |

## Updating the Data

Replace `assets/consultation_data.json` with your updated JSON file. The structure must match:

```json
{
  "diseases": [
    {
      "category": "...",
      "disease_name": "...",
      "title": "...",
      "history": "...",
      "exam": "...",
      "impression": "...",
      "plan": "...",
      "additional_info": "...",
      "disclaimer": "...",
      "consultation_sample": "...",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## API Reference

### Data Functions

```ts
import {
  getAllEntries,        // ConsultationEntry[] — all 292 entries
  getCategories,        // CategoryCount[] — [{ name, count }, ...]
  searchEntries,        // (query: string) => ConsultationEntry[]
  filterByCategory,     // (category: string | null) => ConsultationEntry[]
  searchAndFilter,      // (query: string, category: string | null) => ConsultationEntry[]
  getEntryByName,       // (name: string) => ConsultationEntry | undefined
} from './consultation-suggestions/src';
```

### Components

```tsx
import {
  CategoryChips,           // Horizontal scrollable filter pills
  ConsultationCard,        // List item card
  DisclaimerBanner,        // Medical disclaimer component
  ConsultationSuggestionsScreen,  // Full search/browse screen
  ConsultationDetailScreen,       // Detail view with copy button
} from './consultation-suggestions/src';
```

## License

Internal use only. Consultation data sourced from clinical guidelines.
