# @tempo-sync/web

## 0.1.1

### Patch Changes

- [#21](https://github.com/swiftmg0d/tempo-sync/pull/21) [`b148228`](https://github.com/swiftmg0d/tempo-sync/commit/b148228d474e072a2ddec63f431f711b75de9195) Thanks [@swiftmg0d](https://github.com/swiftmg0d)! - chore: lighthouse performance, accessibility, and SEO improvements
  - Improve color contrast ratios for WCAG AA compliance (light and dark mode)
  - Replace `focus-within` reset with proper `focus-visible` outline styles
  - Optimize font loading by importing explicit `wght.css` subset
  - Add LightningCSS for CSS minification
  - Code-split Chakra UI into separate cacheable chunk
  - Enable terser 2-pass compression and disable modulePreload polyfill
  - Allow search engine crawling in robots.txt
  - Remove duplicate analysis-illustration.svg from src/assets
  - Add per-app build CI jobs for API, integrations, and web with path-based filtering

## 0.1.0

### Minor Changes

- [#19](https://github.com/swiftmg0d/tempo-sync/pull/19) [`f5d9052`](https://github.com/swiftmg0d/tempo-sync/commit/f5d9052b6cf70da7e1410649e7e575f7a97ca64e) Thanks [@swiftmg0d](https://github.com/swiftmg0d)! - Initial release of the web application.
  - Activity Dashboard with detailed workout metrics (pace, heart rate, distance, calories) and visual charts
  - AI Performance Insights powered by multiple LLM providers (OpenAI, Groq, OpenRouter, SambaNova, Cerebras)
  - Track Leaderboard ranking music by workout efficiency correlation
  - Session Recommendations with personalized track suggestions based on historical data
  - Global Map with interactive route polylines and heatmap mode for training intensity
  - Hex Exploration Grid using H3 hexagons to track area discovery percentage
  - Dark mode with View Transitions API animation, OS preference detection, and localStorage persistence
  - Mobile responsive design with gesture-based sidebar and safe area inset support

### Patch Changes

- Updated dependencies [[`f5d9052`](https://github.com/swiftmg0d/tempo-sync/commit/f5d9052b6cf70da7e1410649e7e575f7a97ca64e)]:
  - @tempo-sync/shared@0.1.0
