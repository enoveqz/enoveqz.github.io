#!/usr/bin/env python3
"""Erzeugt aus /content automatisch:
   • p/<projekt>/index.html  – eigene Adresse pro Projekt (mit Vorschau für LinkedIn, WhatsApp …)
   • og/<projekt>.png        – Vorschaubild pro Projekt (1200 × 630)
   • index.html, about.html, impressum.html, datenschutz.html, project.html (Grundgerüst)
   • sitemap.xml, robots.txt
Läuft automatisch über GitHub Actions bei jeder Änderung (.github/workflows/build.yml).
Lokal: pip install pyyaml pillow && python scripts/build_pages.py
"""
import hashlib, html, os, shutil, sys
import yaml
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
FONT = os.path.join('scripts', 'fonts')
esc = lambda s: html.escape(str(s or ''), quote=True)

site = yaml.safe_load(open('content/site.yml', encoding='utf-8'))
order = [str(s) for s in (yaml.safe_load(open('content/projects.yml', encoding='utf-8')) or []) if s]
projects = []
for slug in order:
    path = f'content/projects/{slug}.yml'
    if os.path.exists(path):
        p = yaml.safe_load(open(path, encoding='utf-8')) or {}
        p['slug'] = slug
        projects.append(p)
URL = str(site.get('url') or '').rstrip('/')
NAME = site.get('name', '')
def ver(f):  # Versionsnummer gegen veraltete Browser-Caches
    return hashlib.md5(open(f, 'rb').read()).hexdigest()[:8]
V_CSS, V_JS = ver('assets/css/style.css'), ver('assets/js/site.js')
ICON = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23f2efe6'/%3E"
        "%3Crect x='4' y='4' width='56' height='56' fill='none' stroke='%230a0a0a' stroke-width='6'/%3E%3Ctext x='32' y='42' font-family='monospace' "
        "font-weight='700' font-size='26' text-anchor='middle'%3EES%3C/text%3E%3C/svg%3E")


