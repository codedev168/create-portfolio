"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
test('creates HTML including name and project titles', () => {
    const html = (0, index_1.createPortfolio)({
        name: 'Jane Doe',
        bio: 'Developer',
        projects: [
            { title: 'Project One', description: 'First project' },
            { title: 'Project Two', url: 'https://example.com' }
        ]
    });
    expect(typeof html).toBe('string');
    expect(html).toMatch(/Jane Doe/);
    expect(html).toMatch(/Project One/);
    expect(html).toMatch(/Project Two/);
});
