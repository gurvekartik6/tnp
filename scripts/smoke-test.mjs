import { spawn } from 'node:child_process';
import { rm } from 'node:fs/promises';

const port = 8199;
const password = 'A-very-strong-test-password-123';
const server = spawn(process.execPath, ['server/index.mjs'], {
  env: { ...process.env, PORT: String(port), DEAN_EMAIL: 'smoke@test.local', DEAN_PASSWORD: password, ALLOWED_ORIGINS: 'http://localhost:5173', NODE_ENV: 'development' },
  stdio: 'ignore'
});
const base = `http://localhost:${port}/api`;
const wait = ms => new Promise(r => setTimeout(r, ms));
const cookieFrom = response => response.headers.get('set-cookie')?.split(';')[0] || '';
try {
  let ready = false;
  for (let i = 0; i < 50; i++) { try { if ((await fetch(`${base}/health`)).ok) { ready = true; break; } } catch {} await wait(100); }
  if (!ready) throw new Error('Health check timed out');
  const health = await fetch(`${base}/health`);
  if (!health.ok) throw new Error('Health check failed');
  const pub = await (await fetch(`${base}/public/content`)).json();
  if ('passwordHash' in pub || !Array.isArray(pub.recruiters) || pub.drives.length !== 0) throw new Error('Public content boundary failed');
  const unauth = await fetch(`${base}/admin/content`);
  if (unauth.status !== 401) throw new Error(`Unauthenticated admin request returned ${unauth.status}`);
  const login = await fetch(`${base}/auth/login`, { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({email:'smoke@test.local', password}) });
  const auth = await login.json();
  if (!login.ok || !auth.csrfToken) throw new Error('Login failed');
  const cookie = cookieFrom(login);
  const badCsrf = await fetch(`${base}/admin/content`, { method:'PATCH', headers:{'content-type':'application/json','cookie':cookie}, body:JSON.stringify({bannerImage:'https://example.com/a.png'}) });
  if (badCsrf.status !== 401) throw new Error(`CSRF rejection failed: ${badCsrf.status}`);
  const badUrl = await fetch(`${base}/admin/content`, { method:'PATCH', headers:{'content-type':'application/json','cookie':cookie,'X-CSRF-Token':auth.csrfToken}, body:JSON.stringify({bannerImage:'javascript:alert(1)'}) });
  if (badUrl.status !== 400) throw new Error(`URL validation failed: ${badUrl.status}`);
  const logout = await fetch(`${base}/auth/logout`, { method:'POST', headers:{'cookie':cookie,'X-CSRF-Token':auth.csrfToken} });
  if (!logout.ok) throw new Error('Logout failed');
  console.log('T&P backend smoke test: PASS');
} finally {
  server.kill('SIGTERM');
  await wait(100);
  await rm('server/data/admin.json', {force:true});
  await rm('server/data/audit.json', {force:true});
  await rm('server/data/content.json.bak', {force:true});
}
