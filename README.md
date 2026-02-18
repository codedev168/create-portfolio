# @codedev168/create-portfolio

Generate a simple portfolio website HTML string from structured data.

Usage:

```ts
import createPortfolio from '@codedev168/create-portfolio';

const html = createPortfolio({
  name: 'Jane Doe',
  bio: 'Full-stack developer',
  projects: [
    { title: 'App', description: 'A cool app', url: 'https://example.com' }
  ]
});

// write html to a file or serve it
```

Build:

npm run build

Test:

npm test
