# @tempo-sync/web

## 0.1.3

### Patch Changes

- [#26](https://github.com/swiftmg0d/tempo-sync/pull/26) [`c6ca427`](https://github.com/swiftmg0d/tempo-sync/commit/c6ca4273ca691c8fbc5feb5fd63ff2ecbf887134) Thanks [@swiftmg0d](https://github.com/swiftmg0d)! - Fix infinite scroll pagination in session recommendations - replaced scroll-based interaction detection with wheel/touchmove events that fire even when content doesn't overflow the container

## 0.1.2

### Patch Changes

- [#24](https://github.com/swiftmg0d/tempo-sync/pull/24) [`fd797df`](https://github.com/swiftmg0d/tempo-sync/commit/fd797df207d1ae451b0c5bcbf205234a5cce6a87) Thanks [@swiftmg0d](https://github.com/swiftmg0d)! - feat: custom styled tooltip for LineChart component
  - Replace default Chakra Chart.Tooltip with a custom `CustomTooltip` component
  - Add themed background with backdrop blur and rounded corners
  - Display color-coded series indicators with dot markers
  - Use tabular-nums font variant for aligned numeric values
  - Show "Minute of activity" label in tooltip header
  - Apply theme-aware text colors for primary and secondary content

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
