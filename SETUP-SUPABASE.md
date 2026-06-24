# Painel de conteúdo (Supabase) — guia de configuração

O site puxa o conteúdo do **Supabase** (banco + storage, plano gratuito). Enquanto o
Supabase não estiver configurado, o site usa o conteúdo de fallback embutido — ou seja,
**nada quebra** até você ligar o CMS.

Com o Supabase ligado, o dono entra em **`seusite.com/admin`**, faz login e edita: troca
**fotos** dos produtos, sobe/atualiza **PDFs de catálogo** e edita **textos** (nome,
tagline, descrição, categorias, ordem). Ao salvar, o site atualiza **na hora** (sem deploy).

---

## Passo a passo (uma vez só)

### 1. Criar o projeto no Supabase (grátis)
1. Acesse https://supabase.com e crie a conta (login com GitHub funciona).
2. **New project** → escolha um nome e uma senha de banco. Região: escolha a mais próxima.
3. Em **Settings → API**, anote:
   - **Project URL** (ex: `https://xxxx.supabase.co`)
   - **anon public** key (chave pública)
   - **service_role** key (chave secreta — usada só na migração local)

### 2. Criar as tabelas e buckets
No menu **SQL Editor**, cole todo o conteúdo de [`supabase/schema.sql`](supabase/schema.sql)
e clique em **Run**. Isso cria as tabelas `brands` e `products`, as regras de segurança
(leitura pública, escrita só logado) e os buckets `images` e `catalogs`.

### 3. Criar o usuário do dono (login do painel)
Em **Authentication → Users → Add user**, crie o e-mail e a senha que o dono vai usar.
(Em **Authentication → Providers**, deixe o provedor **Email** habilitado e, para simplificar,
pode desativar "Confirm email".)

### 4. Subir o conteúdo atual (migração)
Na raiz do projeto, rode (PowerShell):
```powershell
$env:SUPABASE_URL="https://xxxx.supabase.co"; $env:SUPABASE_SERVICE_KEY="SUA_SERVICE_ROLE_KEY"; node scripts/seed-supabase.mjs
```
Isso sobe todas as marcas, produtos, fotos e PDFs atuais. Pode rodar de novo sem duplicar.

> A **service_role key** só é usada aqui, localmente. **Nunca** coloque ela no site/`.env` do front.

### 5. Ligar o site no Supabase
1. Copie `.env.example` para `.env` e preencha:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=SUA_ANON_KEY
   ```
2. No **Render**, adicione essas duas variáveis em *Environment* e faça um *Manual Deploy*
   (as variáveis `VITE_` entram no site no momento do build).

Pronto! O site passa a ler do Supabase, e o painel fica em `seusite.com/admin`.

---

## Como o dono usa no dia a dia
- Acessa **`seusite.com/admin`** e faz login.
- **Trocar foto de um produto:** clica em "Foto", escolhe a imagem nova, clica em **Salvar**.
- **Atualizar um catálogo:** abre a marca, "Trocar PDF" no catálogo principal, **Salvar marca**.
- **Reordenar produtos:** use as setas ↑ ↓ (os 4 primeiros aparecem em destaque no card).
- **Editar textos / cor / ordem das marcas:** edita os campos e clica em **Salvar**.

As mudanças aparecem no site em segundos, sem precisar de deploy.

## Importante
- Plano **gratuito** do Supabase é suficiente para este porte (sem custo mensal).
- Projeto grátis **pausa após ~7 dias sem nenhuma atividade**; com visitas normais ao site
  (que leem o banco), ele se mantém ativo.
- O conteúdo de fallback em `app/components/data.tsx` continua como rede de segurança:
  se o Supabase ficar fora do ar, o site mostra o conteúdo embutido.
