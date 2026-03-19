# Thiago Poltronieri | Personal Website

Site pessoal estatico, bilingue e acessivel, com foco em marca pessoal, posicionamento profissional, conteudo institucional e download de curriculo em PDF.

## Visao geral

Este projeto foi refatorado para deixar de ser apenas uma lista de links e se tornar uma landing page profissional mais solida, moderna e escalavel. A nova versao continua sendo somente front-end, sem framework e sem build, mas agora possui:

- experiencia bilingue em `pt-BR` e `en`
- conteudo estruturado para marca pessoal, SEO e clareza de proposta de valor
- layout premium com glassmorphism sutil e responsividade real
- cuidados de acessibilidade alinhados com boas praticas de WCAG 2.2
- curriculos ATS-friendly em HTML e PDF, em portugues e ingles

## Principais entregas

- Refatoracao completa do `index.html`
- Reescrita total da camada visual em `styles/main.css`
- Centralizacao do conteudo bilingue em `scripts/content.js`
- Renderizacao dinamica e sincronizada entre idiomas em `scripts/main.js`
- Criacao de curriculos em:
  - `resume/thiago-poltronieri-cv-pt-br.html`
  - `resume/thiago-poltronieri-cv-en.html`
- Geracao dos PDFs:
  - `documents/Thiago-Poltronieri-CV-pt-BR.pdf`
  - `documents/Thiago-Poltronieri-CV-en.pdf`

## Estrutura do projeto

```text
.
├── components/
│   └── img/
├── documents/
│   ├── Thiago-Poltronieri-CV-en.pdf
│   └── Thiago-Poltronieri-CV-pt-BR.pdf
├── resume/
│   ├── resume.css
│   ├── thiago-poltronieri-cv-en.html
│   └── thiago-poltronieri-cv-pt-br.html
├── scripts/
│   ├── content.js
│   └── main.js
├── styles/
│   └── main.css
├── index.html
└── README.md
```

## Arquitetura

### Pagina principal

`index.html` contem a estrutura semantica base da landing page:

- cabecalho fixo com seletor de idioma
- hero com posicionamento e CTA de curriculo
- secoes de sobre, expertises, diferenciais, experiencia, iniciativas e links

### Conteudo bilingue

O conteudo esta centralizado em `scripts/content.js`.

Cada idioma possui:

- metadados da pagina
- textos de interface
- hero
- secoes do site
- links
- mapeamento do PDF e da pagina do curriculo correspondente

Isso evita duplicacao de markup e reduz o risco de inconsistencias entre `pt-BR` e `en`.

### Renderizacao

`scripts/main.js`:

- detecta idioma via query string ou `localStorage`
- atualiza textos, links e atributos acessiveis
- sincroniza o botao de download do curriculo com o idioma atual

## Design e UX

O site foi redesenhado com uma direcao visual mais sofisticada, sem perder legibilidade:

- tipografia com `Nunito`
- fundo em gradientes profundos
- cards com efeito de vidro e blur controlado
- contraste reforcado para leitura
- hierarquia visual mais clara
- layout adaptado para desktop, tablet e mobile

## Acessibilidade

Melhorias aplicadas:

- `lang` dinamico conforme idioma selecionado
- `skip link` para o conteudo principal
- `focus-visible` reforcado
- navegacao por teclado
- botoes de idioma com `aria-pressed`
- atualizacao de atributos acessiveis quando o idioma muda
- respeito a `prefers-reduced-motion`

## Curriculo e ATS

Os curriculos foram criados separadamente do site visual para maximizar compatibilidade com RH e parsers automatizados.

Decisoes adotadas:

- layout em coluna unica
- sem foto
- hierarquia simples de titulos
- secoes objetivas
- texto extraivel em PDF
- sem tabelas complexas ou componentes visuais que atrapalhem leitura automatica

Arquivos de origem:

- `resume/thiago-poltronieri-cv-pt-br.html`
- `resume/thiago-poltronieri-cv-en.html`

Arquivos finais:

- `documents/Thiago-Poltronieri-CV-pt-BR.pdf`
- `documents/Thiago-Poltronieri-CV-en.pdf`

## Como executar

Como o projeto e estatico, basta abrir `index.html` no navegador.

Se preferir servir por HTTP local:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Como editar o conteudo

### Atualizar textos do site

Edite `scripts/content.js`.

Esse arquivo concentra:

- textos em `pt-BR`
- textos em `en`
- secoes da pagina
- links externos
- labels dos botoes e CTAs

### Alterar layout e estilos

Edite:

- `styles/main.css` para o site principal
- `resume/resume.css` para os curriculos

### Atualizar curriculo

Edite os arquivos:

- `resume/thiago-poltronieri-cv-pt-br.html`
- `resume/thiago-poltronieri-cv-en.html`

## Como regenerar os PDFs

Os PDFs foram gerados com Chrome headless.

### Portugues

```bash
google-chrome --headless --no-sandbox --disable-gpu \
  --print-to-pdf="$(pwd)/documents/Thiago-Poltronieri-CV-pt-BR.pdf" \
  "file://$(pwd)/resume/thiago-poltronieri-cv-pt-br.html"
```

### Ingles

```bash
google-chrome --headless --no-sandbox --disable-gpu \
  --print-to-pdf="$(pwd)/documents/Thiago-Poltronieri-CV-en.pdf" \
  "file://$(pwd)/resume/thiago-poltronieri-cv-en.html"
```

## Observacoes importantes

- Alguns dados de contato mais sensiveis, como email e telefone, nao foram inventados. Se quiser incluir esses campos no site e no curriculo, basta adicionar os dados reais.
- O projeto continua propositalmente simples em stack para facilitar manutencao, deploy estatico e longevidade.
- O conteudo foi reorganizado e reescrito para melhorar clareza de posicionamento, leitura executiva e consistencia entre marca pessoal, portfolio e curriculo.

## Proximos passos recomendados

- adicionar metadados Open Graph e Twitter Cards
- criar favicon e imagens sociais especificas para compartilhamento
- reduzir peso das imagens com WebP ou AVIF
- adicionar uma pagina de contato ou CTA de agendamento
- versionar historico profissional e curriculo a partir de um unico arquivo-fonte no futuro

## Licenca

Consulte `LICENSE`.
