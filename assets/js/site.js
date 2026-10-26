/* Rendert alle Seiten aus den YAML-Dateien in /content.
   Normalerweise musst du hier nichts ändern – Texte & Projekte stehen in /content. */
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const txt = s => esc(String(s == null ? '' : s).trim()).replace(/\\n|\n/g, '<br>');
const pair = a => Array.isArray(a) ? [a[0], a.slice(1).join(', ')] : [a.title || a.label, a.text || a.url];
const purl = slug => 'p/' + encodeURIComponent(slug) + '/';
const here = h => (/impressum|privacy|notfound/.test(document.body.dataset.page) && h === '#contact') ? 'index.html#contact' : location.pathname + h;
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const sup = n => String(n).split('').map(d => SUP[+d] || d).join('');
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Sprache (EN / DE) ----------
   Deutsche Texte liegen in content/de/ (gleiche Dateinamen wie in content/).
   Fehlt dort eine Datei, wird automatisch die englische genommen. */
const LANGS = ['en', 'de'];
let LANG = (() => {
  const q = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(q)) { try { localStorage.setItem('lang', q); } catch (e) {} return q; }
  try { const s = localStorage.getItem('lang'); if (LANGS.includes(s)) return s; } catch (e) {}
  return 'en';
})();
const UI = {
  de: {
    'Work': 'Arbeiten', 'About': 'Über mich', 'Contact': 'Kontakt', 'Main navigation': 'Hauptnavigation', 'Switch language': 'Sprache wechseln',
    'Copy e-mail': 'E-Mail kopieren', 'Copied': 'Kopiert', 'Write an e-mail': 'E-Mail schreiben', 'Back to top': 'Nach oben',
    'See work': 'Arbeiten ansehen', 'About me': 'Über mich', 'More about me': 'Mehr über mich', 'Selected work': 'Ausgewählte Arbeiten',
    'Research interests': 'Forschungsinteressen', 'Research question': 'Forschungsfrage', 'View project': 'Projekt ansehen',
    'Portrait of': 'Porträt von', 'Project not found.': 'Projekt nicht gefunden.', 'All projects': 'Alle Projekte',
    'Play project video': 'Projektvideo abspielen', 'Play video': 'Video abspielen', 'Loads from YouTube after the click.': 'Lädt erst nach dem Klick von YouTube.',
    'Watch on YouTube': 'Auf YouTube ansehen', 'Project video': 'Projektvideo', 'Next project': 'Nächstes Projekt', 'Thesis by': 'Thesis von',
    'CV as PDF': 'Lebenslauf als PDF', 'Download PDF': 'PDF herunterladen', 'Print': 'Drucken', 'CV': 'Lebenslauf',
    'Education': 'Ausbildung', 'Experience': 'Erfahrung', 'Skills': 'Fähigkeiten', 'Workshops & more': 'Workshops & mehr',
    'Languages': 'Sprachen', 'Looking for': 'Ich suche', 'Profile': 'Profil', 'Email': 'E-Mail',
    'This page fell asleep.': 'Diese Seite ist eingeschlafen.',
    'The link is wrong, or the page is somewhere in REM sleep. Better not wake it.': 'Der Link ist falsch, oder die Seite steckt irgendwo im REM-Schlaf. Besser nicht wecken.',
    'Back to work': 'Zurück zu den Arbeiten', 'Content could not be loaded:': 'Inhalte konnten nicht geladen werden:', 'Check the YAML files in /content.': 'Bitte die YAML-Dateien in /content prüfen.'
  }
};
const t = k => (UI[LANG] && UI[LANG][k]) || k;

async function loadRaw(path) {
  const r = await fetch(path, { cache: 'no-cache' });
  if (!r.ok) throw new Error(path + ' (' + r.status + ')');
  return jsyaml.load(await r.text());
}
async function load(path) {
  if (LANG !== 'en' && path.startsWith('content/') && !/legal\.yml$|projects\.yml$/.test(path)) {
    try { return await loadRaw(path.replace('content/', 'content/' + LANG + '/')); }
    catch (e) { /* keine Übersetzung vorhanden → englische Datei */ }
  }
  return loadRaw(path);
}
async function loadAll() {
  const [site, about, list] = await Promise.all([load('content/site.yml'), load('content/about.yml'), load('content/projects.yml')]);
  const slugs = (list || []).filter(Boolean).map(String);
  const projects = (await Promise.all(slugs.map(slug => load('content/projects/' + slug + '.yml')
    .then(p => Object.assign(p || {}, { slug }))
    .catch(e => { console.warn('Projekt fehlt oder hat einen Fehler:', slug, e); return null; })))).filter(Boolean);
  return { site, about, projects };
}

