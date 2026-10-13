---
"@wbce/projen-d9": patch
---

Use `npm install` instead of `npm ci` in the Dockerfile builder stage, which failed with `Missing: sonic-boom@5.0.2 from lock file`.
