# Auditoria do Projeto e Configurações de Rotas (Rede Araújo Junqueira)

Este documento descreve a estrutura do projeto original, as regras de roteamento definidas no `.htaccess`, os componentes compartilhados (Header/Footer) e as configurações de formulário. Esta auditoria serve como guia para a migração do site para Vite + React.

---

## 1. Visão Geral das Páginas (HTML)

As páginas do projeto original no site antigo e seus respectivos propósitos são:

| Nome do Arquivo HTML | Função / Conteúdo no Site Novo (Vite + React) | Status / Ação |
| :--- | :--- | :--- |
| `index.html` | Página inicial original / Modelo inicial. | **Manter/Migrar**: Consolidar seu conteúdo com a página principal (`clinica-ABA-especializada-em-TEA.html`). |
| `clinica-ABA-especializada-em-TEA.html` | Página principal de conversão e apresentação da clínica (Home). Contém a história, especialidades, serviços, FAQ, contato e fundadores. | **Manter/Migrar**: Será a rota raiz (`/` ou `/clinica-ABA-especializada-em-TEA`). |
| `clinica-autismo-SP-MG.html` | Página de Unidades. Apresenta as instalações, mapa e informações de contato específicas para cada clínica física. | **Manter/Migrar**: Será a rota de unidades (`/unidades` ou `/clinica-autismo-SP-MG`). *Observação: Excluir a unidade de Piracicaba.* |
| `instagram-clinica-autismo.html` | Página com o feed de Instagram integrado via widget (Elfsight). | **Manter/Migrar**: Rota de blog/social (`/instagram` ou integrado como seção na Home). |
| `avaliacao-neuropsicologica-mogi-guacu-piracicaba-pouso-alegre.html` | Página específica de Avaliação Neuropsicológica. | **IGNORAR**: Excluir permanentemente por solicitação do usuário. |
| `starter-page.html` | Boilerplate padrão do template Bootstrap. | **IGNORAR**: Arquivo temporário/descartável. |

---

## 2. Roteamento e Redirecionamento (`.htaccess`)

O arquivo `.htaccess` na raiz do projeto antigo contém as seguintes regras de reescrita do servidor Apache:

```apache
RewriteEngine On

# 1. Redireciona a raiz para a página personalizada
RewriteRule ^$ /clinica-ABA-especializada-em-TEA.html [L]

# 2. Permite acessar a URL amigável (sem a extensão .html no final)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}\.html -f
RewriteRule ^(.*)$ $1.html [L]

# 3. Define a página inicial padrão do diretório
DirectoryIndex clinica-ABA-especializada-em-TEA.html
```

### Recomendações para Vite + React:
1. **React Router**: Configure o roteador para que a rota padrão `/` renderize o componente da página inicial (`clinica-ABA-especializada-em-TEA`).
2. **Redirecionamentos de SEO / URLs Amigáveis**: Garanta que as seguintes rotas sejam mapeadas:
   - `/` -> Renderiza Home (`clinica-ABA-especializada-em-TEA`)
   - `/clinica-ABA-especializada-em-TEA` -> Renderiza Home
   - `/clinica-autismo-SP-MG` ou `/unidades` -> Renderiza Unidades (`clinica-autismo-SP-MG`)
   - `/instagram-clinica-autismo` -> Renderiza Instagram Feed

---

## 3. Elementos Globais Compartilhados

### 3.1. Barra de Contato Superior (Topbar)
* **E-mail**: `contato@redearaujojunqueira.com.br`
* **WhatsApp**: `35 99170-7061` (Link: `https://api.whatsapp.com/send/?phone=5535991707061&text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20saber%20mais%20sobre%20a%20cl%C3%ADnica%20e%20as%20terapias.&app_absent=0`)
* **Redes Sociais**:
  - Facebook: `https://www.facebook.com/InterclinicaAraujoJunqueira/?locale=pt_BR`
  - Instagram: `https://www.instagram.com/interclinicaaraujojunqueira/`
  - LinkedIn: `https://br.linkedin.com/company/rede-de-cl%C3%ADnicas-ara%C3%BAjo-junqueira`

### 3.2. Menu de Navegação (Header)
* **Logo**: `assets/img/logo.png`
* **Links**:
  1. **Página Inicial** (Âncora `#hero` na Home)
  2. **Nossa História** (Âncora `#about` na Home)
  3. **Serviços** (Âncora `#services` na Home)
  4. **Especialidades** (Âncora `#departments` na Home)
  5. **Fundadores** (Âncora `#doctors` na Home)
  6. **Dropdown Unidades**:
     - Matriz (`/clinica-autismo-SP-MG.html#unidade-01`)
     - Pouso Alegre - MG (`/clinica-autismo-SP-MG.html#unidade-02`)
     - Ouro Fino - MG (`/clinica-autismo-SP-MG.html#unidade-03`)
     - Mogi Guaçu - SP (`/clinica-autismo-SP-MG.html#unidade-05`)
     - *Nota: Unidade IV Piracicaba foi removida.*
  7. **Contato** (Botão CTA que rola para `#contact` ou `/clinica-ABA-especializada-em-TEA.html#contact`)

### 3.3. Rodapé (Footer)
* **Texto de Copyright**: `© 2025 Rede Clínica Araújo Junqueira - Todos os Direitos Reservados`
* **Slogan**: `Siga-nos nas redes sociais para ficar por dentro de novidades e dicas sobre saúde e bem-estar!`
* **Links Rápidos / Úteis**: Página Inicial, Nossa História, Serviços, Contato.
* **Unidades**: Matriz, Pouso Alegre - MG, Ouro Fino - MG, Mogi Guaçu - SP.
* **Categorias**: Infantil, TEA, Adulto.

---

## 4. Integração do Formulário de Contato (`forms/contact.php`)

O formulário de contato original utiliza um script PHP com a biblioteca PHPMailer via servidor SMTP da Hostinger. Para a migração React, o desenvolvedor precisará criar um endpoint equivalente (ou usar uma API Serverless/Email Service) com as seguintes credenciais e configurações de envio de dados:

* **Método de Envio**: POST
* **Campos do Formulário**:
  - `name` (Nome do remetente)
  - `email` (E-mail do remetente)
  - `subject` (Assunto da mensagem)
  - `message` (Corpo da mensagem)
* **Credenciais SMTP da Hospedagem (Hostinger)**:
  - **Host**: `smtp.hostinger.com`
  - **Porta**: `465` (SSL)
  - **Segurança**: `SMTPSecure = PHPMailer::ENCRYPTION_SMTPS`
  - **Usuário SMTP**: `contato@redearaujojunqueira.com.br`
  - **Senha**: `IAJ@10Digital`
  - **Destinatário do E-mail**: `contato@redearaujojunqueira.com.br`
