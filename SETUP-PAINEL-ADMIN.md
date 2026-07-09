# Painel administrativo — como configurar (uma vez só)

Isso troca o envio por e-mail (FormSubmit/Formspree) do questionário HYL por
um banco de dados próprio + um painel privado em `/admin`. O visual e o
preenchimento do questionário **não mudaram em nada** — só o destino das
respostas.

Tempo estimado: 15 minutos.

## 1. Criar o projeto no Supabase

1. Acesse https://supabase.com e crie uma conta gratuita (dá para usar o
   mesmo e-mail `taroguiando.contato@gmail.com`).
2. Clique em **New project**. Escolha um nome (ex: `taroguiando`), uma senha
   de banco (guarde-a, mas ela não será usada no dia a dia) e a região mais
   próxima (ex: South America / São Paulo, se disponível).
3. Aguarde alguns minutos até o projeto ficar pronto.

## 2. Criar a tabela no banco

1. No menu lateral do Supabase, abra **SQL Editor** → **New query**.
2. Abra o arquivo [`supabase/schema.sql`](supabase/schema.sql) deste
   repositório, copie todo o conteúdo e cole no editor.
3. Clique em **Run**. Isso cria a tabela `respostas_questionario` e as regras
   de segurança (só o e-mail da terapeuta consegue ler ou apagar respostas;
   qualquer visitante do site só consegue *enviar*, nunca ler).

## 3. Criar seu login (o único acesso ao painel)

1. No menu lateral, abra **Authentication** → **Providers** → **Email** e
   **desative** a opção "Allow new users to sign up" (assim ninguém mais
   consegue criar conta).
2. Ainda em Authentication, vá em **Users** → **Add user** → **Create new
   user**.
3. Preencha com o e-mail `taroguiando.contato@gmail.com` e defina uma senha
   forte. Marque a opção para já confirmar o e-mail automaticamente.
4. Guarde essa senha — é o login do painel em `/admin`.

## 4. Conectar o site ao Supabase

1. No Supabase, abra **Project Settings** → **API**.
2. Copie os valores de **Project URL** e **anon public key**.
3. Abra o arquivo [`supabase-config.js`](supabase-config.js) (na raiz do
   projeto) e substitua:
   ```js
   window.SUPABASE_URL = 'https://SEU-PROJETO.supabase.co';
   window.SUPABASE_ANON_KEY = 'SUA-CHAVE-ANON-AQUI';
   ```
   pelos valores copiados.

   Essa chave é pública por natureza (é a mesma usada pelo navegador de
   qualquer visitante) — a segurança real está nas regras criadas no passo 2.

## 5. Publicar

Faça commit e envie as alterações (git push) como de costume para o Vercel.
Como o site é estático, não é necessário nenhum passo extra de build.

## Como usar no dia a dia

- Questionário da cliente: continua em `/questionario-hyl` — nada muda para
  quem preenche.
- Painel: acesse `/admin/login.html`, entre com o e-mail e senha criados no
  passo 3.
- Na tela inicial você vê todas as clientes, pode buscar por nome, ordenar
  por data e excluir uma ficha.
- Clique em uma cliente para abrir a ficha completa, organizada nas mesmas
  seções do questionário, com botão para imprimir ou salvar como PDF
  (usa o "Imprimir" do navegador — escolha "Salvar como PDF" no destino).

## Se um dia quiser evoluir

O banco guarda as respostas de duas formas: campos organizados por seção
(`respostas`, em JSON) e o texto corrido pronto (`relatorio_texto`), então dá
para adicionar novas telas, filtros ou exportações no futuro sem precisar
recomeçar do zero.
