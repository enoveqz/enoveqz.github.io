/* Rendert alle Seiten aus den YAML-Dateien in /content.
   Normalerweise musst du hier nichts ändern – Texte & Projekte stehen in /content. */
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const txt = s => esc(String(s == null ? '' : s).trim()).replace(/\\n|\n/g, '<br>');
const pair = a => Array.isArray(a) ? [a[0], a.slice(1).join(', ')] : [a.title || a.label, a.text || a.url];
const num = i => String(i + 1).padStart(2, '0');
const up = s => String(s || '').toUpperCase();
const purl = slug => 'p/' + encodeURIComponent(slug) + '/';          // saubere Projekt-URL
const here = h => (/impressum|privacy|notfound/.test(document.body.dataset.page) && h === '#contact') ? 'index.html#contact' : location.pathname + h;                              // Anker auf der aktuellen Seite

async function load(path) {
  const r = await fetch(path, { cache: 'no-cache' });
  if (!r.ok) throw new Error(path + ' (' + r.status + ')');
  return (jsyaml.safeLoad || jsyaml.load)(await r.text());
}
async function loadAll() {
  const [site, about, list] = await Promise.all([load('content/site.yml'), load('content/about.yml'), load('content/projects.yml')]);
  const slugs = (list || []).filter(Boolean).map(String);
  const projects = [];
  for (const slug of slugs) {
    try { const p = await load('content/projects/' + slug + '.yml'); p.slug = slug; projects.push(p); }
    catch (e) { console.warn('Projekt fehlt oder hat einen Fehler:', slug, e); }
  }
  return { site, about, projects };
}

/* ---------- gemeinsame Teile ---------- */
function nav(site, active) {
  const l = (h, t, k) => `<a href="${h}" class="${active === k ? 'on' : ''}">${t}</a>`;
  return `<header class="nav"><div class="wrap">
    <a class="logo" href="index.html">${esc(site.logo)}</a>
    <span class="tag">${esc(site.nav_tag)}</span>
    <nav class="links">${l('index.html#work', 'Work', 'work')}${l('about.html', 'About', 'about')}${l(here('#contact'), 'Contact', 'contact')}</nav>
  </div><div class="bar"></div></header>`;
}
function contact(site) {
  return `<section class="wrap block" id="contact"><div class="card pad contact rv">
    <span class="small">Contact</span>
    <h2>${esc(site.contact_title)}</h2>
    <p>${txt(site.contact_text)}</p>
    <button class="mail" type="button" data-copy="${esc(site.email)}" title="Copy e-mail">${esc(up(site.email))} <span aria-hidden="true">⧉</span></button>
    <a class="mail" style="background:transparent;color:inherit;border:2px solid currentColor;margin-left:10px" href="mailto:${esc(site.email)}">Write ↗</a>
    ${(site.social || []).map(pair).map(([t, u]) => `<a class="mail" style="background:transparent;color:inherit;border:2px solid currentColor;margin-left:10px" href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join('')}
    <div class="sticker" aria-hidden="true">${esc(String(site.contact_sticker || '').trim())}</div>
  </div></section>`;
}
function footer(site) {
  const soc = (site.social || []).map(pair).map(([t, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} ↗</a></li>`).join('');
  return `<footer class="wrap footer"><div class="top">
    <div><h4>${esc(up(site.name))}</h4><div class="line">${esc(String(site.footer_line || '').trim())}</div></div>
    <div><span class="small muted">Index</span><ul><li><a href="index.html#work">Work</a></li><li><a href="about.html">About</a></li><li><a href="${here('#contact')}">Contact</a></li></ul></div>
    <div><span class="small muted">Contact</span><ul><li><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>${soc}</ul></div>
  </div><div class="bottom"><span>© ${new Date().getFullYear()} ${esc(site.name)}</span><span class="legal-links"><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a><a href="${here('#top')}">Back to top ↑</a></span></div></footer>`;
}
function marquee(words) {
  const one = (words || []).map(w => `<span>${esc(up(w))}  /</span>`).join('');
  return `<div class="marquee" aria-hidden="true"><div class="track">${one.repeat(4)}${one.repeat(4)}</div></div>`;
}
function interests(about) {
  return `<div class="grid3">${(about.interests || []).map((it, k) => `<div class="card icard rv"><div class="n">${num(k)}</div><h3>${esc(it.title)}</h3><p>${txt(it.text)}</p></div>`).join('')}</div>`;
}
const tileOf = p => p.tile || p.cover;
const rqOf = p => p.question || ((p.sections || []).find(s => s.type === 'question') || {}).text || '';
function pcard(p, i, big, total) {
  return `<a class="card pcard rv ${big ? 'big' : ''}" href="${purl(p.slug)}">
    <div class="tile" style="--tile-bg:${esc(p.tile_bg || '#ddd')}"><img src="${esc(tileOf(p))}" alt="${esc(p.title)}" loading="${big ? 'eager' : 'lazy'}" style="view-transition-name:tile-${esc(p.slug)}"></div>
    <div class="meta small"><span>${num(i)} / ${total}</span><span>${esc(p.year)}</span></div>
    <h3>${esc(p.title)}</h3>
    ${rqOf(p) ? `<p class="rq"><span class="small">Research question</span>${txt(rqOf(p))}</p>` : ''}
    <div class="row"><div>${rqOf(p) ? '' : `<p>${txt(p.line)}</p>`}<span class="chip">${esc(p.kind)}</span></div><span class="arrow">↗</span></div>
  </a>`;
}

