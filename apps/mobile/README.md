# Rael Cloud Phone

App mobile (React Native + Expo) inspirado no conceito de "cloud phone" (ex: UgPhone): um
dispositivo Android real rodando em um data center e transmitido para o seu celular, sem
consumir memória, bateria ou espaço do aparelho local.

## Funcionalidades da UI

- **Dispositivos**: lista dos seus celulares em nuvem, com status (em execução, auto-play
  24/7, desligado), latência, uso de armazenamento e minutos restantes no ciclo.
- **Visualizador de dispositivo**: tela de streaming remoto com moldura de celular, controles
  de ligar/desligar, auto-play 24/7, volume e home.
- **Planos**: pacotes por hora (paga só pelo uso) e assinaturas mensal/anual, com banner de
  teste grátis para novos usuários.
- **Perfil**: resumo da conta, dispositivos, minutos disponíveis e acesso a suporte/feedback.

## Stack

- [Expo](https://expo.dev) + React Native + TypeScript
- [React Navigation](https://reactnavigation.org) (bottom tabs + native stack)

## Estrutura

```
src/
  components/   componentes reutilizáveis (cards, botões, badges)
  data/         dados mock (dispositivos, planos, regiões)
  navigation/   configuração de tabs e stack
  screens/      telas do app
  theme/        paleta de cores
  types/        tipos compartilhados
```

Os dados de dispositivos e planos são mockados em `src/data/mock.ts`. Para conectar a um
backend real de streaming (WebRTC/RTSP para o dispositivo Android virtual, API de billing,
autenticação etc.), substitua essa camada por chamadas de API mantendo os mesmos tipos em
`src/types`.

## Rodando o projeto

```bash
npm install
npm run start   # abre o Expo Dev Tools (escolha android/ios/web)
```
