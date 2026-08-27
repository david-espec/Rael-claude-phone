import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { freeTrialDaysAvailable, mockPlans } from '../data/mock';
import { colors } from '../theme/colors';
import { BillingCycle } from '../types';

const cycleTabs: { id: BillingCycle; label: string }[] = [
  { id: 'hourly', label: 'Por Hora' },
  { id: 'monthly', label: 'Mensal' },
  { id: 'yearly', label: 'Anual' },
];

export function PackagesScreen() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const plans = useMemo(() => mockPlans.filter((p) => p.cycle === cycle), [cycle]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Planos e Pacotes</Text>
        <Text style={styles.subtitle}>Escolha como usar seu celular na nuvem</Text>

        <View style={styles.trialBanner}>
          <Ionicons name="gift-outline" size={22} color={colors.accent} />
          <View style={{ flex: 1 }}>
            <Text style={styles.trialTitle}>Experimente grátis</Text>
            <Text style={styles.trialText}>
              Novos usuários ganham pelo menos {freeTrialDaysAvailable} dia grátis para testar o Cloud Phone.
            </Text>
          </View>
        </View>

        <View style={styles.tabs}>
          {cycleTabs.map((tab) => {
            const active = tab.id === cycle;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => setCycle(tab.id)}
              >
                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {plans.map((plan) => (
          <View key={plan.id} style={[styles.planCard, plan.popular && styles.planCardPopular]}>
            {plan.popular && (
              <View style={styles.popularTag}>
                <Text style={styles.popularTagText}>MAIS POPULAR</Text>
              </View>
            )}
            <Text style={styles.planTitle}>{plan.title}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{plan.price}</Text>
              <Text style={styles.priceSuffix}>{plan.priceSuffix}</Text>
            </View>
            {plan.highlight && <Text style={styles.highlight}>{plan.highlight}</Text>}

            <View style={styles.featureList}>
              {plan.features.map((feature) => (
                <View key={feature} style={styles.featureRow}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.accent} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <PrimaryButton
              label={plan.cycle === 'hourly' ? 'Ativar pacote por hora' : 'Assinar agora'}
              variant={plan.popular ? 'primary' : 'ghost'}
              style={{ marginTop: 16 }}
            />
          </View>
        ))}

        <Text style={styles.footnote}>
          Sem contrato de fidelidade em pacotes por hora. Você não é cobrado enquanto o dispositivo estiver
          desligado.
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
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
    marginBottom: 16,
  },
  trialBanner: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: `${colors.accent}18`,
    borderWidth: 1,
    borderColor: `${colors.accent}44`,
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    alignItems: 'center',
  },
  trialTitle: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 14,
  },
  trialText: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabLabel: {
    color: colors.textMuted,
    fontWeight: '600',
    fontSize: 13,
  },
  tabLabelActive: {
    color: '#0B0F1A',
  },
  planCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 16,
  },
  planCardPopular: {
    borderColor: colors.primary,
  },
  popularTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 10,
  },
  popularTagText: {
    color: '#0B0F1A',
    fontSize: 10,
    fontWeight: '800',
  },
  planTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    marginTop: 8,
  },
  price: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  priceSuffix: {
    color: colors.textMuted,
    fontSize: 13,
    marginBottom: 4,
  },
  highlight: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  featureList: {
    marginTop: 14,
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    color: colors.textMuted,
    fontSize: 13,
    flex: 1,
  },
  footnote: {
    color: colors.textFaint,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
  },
});
