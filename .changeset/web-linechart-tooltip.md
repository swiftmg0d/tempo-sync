---
'@tempo-sync/web': patch
---

feat: custom styled tooltip for LineChart component

- Replace default Chakra Chart.Tooltip with a custom `CustomTooltip` component
- Add themed background with backdrop blur and rounded corners
- Display color-coded series indicators with dot markers
- Use tabular-nums font variant for aligned numeric values
- Show "Minute of activity" label in tooltip header
- Apply theme-aware text colors for primary and secondary content
