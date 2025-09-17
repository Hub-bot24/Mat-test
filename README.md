# Progressive Web App (PWA) Setup

This repository contains a PWA with GitHub Pages hosting.

## 🚀 Deployment Notes

- The app uses a **service worker** for caching.
- Each time you push updates, bump the cache version in `service-worker.js`:

```js
const CACHE_NAME = "tristate-cache-v4"; // update v3 → v4 → v5...
```

This forces browsers to fetch the latest files.

## 🛠 Updating the Site

1. Make your changes locally.
2. Update the cache version number in `service-worker.js`.
3. Commit and push to GitHub:

```bash
git add .
git commit -m "Update site content and bump cache version"
git push
```

4. Reload your GitHub Pages site. The new content will appear immediately.

## 🧹 Clearing Cache Manually

If needed, you can still open `/sw-kill.html` in your GitHub Pages site to unregister the service worker and clear cache manually.

---

✅ With this setup, users should always see your latest changes without having to manually clear their cache.
