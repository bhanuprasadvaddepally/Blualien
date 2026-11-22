# Cleanup Log — Blualien Website

**Branch:** `cleanup/delete-unused`  
**Base Commit:** `6cbc92b` ("before cleanup")  
**Policy:** Allowed actions only (deletion of verified unused files). Zero code changes, refactors, renames, or visual regressions.

---

## 1. Summary of Removal

- **Total Files Removed:** 8 files (plus temporary untracked scratch runner scripts)
- **Total Disk Space Saved:** **1,765,258 bytes (~1.77 MB / 1.68 MiB)**
- **Production Build:** Passing cleanly (`npm run build` exits 0 with 0 warnings)
- **Status of Branch:** `cleanup/delete-unused` maintained without merge, exactly as instructed.

---

## 2. DELETED Files

The following 8 files in `client/public/media/` were confirmed unused. Each was verified to have **0 references** across the active application (`client/src/`, `client/index.html`, `server/`, CSS, and all data files). None of them are work video sources or active project posters.

| # | File Path | Size (Bytes) | Size (KB) | Proof Unused |
|---|---|---|---|---|
| 1 | `client/public/media/SaveClip.App_717993462_18112537765700965_44668066580500013_n.jpg` | 270,047 B | ~263.7 KB | 0 references in `client/src` or `client/index.html`; omitted from `client/src/data/work.js`. Only referenced in legacy archive. |
| 2 | `client/public/media/SaveClip.App_718118551_18112537756700965_8543366915307433218_n.jpg` | 193,251 B | ~188.7 KB | 0 references in `client/src` or `client/index.html`; omitted from `client/src/data/work.js`. Only referenced in legacy archive. |
| 3 | `client/public/media/We asked ourselves one question...What if Niro had no creative limits@the.blualien @nirobrothers (1).jpg` | 202,847 B | ~198.1 KB | Duplicate variant omitted from active `workData` in `client/src/data/work.js`. 0 code imports or markup references. |
| 4 | `client/public/media/We asked ourselves one question...What if Niro had no creative limits@the.blualien @nirobrothers (2).jpg` | 326,950 B | ~319.3 KB | Duplicate variant omitted from active `workData` in `client/src/data/work.js`. 0 code imports or markup references. |
| 5 | `client/public/media/We asked ourselves one question...What if Niro had no creative limits@the.blualien @nirobrothers (3).jpg` | 341,829 B | ~333.8 KB | Duplicate variant omitted from active `workData` in `client/src/data/work.js`. 0 code imports or markup references. |
| 6 | `client/public/media/We didnt want to make another ad for sneakers.We wanted to build something people would rememb.heic (2).jpg` | 187,981 B | ~183.6 KB | Duplicate variant omitted from active `workData` in `client/src/data/work.js`. 0 code imports or markup references. |
| 7 | `client/public/media/We didnt want to make another ad for sneakers.We wanted to build something people would rememb.heic (3).jpg` | 98,782 B | ~96.5 KB | Duplicate variant omitted from active `workData` in `client/src/data/work.js`. 0 code imports or markup references. |
| 8 | `client/public/media/We didnt want to make another ad for sneakers.We wanted to build something people would rememb.heic (4).jpg` | 143,571 B | ~140.2 KB | Duplicate variant omitted from active `workData` in `client/src/data/work.js`. 0 code imports or markup references. |

---

## 3. KEPT-UNSURE Files

Per the explicit prompt rules ("old static site folder only if I approve it" and "NEVER DELETE: ... or is a ... logo ... IF UNSURE: do not delete"), the following items were kept and listed for user review:

| Path / Folder | Size | Reason Kept |
|---|---|---|
| `legacy/` (entire folder, 29 files) | ~1.5 MB | User explicitly stated: *"old static site folder only if I approve it"*. Contains the original static React prototype. Kept intact until approved for removal. |
| `Blualien_Complete_Website_Specification (1).pdf` | 2,367,294 B (~2.37 MB) | Project brief and product design specification PDF. Not imported in code, but kept as reference documentation. |
| `client/public/brand/blualien-logo-uploaded.jpg` | 30,654 B (~30.0 KB) | Original user-uploaded brand logo asset (1024×1024). Protected under the *"NEVER DELETE ... logo"* instruction. |
| `client/public/brand/blualien-logo-lime.png` | 113,077 B (~110.4 KB) | Lime-recolored logo variant. Protected under the *"NEVER DELETE ... logo"* instruction. |
| `CLEANUP_REPORT.md` | ~21 KB | Prior task audit and repository documentation. |
| `MIGRATION.md` | ~6.5 KB | Initial step migration map documentation. |

---

## 4. Final Build Verification

Running `npm run build` after all deletions:
```bash
vite v6.4.6 building for production...
transforming...
✓ 2031 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                         3.26 kB │ gzip:  1.04 kB
dist/assets/index-CnehsPpG.css         33.09 kB │ gzip:  6.42 kB
dist/assets/building-2-Bze9NqeL.js      0.61 kB │ gzip:  0.35 kB
dist/assets/sparkles-kl0JiV0D.js        0.68 kB │ gzip:  0.40 kB
dist/assets/analytics-obqRyb_c.js       1.85 kB │ gzip:  0.91 kB
dist/assets/Work-L5OxO9y8.js            3.07 kB │ gzip:  1.31 kB
dist/assets/services-CulhfxFg.js        8.97 kB │ gzip:  2.90 kB
dist/assets/Work-BUGBnFd6.js           16.38 kB │ gzip:  5.13 kB
dist/assets/ContentPages-CtyEBj1L.js   20.78 kB │ gzip:  5.49 kB
dist/assets/Contact-CnX-qBwl.js        64.76 kB │ gzip: 15.72 kB
dist/assets/Home-CTNLfw9q.js          150.20 kB │ gzip: 46.78 kB
dist/assets/index-D1lnth6k.js         216.96 kB │ gzip: 71.28 kB
✓ built in 18.33s
```
**Exit Code:** 0 (clean build, 0 errors, 0 warnings).
