---
"@wbce/projen-d9": patch
---

Ensure `/app/extensions` exists in the Dockerfile builder stage, so the final stage's copy no longer fails when no extension is built.
