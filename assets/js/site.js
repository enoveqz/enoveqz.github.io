/* Rendert alle Seiten aus den YAML-Dateien in /content.
   Normalerweise musst du hier nichts ändern – Texte & Projekte stehen in /content. */
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const txt = s => esc(String(s == null ? '' : s).trim()).replace(/\\n|\n/g, '<br>');
const pair = a => Array.isArray(a) ? [a[0], a.slice(1).join(', ')] : [a.title || a.label, a.text || a.url];
const num = i => String(i + 1).padStart(2, '0');
const up = s => String(s || '').toUpperCase();

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
    <nav class="links">${l('index.html#work', 'Work', 'work')}${l('about.html', 'About', 'about')}${l('#contact', 'Contact', 'contact')}</nav>
  </div><div class="bar"></div></header>`;
}
function contact(site) {
  return `<section class="wrap block" id="contact"><div class="card pad contact rv">
    <span class="small">Contact</span>
    <h2>${esc(site.contact_title)}</h2>
    <p>${txt(site.contact_text)}</p>
    <button class="mail" type="button" data-copy="${esc(site.email)}" title="Copy e-mail">${esc(up(site.email))} <span aria-hidden="true">⧉</span></button>
    <a class="mail" style="background:transparent;color:inherit;border:2px solid currentColor;margin-left:10px" href="mailto:${esc(site.email)}">Write ↗</a>
    <div class="sticker" aria-hidden="true">${esc(String(site.contact_sticker || '').trim())}</div>
  </div></section>`;
}
function footer(site) {
  const soc = (site.social || []).map(pair).map(([t, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} ↗</a></li>`).join('');
  return `<footer class="wrap footer"><div class="top">
    <div><h4>${esc(up(site.name))}</h4><div class="line">${esc(String(site.footer_line || '').trim())}</div></div>
    <div><span class="small muted">Index</span><ul><li><a href="index.html#work">Work</a></li><li><a href="about.html">About</a></li><li><a href="#contact">Contact</a></li></ul></div>
    <div><span class="small muted">Contact</span><ul><li><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>${soc}</ul></div>
  </div><div class="bottom"><span>© ${new Date().getFullYear()} ${esc(site.name)}</span><a href="#top">Back to top ↑</a></div></footer>`;
}
function marquee(words) {
  const one = (words || []).map(w => `<span>${esc(up(w))}  /</span>`).join('');
  return `<div class="marquee" aria-hidden="true"><div class="track">${one.repeat(4)}${one.repeat(4)}</div></div>`;
}
function interests(about) {
  return `<div class="grid3">${(about.interests || []).map((it, k) => `<div class="card icard rv"><div class="n">${num(k)}</div><h3>${esc(it.title)}</h3><p>${txt(it.text)}</p></div>`).join('')}</div>`;
}
const tileOf = p => p.tile || p.cover;
function pcard(p, i, big, total) {
  return `<a class="card pcard rv ${big ? 'big' : ''}" href="project.html?p=${encodeURIComponent(p.slug)}">
    <div class="tile" style="--tile-bg:${esc(p.tile_bg || '#ddd')}"><img src="${esc(tileOf(p))}" alt="${esc(p.title)}" loading="${big ? 'eager' : 'lazy'}" style="view-transition-name:tile-${esc(p.slug)}">${p.video ? '<span class="vbadge">▶ VIDEO</span>' : ''}</div>
    <div class="meta small"><span>${num(i)} / ${total}</span><span>${esc(p.year)}</span></div>
    <h3>${esc(p.title)}</h3>
    <div class="row"><div><p>${txt(p.line)}</p><span class="chip fill">${esc(p.kind)}</span></div><span class="arrow">↗</span></div>
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
    <div class="sticker" aria-hidden="true">${esc(String(site.sticker || '').trim())}</div></div>
    <div class="intro"><p>${esc(String(site.intro || '').trim())}</p>
      <div class="btns"><a class="btn" href="#work">See work ↓</a><a class="btn alt" href="about.html">About me</a></div></div>
    <div class="chips">${(site.chips || []).map((c, k) => `<span class="chip ${k === 0 ? 'fill' : ''}">${esc(c)}</span>`).join('')}</div>
  </section>
  <section class="wrap work" id="work"><span class="chip fill sec-tag">${esc(site.work_label)}</span>
    ${cards[0] || ''}<div class="grid2">${cards.slice(1).join('')}</div></section>
  ${marquee(projects.map(p => p.title))}
  <section class="wrap block"><div class="card ink pad statement rv"><span class="small">${esc(site.statement_label)}</span><p>${txt(site.statement)}</p></div></section>
  <section class="wrap block"><span class="chip fill sec-tag">02 / About</span>
    <div class="card pad about-teaser rv"><img src="${esc(about.portrait)}" alt="Portrait of ${esc(site.name)}" loading="lazy">
      <div><p class="lead">${txt(t.text)}</p><dl class="rows">${(t.rows || []).map(pair).map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${txt(b)}</dd></div>`).join('')}</dl>
      <a class="btn" href="about.html" style="margin-top:20px">More about me</a></div></div></section>
  <section class="wrap block"><span class="chip fill sec-tag">03 / Research interests</span>${interests(about)}</section>
  ${contact(site)}</main>${footer(site)}`;
}

function sectionHTML(s, k) {
  const head = `<div><div class="num">${num(k)}</div><span class="chip">${esc(s.heading)}</span></div>`;
  const fig = (src, cap, size) => `<figure class="fig ${size === 'half' ? 'half' : ''}"><img src="${esc(src)}" alt="${esc(cap || '')}" loading="lazy">${cap ? `<figcaption>Fig. ${num(k)} — ${esc(cap)}</figcaption>` : ''}</figure>`;
  let body = s.text ? `<p>${txt(s.text)}</p>` : '';
  if (s.chips) body += `<div class="chips" style="margin-bottom:30px">${s.chips.map((c, j) => `<span class="chip ${j === 0 ? 'fill' : ''}">${esc(c)}</span>`).join('')}</div>`;
  if (s.gallery) body += `<div class="gallery">${s.gallery.map(pair).map(([src, cap]) => `<figure class="fig"><img src="${esc(src)}" alt="${esc(cap)}" loading="lazy">${cap ? `<figcaption>${esc(cap)}</figcaption>` : ''}</figure>`).join('')}</div>`;
  if (s.image) body += fig(s.image, s.caption, s.size);
  if (s.cards) body += `<div class="cards">${s.cards.map(pair).map(([a, b], j) => `<div class="card rv"><div class="n">${num(j)}</div><h3>${esc(a)}</h3><p>${txt(b)}</p></div>`).join('')}</div>`;
  if (s.type === 'phases') {
    return `<section class="chapter wide rv"><div class="intro-ph" style="display:grid;grid-template-columns:320px minmax(0,1fr);gap:40px">${head}<div class="body">${s.text ? `<p style="font-size:22px;max-width:46ch;margin:0 0 30px">${txt(s.text)}</p>` : ''}</div></div>
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
    if (s.type === 'question') secs += `<section class="card ink pad question rv"><span class="small">Research question</span><p>${txt(s.text)}</p></section>`;
    else if (s.type === 'card') secs += `<section class="card pad abstract rv"><span class="small">${esc(s.label || '')}</span><p class="lead" style="margin-top:18px">${txt(s.lead)}</p>${s.text ? `<p class="more">${txt(s.text)}</p>` : ''}</section>`;
    else secs += sectionHTML(s, k++);
  }
  const links = (p.links || []).map(pair).filter(([, u]) => u);
  const video = p.video ? `<section class="video rv"><span class="chip fill sec-tag">Video &amp; links</span>
      <button class="yt" type="button" data-yt="${esc(p.video)}" aria-label="Play project video"><img src="https://i.ytimg.com/vi/${esc(p.video)}/maxresdefault.jpg" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${esc(p.video)}/hqdefault.jpg'" alt="" loading="lazy"><span class="lab">WATCH THE PROJECT VIDEO · YOUTUBE</span><span class="play">▶</span></button>
      <div class="btns"><a class="btn" href="https://www.youtube.com/watch?v=${esc(p.video)}" target="_blank" rel="noopener">Watch on YouTube ↗</a>${links.map(([t, u]) => `<a class="btn alt" href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join('')}</div></section>`
    : (links.length ? `<div class="btns" style="margin-bottom:110px">${links.map(([t, u]) => `<a class="btn" href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join('')}</div>` : '');
  const au = p.author ? `<section class="card pad author rv"><img src="${esc(p.author.image)}" alt="${esc(p.author.name)}" loading="lazy"><div><span class="small">Thesis by</span><h3>${esc(p.author.name)}</h3><p style="font-size:18px">${txt(p.author.text)}</p><p class="small muted" style="line-height:1.7">${txt(p.author.note)}</p></div></section>` : '';
  return nav(site, 'work') + `<main id="top" class="wrap">
    <a class="back" href="index.html#work">← All projects</a>
    <section class="p-hero">
      <div class="card pad"><span class="small">Project ${num(i)} / ${String(projects.length).padStart(2, '0')} — ${esc(p.kind)}, ${esc(p.year)}</span>
        <h1 style="view-transition-name:title-${esc(p.slug)}">${esc(p.title)}</h1>
        <p class="sub">${txt(p.subtitle || p.line)}</p>
        <div class="chips">${(p.tags || []).map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div></div>
      <span class="label">${esc(p.label || '★ ' + p.year)}</span>
      <div class="mini" style="--tile-bg:${esc(p.tile_bg || '#ddd')}"><img src="${esc(tileOf(p))}" alt="" style="view-transition-name:tile-${esc(p.slug)}"></div>
    </section>
    <section class="facts">${(p.facts || []).map(pair).map(([a, b], j) => `<div class="card rv"><span class="chip fill">${esc(a)}</span><p>${txt(b)}</p></div>`).join('')}</section>
    ${p.covers ? `<div class="cover covers rv">${p.covers.map(pair).map(([src, cap]) => `<figure><img src="${esc(src)}" alt="${esc(cap)}"><figcaption>↑ ${esc(cap)}</figcaption></figure>`).join('')}</div>`
      : p.cover ? `<figure class="cover rv"><img src="${esc(p.cover)}" alt="${esc(p.cover_caption || p.title)}"><figcaption>↑ ${esc(p.cover_caption || '')}</figcaption></figure>` : ''}
    <div class="chapters">${secs}</div>
    ${video}${au}
    ${nx && nx !== p ? `<a class="card next rv" href="project.html?p=${encodeURIComponent(nx.slug)}"><div><span class="small">Next project →</span><h2>${esc(nx.title)}</h2><p style="max-width:40ch;opacity:.8">${txt(nx.line)}</p><span class="arrow">↗</span></div><div class="tile" style="--tile-bg:${esc(nx.tile_bg || '#ddd')}"><img src="${esc(tileOf(nx))}" alt="" loading="lazy"></div></a>` : ''}
  </main>${contact(site)}${footer(site)}`;
}

