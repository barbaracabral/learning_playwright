# Learning Playwright

Projeto de exemplo para aprender e executar testes com Playwright.

**Sumário**

- **Pré-requisitos**
- **Instalação**
- **Executar testes (headless)**
- **Executar em modo UI**
- **Gerar e visualizar relatórios**
- **Gerar traces e artefatos**
- **Estrutura do projeto**

## Pré-requisitos

- Node.js (versão LTS recomendada)
- npm ou yarn

## Instalação

1. Instale dependências:

```bash
npm install
```

2. Instale os navegadores do Playwright (caso ainda não estejam instalados):

```bash
npx playwright install
```

## Executar testes (modo headless)

Para executar todos os testes em modo headless (padrão):

```bash
npx playwright test
```

Para executar um arquivo de teste específico:

```bash
npx playwright test tests/e2e/example.spec.ts
```

Para executar em modo não-headless (headed) ou com navegador visível:

```bash
npx playwright test --headed
```

## Executar em modo UI

Playwright inclui um Test Runner UI interativo que permite inspecionar, executar e depurar testes:

```bash
npx playwright test --ui
```

Ao abrir, você verá uma interface com a lista de testes; clique em um teste para executá-lo e inspecionar passos, vídeos e traces quando disponíveis.

## Gerar e visualizar relatórios

Após rodar os testes, o Playwright gera um relatório HTML em `playwright-report/` (quando configurado ou usando o repórter HTML).

Gerar relatório HTML durante a execução:

```bash
npx playwright test --reporter=html
```

Abrir o relatório gerado no navegador (ou na interface do Playwright):

```bash
npx playwright show-report
```

Você também pode abrir manualmente o arquivo `playwright-report/index.html` no navegador.

## Gerar traces e artefatos

Ativar traces para um run específico (útil para depuração):

```bash
npx playwright test --trace on
```

Traces são salvos como arquivos que podem ser abertos com o visualizador de trace:

```bash
npx playwright show-trace <path-to-trace.zip-or-folder>
```

Vídeos, screenshots e outros artefatos são gerados automaticamente quando configurados no `playwright.config.ts` ou podem ser habilitados via marcações/fixtures nos testes.

## Estrutura do projeto

- `tests/` — testes organizados por tipo (api, e2e, ...)
- `src/` — arquivos de suporte, fixtures, páginas, helpers
- `playwright.config.ts` — configuração do Playwright
- `playwright-report/` — relatórios gerados (HTML, traces, snapshots)

## Dicas úteis

- Executar um subconjunto de testes com o `-g` (grep):

```bash
npx playwright test -g "has title"
```

- Para rodar com a mesma configuração do CI localmente, verifique `playwright.config.ts` e passe flags adicionais conforme necessário.

## Suporte

Se precisar de ajuda, abra uma issue ou me peça para adicionar instruções específicas ao README.

