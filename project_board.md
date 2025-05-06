# 📌 WishLink – GitHub Issues e Milestones

Este arquivo contém a estrutura inicial de **milestones** e **issues** para organização do projeto WishLink no GitHub, com base nas funcionalidades implementadas, nas estratégias de monetização e no roadmap detalhado.

---

## 🧭 Milestones

### ✅ MVP Estável (Fase 1)
- Finalizar sistema de autenticação multi-provedor
- CRUD completo de listas e itens
- Compartilhamento de listas públicas/privadas
- Responsividade mobile e desktop
- Sistema de priorização e categorização
- Contexto de internacionalização (i18n)
- Deploy funcional na Vercel

### 🚀 Monetização e Expansão (Fase 2)
- Sistema de reserva de itens
- Integração com e-commerce para preenchimento automático de produtos
- Início da monetização via afiliados (Amazon, Etsy)
- Notificações push e sistema de alertas
- Templates de eventos pagos (casamento, aniversário...)
- Analytics básico (acesso, cliques, interesse)
- Lançamento do plano Premium com recursos avançados

### 📱 Mobile e Performance (Fase 3)
- Desenvolvimento de PWA com suporte offline
- Início do desenvolvimento do app mobile (Flutter ou React Native)
- Migração para tRPC
- Implementação de testes unitários e E2E (Vitest, Playwright)
- Importação/exportação de listas (.csv, .json)
- Otimizações de carregamento e acessibilidade

### 💼 Escala Comercial (Fase 4)
- Marketplace para pequenas lojas (produtos patrocinados)
- Sistema para listas corporativas e eventos empresariais
- Integração com gift cards (Visa, Amazon, etc.)
- Plano Pro com relatórios e análises avançadas
- Criação de dashboard para empresas gerirem campanhas e listas

---

## 📋 Issues por Categoria

### 🔐 Autenticação e Acesso
- [ ] Implementar autenticação com Google, Facebook, Apple
- [ ] Configurar autenticação por email com magic link
- [ ] Middleware de proteção para rotas privadas
- [ ] Tela de login estilizada com Tailwind

### 📦 CRUD de Listas e Itens
- [ ] Componente de criação de lista
- [ ] Formulário de item com validação por Zod
- [ ] Edição e exclusão de listas e itens
- [ ] Visualização em grade e lista

### 🔗 Compartilhamento e Público
- [ ] Alternância entre lista pública e privada
- [ ] Geração de link compartilhável
- [ ] Personalização de URL da lista (recurso Premium)

### 🎨 Design e UI/UX
- [ ] Criação de tema dinâmico baseado em Tailwind
- [ ] Componentes reutilizáveis (buttons, cards, modals)
- [ ] Responsividade completa mobile e desktop
- [ ] Adição de animações suaves e feedbacks visuais

### 📈 Funcionalidades Avançadas
- [ ] Sistema de reserva de item (marcar como comprado)
- [ ] Integração com APIs de e-commerce
- [ ] Envio de notificações push (via Vercel/OneSignal)
- [ ] Sistema de analytics básico (visualizações e cliques)
- [ ] Templates premium por evento (pagos)
- [ ] Gift cards como presente alternativo

### 🧪 Qualidade e Performance
- [ ] Migração para tRPC (API tipada)
- [ ] Testes unitários com Vitest
- [ ] Testes E2E com Playwright
- [ ] Implementar código dividido (lazy loading)
- [ ] Acessibilidade e SEO

### 📲 App e Integrações Futuras
- [ ] Implementar PWA com suporte offline
- [ ] Início do app mobile (Flutter)
- [ ] Importação/exportação de listas
- [ ] API pública para parceiros (futuro)
- [ ] Sistema de afiliados com tracking automatizado