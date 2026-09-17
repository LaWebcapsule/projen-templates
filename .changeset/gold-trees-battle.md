---
"@wbce/projen-d9": minor
---

Add the `d9-to-cedar` and `cedar-to-d9` CLI commands, porting the Cedar permission
translation validated in app-api2. `d9-to-cedar` generates one folder of Cedar policies per
role from `directus_permissions.csv`; `cedar-to-d9` merges them back into the CSV and runs
as part of `apply-schema` whenever a `./permissions` folder is present.
