# Rael Cloud Phone — Especificação do produto

> Documento de requisitos original ("emulando cel.docx") que guiou a implementação em
> `apps/web` e `apps/mobile`. Mantido aqui como referência para evolução futura do produto.

**Conceito:** Tudo virtual, nas nuvens, dentro de um app. Um sistema operacional Android ou
iOS rodando em infraestrutura remota, transmitindo sua interface para o usuário — não apenas
uma imagem estática de um celular.

## 1. Objetivo

Criar um aplicativo web/cloud que permita ao usuário: criar dispositivos móveis na nuvem;
escolher Android ou iOS; escolher o modelo; iniciar o dispositivo; visualizar a tela completa
do celular; tocar, arrastar, digitar; abrir aplicativos; navegar na internet; instalar
aplicativos; usar Wi-Fi virtual; manter arquivos e configurações; deixar o dispositivo
funcionando continuamente; acessar vários dispositivos simultaneamente; gerenciar cada um
individualmente.

Nome conceitual: **Cloud Mobile** / **CloudPhone** / **Rael Cloud Phone** — "Seu smartphone
completo rodando na nuvem."

## 2. Dashboard

Cabeçalho: logo, nome do usuário, status da conta, notificações, configurações, botão
"Criar dispositivo". Área principal: lista de dispositivos (sistema, modelo, status).

Status possíveis: 🟢 Online · 🟡 Inicializando · 🔵 Em manutenção · 🔴 Offline · ⚫ Encerrado
pelo usuário.

## 3–5. Criar dispositivo

Botão **+ Criar dispositivo** abre o configurador: escolher sistema (Android ou iOS).

- **Android** — Samsung Galaxy S26 Ultra, Android 16. Configurações: 512 GB / 12 GB RAM ou
  1 TB / 16 GB RAM. Ambiente inicial: interface padrão, Wi-Fi, Bluetooth virtual, navegador,
  câmera e microfone virtuais, armazenamento, notificações, Play Store (quando
  licenciamento permitir), apps padrão.
- **iOS** — Apple iPhone 17 Pro Max, iOS 26. Perfis de capacidade (512 GB ou 1 TB); a RAM é
  abstraída pela camada de virtualização, não tratada como spec oficial configurável.

## 6–7. Tela e interação com o dispositivo

Moldura de celular na interface web com barra inferior (Home / Voltar / Apps / Config no
Android). Interação: toque, pressionar, arrastar, deslizar, pinça para ampliar/reduzir;
teclado virtual ao focar um campo (ou teclado físico do computador). Gestos Android (Home,
Voltar, Recentes, swipe, pull-down de notificações) e iOS (Home gesture, Control Center,
Notification Center, multitarefa).

## 8–10. Arquitetura de nuvem

```
USUÁRIO → CLOUD APP (Autenticação, Dashboard, Gerenciador de dispositivos, Streaming)
   → DEVICE GATEWAY → ANDROID CLOUD / iOS CLOUD → DEVICE VM / DEVICE-HOST
```

Android: emuladores em containers/VMs de nuvem, transmitidos por WebRTC (ex.: Android
Emulator container images do Google). Cada dispositivo é uma instância independente com
CPU/RAM/storage/Wi-Fi/GPU virtuais próprios. **Isolamento obrigatório**: nenhum dispositivo
pode enxergar o armazenamento, rede, identidade ou processos de outro.

## 11. Wi-Fi

Todos os dispositivos iniciam com Wi-Fi ativado, conectados à "CloudNetwork". Avaliar se o
usuário poderá alterar SSID, senha, proxy, DNS, IP, VPN.

## 12–13. Aplicativos

Android: Play Store, navegador, câmera, configurações, arquivos, galeria, relógio,
calculadora, telefone, mensagens. iOS: diferenciar **iOS Simulator Cloud** (voltado a
desenvolvimento/testes, não reproduz hardware real) de **iPhone físico remoto** (Mac Host +
iPhone físico conectado, controlado remotamente) para uma experiência realmente próxima do
aparelho real.

## 14–16. Disponibilidade 24/7 e persistência

- **Watchdog**: monitora CPU, RAM, rede, sistema e stream de cada dispositivo; se travar,
  reinicia automaticamente, reconecta e restaura a sessão.
- **Persistência**: fechar o navegador não desliga o dispositivo — apps continuam abertos,
  dados continuam salvos, o usuário reconecta ao mesmo dispositivo depois.
- **Bateria infinita**: o dispositivo permanece sempre "ligado no carregador" — nunca
  descarrega, 24h por dia.
- **Encerramento**: só acontece quando o usuário clica em "Encerrar dispositivo" e confirma
  (modal com Cancelar/Encerrar).

## 17–19. Gerenciamento de dispositivos