/* ---------- gemeinsame Teile ---------- */
function nav(site, active) {
  const l = (h, label, k) => `<a href="${h}"${active === k ? ' aria-current="page"' : ''}>${label}</a>`;
  return `<header class="nav"><div class="nav-in glass" data-glass="nav">
    <a class="brand" href="index.html">${esc(site.name)}</a>
    <nav aria-label="${t('Main navigation')}">${l('index.html#work', t('Work'), 'work')}${l('about.html', t('About'), 'about')}${l(here('#contact'), t('Contact'), 'contact')}</nav>
    <div class="lang" role="group" aria-label="${t('Switch language')}">${LANGS.map(c => `<button type="button" data-lang="${c}" aria-pressed="${c === LANG}" lang="${c}">${c.toUpperCase()}</button>`).join('')}</div>
  </div></header>`;
}
const socials = site => (site.social || []).map(pair).filter(([, u]) => u);
function contact(site) {
  return `<section class="wrap contact-wrap" id="contact"><div class="contact glass">
    <h2>${esc(String(site.contact_title || '').replace(/\s*→\s*$/, ''))}</h2>
    <p>${txt(site.contact_text)}</p>
    <div class="btns">
      <button class="btn" type="button" data-copy="${esc(site.email)}"><span>${esc(site.email)}</span><span class="btn-note" data-note>${t('Copy e-mail')}</span></button>
      <a class="btn ghost" href="mailto:${esc(site.email)}">${t('Write an e-mail')}</a>
      ${socials(site).map(([n, u]) => `<a class="btn ghost" href="${esc(u)}" target="_blank" rel="noopener">${esc(n)} ↗</a>`).join('')}
    </div>
  </div></section>`;
}
function footer(site) {
  return `<footer class="wrap footer">
    <div class="f-name">${esc(site.name)}<span>${txt(site.footer_line)}</span></div>
    <ul><li><a href="index.html#work">${t('Work')}</a></li><li><a href="about.html">${t('About')}</a></li><li><a href="${here('#contact')}">${t('Contact')}</a></li></ul>
    <ul><li><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>${socials(site).map(([n, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)} ↗</a></li>`).join('')}</ul>
    <div class="f-bottom"><span>© ${new Date().getFullYear()} ${esc(site.name)}</span><span><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a><a href="${here('#top')}">${t('Back to top')} ↑</a></span></div>
  </footer>`;
}
function interests(about) {
  const icons = [6, 4, 8];
  return `<div class="interests">${(about.interests || []).map((it, k) => `<div class="interest"><img src="assets/img/blobs/blob-${icons[k % 3]}.png" alt="" loading="lazy"><h3>${esc(it.title)}</h3><p>${txt(it.text)}</p></div>`).join('')}</div>`;
}
const tileOf = p => p.tile || p.cover;
const rqOf = p => p.question || ((p.sections || []).find(s => s.type === 'question') || {}).text || '';
const kindYear = p => [p.kind, p.year].filter(Boolean).map(esc).join(', ');

function prow(p, eager) {
  const rq = rqOf(p);
  return `<a class="prow" href="${purl(p.slug)}">
    <figure class="pimg reveal" style="--tile-bg:${esc(p.tile_bg || '#dde1e5')}"><img src="${esc(tileOf(p))}" alt="${esc(p.title)}" loading="${eager ? 'eager' : 'lazy'}" style="view-transition-name:tile-${esc(p.slug)}"></figure>
    <div class="ptext">
      <p class="meta">${kindYear(p)}</p>
      <h3>${esc(p.title)}</h3>
      <p class="prq">${txt(rq || p.line)}</p>
      <span class="more-link">${t('View project')}</span>
    </div>
  </a>`;
}

/* ---------- Seiten ---------- */
function home({ site, about, projects }) {
  const tz = site.about_teaser || {};
  return nav(site, 'work') + `<main id="top">
  <section class="wrap hero">
    ${site.greeting ? `<p class="greet">${esc(site.greeting)}</p>` : ''}
    <h1 class="hero-title">${txt(site.hero)}</h1>
    <div class="orb glass" data-glass="orb" aria-hidden="true"></div>
    <div class="hero-foot">
      <div class="hero-panel glass">
        ${(site.chips || []).length ? `<p class="focus">${site.chips.map(esc).join(', ')}</p>` : ''}
        <p>${txt(site.intro)}</p>
        <div class="btns"><a class="btn" href="#work">${t('See work')} ↓</a><a class="btn ghost" href="about.html">${t('About me')}</a></div>
      </div>
    </div>
  </section>
  <section class="wrap work" id="work">
    <h2 class="sec-h">${t('Selected work')}<sup>${sup(projects.length)}</sup></h2>
    <div class="plist">${projects.map((p, i) => prow(p, i === 0)).join('')}</div>
  </section>
  <section class="wrap about-teaser">
    <figure class="reveal"><img src="${esc(about.portrait)}" alt="${t('Portrait of')} ${esc(site.name)}" loading="lazy"></figure>
    <div>
      <h2 class="sec-h">${t('About')}</h2>
      <p class="lead">${txt(tz.text)}</p>
      <dl class="rows">${(tz.rows || []).map(pair).map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${txt(b)}</dd></div>`).join('')}</dl>
      <a class="btn ghost" href="about.html">${t('More about me')}</a>
    </div>
  </section>
  <section class="wrap block"><h2 class="sec-h">${t('Research interests')}</h2>${interests(about)}</section>
  ${contact(site)}</main>${footer(site)}`;
}

