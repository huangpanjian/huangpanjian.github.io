const root = document.documentElement;
const languageButton = document.getElementById('language-toggle');
const navLinks = [...document.querySelectorAll('.header nav a')];
const panelIds = new Set(['home', 'publications', 'research', 'honors']);

function setLanguage(language) {
  root.dataset.lang = language;
  root.lang = language === 'zh' ? 'zh-CN' : 'en';
  languageButton.textContent = language === 'zh' ? 'EN' : '中文';
  languageButton.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
  document.title = language === 'zh' ? '黄攀坚 · 福耀科技大学' : 'Panjian Huang · Fuyao University of Science and Technology';
  try { localStorage.setItem('cui-style-lang', language); } catch (_) {}
}

function currentPanelId() {
  const hash = decodeURIComponent(location.hash.slice(1));
  if (hash === 'news') return 'home';
  return panelIds.has(hash) ? hash : 'home';
}

function showPanel() {
  const current = currentPanelId();
  for (const id of panelIds) {
    document.getElementById(id).hidden = id !== current;
  }
  for (const link of navLinks) {
    const active = link.hash === `#${current}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}

languageButton.addEventListener('click', () => setLanguage(root.dataset.lang === 'zh' ? 'en' : 'zh'));
window.addEventListener('hashchange', showPanel);
window.addEventListener('load', () => requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' })));
for (const link of navLinks) {
  link.addEventListener('click', () => {
    if (link.hash === location.hash || (link.hash === '#home' && !location.hash)) showPanel();
  });
}
try { setLanguage(localStorage.getItem('cui-style-lang') || 'en'); } catch (_) { setLanguage('en'); }
document.getElementById('year').textContent = new Date().getFullYear();
showPanel();