/* ---------- Seiten ---------- */
function home({ site, about, projects }) {
  const n = String(projects.length).padStart(2, '0');
  const cards = projects.map((p, i) => pcard(p, i, i === 0, n));
  const t = site.about_teaser || {};
  return nav(site, 'work') + `<main id="top">
  <section class="wrap hero">
    <div class="hero-top"><div class="card pad"><h1>${esc(String(site.hero || '').trim())}</h1></div>
    <a class="sticker" href="#contact" title="Contact">${esc(String(site.sticker || '').trim())}</a></div>
    <div class="intro"><p>${esc(String(site.intro || '').trim())}</p>
      <div class="btns"><a class="btn" href="#work">See work ↓</a><a class="btn alt" href="about.html">About me</a></div></div>
    <div class="chips">${(site.chips || []).map((c, k) => `<span class="chip">${esc(c)}</span>`).join('')}</div>
  </section>
  <section class="wrap work" id="work"><span class="chip fill sec-tag">${esc(site.work_label)}</span>
    ${cards[0] || ''}<div class="grid2">${cards.slice(1).join('')}</div></section>
  ${marquee(projects.map(p => p.title))}
  ${site.statement ? `<section class="wrap block"><div class="card ink pad statement rv"><span class="small">${esc(site.statement_label)}</span><p>${txt(site.statement)}</p></div></section>` : ''}
  <section class="wrap block"><span class="chip fill sec-tag">02 / About</span>
    <div class="card pad about-teaser rv"><img src="${esc(about.portrait)}" alt="Portrait of ${esc(site.name)}" loading="lazy">
      <div><p class="lead">${txt(t.text)}</p><dl class="rows">${(t.rows || []).map(pair).map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${txt(b)}</dd></div>`).join('')}</dl>
      <a class="btn" href="about.html" style="margin-top:20px">More about me</a></div></div></section>
  <section class="wrap block"><span class="chip fill sec-tag">03 / Research interests</span>${interests(about)}</section>
  ${contact(site)}</main>${footer(site)}`;
}

function sectionHTML(s, k) {
  const head = `<div><div class="num">${num(k)}</div><h2 class="ch-title">${esc(s.heading)}</h2></div>`;
  const fig = (src, cap, size) => `<figure class="fig ${size === 'half' ? 'half' : ''}"><img src="${esc(src)}" alt="${esc(cap || '')}" loading="lazy">${cap ? `<figcaption>Fig. ${num(k)} — ${esc(cap)}</figcaption>` : ''}</figure>`;
  let body = s.text ? `<p>${txt(s.text)}</p>` : '';
  if (s.chips) body += `<div class="chips" style="margin-bottom:30px">${s.chips.map((c, j) => `<span class="chip">${esc(c)}</span>`).join('')}</div>`;
  if (s.gallery) body += `<div class="gallery">${s.gallery.map(pair).map(([src, cap]) => `<figure class="fig"><img src="${esc(src)}" alt="${esc(cap)}" loading="lazy">${cap ? `<figcaption>${esc(cap)}</figcaption>` : ''}</figure>`).join('')}</div>`;
  if (s.image) body += fig(s.image, s.caption, s.size);
  if (s.cards) body += `<div class="cards">${s.cards.map(pair).map(([a, b], j) => `<div class="card rv"><div class="n">${num(j)}</div><h3>${esc(a)}</h3><p>${txt(b)}</p></div>`).join('')}</div>`;
  if (s.type === 'phases') {
    return `<section class="chapter wide rv"><div class="intro-ph">${head}<div class="body">${s.text ? `<p class="ph-text">${txt(s.text)}</p>` : ''}</div></div>
      <div class="phases">${(s.items || []).map(it => `<div class="card rv">${it.image ? `<img src="${esc(it.image)}" alt="${esc(it.title)}" loading="lazy">` : ''}<div style="margin-top:20px"><span class="chip fill">${esc(it.label)}</span></div><div class="small muted" style="margin-top:14px">${esc(it.meta)}</div><h3>${esc(it.title)}</h3><p style="margin:0;font-size:16px">${txt(it.text)}</p></div>`).join('')}</div></section>`;
  }
  return `<section class="chapter rv">${head}<div class="body">${body}</div></section>`;
}

function project({ site, projects }, slug) {
  const i = Math.max(0, projects.findIndex(p => p.slug === slug));
  const p = projects[i]; if (!p) return nav(site, 'work') + `<p class="loading">Project not found.</p>`;
  const nx = projects[(i + 1) % projects.length];
  document.title = p.title + ' – ' + site.name;
  let k = 0, secs = '';
  for (const s of p.sections || []) {
    if (s.type === 'question') continue;
    else if (s.type === 'card') secs += `<section class="card pad abstract rv"><span class="small">${esc(s.label || '')}</span><p class="lead" style="margin-top:18px">${txt(s.lead)}</p>${s.text ? `<p class="more">${txt(s.text)}</p>` : ''}</section>`;
    else secs += sectionHTML(s, k++);
  }
  const allFacts = (p.facts || []).map(pair);
  const role = allFacts.find(([k]) => /role|rolle/i.test(k));
  const meth = allFacts.find(([k]) => /method|methode/i.test(k));
  const facts = allFacts.filter(f => f !== role && f !== meth);
  const rq = rqOf(p);
  let sub = String(p.subtitle || p.line || '').trim();
  if (rq && sub.toLowerCase().startsWith(rq.toLowerCase())) sub = sub.slice(rq.length).trim();
  if (rq && sub.toLowerCase() === rq.toLowerCase()) sub = '';
  const links = (p.links || []).map(pair).filter(([, u]) => u);
  const video = p.video ? `<section class="video rv" id="video"><span class="chip fill sec-tag">Video &amp; links</span>
      <button class="yt" type="button" data-yt="${esc(p.video)}" aria-label="Play project video"><img src="${esc(p.video_poster || (p.covers ? pair(p.covers[0])[0] : p.cover) || tileOf(p))}" alt="" loading="lazy"><span class="lab">WATCH THE PROJECT VIDEO · YOUTUBE</span><span class="yt-note">Click to load the video from YouTube.</span><span class="play">▶</span></button>
      <div class="btns"><a class="btn" href="https://www.youtube.com/watch?v=${esc(p.video)}" target="_blank" rel="noopener">Watch on YouTube ↗</a>${links.map(([t, u]) => `<a class="btn alt" href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join('')}</div></section>`
    : (links.length ? `<div class="btns" style="margin-bottom:110px">${links.map(([t, u]) => `<a class="btn" href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join('')}</div>` : '');
  const au = p.author ? `<section class="card pad author rv"><img src="${esc(p.author.image)}" alt="${esc(p.author.name)}" loading="lazy"><div><span class="small">Thesis by</span><h3>${esc(p.author.name)}</h3><p style="font-size:18px">${txt(p.author.text)}</p><p class="small muted" style="line-height:1.7">${txt(p.author.note)}</p></div></section>` : '';
  return nav(site, 'work') + `<main id="top" class="wrap">
    <a class="back" href="index.html#work">← All projects</a>
    <section class="p-hero">
      <div class="card pad"><span class="small">Project ${num(i)} / ${String(projects.length).padStart(2, '0')} — ${esc(p.kind)}, ${esc(p.year)}</span>
        <h1 style="view-transition-name:title-${esc(p.slug)}">${esc(p.title)}</h1>
        ${rq ? `<div class="p-rq"><span class="small">Research question</span><p>${txt(rq)}</p></div>` : ''}
        ${sub ? `<p class="sub">${txt(sub)}</p>` : ''}
        <div class="chips">${(p.tags || []).map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div></div>
      <span class="label">${esc(p.label || '★ ' + p.year)}</span>
      <div class="mini" style="--tile-bg:${esc(p.tile_bg || '#ddd')}"><img src="${esc(tileOf(p))}" alt="" style="view-transition-name:tile-${esc(p.slug)}"></div>
    </section>
    ${video}
    <section class="facts">${[role, meth].filter(Boolean).concat(facts).map(([a, b], j) => `<div class="card rv"><span class="chip fill">${esc(a)}</span><p>${txt(b)}</p></div>`).join('')}</section>
    ${p.covers ? `<div class="cover covers rv">${p.covers.map(pair).map(([src, cap]) => `<figure><img src="${esc(src)}" alt="${esc(cap)}"><figcaption>↑ ${esc(cap)}</figcaption></figure>`).join('')}</div>`
      : p.cover && !(p.video && !p.video_poster) ? `<figure class="cover rv"><img src="${esc(p.cover)}" alt="${esc(p.cover_caption || p.title)}"><figcaption>↑ ${esc(p.cover_caption || '')}</figcaption></figure>` : ''}
    <div class="chapters">${secs}</div>
    ${au}
    ${nx && nx !== p ? `<a class="card next rv" href="${purl(nx.slug)}"><div><span class="small">Next project →</span><h2>${esc(nx.title)}</h2><p style="max-width:40ch;opacity:.8">${txt(nx.line)}</p><span class="arrow">↗</span></div><div class="tile" style="--tile-bg:${esc(nx.tile_bg || '#ddd')}"><img src="${esc(tileOf(nx))}" alt="" loading="lazy"></div></a>` : ''}
  </main>${contact(site)}${footer(site)}`;
}

function aboutPage({ site, about, projects }, C) {
  document.title = 'About – ' + site.name;
  const n = String(projects.length).padStart(2, '0');
  return nav(site, 'about') + `<main id="top">
  <section class="wrap a-hero"><div class="hero-top"><div class="card pad"><span class="small">About</span><h1>${esc(String(about.title || '').trim())}</h1></div>
    <div class="sticker" aria-hidden="true">${esc(String(about.sticker || '').trim())}</div></div></section>
  <section class="wrap a-grid"><div class="portrait rv"><img src="${esc(about.portrait)}" alt="Portrait of ${esc(site.name)}"><span class="label">${esc(about.portrait_label || '')}</span></div>
    <div><p class="lead rv">${txt(about.lead)}</p>
      <div class="card cv rv">
        <div><span><span class="chip">Contact</span></span><p><a href="mailto:${esc(site.email)}">${esc(site.email)}</a>${(site.social || []).map(pair).map(([t, u]) => `<br><a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join('')}${C && C.pdf ? `<br><a href="${esc(C.pdf)}" download>CV as PDF ↓</a>` : ''}</p></div></div></div></section>
  ${marquee(about.marquee)}
  <section class="wrap block"><span class="chip fill sec-tag">Research interests</span>${interests(about)}</section>
  ${C ? `<section class="wrap block cv-about" id="cv"><div class="cv-title"><h2>CV</h2>${C.pdf ? `<a class="btn" href="${esc(C.pdf)}" download>Download PDF ↓</a>` : ''}</div>${cvBody(C)}</section>` : ''}
  <section class="wrap block"><span class="chip fill sec-tag">Selected work</span><div class="plist">
    ${projects.map((p, i) => `<a href="${purl(p.slug)}"><span class="small">${num(i)}</span><b>${esc(p.title)}</b><span class="small k">${esc(p.kind)} · ${esc(p.year)}</span><span style="font-size:24px">↗</span></a>`).join('')}</div></section>
  ${contact(site)}</main>${footer(site)}`;
}

const cvEnt = e => `<div class="cv-e"><span class="when">${esc(e.when)}</span><div><b>${esc(e.title)}</b>${e.where ? `<span class="where">${esc(e.where)}</span>` : ''}${e.note ? `<p>${txt(e.note)}</p>` : ''}</div></div>`;
const cvSec = (t, body) => `<section class="cv-sec"><span class="chip fill sec-tag">${esc(t)}</span>${body}</section>`;
function cvBody(C) {
  return `${cvSec('Education', (C.education || []).map(cvEnt).join(''))}
  ${cvSec('Experience', (C.experience || []).map(cvEnt).join(''))}
  <div class="cv-two"><div>
    ${cvSec('Skills', (C.skills || []).map(pair).map(([k, v]) => `<div class="cv-sk"><span class="small">${esc(k)}</span><p>${txt(v)}</p></div>`).join(''))}
    ${cvSec('Workshops & more', (C.workshops || []).map(cvEnt).join(''))}
  </div><div>
    <div class="card cv-lang"><span class="small">Languages</span>${(C.languages || []).map(pair).map(([l, v]) => `<div><b>${esc(l)}</b><span>${esc(up(v))}</span></div>`).join('')}</div>
    ${C.looking ? `<div class="card pad cv-look"><span class="small">Looking for</span><p>${txt(C.looking)}</p></div>` : ''}
  </div></div>`;
}
function cvPage({ site, about, projects }, C) {
  document.title = 'CV – ' + site.name;
  const ent = e => `<div class="cv-e"><span class="when">${esc(e.when)}</span><div><b>${esc(e.title)}</b>${e.where ? `<span class="where">${esc(e.where)}</span>` : ''}${e.note ? `<p>${txt(e.note)}</p>` : ''}</div></div>`;
  const sec = (t, body) => `<section class="cv-sec"><span class="chip fill sec-tag">${esc(t)}</span>${body}</section>`;
  const soc = (site.social || []).map(pair);
  const rows = [['Email', `<a href="mailto:${esc(site.email)}">${esc(site.email)}</a>`], ['Portfolio', `<a href="index.html">${esc(String(site.url || '').replace(/^https?:\/\//, ''))}</a>`]]
    .concat(soc.map(([t, u]) => [t, `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</a>`]));
  return nav(site, 'cv') + `<main id="top" class="wrap cvp">
  <div class="cv-actions no-print">${C.pdf ? `<a class="btn" href="${esc(C.pdf)}" download>Download PDF ↓</a>` : ''}<button class="btn alt" type="button" onclick="window.print()">Print</button></div>
  <div class="card pad cv-head"><img src="${esc(about.portrait)}" alt="Portrait of ${esc(site.name)}">
    <div><h1>${esc(up(site.name))}</h1><p class="ttl">${esc(C.title)}</p><dl>${rows.map(([k, v]) => `<dt>${esc(up(k))}</dt><dd>${v}</dd>`).join('')}</dl></div>
    <div class="sticker" aria-hidden="true">${esc(String(C.sticker || '').trim())}</div></div>
  ${sec('Profile', `<p class="cv-prof">${txt(C.profile)}</p>`)}
  ${sec('Education', (C.education || []).map(ent).join(''))}
  ${sec('Experience', (C.experience || []).map(ent).join(''))}
  <div class="cv-two"><div>
    ${sec('Skills', (C.skills || []).map(pair).map(([k, v]) => `<div class="cv-sk"><span class="small">${esc(k)}</span><p>${txt(v)}</p></div>`).join(''))}
    ${sec('Workshops & more', (C.workshops || []).map(ent).join(''))}
  </div><div>
    <div class="card cv-lang"><span class="small">Languages</span>${(C.languages || []).map(pair).map(([l, v]) => `<div><b>${esc(l)}</b><span>${esc(up(v))}</span></div>`).join('')}</div>
    ${C.looking ? `<div class="card pad cv-look"><span class="small">Looking for</span><p>${txt(C.looking)}</p></div>` : ''}
  </div></div>
  </main>${contact(site)}${footer(site)}`;
}

function notFound({ site, projects }) {
  document.title = '404 – ' + site.name;
  const blobs = [1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => `<img src="assets/img/blobs/blob-${n}.png" alt="" style="--i:${i}">`).join('');
  const words = ['Page not found', 'Lost in a dream', 'Error 404', 'Wake up', 'Wrong turn'];
  const band = words.map(w => `<span>${esc(up(w))}  /</span>`).join('');
  return nav(site, '') + `<main id="top" class="nf">
  <section class="wrap nf-hero"><div class="card pad nf-card"><span class="small">Error 404</span>
    <h1>THIS PAGE<br>FELL ASLEEP.</h1>
    <p>Either the link is wrong or the page is somewhere in REM sleep. Better not wake it, go back instead:</p>
    <div class="btns"><a class="btn" href="index.html#work">Back to work ↗</a><a class="btn alt" href="about.html">About me</a></div></div>
    <a class="sticker" href="index.html#contact">ZZZ<br>Z…</a></section>
  <div class="nf-blobs" aria-hidden="true">${blobs}</div>
  <div class="marquee nf-band" aria-hidden="true"><div class="track">${band.repeat(4)}${band.repeat(4)}</div></div>
  <div class="marquee nf-band two" aria-hidden="true"><div class="track">${band.repeat(4)}${band.repeat(4)}</div></div>
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
      <h2>3. Keine Cookies, kein Tracking</h2><p>Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Dienste. Schriftarten werden lokal von dieser Website geladen, es besteht keine Verbindung zu Google Fonts.</p>
      <h2>4. YouTube-Videos</h2><p>Videos sind über YouTube (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) eingebunden. Sie werden erst geladen, wenn Sie auf das Vorschaubild klicken; vorher werden keine Daten an YouTube übertragen. Nach dem Klick wird eine Verbindung zu YouTube im erweiterten Datenschutzmodus (youtube-nocookie.com) hergestellt, und YouTube erhält u. a. Ihre IP-Adresse und die Information, welches Video Sie aufgerufen haben. Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO). Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Datenschutzerklärung von Google</a>.</p>
      <h2>5. Kontakt per E-Mail</h2><p>Wenn Sie mir eine E-Mail schreiben, verarbeite ich Ihre Angaben ausschließlich, um Ihre Anfrage zu beantworten (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Die Daten werden gelöscht, sobald sie dafür nicht mehr benötigt werden.</p>
      <h2>6. Externe Links</h2><p>Links zu anderen Websites (z. B. Hochschul-Ausstellungsseiten, YouTube, LinkedIn) öffnen die jeweilige Seite des Anbieters. Für die Datenverarbeitung dort ist der jeweilige Anbieter verantwortlich.</p>
      <h2>7. Ihre Rechte</h2><p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO) sowie das Recht, eine erteilte Einwilligung jederzeit zu widerrufen. Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren, z. B. beim Landesbeauftragten für den Datenschutz und die Informationsfreiheit Baden-Württemberg.</p>
      <p class="small muted" style="margin-top:40px">Stand: ${esc(L.updated || '')}</p>`;
  }
  return nav(site, '') + `<main id="top" class="wrap legal">${body}</main>${footer(site)}`;
}

/* ---------- Start ---------- */
function interactions() {
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' }) : null;
  document.querySelectorAll('.rv').forEach(el => io ? io.observe(el) : el.classList.add('in'));
  setTimeout(() => document.querySelectorAll('.rv').forEach(el => { const r = el.getBoundingClientRect(); if (r.top < innerHeight) el.classList.add('in'); }), 60);
  document.querySelectorAll('[data-yt]').forEach(b => b.addEventListener('click', () => {
    b.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0" title="Project video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  }, { once: true }));
  document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    const v = b.dataset.copy, old = b.innerHTML;
    try { await navigator.clipboard.writeText(v); b.innerHTML = 'COPIED ✓'; } catch (e) { location.href = 'mailto:' + v; }
    setTimeout(() => { b.innerHTML = old; }, 1600);
  }));
  document.querySelectorAll('[data-go]').forEach(b => { const go = e => { e.preventDefault(); e.stopPropagation(); location.href = b.dataset.go; }; b.addEventListener('click', go); b.addEventListener('keydown', e => { if (e.key === 'Enter') go(e); }); });
  if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(() => t.scrollIntoView(), 50); }
}

(async () => {
  const root = $('#app'), page = document.body.dataset.page;
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
    root.innerHTML = `<p class="loading">Content could not be loaded: ${esc(e.message)}<br>Check the YAML files in /content.</p>`;
    console.error(e);
  }
})();