def shell(title, desc, image, page, path, slug=None, base=''):
    canon = f'{URL}/{path}'
    extra = f' data-slug="{esc(slug)}"' if slug else ''
    base_tag = f'<base href="{base}">\n' if base else ''
    redirect = ''
    if page == 'project' and not slug:  # alte Links project.html?p=… → neue Adresse
        redirect = "<script>(function(){var s=new URLSearchParams(location.search).get('p');if(s)location.replace('p/'+encodeURIComponent(s)+'/');})();</script>\n"
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
{base_tag}<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{esc(canon)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{esc(NAME)}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{esc(canon)}">
<meta property="og:image" content="{esc(URL + '/' + image)}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{ICON}">
<link rel="stylesheet" href="assets/css/style.css?v={V_CSS}">
{redirect}</head>
<body data-page="{page}"{extra}>
<div id="app"><p class="loading">Loading…</p></div>
<script src="assets/js/js-yaml.min.js"></script>
<script src="assets/js/site.js?v={V_JS}"></script>
</body>
</html>
"""


# ---------- Vorschaubilder ----------
def font(name, size):
    return ImageFont.truetype(os.path.join(FONT, name), size)


def wrap(draw, text, fnt, width):
    words, lines, cur = str(text).split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if draw.textlength(t, font=fnt) <= width or not cur:
            cur = t
        else:
            lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines


def og_image(out, title, kicker, line, img=None, bg='#dddddd'):
    W, H, ink, paper = 1200, 630, (10, 10, 10), (242, 239, 230)
    im = Image.new('RGB', (W, H), paper)
    d = ImageDraw.Draw(im)
    x0, y0, x1, y1 = 50, 50, W - 62, H - 62
    d.rectangle([x0 + 12, y0 + 12, x1 + 12, y1 + 12], fill=ink)
    d.rectangle([x0, y0, x1, y1], fill='white', outline=ink, width=6)
    tx = x0 + 44
    if img and os.path.exists(img):
        tw = int((x1 - x0) * 0.46); th = int(tw * 400 / 576)
        tile = Image.new('RGB', (tw, th), bg)
        src = Image.open(img).convert('RGB'); src.thumbnail((tw, th))
        tile.paste(src, ((tw - src.width) // 2, (th - src.height) // 2))
        ix = x1 - 34 - tw; iy = (y0 + y1 - th) // 2; im.paste(tile, (ix, iy)); d.rectangle([ix, iy, ix + tw, iy + th], outline=ink, width=5)
        tw_text = ix - tx - 30
    else:
        tw_text = x1 - tx - 40
    kf = font('JetBrainsMono-Regular.ttf', 20)
    for k, l in enumerate(wrap(d, kicker.upper(), kf, tw_text)[:2]): d.text((tx, y0 + 40 + k * 26), l, font=kf, fill=ink)
    size = 76
    while size > 40:
        ft = font('JetBrainsMono-Bold.ttf', size)
        tl = wrap(d, title.upper(), ft, tw_text)
        if len(tl) <= 3 and all(d.textlength(l, font=ft) <= tw_text for l in tl): break
        size -= 4
    y = y0 + 96
    for l in tl:
        d.text((tx - 3, y), l, font=ft, fill=ink); y += int(size * 1.02)
    y += 18
    for l in wrap(d, line, font('Inter-Regular.otf', 26), tw_text)[:4]:
        d.text((tx, y), l, font=font('Inter-Regular.otf', 26), fill=(60, 60, 60)); y += 36
    d.rectangle([tx, y1 - 70, tx + 18, y1 - 52], fill=ink)
    d.text((tx + 30, y1 - 76), (NAME + ' — Portfolio').upper(), font=font('JetBrainsMono-Bold.ttf', 22), fill=ink)
    im.save(out, optimize=True)


os.makedirs('og', exist_ok=True)
hero = ' '.join(str(site.get('hero', '')).split())
og_image('og/home.png', hero.title() if len(hero) < 60 else NAME, site.get('nav_tag', '').strip('[]'), site.get('meta_description', ''), None)
for p in projects:
    img = p.get('tile') or p.get('cover')
    og_image(f"og/{p['slug']}.png", p.get('title', ''), f"{p.get('kind', '')} · {p.get('year', '')}", p.get('line', ''), img, p.get('tile_bg', '#dddddd'))

# ---------- Seiten ----------
mt, md = site.get('meta_title', NAME), site.get('meta_description', '')
pages = {
    'index.html': shell(mt, md, 'og/home.png', 'home', ''),
    'about.html': shell('About – ' + NAME, md, 'og/home.png', 'about', 'about.html'),
    'cv.html': shell('CV – ' + NAME, 'Curriculum vitae of ' + NAME + ': education, experience, projects and skills.', 'og/home.png', 'cv', 'cv.html'),
    'project.html': shell(mt, md, 'og/home.png', 'project', 'project.html'),
    'impressum.html': shell('Impressum – ' + NAME, 'Impressum', 'og/home.png', 'impressum', 'impressum.html'),
    'datenschutz.html': shell('Datenschutz – ' + NAME, 'Datenschutzerklärung', 'og/home.png', 'privacy', 'datenschutz.html'),
}
for f, c in pages.items():
    open(f, 'w', encoding='utf-8').write(c)
if os.path.isdir('p'):
    shutil.rmtree('p')
for p in projects:
    d = f"p/{p['slug']}"; os.makedirs(d, exist_ok=True)
    desc = p.get('subtitle') or p.get('line') or md
    open(f'{d}/index.html', 'w', encoding='utf-8').write(
        shell(f"{p.get('title')} – {NAME}", ' '.join(str(desc).split()), f"og/{p['slug']}.png", 'project', f"p/{p['slug']}/", p['slug'], '../../'))

urls = ['', 'about.html', 'cv.html'] + [f"p/{p['slug']}/" for p in projects] + ['impressum.html', 'datenschutz.html']
open('sitemap.xml', 'w', encoding='utf-8').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    ''.join(f'  <url><loc>{esc(URL + "/" + u)}</loc></url>\n' for u in urls) + '</urlset>\n')
open('robots.txt', 'w').write(f'User-agent: *\nAllow: /\nSitemap: {URL}/sitemap.xml\n')
print('OK:', len(projects), 'Projekte →', ', '.join(p['slug'] for p in projects))
