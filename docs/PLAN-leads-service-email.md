# PLAN: Sistema de Captação de Leads com Envio de Email (/service)

> **Status:** Proposto  
> **Data:** 18/10/2026  
> **Autor:** `project-planner`  
> **Alvo:** `mindware-lp` (Next.js 16 App Router + Tailwind v4 + React 19)  
> **Destinatário dos Leads:** `jonataosacapia@gmail.com`  

---

## 1. Visão Geral e Objetivos

Implementar um fluxo robusto, seguro e de alta conversão para captação de leads na página de serviços (`/service`). O cliente preenche um formulário intuitivo e moderno com os dados do seu projeto e, imediatamente após a submissão, um email formatado com os dados do lead é enviado para `jonataosacapia@gmail.com` através do servidor SMTP da Hostinger (`geral@mindware.ao`).

---

## 2. Requisitos & Especificações Técnicas

### 2.1 Configuração SMTP (.env)
As variáveis de ambiente devem ser configuradas em `.env.local` (e documentadas no `.env.example` sem expor senhas):
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=geral@mindware.ao
SMTP_PASS="Mind.ao@123"
SMTP_FROM=no-reply@mindware.ao
LEAD_RECIPIENT_EMAIL=jonataosacapia@gmail.com
```

### 2.2 Dependências Necessárias
- `nodemailer`: Para envio transacional via SMTP.
- `@types/nodemailer`: Tipagem TypeScript para desenvolvimento.
*(Opcional: `zod` se não estiver no projeto, para validação estrita no backend).*

### 2.3 Campos do Formulário de Lead
1. **Nome Completo** (`name`): Obrigatório (min 3 caracteres).
2. **Email Corporativo / Pessoal** (`email`): Obrigatório (validação de formato de email).
3. **Telefone / WhatsApp** (`phone`): Obrigatório (formato com indicativo, ex: +244 ...).
4. **Nome da Empresa / Projeto** (`company`): Opcional.
5. **Tipo de Serviço de Interesse** (`serviceType`):
   - Presença Digital Completa (Website + Branding - 132.514,00 Kz)
   - Criação de Website Profissional
   - Branding & Identidade Visual
   - Outro / Consultoria
6. **Orçamento / Prazo Previsto** (`budget` ou `timeline`): Opcional / Select rápido.
7. **Mensagem / Descrição do Projeto** (`message`): Obrigatório (min 10 caracteres).
8. **Campo Honeypot Anti-Spam** (`website_hp`): Oculto visualmente via CSS, rejeita bots se preenchido.

---

## 3. Arquitetura da Solução

```
[ Visitante em /service ]
          │
          ▼
┌──────────────────────────────────────────────────────────┐
│  Componente Client: LeadCaptureForm                      │
│  - Validação inline e feedback de erro/sucesso           │
│  - Prevenção de double-submit / Estado de carregamento   │
│  - Honeypot invisível para barrar bots                   │
└─────────────────────────┬────────────────────────────────┘
                          │ POST /api/leads (JSON)
                          ▼
┌──────────────────────────────────────────────────────────┐
│  Next.js API Route: src/app/api/leads/route.ts           │
│  - Validação estrita do payload                          │
│  - Verificação de Honeypot anti-spam                     │
│  - Sanitização de inputs para prevenir email injection   │
│  - Nodemailer Transporter (Hostinger SMTP SSL 465)       │
└─────────────────────────┬────────────────────────────────┘
                          │
                          ├──────────► Email com dados do Lead ──► jonataosacapia@gmail.com
                          │
                          └──────────► (Opcional) Confirmação ───► Cliente
```

---

## 4. Estrutura de Ficheiros a Criar / Modificar

| Ficheiro | Ação | Responsabilidade |
|---|---|---|
| `docs/PLAN-leads-service-email.md` | Criado | Este documento de planeamento. |
| `.env.local` | Atualizar | Configuração segura das chaves SMTP. |
| `.env.example` | Criar/Atualizar | Template das variáveis necessárias sem segredos. |
| `src/lib/email.ts` | Criar | Configuração singleton do transportador Nodemailer + templates HTML dos emails. |
| `src/app/api/leads/route.ts` | Criar | Endpoint POST com validação, rate-limiting básico e envio do email. |
| `src/components/services/lead-capture-form.tsx` | Criar | Componente de formulário interativo de alta conversão (design alinhado à Mindware). |
| `src/components/services/lead-capture-section.tsx` | Criar | Secção visual integrada com ancoragem (`#orcamento` ou `#contacto`). |
| `src/components/services/index.ts` | Atualizar | Exportar as novas secções de lead. |
| `src/app/service/page.tsx` | Atualizar | Integrar a `LeadCaptureSection` na árvore de componentes e ajustar os CTAs de navegação. |

