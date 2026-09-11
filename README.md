# bebewhax.github.io

Portfolio site for Oleksii Nahrebetskyi — served at **https://bebewhax.github.io/**

A single static `index.html`. No build step, no dependencies, no framework.
Fonts load from Google Fonts; everything else is inline.

## Update

Edit `index.html`, then:

```bash
git add -A && git commit -m "Update portfolio" && git push
```

## Notes

- `.nojekyll` tells GitHub Pages to serve the file as-is rather than running it through Jekyll.
- The page follows the visitor's light/dark preference automatically.
- The favicon is an inline SVG in the `<head>` — no image file needed.
- To add a store: copy one `<article class="store">` block and edit the name, market, description and URL.
