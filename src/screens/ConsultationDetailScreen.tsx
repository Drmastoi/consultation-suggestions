import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { ConsultationEntry } from '../types/consultation';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

interface ConsultationDetailScreenProps {
  /** The consultation entry to display */
  entry: ConsultationEntry;
  /** Called to close/go back */
  onClose: () => void;
}

interface SectionProps {
  label: string;
  content: string;
}

/** A single labeled section of the consultation */
function Section({ label, content }: SectionProps) {
  if (!content || !content.trim()) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <Text style={styles.sectionContent}>{content.trim()}</Text>
    </View>
  );
}

/**
 * Detail screen showing a consultation entry's structured sections
 * with a "Copy Consultation Text" button.
 *
 * Usage:
 *   <ConsultationDetailScreen entry={entry} onClose={() => navigation.goBack()} />
 */
export function ConsultationDetailScreen({
  entry,
  onClose,
}: ConsultationDetailScreenProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const textToCopy = entry.consultation_sample || buildFallbackText(entry);

    try {
      await Clipboard.setStringAsync(textToCopy);
      setCopied(true);
      // Reset the "Copied!" state after 2 seconds
      const timer = globalThis.setTimeout(() => setCopied(false), 2000);
      // Clean up if component unmounts (timer ref not strictly needed for expo)
      void timer;
    } catch {
      Alert.alert(
        'Copy Failed',
        'Could not copy text to clipboard. Please try again.'
      );
    }
  }, [entry]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.topBarCategory} numberOfLines={1}>
          {entry.category}
        </Text>
        <View style={styles.closeButton} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>{entry.title || entry.disease_name}</Text>
        <Text style={styles.updated}>
          Last updated:{' '}
          {new Date(entry.updated_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </Text>

        {/* Structured Sections */}
        <Section label="History" content={entry.history} />
        <Section label="Examination" content={entry.exam} />
        <Section label="Impression" content={entry.impression} />
        <Section label="Plan" content={entry.plan} />
        <Section label="Additional Information" content={entry.additional_info} />

        {/* Disclaimer */}
        <DisclaimerBanner text={entry.disclaimer} />

        {/* Copy Button */}
        <TouchableOpacity
          style={[styles.copyButton, copied && styles.copyButtonSuccess]}
          onPress={handleCopy}
          activeOpacity={0.75}
        >
          <Text style={[styles.copyButtonText, copied && styles.copyButtonTextSuccess]}>
            {copied ? '✅ Copied to Clipboard!' : '📋 Copy Consultation Text'}
          </Text>
        </TouchableOpacity>

        {/* Spacer for safe area */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Fallback: build a text string from individual fields
 * if consultation_sample is somehow empty.
 */
function buildFallbackText(entry: ConsultationEntry): string {
  const parts: string[] = [];
  if (entry.history?.trim()) parts.push(`History:\n${entry.history.trim()}`);
  if (entry.exam?.trim()) parts.push(`Examination:\n${entry.exam.trim()}`);
  if (entry.impression?.trim())
    parts.push(`Impression:\n${entry.impression.trim()}`);
  if (entry.plan?.trim()) parts.push(`Plan:\n${entry.plan.trim()}`);
  if (entry.additional_info?.trim())
    parts.push(`Additional Information:\n${entry.additional_info.trim()}`);
  return parts.join('\n\n');
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  closeButton: {
    minWidth: 60,
    paddingVertical: 4,
  },
  closeText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  topBarCategory: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A2E',
    lineHeight: 28,
    marginBottom: 4,
  },
  updated: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#007AFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 21,
    color: '#374151',
  },
  copyButton: {
    marginTop: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    alignItems: 'center',
  },
  copyButtonSuccess: {
    backgroundColor: '#34C759',
  },
  copyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  copyButtonTextSuccess: {
    color: '#FFFFFF',
  },
});
