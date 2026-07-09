// ============================================================
// Proteção de acesso do painel administrativo.
// Verifica se há uma sessão válida do Supabase Auth e se o e-mail
// logado é o da terapeuta. Caso contrário, manda para a tela de login.
// A proteção "de verdade" dos dados é feita pelas políticas de RLS
// no banco (supabase/schema.sql) — isto aqui é só a experiência de tela.
// ============================================================
window.ADMIN_EMAIL = 'taroguiando.contato@gmail.com';

async function exigirLogin() {
  var { data } = await window.supabaseClient.auth.getSession();
  var session = data && data.session;
  if (!session || !session.user || session.user.email !== window.ADMIN_EMAIL) {
    window.location.href = '/admin/login.html';
    return null;
  }
  return session;
}

async function sair() {
  await window.supabaseClient.auth.signOut();
  window.location.href = 'login.html';
}
