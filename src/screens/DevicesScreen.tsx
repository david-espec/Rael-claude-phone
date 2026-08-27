import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DeviceCard } from '../components/DeviceCard';
import { mockDevices } from '../data/mock';
import { colors } from '../theme/colors';
import { CloudDevice } from '../types';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Devices'>;

export function DevicesScreen({ navigation }: Props) {
  const [devices] = useState<CloudDevice[]>(mockDevices);
  const running = devices.filter((d) => d.status !== 'stopped').length;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Meus Celulares na Nuvem</Text>
          <Text style={styles.subtitle}>
            {running} de {devices.length} dispositivos ativos
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Packages')}>
          <Ionicons name="add" size={22} color="#0B0F1A" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DeviceCard device={item} onPress={() => navigation.navigate('DeviceViewer', { deviceId: item.id })} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListFooterComponent={
          <TouchableOpacity style={styles.newDeviceCard} onPress={() => navigation.navigate('Packages')}>
            <Ionicons name="add-circle-outline" size={22} color={colors.primary} />
            <Text style={styles.newDeviceText}>Criar novo dispositivo em nuvem</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
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
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  newDeviceCard: {
    marginTop: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  newDeviceText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});