function sectionHTML(s) {
  const fig = (src, cap, size) => `<figure class="fig reveal${size === 'half' ? ' half' : ''}"><img src="${esc(src)}" alt="${esc(cap || '')}" loading="lazy">${cap ? `<figcaption>${esc(cap)}</figcaption>` : ''}</figure>`;
  if (s.type === 'phases') {
    return `<section class="chapter phases-sec">
      <div class="ch-head"><h2>${esc(s.heading)}</h2>${s.text ? `<p>${txt(s.text)}</p>` : ''}</div>
      <ol class="phases">${(s.items || []).map(it => `<li class="phase">
        <figure class="reveal">${it.image ? `<img src="${esc(it.image)}" alt="${esc(it.title)}" loading="lazy">` : ''}
          <figcaption class="glass" data-glass="chip"><span>${esc(it.label)}</span><span>${esc(it.meta)}</span></figcaption></figure>
        <h3>${esc(it.title)}</h3><p>${txt(it.text)}</p></li>`).join('')}</ol></section>`;
  }
  let body = s.text ? `<p>${txt(s.text)}</p>` : '';
  if (s.chips) body += `<ul class="tags">${s.chips.map(c => `<li>${esc(c)}</li>`).join('')}</ul>`;
  if (s.gallery) body += `<div class="gallery">${s.gallery.map(pair).map(([src, cap]) => `<figure class="fig reveal"><img src="${esc(src)}" alt="${esc(cap)}" loading="lazy">${cap ? `<figcaption>${esc(cap)}</figcaption>` : ''}</figure>`).join('')}</div>`;
  if (s.image) body += fig(s.image, s.caption, s.size);
  if (s.cards) body += `<dl class="points">${s.cards.map(pair).map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${txt(b)}</dd></div>`).join('')}</dl>`;
  return `<section class="chapter"><h2>${esc(s.heading)}</h2><div class="ch-body">${body}</div></section>`;
}

function project({ site, projects }, slug) {
  const i = Math.max(0, projects.findIndex(p => p.slug === slug));
  const p = projects[i]; if (!p) return nav(site, 'work') + `<p class="loading">${t('Project not found.')}</p>`;
  const nx = projects[(i + 1) % projects.length];
  document.title = p.title + ' – ' + site.name;
  let secs = '';
  for (const s of p.sections || []) {
    if (s.type === 'question') continue;
    if (s.type === 'card') secs += `<section class="chapter abstract"><h2>${esc(s.label || '')}</h2><div class="ch-body"><p class="lead">${txt(s.lead)}</p>${s.text ? `<p>${txt(s.text)}</p>` : ''}</div></section>`;
    else secs += sectionHTML(s);
  }
  const allFacts = (p.facts || []).map(pair);
  const role = allFacts.find(([k]) => /role|rolle/i.test(k));
  const meth = allFacts.find(([k]) => /method|methode/i.test(k));
  const facts = [role, meth].filter(Boolean).concat(allFacts.filter(f => f !== role && f !== meth));
  const rq = rqOf(p);
  let sub = String(p.subtitle || p.line || '').trim();
  if (rq && sub.toLowerCase().startsWith(rq.toLowerCase())) sub = sub.slice(rq.length).trim();
  if (rq && sub.toLowerCase() === rq.toLowerCase()) sub = '';
  const links = (p.links || []).map(pair).filter(([, u]) => u);
  const linkBtns = links.map(([n, u]) => `<a class="btn ghost" href="${esc(u)}" target="_blank" rel="noopener">${esc(n)} ↗</a>`).join('');
  const poster = p.video_poster || (p.covers ? pair(p.covers[0])[0] : p.cover) || tileOf(p);
  const video = p.video ? `<section class="video" id="video">
      <button class="yt reveal" type="button" data-yt="${esc(p.video)}" aria-label="${t('Play project video')}"><img src="${esc(poster)}" alt="" loading="lazy">
        <span class="yt-play glass" data-glass="chip"><span class="tri" aria-hidden="true"></span><span><b>${t('Play video')}</b><small>${t('Loads from YouTube after the click.')}</small></span></span></button>
      <div class="btns"><a class="btn ghost" href="https://www.youtube.com/watch?v=${esc(p.video)}" target="_blank" rel="noopener">${t('Watch on YouTube')} ↗</a>${linkBtns}</div></section>`
    : (links.length ? `<div class="btns links-only">${linkBtns}</div>` : '');
  const cover = p.covers ? `<div class="covers">${p.covers.map(pair).map(([src, cap]) => `<figure class="fig reveal"><img src="${esc(src)}" alt="${esc(cap)}"><figcaption>${esc(cap)}</figcaption></figure>`).join('')}</div>`
    : p.cover && !(p.video && !p.video_poster) ? `<figure class="fig reveal cover"><img src="${esc(p.cover)}" alt="${esc(p.cover_caption || p.title)}"><figcaption>${esc(p.cover_caption || '')}</figcaption></figure>` : '';
  const au = p.author ? `<section class="author"><img src="${esc(p.author.image)}" alt="${esc(p.author.name)}" loading="lazy"><div><p class="meta">${t('Thesis by')}</p><h3>${esc(p.author.name)}</h3><p>${txt(p.author.text)}</p><p class="meta">${txt(p.author.note)}</p></div></section>` : '';
  return nav(site, 'work') + `<main id="top" class="wrap project">
    <a class="back" href="index.html#work">← ${t('All projects')}</a>
    <header class="p-head">
      <p class="meta">${kindYear(p)}</p>
      <h1 style="view-transition-name:title-${esc(p.slug)}">${esc(p.title)}</h1>
      <div class="p-intro">
        ${rq ? `<div class="p-rq glass"><p class="meta">${t('Research question')}</p><p>${txt(rq)}</p></div>` : ''}
        <div class="p-side">${sub ? `<p class="sub">${txt(sub)}</p>` : ''}<ul class="tags">${(p.tags || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
      </div>
    </header>
    ${video}
    <dl class="facts">${facts.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${txt(b)}</dd></div>`).join('')}</dl>
    ${cover}
    <div class="chapters">${secs}</div>
    ${au}
    ${nx && nx !== p ? `<a class="next" href="${purl(nx.slug)}"><div><p class="meta">${t('Next project')}</p><h2>${esc(nx.title)}</h2><p>${txt(nx.line)}</p></div><figure style="--tile-bg:${esc(nx.tile_bg || '#dde1e5')}"><img src="${esc(tileOf(nx))}" alt="" loading="lazy"></figure></a>` : ''}
  </main>${contact(site)}${footer(site)}`;
}

function aboutPage({ site, about, projects }, C) {
  document.title = t('About') + ' – ' + site.name;
  return nav(site, 'about') + `<main id="top">
  <section class="wrap a-hero">
    <h1 class="hero-title">${txt(about.title)}</h1>
    <div class="a-grid">
      <figure class="reveal portrait"><img src="${esc(about.portrait)}" alt="${t('Portrait of')} ${esc(site.name)}"></figure>
      <div><p class="lead">${txt(about.lead)}</p>
        <dl class="rows">
          <div><dt>${t('Email')}</dt><dd><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></dd></div>
          ${socials(site).map(([n, u]) => `<div><dt>${esc(n)}</dt><dd><a href="${esc(u)}" target="_blank" rel="noopener">${esc(u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))} ↗</a></dd></div>`).join('')}
          ${C && C.pdf ? `<div><dt>${t('CV')}</dt><dd><a href="${esc(C.pdf)}" download>${t('CV as PDF')} ↓</a></dd></div>` : ''}
        </dl></div>
    </div>
  </section>
  <section class="wrap block"><h2 class="sec-h">${t('Research interests')}</h2>${interests(about)}</section>
  ${C ? `<section class="wrap block cv-about" id="cv"><div class="cv-title"><h2 class="sec-h">${t('CV')}</h2>${C.pdf ? `<a class="btn ghost" href="${esc(C.pdf)}" download>${t('Download PDF')} ↓</a>` : ''}</div>${cvBody(C)}</section>` : ''}
  <section class="wrap block"><h2 class="sec-h">${t('Selected work')}<sup>${sup(projects.length)}</sup></h2><ul class="wlist">
    ${projects.map(p => `<li><a href="${purl(p.slug)}"><span class="w-img" style="--tile-bg:${esc(p.tile_bg || '#dde1e5')}"><img src="${esc(tileOf(p))}" alt="" loading="lazy"></span><b>${esc(p.title)}</b><span>${kindYear(p)}</span></a></li>`).join('')}</ul></section>
  ${contact(site)}</main>${footer(site)}`;
}

const cvEnt = e => `<div class="cv-e"><span class="when">${esc(e.when)}</span><div><b>${esc(e.title)}</b>${e.where ? `<span class="where">${esc(e.where)}</span>` : ''}${e.note ? `<p>${txt(e.note)}</p>` : ''}</div></div>`;
const cvSec = (title, body) => `<section class="cv-sec"><h3>${esc(title)}</h3>${body}</section>`;
function cvBody(C) {
  return `${cvSec(t('Education'), (C.education || []).map(cvEnt).join(''))}
  ${cvSec(t('Experience'), (C.experience || []).map(cvEnt).join(''))}
  <div class="cv-two"><div>
    ${cvSec(t('Skills'), (C.skills || []).map(pair).map(([k, v]) => `<div class="cv-sk"><b>${esc(k)}</b><p>${txt(v)}</p></div>`).join(''))}
    ${cvSec(t('Workshops & more'), (C.workshops || []).map(cvEnt).join(''))}
  </div><div class="cv-side">
    <div class="cv-lang"><h3>${t('Languages')}</h3>${(C.languages || []).map(pair).map(([l, v]) => `<div><b>${esc(l)}</b><span>${esc(v)}</span></div>`).join('')}</div>
    ${C.looking ? `<div class="cv-look glass"><h3>${t('Looking for')}</h3><p>${txt(C.looking)}</p></div>` : ''}
  </div></div>`;
}
function cvPage({ site, about }, C) {
  document.title = t('CV') + ' – ' + site.name;
  const rows = [[t('Email'), `<a href="mailto:${esc(site.email)}">${esc(site.email)}</a>`], ['Portfolio', `<a href="index.html">${esc(String(site.url || '').replace(/^https?:\/\//, ''))}</a>`]]
    .concat(socials(site).map(([n, u]) => [n, `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</a>`]));
  return nav(site, 'cv') + `<main id="top" class="wrap cvp">
  <div class="cv-actions no-print">${C.pdf ? `<a class="btn ghost" href="${esc(C.pdf)}" download>${t('Download PDF')} ↓</a>` : ''}<button class="btn ghost" type="button" onclick="window.print()">${t('Print')}</button></div>
  <header class="cv-head"><img src="${esc(about.portrait)}" alt="${t('Portrait of')} ${esc(site.name)}">
    <div><h1>${esc(site.name)}</h1><p class="ttl">${esc(C.title)}</p><dl>${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join('')}</dl></div></header>
  ${cvSec(t('Profile'), `<p class="cv-prof">${txt(C.profile)}</p>`)}
  ${cvBody(C)}
  </main>${contact(site)}${footer(site)}`;
}

function notFound({ site }) {
  document.title = '404 – ' + site.name;
  return nav(site, '') + `<main id="top" class="wrap nf">
    <div class="nf-card glass"><p class="meta">404</p><h1>${t('This page fell asleep.')}</h1>
      <p>${t('The link is wrong, or the page is somewhere in REM sleep. Better not wake it.')}</p>
      <div class="btns"><a class="btn" href="index.html#work">${t('Back to work')}</a><a class="btn ghost" href="about.html">${t('About me')}</a></div></div>
    <div class="nf-objects" aria-hidden="true">${[1, 4, 6, 2, 8].map((n, i) => `<img src="assets/img/blobs/blob-${n}.png" alt="" style="--i:${i}">`).join('')}</div>
  </main>${footer(site)}`;
}

function legalPage({ site }, kind, L) {
  const adr = String(L.address || '').split('\n').filter(l => l.trim() && !l.trim().startsWith('#')).join('\n').trim();
  const who = `<p>${esc(L.name || site.name)}${adr ? '<br>' + txt(adr) : ''}</p>`;
  const mail = `<p>E-Mail: <a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>`;
  let body;
  if (kind === 'impressum') {
    document.title = 'Impressum – ' + site.name;
    body = `<h1>Impressum</h1>
      <h2>Angaben gemäß § 5 DDG</h2>${who}
      <h2>Kontakt</h2>${mail}
      <h2>Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV</h2>${who}
      <h2>Haftung für Links</h2><p>Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden entsprechende Links umgehend entfernt.</p>
      <h2>Urheberrecht</h2><p>Die Inhalte dieser Website (Texte, Bilder, Grafiken, Videos) unterliegen dem Urheberrecht. Projekte, die im Team entstanden sind, sind gemeinsame Arbeiten der jeweils genannten Personen. Eine Verwendung außerhalb dieser Website bedarf der Zustimmung.</p>`;
  } else {
    document.title = 'Datenschutz – ' + site.name;
    body = `<h1>Datenschutz</h1>
      <h2>1. Verantwortlicher</h2>${who}${mail}
      <h2>2. Hosting über GitHub Pages</h2><p>Diese Website wird über GitHub Pages bereitgestellt, einen Dienst der GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf der Seite verarbeitet GitHub technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Datei und Browserinformationen (Server-Logfiles), um die Seite auszuliefern und die Sicherheit zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und stabilen Bereitstellung). Dabei kann eine Übermittlung in die USA stattfinden. Weitere Informationen: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub Privacy Statement</a>.</p>
      <h2>3. Keine Cookies, kein Tracking</h2><p>Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Dienste. Schriftarten werden lokal von dieser Website geladen, es besteht keine Verbindung zu Google Fonts. Ob Sie die englische oder deutsche Version gewählt haben, speichert Ihr Browser lokal (localStorage); diese Angabe wird nicht übertragen.</p>
      <h2>4. YouTube-Videos</h2><p>Videos sind über YouTube (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) eingebunden. Sie werden erst geladen, wenn Sie auf das Vorschaubild klicken; vorher werden keine Daten an YouTube übertragen. Nach dem Klick wird eine Verbindung zu YouTube im erweiterten Datenschutzmodus (youtube-nocookie.com) hergestellt, und YouTube erhält u. a. Ihre IP-Adresse und die Information, welches Video Sie aufgerufen haben. Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO). Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Datenschutzerklärung von Google</a>.</p>
      <h2>5. Kontakt per E-Mail</h2><p>Wenn Sie mir eine E-Mail schreiben, verarbeite ich Ihre Angaben ausschließlich, um Ihre Anfrage zu beantworten (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Die Daten werden gelöscht, sobald sie dafür nicht mehr benötigt werden.</p>
      <h2>6. Externe Links</h2><p>Links zu anderen Websites (z. B. Hochschul-Ausstellungsseiten, YouTube, LinkedIn) öffnen die jeweilige Seite des Anbieters. Für die Datenverarbeitung dort ist der jeweilige Anbieter verantwortlich.</p>
      <h2>7. Ihre Rechte</h2><p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO) sowie das Recht, eine erteilte Einwilligung jederzeit zu widerrufen. Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren, z. B. beim Landesbeauftragten für den Datenschutz und die Informationsfreiheit Baden-Württemberg.</p>
      <p class="meta">Stand: ${esc(L.updated || '')}</p>`;
  }
  return nav(site, '') + `<main id="top" class="wrap legal">${body}</main>${footer(site)}`;
}

/* ---------- Echtes Glas: Lichtbrechung per SVG-Filter (Chrome, Edge, Opera) ----------
   Andere Browser zeigen automatisch mattes Glas mit Unschärfe. */
const UA = navigator.userAgent;
const REFRACT = /Chrome\//.test(UA) && !/Firefox|FxiOS|CriOS/.test(UA);
const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
let defs = null, gid = 0;
const mapCache = new Map();
function glassMap(w, h, r, bezel, lens) {
  const key = [w, h, r, bezel, lens].join('|');
  if (mapCache.has(key)) return mapCache.get(key);
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d'), img = ctx.createImageData(w, h), d = img.data;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let ox = 0, oy = 0;
    if (lens) {                                   // runde Linse: wölbt sich wie ein Tropfen
      const dx = (x + .5 - w / 2) / (w / 2), dy = (y + .5 - h / 2) / (h / 2), q = Math.hypot(dx, dy);
      if (q < 1) { const slope = Math.min(1, .22 * q / Math.sqrt(Math.max(.0025, 1 - q * q))); ox = -dx / (q || 1) * slope; oy = -dy / (q || 1) * slope; }
    } else {                                      // Scheibe: flach in der Mitte, Kante bricht das Licht
      const px = x + .5 - w / 2, py = y + .5 - h / 2;
      const qx = Math.abs(px) - (w / 2 - r), qy = Math.abs(py) - (h / 2 - r);
      const ax = Math.max(qx, 0), ay = Math.max(qy, 0), ol = Math.hypot(ax, ay);
      const dist = r - (ol + Math.min(Math.max(qx, qy), 0));   // Abstand zur Kante (innen positiv)
      if (dist < bezel && dist > -1) {
        let nx, ny;
        if (ol > 0) { nx = ax / ol * Math.sign(px); ny = ay / ol * Math.sign(py); }
        else if (qx > qy) { nx = Math.sign(px); ny = 0; } else { nx = 0; ny = Math.sign(py); }
        const tt = 1 - Math.max(0, dist) / bezel, slope = Math.min(1, tt * tt * 1.15);
        ox = -nx * slope; oy = -ny * slope;
      }
    }
    const i = (y * w + x) * 4;
    d[i] = 128 + 127 * ox; d[i + 1] = 128 + 127 * oy; d[i + 2] = 128; d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const url = c.toDataURL(); mapCache.set(key, url); return url;
}
function glassFilter(w, h, r, opt) {
  if (!defs) { defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); defs.setAttribute('aria-hidden', 'true'); defs.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;overflow:hidden'; document.body.appendChild(defs); }
  const id = 'glass-' + (++gid), s = opt.scale, ab = opt.aberration || 0;
  const ch = (k, sc, m) => `<feDisplacementMap in="SourceGraphic" in2="map" scale="${sc}" xChannelSelector="R" yChannelSelector="G" result="d${k}"/><feColorMatrix in="d${k}" type="matrix" values="${m}" result="c${k}"/>`;
  defs.insertAdjacentHTML('beforeend', `<filter id="${id}" x="0" y="0" width="${w}" height="${h}" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feImage href="${glassMap(w, h, r, opt.bezel, opt.lens)}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="none" result="map"/>
    ${ab ? ch('r', s, '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0') + ch('g', s * (1 + ab), '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0') + ch('b', s * (1 + 2 * ab), '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0')
      + '<feComposite in="cr" in2="cg" operator="arithmetic" k2="1" k3="1" result="rg"/><feComposite in="rg" in2="cb" operator="arithmetic" k2="1" k3="1"/>'
      : `<feDisplacementMap in="SourceGraphic" in2="map" scale="${s}" xChannelSelector="R" yChannelSelector="G"/>`}
  </filter>`);
  return id;
}
const GLASS = {
  nav: { bezel: 18, scale: 46, aberration: .06, after: 'blur(5px) saturate(1.6) brightness(1.06)' },
  panel: { bezel: 26, scale: 70, aberration: .07, after: 'blur(2px) saturate(1.5) brightness(1.05)' },
  chip: { bezel: 12, scale: 34, aberration: .05, after: 'blur(6px) saturate(1.6) brightness(1.08)' },
  lens: { lens: true, bezel: 0, scale: 80, aberration: .09, after: 'saturate(1.25) brightness(1.04)' },
  orb: { lens: true, bezel: 0, scale: 150, aberration: .08, after: 'saturate(1.3) brightness(1.05)' }
};
function refract(el) {
  if (!REFRACT) return;
  const w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
  if (!w || !h || w * h > 1600 * 1200) return;
  const opt = GLASS[el.dataset.glass || 'panel'] || GLASS.panel;
  if (el.dataset.gsize === w + 'x' + h) return;
  el.dataset.gsize = w + 'x' + h;
  const r = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, w / 2, h / 2);
  const old = el.dataset.gid; if (old) { const f = document.getElementById(old); if (f) f.remove(); }
  const id = glassFilter(w, h, r, opt); el.dataset.gid = id;
  const v = `url(#${id}) ${opt.after}`;
  el.style.backdropFilter = v; el.style.webkitBackdropFilter = v;
  el.classList.add('refract');
}
let ro = null;
function glassAll() {
  const els = document.querySelectorAll('.glass');
  if (!REFRACT) return;
  if (!ro && 'ResizeObserver' in window) ro = new ResizeObserver(es => es.forEach(e => refract(e.target)));
  els.forEach(el => { refract(el); if (ro) ro.observe(el); });
}

