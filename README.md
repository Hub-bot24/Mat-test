# Mat Test — Offline Calculator (v1.0 • 2025-09-10)

This is a **GitHub Pages–ready** folder. Host it once; workers install it to their phones and it runs **100% offline**.

## Quick publish (GitHub Pages)
1. Create a new public repo named `mattest` under your GitHub account.
2. Upload the **contents** of this folder (index.html, service-worker.js, manifest.webmanifest, icons/).
3. In the repo: **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, branch `main`, folder `/root`.
4. Your URL will be: **https://USERNAME.github.io/mattest/** (replace `USERNAME` with your GitHub username).

## Install on phones
- **iPhone (Safari):** open the URL → Share → **Add to Home Screen**. Then it runs offline.
- **Android (Chrome):** open the URL → Chrome menu (⋮) → **Add to Home screen** or **Install app**.

## Version
- Footer shows **v1.0 • 2025-09-10**.
- When you update, bump the cache in `service-worker.js` (e.g., `mattest-cache-v3`).

## Optional: set a custom app name/icon
- Edit `manifest.webmanifest` and the PNG files in `icons/`.
