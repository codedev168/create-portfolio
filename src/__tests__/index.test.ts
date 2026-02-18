import { describe, it, expect, vi } from 'vitest';
import { createPortfolio, escapeHtml } from '../index.js';

describe('escapeHtml', () => {
  it.each([
    ['&', '&amp;'],
    ['<', '&lt;'],
    ['>', '&gt;'],
    ['"', '&quot;'],
    ["'", '&#39;'],
  ])('replaces %s with %s', (input, expected) => {
    expect(escapeHtml(input)).toBe(expected);
  });
});

describe('createPortfolio', () => {
  it('generates basic HTML structure with minimal data', () => {
    const data = { name: 'Alice', projects: [] };
    const html = createPortfolio(data);
    expect(html).toContain('<h1>Alice</h1>');
    expect(html).toContain('<h2>Projects</h2>');
    expect(html).toContain('<ul>\n  </ul>');
  });

  it('includes bio when provided', () => {
    const data = {
      name: 'Bob',
      bio: 'Web developer',
      projects: [],
    };
    const html = createPortfolio(data);
    expect(html).toContain('<p>Web developer</p>');
  });

  it('uses custom title when provided', () => {
    const data = {
      name: 'Charlie',
      title: "Charlie's Awesome Portfolio",
      projects: [],
    };
    const html = createPortfolio(data);
    expect(html).toContain('<title>Charlie&#39;s Awesome Portfolio</title>');
  });

  it('defaults title to name\'s portfolio when not provided', () => {
    const data = { name: 'Dana', projects: [] };
    const html = createPortfolio(data);
    expect(html).toContain('<title>Dana\'s Portfolio</title>');
  });

  it('renders projects with URLs and descriptions', () => {
    const data = {
      name: 'Eve',
      projects: [
        {
          title: 'Project 1',
          url: 'https://example.com',
          description: 'A great project',
        },
        {
          title: 'Project 2',
          description: 'Another project',
        },
      ],
    };
    const html = createPortfolio(data);
    expect(html).toContain('<a href="https://example.com">Project 1</a>');
    expect(html).toContain('<p>A great project</p>');
    expect(html).toContain('<a href="#">Project 2</a>');
    expect(html).toContain('<p>Another project</p>');
  });

  it('escapes HTML in project titles and descriptions', () => {
    const data = {
      name: 'Frank',
      projects: [
        {
          title: '<script>alert("XSS")</script>',
          description: 'Description with & special <chars>.',
        },
      ],
    };
    const html = createPortfolio(data);
    expect(html).toContain(
      '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
    );
    expect(html).toContain('Description with &amp; special &lt;chars&gt;.');
  });

  it('escapes HTML in name and bio', () => {
    const data = {
      name: '<b>George</b>',
      bio: 'Bio with <a href="#">link</a>.',
      projects: [],
    };
    const html = createPortfolio(data);
    expect(html).toContain('&lt;b&gt;George&lt;/b&gt;');
    expect(html).toContain('Bio with &lt;a href=&quot;#&quot;&gt;link&lt;/a&gt;.');
  });

  it('handles empty projects array', () => {
    const data = { name: 'Helen' };
    const html = createPortfolio(data);
    expect(html).toContain('<ul>\n  </ul>');
  });

  it('renders multiple projects correctly', () => {
    const data = {
      name: 'Irene',
      projects: [
        { title: 'Project A' },
        { title: 'Project B', url: 'https://projectb.com' },
      ],
    };
    const html = createPortfolio(data);
    expect(html).toContain('<a href="#">Project A</a>');
    expect(html).toContain('<a href="https://projectb.com">Project B</a>');
  });
});