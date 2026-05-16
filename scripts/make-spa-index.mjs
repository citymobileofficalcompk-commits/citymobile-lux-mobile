// Post-build: generate dist/client/index.html so Netlify (or any static host)
// can serve the app as a SPA. We extract the hashed client entry from the
// TanStack Start manifest emitted in dist/server.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const CLIENT_DIR = "dist/client";
const SERVER_ASSETS = "dist/server/assets";

async function findManifest() {
  const files = await readdir(SERVER_ASSETS);
  const m = files.find((f) => f.startsWith("_tanstack-start-manifest_v") && f.endsWith(".js"));
  if (!m) throw new Error("TanStack Start manifest not found in dist/server/assets");
  return join(SERVER_ASSETS, m);
}

async function findCss() {
  const files = await readdir(join(CLIENT_DIR, "assets"));
  const css = files.find((f) => f.startsWith("styles-") && f.endsWith(".css"));
  return css ? `/assets/${css}` : null;
}

const manifestPath = await findManifest();
const manifestSrc = await readFile(manifestPath, "utf8");
const entryMatch = manifestSrc.match(/clientEntry:\s*"([^"]+)"/);
if (!entryMatch) throw new Error("clientEntry not found in manifest");
const clientEntry = entryMatch[1];
const cssHref = await findCss();

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>City Mobile — Premium Mobiles & Accessories Store in Pakistan</title>
    <meta name="description" content="Pakistan's trusted store for original PTA-approved smartphones, premium accessories and certified mobile repair." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap" />
    ${cssHref ? `<link rel="stylesheet" href="${cssHref}" />` : ""}
    <script type="module" src="${clientEntry}"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

await writeFile(join(CLIENT_DIR, "index.html"), html, "utf8");
console.log(`[make-spa-index] wrote ${CLIENT_DIR}/index.html (entry=${clientEntry})`);
