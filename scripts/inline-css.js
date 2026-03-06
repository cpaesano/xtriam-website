// Inlines compiled CSS into static HTML files, replacing /* __INLINE_CSS__ */ placeholder
const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "../public/static/css/styles.css");
const staticPagesDir = path.join(__dirname, "../static-pages");
const outputDir = path.join(__dirname, "../public/static");

const css = fs.readFileSync(cssPath, "utf-8");

const htmlFiles = fs.readdirSync(staticPagesDir).filter((f) => f.endsWith(".html"));

for (const file of htmlFiles) {
  const srcPath = path.join(staticPagesDir, file);
  let html = fs.readFileSync(srcPath, "utf-8");
  html = html.replace("/* __INLINE_CSS__ */", css);
  fs.writeFileSync(path.join(outputDir, file), html);
  console.log(`Inlined CSS into ${file} (${Math.round(html.length / 1024)}KB)`);
}