/* ---------- Glas-Cursor: Linse folgt der Maus, Klick erzeugt eine Welle ---------- */
let lens = null;
function cursor() {
  if (!FINE || REDUCED || lens) return;
  document.documentElement.classList.add('has-lens');
  lens = document.createElement('div'); lens.className = 'lens glass'; lens.dataset.glass = 'lens'; lens.setAttribute('aria-hidden', 'true');
  const dot = document.createElement('div'); dot.className = 'lens-dot'; dot.setAttribute('aria-hidden', 'true');
  document.body.append(lens, dot);
  refract(lens);
  let mx = innerWidth / 2, my = innerHeight / 2, lx = mx, ly = my, vx = 0, vy = 0, run = false, shown = false;
  const loop = () => {
    const ax = (mx - lx) * .2, ay = (my - ly) * .2;
    vx = vx * .55 + ax; vy = vy * .55 + ay; lx += vx; ly += vy;
    const sp = Math.min(1, Math.hypot(vx, vy) / 40), ang = Math.atan2(vy, vx) * 180 / Math.PI;
    lens.style.setProperty('--x', lx.toFixed(1) + 'px'); lens.style.setProperty('--y', ly.toFixed(1) + 'px');
    lens.style.setProperty('--rot', ang.toFixed(1) + 'deg'); lens.style.setProperty('--stretch', (1 + sp * .22).toFixed(3)); lens.style.setProperty('--squash', (1 - sp * .14).toFixed(3));
    if (Math.abs(mx - lx) + Math.abs(my - ly) + Math.abs(vx) + Math.abs(vy) > .2) requestAnimationFrame(loop); else run = false;
  };
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    mx = e.clientX; my = e.clientY;
    dot.style.translate = `${mx}px ${my}px`;
    if (!shown) { shown = true; lx = mx; ly = my; document.documentElement.classList.add('lens-on'); }
    const hot = e.target.closest && e.target.closest('a, button, [data-yt], label, input, textarea, select, .orb');
    document.documentElement.classList.toggle('lens-hot', !!hot);
    if (!run) { run = true; requestAnimationFrame(loop); }
  }, { passive: true });
  document.addEventListener('pointerleave', () => { shown = false; document.documentElement.classList.remove('lens-on'); });
  addEventListener('pointerdown', e => { if (e.pointerType === 'mouse') document.documentElement.classList.add('lens-down'); });
  addEventListener('pointerup', e => {
    if (e.pointerType !== 'mouse') return;
    document.documentElement.classList.remove('lens-down');
    const w = document.createElement('div'); w.className = 'ripple'; w.style.left = e.clientX + 'px'; w.style.top = e.clientY + 'px';
    document.body.appendChild(w); w.addEventListener('animationend', () => w.remove());
  });
}

