# Rael Cloud Phone — web

Next.js app (App Router + TypeScript + Tailwind). See the [repo root README](../../README.md)
for the full product overview.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Dados

O app roda **inteiramente no navegador**: os dispositivos ficam em `localStorage` (via
`lib/deviceStore.tsx`), sem backend. Isso é o que permite publicar como site estático no
GitHub Pages — veja abaixo.

## Deploy no GitHub Pages

O workflow `.github/workflows/pages.yml` publica automaticamente a cada push em `main`:
roda `next build` com `output: "export"` (gera `apps/web/out/`) e sobe pro GitHub Pages. Na
primeira execução ele mesmo ativa o Pages no repositório (`enablement: true`).

Para testar o export estático localmente com o mesmo `basePath` do GitHub Pages:

```bash
NEXT_PUBLIC_BASE_PATH=/Rael-claude-phone npm run build
npm run start   # serve a pasta out/ com `serve`
```