function aboutPage({ site, about, projects }) {
  document.title = 'About – ' + site.name;
  const n = String(projects.length).padStart(2, '0');
  return nav(site, 'about') + `<main id="top">
  <section class="wrap a-hero"><div class="hero-top"><div class="card pad"><span class="small">About</span><h1>${esc(String(about.title || '').trim())}</h1></div>
    <div class="sticker" aria-hidden="true">${esc(String(about.sticker || '').trim())}</div></div></section>
  <section class="wrap a-grid"><div class="portrait rv"><img src="${esc(about.portrait)}" alt="Portrait of ${esc(site.name)}"><span class="label">${esc(about.portrait_label || '')}</span></div>
    <div><p class="lead rv">${txt(about.lead)}</p>
      <div class="card cv rv">${(about.cv || []).map(pair).map(([a, b], j) => `<div><span><span class="chip ${j === 0 ? 'fill' : ''}">${esc(a)}</span></span><p>${txt(b)}</p></div>`).join('')}
        <div><span><span class="chip">Contact</span></span><p><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p></div></div></div></section>
  ${marquee(about.marquee)}
  <section class="wrap block"><span class="chip fill sec-tag">Research interests</span>${interests(about)}</section>
  <section class="wrap block"><span class="chip fill sec-tag">Selected work</span><div class="plist">
    ${projects.map((p, i) => `<a href="project.html?p=${encodeURIComponent(p.slug)}"><span class="small">${num(i)}</span><b>${esc(p.title)}</b><span class="small k">${esc(p.kind)} · ${esc(p.year)}</span><span style="font-size:24px">↗</span></a>`).join('')}</div></section>
  ${contact(site)}</main>${footer(site)}`;
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
  if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(() => t.scrollIntoView(), 50); }
}

(async () => {
  const root = $('#app'), page = document.body.dataset.page;
  try {
    const data = await loadAll();
    if (page === 'home') root.innerHTML = home(data);
    else if (page === 'about') root.innerHTML = aboutPage(data);
    else root.innerHTML = project(data, new URLSearchParams(location.search).get('p'));
    interactions();
  } catch (e) {
    root.innerHTML = `<p class="loading">Content could not be loaded: ${esc(e.message)}<br>Check the YAML files in /content.</p>`;
    console.error(e);
  }
})();
