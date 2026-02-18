export interface Project {
  title: string;
  description?: string;
  url?: string;
}

export interface PortfolioData {
  name: string;
  title?: string;
  bio?: string;
  projects?: Project[];
}

export function createPortfolio(data: PortfolioData): string {
  const title = data.title || `${data.name}'s Portfolio`;
  const projectsHtml = (data.projects || [])
    .map((p) => `\n      <li>\n        <a href="${p.url || '#'}">${escapeHtml(p.title)}</a>\n        ${p.description ? `<p>${escapeHtml(p.description)}</p>` : ''}\n      </li>`)
    .join('\n');

  return `<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width,initial-scale=1">\n  <title>${escapeHtml(title)}</title>\n  <style>body{font-family:Arial,Helvetica,sans-serif;line-height:1.6;padding:20px;max-width:800px;margin:auto}h1{border-bottom:1px solid #eee;padding-bottom:0.3em}</style>\n</head>\n<body>\n  <h1>${escapeHtml(data.name)}</h1>\n  ${data.bio ? `<p>${escapeHtml(data.bio)}</p>` : ''}\n  <h2>Projects</h2>\n  <ul>${projectsHtml}\n  </ul>\n</body>\n</html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>\"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  } as any)[c]);
}

export default createPortfolio;