---

## 5. Divisão de Tarefas & Agentes Responsáveis

### Fase 1: Infraestrutura & Backend API (`backend-specialist`)
- [ ] **T1.1**: Instalar `nodemailer` e `@types/nodemailer`.
- [ ] **T1.2**: Adicionar credenciais no `.env.local` e documentar em `.env.example`.
- [ ] **T1.3**: Criar `src/lib/email.ts` com:
  - Criação do transporter Nodemailer reutilizável.
  - Template de email responsivo com identidade visual Mindware (Dark mode elegante, tabela de dados do lead, link de resposta direta via `mailto:` e WhatsApp).
- [ ] **T1.4**: Criar `src/app/api/leads/route.ts`:
  - Validação de dados (campos obrigatórios, formato de email e telefone).
  - Verificação do campo honeypot anti-spam.
  - Envio do email para `jonataosacapia@gmail.com`.
  - Retorno HTTP 200 `{ success: true }` ou erros estruturados 400/500.

### Fase 2: Interface & Componentes (`frontend-specialist`)
- [ ] **T2.1**: Desenvolver `LeadCaptureForm` em `src/components/services/lead-capture-form.tsx`:
  - Design premium seguindo os tokens da Mindware (estilo dark, bordas com destaque, micro-interações, feedback visual).
  - Inputs com foco acessível e mensagens de validação claras.
  - Estado de submissão: botão com spinner e texto "A enviar proposta...", feedback de sucesso garantido.
- [ ] **T2.2**: Criar `LeadCaptureSection` em `src/components/services/lead-capture-section.tsx`:
  - Headline persuasiva sobre orçamento rápido e resposta em menos de 24 horas.
  - Suporte à ancoragem via `id="orcamento"`.
- [ ] **T2.3**: Integrar a nova secção em `src/app/service/page.tsx`:
  - Inserir estrategicamente após a `PricingSection` ou integrada a ela.
  - Ajustar o botão CTA do header ("Pedir orçamento") para rolar suavemente até `#orcamento` em vez de ir direto ao WhatsApp, mantendo o WhatsApp como canal alternativo no próprio formulário.

### Fase 3: Validação, Segurança & Testes (`security-auditor` & `webapp-testing`)
- [ ] **T3.1**: Teste de conectividade SMTP com o servidor Hostinger (porta 465 SSL).
- [ ] **T3.2**: Teste de submissão de formulário completo e verificação da entrega no email `jonataosacapia@gmail.com`.
- [ ] **T3.3**: Teste de resiliência: validação de email inválido, campos vazios e bloqueio de honeypot para robôs.
- [ ] **T3.4**: Verificação no mobile e desktop (responsividade e fluidez).
- [ ] **T3.5**: Executar `npm run build` e linter para assegurar zero quebras de tipagem e compilação.

---

## 6. Template de Email a ser Gerado

O email enviado para `jonataosacapia@gmail.com` terá o seguinte layout:
- **Assunto:** `🚀 Novo Lead [Serviços]: {Nome do Cliente} - {Tipo de Serviço}`
- **Corpo:**
  - Header: Logótipo Mindware e tag visual "Novo Contacto / Orçamento".
  - Tabela formatada:
    - **Nome:** Nome do Lead
    - **Email:** Link direto de email
    - **Telefone / WhatsApp:** Link direto `https://wa.me/{numero}` para resposta em 1 clique
    - **Empresa:** Nome da empresa ou "Não especificado"
    - **Serviço Solicitado:** Website, Branding ou Pacote Completo
    - **Mensagem / Requisitos:** Texto completo do cliente
  - Footer com carimbo de data/hora e IP do remetente (para segurança).

---

## 7. Critérios de Conclusão (Definition of Done)
1. Submissão do formulário no `/service` executa sem recarregar a página e sem erros no console.
2. Email entregue na caixa de entrada de `jonataosacapia@gmail.com` em menos de 5 segundos.
3. Tratamento elegante de falhas de conexão SMTP sem expor credenciais ao cliente.
4. `.env.local` preservado e ignorado pelo `.gitignore`.
5. Build de produção do Next.js compila com sucesso (`next build`).