Aba "Dispositivos": resumo (total, online, inicializando, offline) e filtros (Todos /
Android / iOS / Online / Offline / Em inicialização). Ações por dispositivo: Abrir,
Reiniciar, Desligar, Configurações, Renomear, Duplicar, Excluir, Informações (sistema,
hardware, RAM, armazenamento, uso de CPU/RAM/storage, rede, tempo online).

## 20–21. Identidade e dados

Cada dispositivo tem um `Device ID` único (`CLOUD-AND-000001`, `CLOUD-IOS-000001`, ...).
Modelo de dados: `User { id, name, email, createdAt }`, `Device { id, userId, name,
platform, model, osVersion, ram, storage, status, createdAt, lastConnectedAt, uptime }`.

## 22. Streaming

Vídeo via **WebRTC** (baixa latência), não screenshots: `DEVICE → VIDEO ENCODER → WEBRTC →
BROWSER`. Comandos voltam pelo data channel: `BROWSER → TOUCH/KEYBOARD → WEBRTC → DEVICE`.

## 23–25. Admin, alta disponibilidade e escalabilidade

Painel administrativo com visão de infraestrutura (total de devices, split Android/iOS,
online/offline, uso de CPU/RAM/storage da nuvem). Para 24/7 real: múltiplos servidores,
redundância, backup, monitoramento, recuperação automática, balanceamento de carga,
failover. Arquitetura deve escalar de 10 a 100.000 dispositivos sem reconstrução.

## 26. Sobre "gratuito e ilimitado"

Requisito de produto: o usuário não paga e não há limite de tempo imposto pela aplicação.
Ressalva de viabilidade: cloud computing 24/7, storage, CPU/GPU, tráfego e dispositivos
físicos (para iPhone real) têm custo real — um projeto em produção exige estratégia de
infraestrutura, financiamento ou monetização.

## 27. Requisitos funcionais

| ID | Requisito |
|----|-----------|
| RF-001 | Criação de dispositivo (SO, modelo, configuração) |
| RF-002 | Execução contínua até encerramento explícito do usuário |
| RF-003 | Persistência de estado, apps, arquivos e configurações |
| RF-004 | Acesso remoto à interface gráfica do dispositivo |
| RF-005 | Isolamento total entre dispositivos |
| RF-006 | Gerenciamento individual (abrir, reiniciar, configurar, encerrar) |
| RF-007 | Monitoramento contínuo do estado dos dispositivos |
| RF-008 | Recuperação automática em caso de falha |
| RF-009 | Múltiplos dispositivos simultâneos e independentes |
| RF-010 | Streaming de baixa latência para o navegador |

## 28. Regras de negócio

RN-001 Device ID único · RN-002 Um dispositivo pertence a um usuário/conta · RN-003 Sem
acesso cruzado a dados de outro dispositivo · RN-004 Fechar o navegador não encerra o
dispositivo · RN-005 Encerramento só por ação do usuário ou política de infraestrutura ·
RN-006 Estado persistente salvo · RN-007 Falhas entram em recuperação automática · RN-008
Usuário sempre identifica o estado atual do dispositivo · RN-009 Arquiteturas de execução
compatíveis por plataforma · RN-010 Nunca apresentar um dispositivo como imagem estática —
precisa ser um ambiente computacional interativo.

## 29. Arquitetura tecnológica recomendada

- **Frontend**: Next.js + React + TypeScript (dashboard, criação, gerenciamento, tela do
  dispositivo, WebRTC, autenticação, configurações) — implementado em `apps/web`.
- **Backend**: NestJS (API, autenticação, gerenciamento de dispositivos, sessões, WebSocket,
  comunicação com a infraestrutura). Na demonstração atual, essas responsabilidades vivem
  como API Routes do Next.js sobre um store em memória (`apps/web/lib/store.ts`); migrar
  para um serviço NestJS dedicado + PostgreSQL é o próximo passo natural.
- **Banco**: PostgreSQL · **Cache**: Redis · **Comunicação**: WebSocket · **Streaming**:
  WebRTC · **Containers**: Docker · **Orquestração**: Kubernetes.
- **Android**: Android Emulator / infraestrutura de virtualização.
- **iOS**: Simulator para desenvolvimento/testes; dispositivos físicos remotos quando a
  exigência for experiência real de iPhone.

## Estado atual da implementação

`apps/web` implementa a experiência completa de produto (dashboard, criação, tela do
dispositivo, admin, instalação/PWA) com **dados e streaming simulados** — sem emuladores
Android/iOS reais, sem Kubernetes/WebRTC de verdade e sem PostgreSQL. `apps/mobile` oferece o
mesmo conceito como cliente Expo/React Native. Ambos servem como base de produto e UX prontas
para receber a infraestrutura real descrita nas seções 8–10, 22 e 29 acima.
