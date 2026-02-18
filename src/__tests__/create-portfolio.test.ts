import { describe, it, expect } from 'vitest';
import createPortfolio, { createPortfolio as createPortfolioNamed } from '../index';

describe('createPortfolio', () => {
  it('renders name in h1 and default title when title not provided', () => {
    const html = createPortfolio({ name: 'John Doe' });
    expect(html).toContain('<h1>John Doe</h1>');
    expect(html).toContain("<title>John Doe's Portfolio</title>");
  });

  it('uses provided title in the page title', () => {
    const html = createPortfolio({ name: 'Jane', title: 'Custom Title' });
    expect(html).toContain('<title>Custom Title</title>');
  });

  it('renders bio when provided and omits when absent', () => {
    const withBio = createPortfolio({ name: 'A', bio: 'Hello' });
    expect(withBio).toContain('<p>Hello</p>');
    const withoutBio = createPortfolio({ name: 'B' });
    // should not contain an empty <p> with nothing
    expect(withoutBio).not.toContain('<p></p>');
  });

  it('renders projects with links, descriptions, and falls back to # when url missing', () => {
    const html = createPortfolio({
      name: 'X',
      projects: [
        { title: 'Proj1', description: 'Desc1', url: 'https://example.com' },
        { title: 'Proj2' }
      ]
    });
    expect(html).toContain('<a href="https://example.com">Proj1</a>');
    expect(html).toContain('<p>Desc1</p>');
    // second project without url should use '#'
    expect(html).toContain('<a href="#">Proj2</a>');
  });

  it('escapes HTML special characters in name, bio, and project fields', () => {
    const data = {
      name: 'Tom & Jerry <Cartoon> "Fun"\'s',
      bio: 'Bio with <b>bold</b> & stuff',
      projects: [
        { title: 'T & P <x>', description: 'D "quote" and \'' }
      ]
    } as any;

    const html = createPortfolio(data);
    expect(html).toContain('Tom &amp; Jerry &lt;Cartoon&gt; &quot;Fun&quot;&#39;s');
    expect(html).toContain('Bio with &lt;b&gt;bold&lt;/b&gt; &amp; stuff');
    expect(html).toContain('T &amp; P &lt;x&gt;');
    expect(html).toContain('D &quot;quote&quot; and &#39;');
  });

  it('default and named exports refer to the same function', () => {
    expect(createPortfolio).toBe(createPortfolioNamed);
  });
});
