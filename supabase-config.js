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
window.SUPABASE_URL = 'https://SEU-PROJETO.supabase.co';
window.SUPABASE_ANON_KEY = 'SUA-CHAVE-ANON-AQUI';

window.supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
