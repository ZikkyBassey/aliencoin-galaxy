export function renderErrorPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Server Error</title></head>
<body style="display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;font-family:sans-serif;background:#0a0a0a;color:#fff">
  <div style="text-align:center">
    <h1 style="font-size:4rem;margin:0">500</h1>
    <p style="margin-top:1rem;color:#888">Something went wrong on our end.</p>
    <a href="/" style="display:inline-block;margin-top:1.5rem;padding:.5rem 1rem;background:#7c3aed;color:#fff;border-radius:.375rem;text-decoration:none">Go home</a>
  </div>
</body>
</html>`;
}
