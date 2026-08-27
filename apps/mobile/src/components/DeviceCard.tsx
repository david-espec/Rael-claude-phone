import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, statusColor, statusLabel } from '../theme/colors';
import { CloudDevice } from '../types';
import { Badge } from './Badge';

interface DeviceCardProps {
  device: CloudDevice;
  onPress: () => void;
}

export function DeviceCard({ device, onPress }: DeviceCardProps) {
  const storagePct = Math.min(1, device.storageUsedGb / device.storageTotalGb);

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.card}>
      <View style={[styles.thumb, { backgroundColor: `${device.thumbnailColor}22` }]}>
        <Ionicons name="phone-portrait" size={26} color={device.thumbnailColor} />
        {device.autoPlayEnabled && (
          <View style={styles.autoPlayDot}>
            <Ionicons name="flash" size={10} color="#0B0F1A" />
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {device.name}
        </Text>
        <Text style={styles.meta}>
          {device.androidVersion} · {device.region}
        </Text>

        <View style={styles.row}>
          <Badge label={statusLabel[device.status]} color={statusColor[device.status]} />
          {device.status !== 'stopped' && (
            <Text style={styles.latency}>{device.latencyMs} ms</Text>
          )}
        </View>

        <View style={styles.storageTrack}>
          <View style={[styles.storageFill, { width: `${storagePct * 100}%` }]} />
        </View>
        <Text style={styles.storageText}>
          {device.storageUsedGb} GB / {device.storageTotalGb} GB · {device.minutesRemaining} min restantes
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoPlayDot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  latency: {
    color: colors.textFaint,
    fontSize: 12,
  },
  storageTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceAlt,
    marginTop: 8,
    overflow: 'hidden',
  },
  storageFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  storageText: {
    color: colors.textFaint,
    fontSize: 11,
    marginTop: 4,
  },
});
