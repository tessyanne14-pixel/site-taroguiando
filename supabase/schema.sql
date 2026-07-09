-- ============================================================
-- Painel Taroguiando — schema do banco de dados
-- Onde rodar: Supabase > seu projeto > SQL Editor > New query
-- Cole este arquivo inteiro e clique em "Run".
-- ============================================================

create extension if not exists pgcrypto;

create table if not exists public.respostas_questionario (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null,
  email text,
  whatsapp text,
  data_nascimento date,
  cidade_estado text,
  relatorio_texto text,
  respostas jsonb not null default '{}'::jsonb
);

create index if not exists respostas_questionario_created_at_idx
  on public.respostas_questionario (created_at desc);

-- Row Level Security: protege os dados diretamente no banco,
-- independente de quem acessa (site público ou painel).
alter table public.respostas_questionario enable row level security;

-- Qualquer visitante do site pode ENVIAR um questionário preenchido,
-- mas não pode ler, alterar ou apagar respostas (nem as próprias, nem de outras pessoas).
create policy "clientes podem enviar o questionario"
  on public.respostas_questionario
  for insert
  to anon, authenticated
  with check (true);

-- Só quem faz login com o e-mail da terapeuta pode ler as fichas enviadas.
create policy "somente a terapeuta pode ler as fichas"
  on public.respostas_questionario
  for select
  to authenticated
  using (auth.jwt() ->> 'email' = 'taroguiando.contato@gmail.com');

-- Só quem faz login com o e-mail da terapeuta pode apagar uma ficha.
create policy "somente a terapeuta pode apagar fichas"
  on public.respostas_questionario
  for delete
  to authenticated
  using (auth.jwt() ->> 'email' = 'taroguiando.contato@gmail.com');
