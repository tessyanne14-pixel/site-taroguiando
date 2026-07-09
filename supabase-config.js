// ============================================================
// Configuração do Supabase — usada pelo questionário e pelo painel administrativo.
//
// A URL e a "anon key" abaixo são públicas por natureza (não são senhas).
// A segurança de verdade vem das políticas de RLS definidas em
// supabase/schema.sql, que garantem que só o login da terapeuta consegue
// ler ou apagar as respostas.
//
// Troque os dois valores abaixo pelos do seu projeto:
// Supabase > seu projeto > Project Settings > API
// ============================================================
window.SUPABASE_URL = 'https://vpdjytplrwufmcxpbumb.supabase.co';
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZGp5dHBscnd1Zm1jeHBidW1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MTMyNzQsImV4cCI6MjA5OTE4OTI3NH0.EaCxSU0ME4cJvBeb8ByPllGvH6DcV4YLtMOvf0ZqMoA';

window.supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
