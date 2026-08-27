# Rael Cloud Phone

"Tudo virtual, nas nuvens, dentro de um app." Um Android ou iPhone completo, rodando em um
data center e transmitido para o seu navegador ou celular — com bateria infinita, sempre
ligado, farmando Roblox por você mesmo enquanto você está offline.

🔗 **Site publicado:** https://david-espec.github.io/Rael-claude-phone/

Este repositório é um monorepo com duas aplicações:

```
apps/
  web/     Site Next.js — landing page, dashboard, criação de dispositivo,
           tela do celular na nuvem, painel administrativo, botão de download/instalação
  mobile/  App Expo (React Native) — cliente mobile com a mesma proposta
```

## apps/web

Plataforma principal, especificada em detalhe no documento de requisitos do produto:

- **Landing page** com o conceito ("Seu smartphone completo rodando na nuvem") e um botão
  **Baixar app** que abre um modal explicando o que vai acontecer (Confirmar/Cancelar). Ao
  confirmar, o app é instalado como PWA de verdade quando o navegador suporta (prompt nativo
  `beforeinstallprompt`) ou, caso contrário, mostra uma animação simulando o ícone sendo
  adicionado à tela inicial do dispositivo.
- **Dashboard** ("Meus dispositivos"): cabeçalho com conta, notificações, configurações e
  botão de criar dispositivo; grade de dispositivos com status (🟢 Online, 🟡 Inicializando,
  🔵 Manutenção, 🔴 Offline, ⚫ Encerrado), filtros e resumo.
- **Criar dispositivo**: wizard em 3 passos — sistema (Android/iOS), modelo/configuração
  (Galaxy S26 Ultra ou iPhone 17 Pro Max, 512 GB/12 GB ou 1 TB/16 GB) e confirmação.
- **Tela do dispositivo**: moldura de celular com apps (Roblox já instalado), gestos
  (Home/Voltar/Apps no Android, Control Center/Notificações no iOS), Wi-Fi, bateria infinita
  (∞ sempre carregando), informações de hardware/uso/rede/sessão e ações (abrir, reiniciar,
  desligar, renomear, duplicar, encerrar).
- **Farm 24/7**: o recurso central — ativa o auto-play em qualquer dispositivo (um clique
  para farmar Roblox, ou digite outro jogo) e acompanha "farmando há Xd Xh" ao vivo na tela
  do dispositivo, no card do dashboard e num filtro dedicado.
- **Painel administrativo** (`/admin`): visão geral da infraestrutura (dispositivos por
  plataforma, uso de CPU/RAM/Storage da nuvem).

O app roda inteiramente no navegador — dispositivos ficam salvos no `localStorage` (via
`lib/deviceStore.tsx`), sem backend. Isso é o que permite publicar como site 100% estático no
GitHub Pages (workflow `.github/workflows/pages.yml`, redeploy automático a cada push em
`main`). A emulação real de Android/iOS (streaming WebRTC, containers, GPU) não roda neste
ambiente de demonstração — é o próximo passo para produção, descrito no documento de
arquitetura.

### Rodando

```bash
cd apps/web
npm install
npm run dev
```

## apps/mobile

Cliente Expo (React Native + TypeScript) com dashboard de dispositivos, visualizador de
streaming simulado, planos (por hora / assinatura) e perfil. Veja `apps/mobile/README.md`.

```bash
cd apps/mobile
npm install
npm run start
```
