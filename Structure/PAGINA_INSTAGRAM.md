# Estrutura e Integração da Página do Instagram (Blog/Social Feed)

**Origem do Conteúdo**: `instagram-clinica-autismo.html`
Esta página serve para exibir as últimas postagens da conta do Instagram da clínica diretamente no site, agindo como canal de comunicação social.

---

## 1. Otimização SEO (Metadados e Tags)

> [!IMPORTANT]
> A listagem abaixo foi **otimizada**: todas as referências a Piracicaba e Extrema foram removidas para garantir a conformidade com as novas diretrizes do site.

* **Título da Página (`<title>`)**:
  `Rede Araújo Junqueira | Clínica ABA especializada em Autismo | TEA | Psicologia | Fonoaudiologia | Terapia Ocupacional`
* **URL Canônica (`<link rel="canonical">`)**:
  `https://redearaujojunqueira.com.br/instragram-clinica-autismo.html`
* **Descrição Meta (`name="description"`)**:
  `Acompanhe as novidades e dicas da Rede Araújo Junqueira, clínica ABA especializada em Autismo (TEA). Veja os posts de nossa equipe multidisciplinar em Psicologia, Fonoaudiologia e Terapia Ocupacional.`
* **Palavras-chave (`name="keywords"`)**:
  `clínica TEA, clínica multidisciplinar, terapia ABA, psicologia infantil, fonoaudiologia, terapia ocupacional, ABA em Pouso Alegre, TEA em Mogi Guaçu, Autismo em Ouro Fino, rede social, instagram autismo`

---

## 2. Widget de Integração do Instagram (Elfsight)

Para carregar o feed do Instagram de forma dinâmica, a página carrega o script de plataforma da Elfsight e inicializa o componente em um contêiner específico:

### Script da plataforma:
```html
<script src="https://static.elfsight.com/platform/platform.js" async></script>
```

### Elemento de renderização:
```html
<div class="elfsight-app-2baa8e3b-f1c2-41f5-ab6c-71e0be792b70" data-elfsight-app-lazy></div>
```

---

## 3. Recomendações para React + Vite

1. **Abordagem com Componente**: Crie um componente React chamado `InstagramFeed` que carrega dinamicamente o script da Elfsight em seu ciclo de vida (`useEffect`) e renderiza a `div` correspondente.
2. **Integração na Home**: Alternativamente, este feed de Instagram pode ser incorporado como uma seção na própria Página Inicial (ex: acima do rodapé), eliminando a necessidade de uma página dedicada separada.
