---
'@tempo-sync/web': patch
---

Fix infinite scroll pagination in session recommendations - replaced scroll-based interaction detection with wheel/touchmove events that fire even when content doesn't overflow the container
