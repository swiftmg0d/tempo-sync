---
'@tempo-sync/web': patch
---

Lighthouse performance, accessibility, and SEO improvements.

- Improve color contrast ratios for WCAG AA compliance (light and dark mode)
- Replace `focus-within` reset with proper `focus-visible` outline styles
- Optimize font loading by importing explicit `wght.css` subset
- Add LightningCSS for CSS minification
- Code-split Chakra UI into separate cacheable chunk
- Enable terser 2-pass compression and disable modulePreload polyfill
- Allow search engine crawling in robots.txt
- Remove duplicate analysis-illustration.svg from src/assets