/* ---------- Glaskugel im Hero: lässt sich mit der Maus (oder dem Finger) verschieben ---------- */
function orb() {
  const o = $('.orb'); if (!o) return;
  let dx = 0, dy = 0, sx = 0, sy = 0, px = 0, py = 0, drag = false;
  const set = () => { o.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`; };
  o.addEventListener('pointerdown', e => { drag = true; o.setPointerCapture(e.pointerId); sx = dx; sy = dy; px = e.clientX; py = e.clientY; o.classList.add('grab'); });
  o.addEventListener('pointermove', e => { if (!drag) return; dx = sx + e.clientX - px; dy = sy + e.clientY - py; set(); });
  const end = () => { if (!drag) return; drag = false; o.classList.remove('grab'); };
  o.addEventListener('pointerup', end); o.addEventListener('pointercancel', end);
  o.addEventListener('dblclick', () => { dx = dy = 0; o.classList.add('home'); set(); setTimeout(() => o.classList.remove('home'), 700); });
}

/* ---------- Bewegung: Bilder öffnen sich beim Reinscrollen ---------- */
let io = null, ticking = false;
function onScroll() { ticking = false; const n = $('.nav'); if (n) n.classList.toggle('scrolled', scrollY > 24); }
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
function motion() {
  const els = document.querySelectorAll('.reveal');
  if (REDUCED || !('IntersectionObserver' in window)) els.forEach(el => el.classList.add('in'));
  else {
    if (io) io.disconnect();
    io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
  }
  onScroll();
}

function interactions() {
  motion(); glassAll(); cursor(); orb();
  document.querySelectorAll('[data-yt]').forEach(b => b.addEventListener('click', () => {
    b.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0" title="${t('Project video')}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    b.classList.add('playing');
  }, { once: true }));
  document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    const note = b.querySelector('[data-note]'), v = b.dataset.copy;
    try { await navigator.clipboard.writeText(v); if (note) { note.textContent = t('Copied') + ' ✓'; setTimeout(() => { note.textContent = t('Copy e-mail'); }, 1600); } }
    catch (e) { location.href = 'mailto:' + v; }
  }));
  document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.lang === LANG) return;
    LANG = b.dataset.lang;
    try { localStorage.setItem('lang', LANG); } catch (e) {}
    const u = new URL(location.href);
    if (u.searchParams.has('lang')) { u.searchParams.set('lang', LANG); history.replaceState(null, '', u); }
    const y = scrollY; render().then(() => scrollTo(0, y));
  }));
  if (location.hash) { const el = document.getElementById(location.hash.slice(1)); if (el) setTimeout(() => el.scrollIntoView(), 50); }
}

async function render() {
  const root = $('#app'), page = document.body.dataset.page;
  document.documentElement.lang = LANG;
  try {
    const data = await loadAll();
    if (page === 'home') root.innerHTML = home(data);
    else if (page === 'about') root.innerHTML = aboutPage(data, await load('content/cv.yml').catch(() => null));
    else if (page === 'notfound') root.innerHTML = notFound(data);
    else if (page === 'cv') root.innerHTML = cvPage(data, await load('content/cv.yml'));
    else if (page === 'impressum' || page === 'privacy') root.innerHTML = legalPage(data, page, await load('content/legal.yml'));
    else root.innerHTML = project(data, document.body.dataset.slug || new URLSearchParams(location.search).get('p'));
    interactions();
    document.documentElement.classList.add('ready');
  } catch (e) {
    root.innerHTML = `<p class="loading">${t('Content could not be loaded:')} ${esc(e.message)}<br>${t('Check the YAML files in /content.')}</p>`;
    console.error(e);
  }
}
render();
