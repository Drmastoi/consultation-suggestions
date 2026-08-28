import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DisclaimerBannerProps {
  text?: string;
}

const DEFAULT_DISCLAIMER =
  'Under no circumstances should anything stated above override the individual responsibility of healthcare professionals to make decisions appropriate to the circumstances of individual patients, in consultation with the patient and/or guardian or carer.';

/**
 * Prominent medical disclaimer banner.
 * Uses the entry's own disclaimer text, or falls back to the default.
 */
export function DisclaimerBanner({ text }: DisclaimerBannerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>⚠️ Disclaimer</Text>
      <Text style={styles.text}>{text || DEFAULT_DISCLAIMER}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 12,
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B8860B',
    marginBottom: 4,
  },
  text: {
    fontSize: 11,
    lineHeight: 16,
    color: '#8B6914',
  },
});
