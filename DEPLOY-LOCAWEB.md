# Publicar o site na Locaweb (saindo do Render)

O site é **estático** (vira arquivos em `dist/` após o build) e fala direto com o
Supabase. Então é só **gerar o build e subir os arquivos** na hospedagem da Locaweb.
O Supabase continua igual — nada muda no painel `/admin` nem nos dados.

> Pré-requisito: ter um **plano de Hospedagem de Sites** na Locaweb (Apache/Linux).
> Só o registro do domínio não basta — precisa do espaço de hospedagem.

## 1. Gerar o build (no seu PC)
Na raiz do projeto:
```
npm run build
```
Isso cria a pasta **`dist/`** com tudo pronto (a chave do Supabase já fica embutida,
lida do seu `.env` na hora do build).

## 2. Enviar os arquivos pra Locaweb
No **Painel Locaweb → Hospedagem → Gerenciador de Arquivos** (ou por FTP, ex: FileZilla):
1. Entre na pasta pública do site (geralmente **`public_html`** ou **`www`**).
2. Envie **todo o conteúdo de dentro da pasta `dist/`** (não a pasta em si):
   - `index.html`
   - a pasta `assets/`
   - a pasta `catalogs/`
   - o arquivo **`.htaccess`** ⚠️ (arquivo oculto)
3. ⚠️ **Importante:** ative "mostrar arquivos ocultos" pra não esquecer o `.htaccess`
   (no FileZilla: menu *Servidor → Forçar exibição de arquivos ocultos*). Sem ele,
   o `/admin` e o recarregar de páginas dão erro 404.

## 3. Ativar HTTPS (cadeado)
No painel da Locaweb, ative o **certificado SSL** (Let's Encrypt) do domínio.
Costuma ser gratuito e automático.

## 4. Testar
- Abra `https://seudominio.com.br/` → site deve carregar.
- Abra `https://seudominio.com.br/admin` → tela de login deve aparecer (se der 404,
  o `.htaccess` não subiu ou o módulo rewrite está desativado — fale com o suporte Locaweb).

## 5. Desligar o Render
Depois de confirmar que está tudo certo na Locaweb, pode **excluir/suspender** o serviço
no Render e remover o domínio de lá (se tiver sido adicionado).

---

## Como fica o dia a dia
- **Editar conteúdo** (fotos, textos, produtos, PDFs pelo `/admin`): **instantâneo**,
  não precisa subir nada — é o Supabase.
- **Mudança no código** (algo que um dev altere no projeto): precisa **rodar `npm run build`
  de novo e re-enviar a pasta `dist/`** pra Locaweb. (Diferente do Render, a Locaweb não
  reconstrói sozinha a partir do GitHub.)

## Observações
- A config do Supabase já vai embutida no build — **não precisa** configurar variáveis na Locaweb.
- O arquivo `_redirects` (do Render) pode ficar lá, é ignorado pela Locaweb — quem manda é o `.htaccess`.
- O catálogo da DURA RACE é um PDF grande (~81 MB) em `catalogs/` — o upload dele é mais demorado, mas é necessário pro botão de catálogo dessa marca.
