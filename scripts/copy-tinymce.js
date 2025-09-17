// Copy TinyMCE assets from node_modules to public/tinymce for self-hosting
// Runs on postinstall

const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  const src = path.join(process.cwd(), 'node_modules', 'tinymce');
  const dest = path.join(process.cwd(), 'public', 'tinymce');
  copyDir(src, dest);
  console.log('✅ TinyMCE assets copied to public/tinymce');
} catch (err) {
  console.warn('⚠️  TinyMCE copy skipped:', err.message);
}


