# Portfolio website

My portfolio website. Plain HTML, CSS and JavaScript with no build step, hosted on GitHub Pages.

## Structure

```
index.html        All page content
css/styles.css    Styles, mobile-first, organized by section
js/main.js        Project dialogs and the screenshot lightbox
images/           WebP images, one folder per project
files/            Downloadable resume
```

## Running locally

Open `index.html` directly in a browser, or serve the folder (for example `python -m http.server`) to test it exactly as GitHub Pages will.

## Adding a project

1. Copy one `<li>` from `.project-list` and one `<dialog>` in `index.html`, then give the dialog a new `id` and set the card button's `data-opens` to match.
2. Add images under `images/<project>/`:
   - `banner.webp`: 1688×452, two frames stacked vertically. The top frame shows by default; the bottom frame slides in on hover.
   - Screenshots as WebP, at most 1920px wide.
   - `thumbs/<name>.webp`: the same screenshot scaled so its shorter side is 400px.
   [Squoosh](https://squoosh.app) can do the conversion and resizing in the browser.
3. Give each screenshot a short `alt` text describing what it shows.
