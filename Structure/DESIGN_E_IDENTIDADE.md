# Diretrizes de Design e Identidade Visual

Este documento detalha o sistema de design (Design System) da **Rede Araújo Junqueira**, incluindo paleta de cores, tipografia, tratamento de logotipo e regras de aplicação visual encontradas nos estilos CSS (`assets/css/main.css`). Este guia é essencial para que o agente de IA reconstrua o site de forma idêntica em Vite e React.

---

## 1. Tipografia (Fontes)

O projeto utiliza três famílias tipográficas importadas via Google Fonts, cada uma dedicada a um escopo específico da interface:

* **Fonte Principal (Textos e Parágrafos)**: `Roboto`
  * **Variável CSS**: `var(--default-font)`
  * **Estilos Importados**: Peso 100 a 900 (Regular, Medium, Bold).
  * **Uso**: Corpo do site (`body`), parágrafos, textos descritivos e FAQs.
* **Fonte de Títulos (Headings)**: `Montserrat`
  * **Variável CSS**: `var(--heading-font)`
  * **Uso**: Todos os elementos de cabeçalho (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`) e títulos de seções.
* **Fonte do Menu de Navegação**: `Raleway`
  * **Variável CSS**: `var(--nav-font)`
  * **Uso**: Links do menu de navegação superior (`#header` e `#navmenu`).

---

## 2. Paleta de Cores

As cores da marca estão divididas em dois esquemas principais (Azul e Rosa), gerando um contraste lúdico e profissional característico de clínicas infantis e especializadas em neurodesenvolvimento.

### 2.1. Cores Globais (Configuradas no `:root`)

| Variável CSS | Valor Hexadecimal | Nome Comercial/Visual | Aplicação Principal |
| :--- | :--- | :--- | :--- |
| `--heading-color` | `#0071bd` | Azul Clínico Principal | Títulos normais de seções, cabeçalhos principais. |
| `--accent-color` | `#00adf6` | Azul Celeste Accent | Links, botões de ação (CTAs), ícones ativos e hover primário. |
| `--alt-heading-color` | `#d86098` | Rosa Escuro / Magenta | Títulos secundários (classe `.alt-color`), como na seção de Serviços e Unidades. |
| `--alt-accent-color` | `#f787bb` | Rosa Chiclete Accent | Fundo de itens de serviço, ícones secundários e hover de cards. |
| `--default-color` | `#444444` | Cinza Escuro | Cor de parágrafos e textos gerais sobre fundo claro. |
| `--lighter-default-color`| `#949494` | Cinza Médio | Textos secundários ou desabilitados. |
| `--background-color` | `#ffffff` | Branco Puro | Cor de fundo padrão da página. |
| `--surface-color` | `#ffffff` | Branco Superfície | Fundo de elementos flutuantes (cards, boxes). |
| `--contrast-color` | `#ffffff` | Branco Contraste | Texto sobre fundos coloridos (Azul/Rosa). |

### 2.2. Cores da Navegação (Menu)

* **Cor de Link Normal (`--nav-color`)**: `#2c4964` (Azul Marinho)
* **Cor de Link Ativo/Hover (`--nav-hover-color`)**: `#1977cc` (Azul Médio)
* **Fundo de Dropdown (`--nav-dropdown-background-color`)**: `#ffffff` (Branco)
* **Texto de Dropdown (`--nav-dropdown-color`)**: `#2c4964` (Azul Marinho)
* **Hover de Dropdown (`--nav-dropdown-hover-color`)**: `#1977cc` (Azul Médio)

---

## 3. Presets e Variações de Fundo

O site trabalha com alternância de seções usando classes utilitárias para quebrar a monotonia visual:

* **Fundo Claro Neutro (`.light-background`)**:
  * Define o fundo para um azul muito sutil `#f1f7fc`.
  * Mantém o `--surface-color` em `#ffffff` para destacar os cards internos.
* **Fundo Degradê (`.gradient-background`)**:
  * Utiliza uma transição suave: `linear-gradient(90deg, var(--accent-color), var(--alt-accent-color), var(--accent-color))`.
  * Cria o contraste degradê de Azul Celeste -> Rosa Claro -> Azul Celeste.
* **Fundo Escuro (`.dark-background`)**:
  * Fundo `#060606`, textos em `#ffffff` e superfícies em `#252525`.

---

## 4. Logotipo e Identidade

* **Marca Nominativa**: "Rede Clínica Araújo Junqueira" ou "Rede Araújo Junqueira".
* **Imagens do Logo**:
  - `assets/img/logo.png`: Logotipo horizontal colorido principal da marca (combina Azul e Rosa).
  - `assets/img/icons/InterclinicaLOGO.svg`: Versão vetorial colorida simplificada da logo.
  - `assets/img/icons/InterclinicaLOGO_BW.svg`: Versão vetorial monocromática (preta) utilizada na caixa "Quem Somos" do Hero.

---

## 5. Elementos de UI e Micro-animações Importantes

### 5.1. Botão de Play Pulsante (`.pulsating-play-btn`)
Usado no card da seção "Nossa História" sobre o banner de vídeo:
* **Background**: Radial gradient com `var(--accent-color)`.
* **Animação**: Loop de pulsação CSS (`pulsate-play-btn`) expandindo uma borda transparente de 5px.

### 5.2. Botão Flutuante do WhatsApp (`#whatsapp-scroll-btn`)
Um botão circular fixo no canto inferior direito para contato rápido:
* **Fundo**: Cor verde característica do WhatsApp (definida via inline ou custom class no site).
* **Posicionamento**: Fixo (`position: fixed; bottom: 15px; right: 15px; z-index: 99999;`).
* **Estilo**: Borda arredondada, ícone centralizado, e sombra para efeito de elevação tridimensional.

### 5.3. Interações com Cards de Serviços
Os cards mudam de cor no estado `:hover` de forma suave (`transition: 0.3s`):
* **Card Comum**:
  - Fundo normal: `--surface-color` (Branco).
  - Fundo em hover: `--alt-accent-color` (Rosa Claro).
  - O ícone central inverte o fundo para branco e o ícone passa a ser rosa.
* **Card Alternativo 1 (`.alt-color-01`)**:
  - Fundo em hover: `--accent-color` (Azul Celeste).
  - O ícone central inverte o fundo para branco e o ícone passa a ser azul.
