const { execSync } = require('child_process');
const fs = require('fs');

try {
  console.log("Starting build...");
  execSync('npm run build', { stdio: 'pipe' });
  console.log("Build successful.");
} catch (e) {
  console.log("Build failed. Writing logs...");
  const log = `STDOUT:\n${e.stdout ? e.stdout.toString() : ''}\n\nSTDERR:\n${e.stderr ? e.stderr.toString() : ''}\n\nERROR:\n${e.message}`;
  fs.writeFileSync('vite_error_log.txt', log, 'utf8');
}
