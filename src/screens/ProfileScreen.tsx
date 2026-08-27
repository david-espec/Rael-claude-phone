import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { freeTrialDaysAvailable, mockDevices } from '../data/mock';
import { colors } from '../theme/colors';

const menuItems: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: 'card-outline', label: 'Assinatura e faturamento' },
  { icon: 'server-outline', label: 'Meus dispositivos em nuvem' },
  { icon: 'globe-outline', label: 'Preferência de região / data center' },
  { icon: 'shield-checkmark-outline', label: 'Segurança da conta' },
  { icon: 'chatbubble-ellipses-outline', label: 'Feedback e suporte' },
  { icon: 'information-circle-outline', label: 'Sobre o Rael Cloud Phone' },
];

export function ProfileScreen() {
  const totalDevices = mockDevices.length;
  const totalMinutes = mockDevices.reduce((sum, d) => sum + d.minutesRemaining, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color={colors.text} />
          </View>
          <View>
            <Text style={styles.name}>Conta Rael Cloud Phone</Text>
            <View style={styles.trialTag}>
              <Ionicons name="time-outline" size={12} color={colors.accent} />
              <Text style={styles.trialTagText}>{freeTrialDaysAvailable} dia de teste grátis disponível</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalDevices}</Text>
            <Text style={styles.statLabel}>Dispositivos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalMinutes}</Text>
            <Text style={styles.statLabel}>Minutos restantes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>30+</Text>
            <Text style={styles.statLabel}>Data centers</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuRow, index === menuItems.length - 1 && styles.menuRowLast]}
            >
              <Ionicons name={item.icon} size={20} color={colors.textMuted} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.footnote}>
          Seu feedback é a coisa mais importante para nós. Entre em contato pelo suporte para dúvidas ou problemas
          de uso.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  trialTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  trialTagText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },
  menu: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuRowLast: {
    borderBottomWidth: 0,
  },
  menuLabel: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
  },
  footnote: {
    color: colors.textFaint,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 20,
  },
});
