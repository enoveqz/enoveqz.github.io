# Portfolio – Enis Sentürk

Statische Website für GitHub Pages im Paper-Classic-Stil. Kein Build-Schritt, keine Installation nötig.
**Alle Inhalte stehen im Ordner `content/`.** Den Code (`assets/js`, `assets/css`, `*.html`) musst du normalerweise nicht anfassen.

```
content/
  site.yml            ← allgemeine Texte (Startseite, Kontakt, Footer, E-Mail, Navigation)
  about.yml           ← About-Seite (Porträt, Lebenslauf, Forschungsinteressen)
  cv.yml              ← CV-Seite (cv.html) + PDF unter assets/cv/
  projects.yml        ← welche Projekte gezeigt werden + Reihenfolge
  projects/
    somnia.yml        ← ein Projekt = eine Datei
    or3.yml
    festool-insight.yml
    pathaware.yml
    foodbox.yml
    _vorlage.yml      ← Vorlage für neue Projekte
assets/img/<projekt>/ ← Bilder pro Projekt
```

## Projekt hinzufügen
1. `content/projects/_vorlage.yml` kopieren, z. B. als `content/projects/mein-projekt.yml` (nur Kleinbuchstaben, Zahlen, Bindestriche).
2. Bilder in `assets/img/mein-projekt/` legen (JPG, ca. 2000 px breit reicht).
3. In `content/projects.yml` eine Zeile `- mein-projekt` an die gewünschte Stelle schreiben.

Fertig – Startseite, About-Liste, Laufband und „Next project“ aktualisieren sich automatisch.

## Projekt entfernen oder umsortieren
- **Ausblenden:** Zeile in `content/projects.yml` löschen oder mit `#` auskommentieren (die Datei bleibt erhalten).
- **Reihenfolge:** Zeilen in `content/projects.yml` verschieben. Das erste Projekt erscheint auf der Startseite groß.

## Texte ändern
- Startseite, Sticker, Intro, Chips, Kontakt, Footer: `content/site.yml`
- About: `content/about.yml`
- Projekt: die jeweilige Datei in `content/projects/`

YAML-Regeln, damit nichts kaputtgeht:
- Einrückung mit **Leerzeichen**, nicht mit Tabs.
- Enthält ein Text einen Doppelpunkt `:` oder beginnt er mit `[`, `{`, `#`, `*`, dann in `"Anführungszeichen"` setzen.
- Bei Listen wie `- [Titel, Text]`: Wenn der Text Kommas enthält, ihn in Anführungszeichen setzen: `- [Team, "Anna, Ben und Enis"]`.
- Zeilenumbruch in kurzen Texten: `\n`.

## Videos und Links
In der Projektdatei:
```yaml
video: CneyQ2VE3qg          # der Teil nach youtube.com/watch?v=
links:
  - [HfG exhibition page, "https://..."]
```
`video:` leer lassen = kein Video. Das Video lädt erst beim Klick (datenschutzfreundlich über youtube-nocookie.com).

## Abschnitt-Typen in einem Projekt
| `type`     | Wirkung |
|------------|---------|
| `chapter`  | nummeriertes Kapitel mit Überschrift und Text. Optional: `image` + `caption` (+ `size: half`), `gallery`, `cards`, `chips` |
| `question` | Forschungsfrage als schwarze Karte |
| `card`     | weiße Textkarte, z. B. Abstract (`label`, `lead`, `text`) |
| `phases`   | Karten mit Bild, z. B. Phasen/Zeitachse (`items` mit `label`, `meta`, `title`, `text`, `image`) |

Oben auf der Projektseite: `cover:` (ein Bild) oder `covers:` (mehrere Bilder nebeneinander, Liste aus `[bild, Unterschrift]`).

Optional ganz unten: `author:` (Autor-Karte wie bei SOMNIA).

## Impressum & Datenschutz
`content/legal.yml`: Dort **deine Postanschrift** eintragen (die `#` vor den Zeilen entfernen). Ohne Anschrift ist das Impressum nicht vollständig.

## Automatisch erzeugt (nicht von Hand bearbeiten)
Bei jeder Änderung in `content/`, `assets/img/` oder `scripts/` läuft auf GitHub automatisch `scripts/build_pages.py` (siehe Reiter **Actions**). Es erzeugt:
- `p/<projekt>/` – die Adresse jedes Projekts, z. B. `https://enoveqz.github.io/p/somnia/`
- `og/<projekt>.png` – Vorschaubild, wenn der Link auf LinkedIn, WhatsApp usw. geteilt wird
- `sitemap.xml`, `robots.txt` und die HTML-Grundgerüste
Nach dem Hinzufügen eines Projekts also ca. 1–2 Minuten warten, bis die Action durch ist.

## Farben und Schriften
Oben in `assets/css/style.css` unter `:root` (Papierfarbe, Tinte, Rahmenstärke, Schattenlänge). Die Schriften liegen lokal in `assets/fonts/` (keine Verbindung zu Google).

## Lokal ansehen
Die Seite lädt die YAML-Dateien per `fetch`, deshalb nicht per Doppelklick öffnen, sondern einen kleinen Server starten:
```
python -m http.server 8000
```
und `http://localhost:8000` aufrufen. (Oder in VS Code die Erweiterung „Live Server“.)

## Auf GitHub Pages veröffentlichen
1. Auf github.com ein neues Repository anlegen, z. B. **`<dein-username>.github.io`** (dann ist die Seite direkt unter `https://<dein-username>.github.io` erreichbar) oder `portfolio`.
2. Alle Dateien aus diesem Ordner hochladen (auf GitHub: **Add file → Upload files**, Ordner per Drag & Drop) und **Commit changes** klicken.
3. Im Repository: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, Branch **main**, Ordner **/ (root)** → Save.
4. Nach ca. 1–2 Minuten ist die Seite online. Jede spätere Änderung (auch direkt im Browser auf GitHub mit dem Stift-Symbol) wird automatisch veröffentlicht.

Die Datei `.nojekyll` sorgt dafür, dass GitHub die Dateien unverändert ausliefert.
