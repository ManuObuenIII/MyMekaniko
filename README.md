# Motorpool System — installable web app

This folder turns the Motorpool System (Google Apps Script) into an app that
people can install on a phone or computer from a GitHub Pages link.

| File | What it is |
|---|---|
| `index.html` | The app shell. Opens the Motorpool System full screen and shows the Install prompt. |
| `config.js` | **The only file you edit.** Holds your Motorpool web app URL. |
| `manifest.webmanifest` | App name, colours and icons used when installed. |
| `sw.js` | Service worker. Makes the app installable and keeps the shell on the device. |
| `icons/` | The logo as PNG: `logo.png` (round badge), `logo-wide.png` and `logo-wide-white.png` (with the name), `logo-mechanic.png` (mechanic only, transparent), app icons 192 and 512, maskable icons, Apple icon, favicon. |
| `favicon.ico` | Browser tab icon. |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are. |

## Set up (about 5 minutes)

1. **Create the repository.** On GitHub: New repository → name it `motorpool` → Public → Create.
2. **Upload the files.** Add file → Upload files → drag in *everything inside this folder*
   (including the `icons` folder) → Commit changes.
   If `.nojekyll` does not upload by dragging, use Add file → Create new file, name it `.nojekyll`, and commit it empty.
3. **Paste your web app URL.** Open `config.js` → pencil icon → replace
   `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` with the URL from
   Apps Script → Deploy → Manage deployments (it ends with `/exec`) → Commit changes.
4. **Turn on GitHub Pages.** Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
5. After a minute the app is live at `https://YOUR-USERNAME.github.io/motorpool/`. Share that link.

The Apps Script deployment must be set to **Execute as: Me** and **Who has access: Anyone**,
the same as when the system is opened directly.

## Installing

- **Android (Chrome, Edge, Samsung Internet):** open the link → tap **Install** on the bar at the bottom
  (or browser menu → *Install app* / *Add to Home screen*).
- **iPhone / iPad (Safari):** open the link → Share button → **Add to Home Screen**.
- **Computer (Chrome, Edge):** open the link → install icon at the right of the address bar.

## Good to know

- **Offline:** the installed app still needs internet to *open*, because the system runs on Google's servers.
  Once it is open, the system's own offline mode works as before: time in/out, inspections, fuel and problem
  reports are kept on the phone and sent when the signal returns.
- **Updating the system:** when you deploy a new version in Apps Script under the *same* deployment, the URL
  does not change and nothing here needs to be touched.
- **Changing the logo:** replace the files in `icons/` with PNGs of the same names and sizes, then change
  `motorpool-shell-v1` to `v2` in `sw.js` so phones pick up the new icons.
- **Links from other systems:** anything after `?` in the GitHub link is passed to the system, so single
  sign-on links keep working.
