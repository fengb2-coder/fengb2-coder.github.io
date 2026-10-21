# fengb2-coder.github.io

Personal homepage of Bowen Feng, served by GitHub Pages at <https://fengb2-coder.github.io/>.

Plain HTML plus one stylesheet. There is no build step, no Jekyll (`.nojekyll` turns it off) and no framework.
The layout follows Jon Barron's academic homepage template
(<https://github.com/jonbarron/jonbarron_website>); keep the footer credit he asks for.

## Structure

```
index.html                 home: intro (bio, links, photo), Research, News, Selected Publications
fun-projects.html          Fun Robotics Projects: rows linking to the project pages
projects/*.html            one page per project (auto3d, autonomous-driving, navigation-ncp, soft-tool)
assets/css/style.css       the only stylesheet (light/dark via prefers-color-scheme)
assets/img/profile.jpg     portrait photo, 360 px wide (+ profile@2x.jpg, 720 px), uncropped
assets/img/og-asd.jpg      Open Graph preview image
assets/img/pubs/           one teaser image per publication (keep each under ~300 KB)
assets/img/posters/        first-frame poster images for the videos
assets/img/projects/<p>/   figures for each project page
assets/video/              demo clips and short hover loops (*-hover.mp4), H.264 MP4
assets/js/thumbs.js        hover-to-play for .thumb boxes (the only script; still image stays on touch screens)
assets/Bowen_Feng_CV.pdf   CV linked from the header
Auto3d.html, AutonomousDriving.html, Navigation_ncp.html, Soft_tool.html
                           redirect stubs for the old URLs; leave them in place
```

Preview locally with `python3 -m http.server 8000` and open <http://localhost:8000>.

## Add a publication

Author order follows arXiv.

1. Save a teaser to `assets/img/pubs/<short-name>.jpg` (about 800 px wide, under 300 KB), e.g.
   `convert big.png -resize 800x -strip -quality 82 assets/img/pubs/<short-name>.jpg`.
2. In `index.html`, copy one `<li class="row">` block inside `<ol class="rows">` and put it at the
   top (newest first). Update the `id`, image, title, authors (wrap your own name in `<strong>`),
   venue tag, the `project page / arXiv / code` links (only links that exist) and the summary.
3. Optional hover loop (3-5 s, silent, 400x280, under 800 KB):
   `ffmpeg -ss START -i teaser.mp4 -t 4 -an -vf "crop=...,scale=400:280" -c:v libx264 -crf 27 -pix_fmt yuv420p -movflags +faststart assets/video/<short-name>-hover.mp4`
   and add it as the `<video>` inside the row's `.thumb`. Add `featured` to a row's class to highlight it.

## Add a news item

Add an `<li>` at the top of `<ul class="news">` in `index.html`:

```html
<li><time class="date" datetime="2026-11">Nov 2026</time><span>Something happened. <a href="...">Link</a>.</span></li>
```

## Add a project

Copy a page in `projects/`, keep the `../` prefixes on asset paths, then add a `<li class="row">`
to `fun-projects.html`. Convert GIFs to MP4 rather than committing them:

```bash
ffmpeg -i in.gif -an -c:v libx264 -crf 26 -pix_fmt yuv420p -movflags +faststart \
       -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" assets/video/name.mp4
ffmpeg -i in.gif -frames:v 1 -q:v 4 assets/img/posters/name.jpg
```

Remember to update "Last updated" in the footers.
