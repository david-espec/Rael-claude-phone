import { DeviceModel } from './types';

export const deviceCatalog: DeviceModel[] = [
  {
    id: 'galaxy-s26-ultra',
    platform: 'android',
    brand: 'Samsung',
    name: 'Galaxy S26 Ultra',
    osVersion: 'Android 16',
    hardware: 'Snapdragon 8 Elite Gen 5 for Galaxy',
    configs: [
      { id: 'a', storageGb: 512, ramGb: 12 },
      { id: 'b', storageGb: 1024, ramGb: 16 },
    ],
  },
  {
    id: 'iphone-17-pro-max',
    platform: 'ios',
    brand: 'Apple',
    name: 'iPhone 17 Pro Max',
    osVersion: 'iOS 26',
    hardware: 'Perfil de capacidade virtualizado',
    configs: [
      { id: 'a', storageGb: 512, ramGb: 12 },
      { id: 'b', storageGb: 1024, ramGb: 16 },
    ],
  },
];

export const androidApps = [
  { id: 'roblox', name: 'Roblox', icon: '🎮' },
  { id: 'play-store', name: 'Play Store', icon: '🛒' },
  { id: 'browser', name: 'Navegador', icon: '🌐' },
  { id: 'camera', name: 'Câmera', icon: '📷' },
  { id: 'settings', name: 'Configurações', icon: '⚙️' },
  { id: 'files', name: 'Arquivos', icon: '📁' },
  { id: 'gallery', name: 'Galeria', icon: '🖼️' },
  { id: 'clock', name: 'Relógio', icon: '⏰' },
  { id: 'calculator', name: 'Calculadora', icon: '🧮' },
  { id: 'phone', name: 'Telefone', icon: '📞' },
  { id: 'messages', name: 'Mensagens', icon: '💬' },
];

export const iosApps = [
  { id: 'roblox', name: 'Roblox', icon: '🎮' },
  { id: 'app-store', name: 'App Store', icon: '🛍️' },
  { id: 'safari', name: 'Safari', icon: '🧭' },
  { id: 'camera', name: 'Câmera', icon: '📷' },
  { id: 'settings', name: 'Ajustes', icon: '⚙️' },
  { id: 'files', name: 'Arquivos', icon: '📁' },
  { id: 'photos', name: 'Fotos', icon: '🖼️' },
  { id: 'clock', name: 'Relógio', icon: '⏰' },
  { id: 'calculator', name: 'Calculadora', icon: '🧮' },
  { id: 'phone', name: 'Telefone', icon: '📞' },
  { id: 'messages', name: 'Mensagens', icon: '💬' },
];
