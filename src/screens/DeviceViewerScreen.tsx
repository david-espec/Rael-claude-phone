import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Badge } from '../components/Badge';
import { mockDevices } from '../data/mock';
import { colors, statusColor, statusLabel } from '../theme/colors';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'DeviceViewer'>;

export function DeviceViewerScreen({ route, navigation }: Props) {
  const { deviceId } = route.params;
  const device = useMemo(() => mockDevices.find((d) => d.id === deviceId) ?? mockDevices[0], [deviceId]);

  const [autoPlay, setAutoPlay] = useState(device.autoPlayEnabled);
  const [powered, setPowered] = useState(device.status !== 'stopped');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>
            {device.name}
          </Text>
          <Text style={styles.subtitle}>
            {device.region} · {device.latencyMs > 0 ? `${device.latencyMs} ms` : '—'}
          </Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="settings-outline" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.badgeRow}>
        <Badge
          label={powered ? statusLabel[autoPlay ? 'auto-play' : 'running'] : statusLabel.stopped}
          color={powered ? statusColor[autoPlay ? 'auto-play' : 'running'] : statusColor.stopped}
        />
      </View>

      <View style={styles.phoneFrame}>
        <View style={styles.notch} />
        {powered ? (
          <View style={styles.remoteScreen}>
            <Ionicons name="game-controller-outline" size={40} color={colors.textFaint} />
            <Text style={styles.streamText}>Transmitindo tela remota…</Text>
            <Text style={styles.streamHint}>Android real rodando em data center · {device.region}</Text>
          </View>
        ) : (
          <View style={[styles.remoteScreen, styles.remoteScreenOff]}>
            <Ionicons name="power" size={36} color={colors.textFaint} />
            <Text style={styles.streamHint}>Dispositivo desligado</Text>
          </View>
        )}
      </View>

      <View style={styles.controlsRow}>
        <ControlButton
          icon="power"
          label={powered ? 'Desligar' : 'Ligar'}
          active={powered}
          onPress={() => setPowered((v) => !v)}
        />
        <ControlButton
          icon="flash"
          label="Auto-play 24/7"
          active={autoPlay}
          disabled={!powered}
          onPress={() => setAutoPlay((v) => !v)}
        />
        <ControlButton icon="volume-high" label="Volume" onPress={() => {}} />
        <ControlButton icon="home" label="Home" onPress={() => {}} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {device.minutesRemaining} minutos restantes neste ciclo · {device.storageUsedGb} GB / {device.storageTotalGb} GB usados
        </Text>
      </View>
    </SafeAreaView>
  );
}

interface ControlButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  active?: boolean;
  disabled?: boolean;
}

function ControlButton({ icon, label, onPress, active, disabled }: ControlButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.controlButton, active && styles.controlButtonActive, disabled && styles.controlButtonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Ionicons name={icon} size={20} color={active ? '#0B0F1A' : colors.text} />
      <Text style={[styles.controlLabel, active && styles.controlLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 12,
  },
  badgeRow: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  phoneFrame: {
    flex: 1,
    marginHorizontal: 40,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 32,
    borderWidth: 6,
    borderColor: colors.surfaceAlt,
    backgroundColor: '#000',
    overflow: 'hidden',
    alignItems: 'center',
  },
  notch: {
    width: 90,
    height: 18,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: colors.surfaceAlt,
  },
  remoteScreen: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 24,
  },
  remoteScreenOff: {
    opacity: 0.5,
  },
  streamText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  streamHint: {
    color: colors.textFaint,
    fontSize: 11,
    textAlign: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  controlButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  controlButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  controlButtonDisabled: {
    opacity: 0.4,
  },
  controlLabel: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '600',
  },
  controlLabelActive: {
    color: '#0B0F1A',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  footerText: {
    color: colors.textFaint,
    fontSize: 11,
    textAlign: 'center',
  },
});
