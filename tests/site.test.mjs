import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

// Check generated HTML, where broken base paths actually affect visitors on GitHub Pages.
const base = '/datasavvysolutions-website/';
const pages = ['index.html', 'services/index.html', 'portfolio/index.html', 'about/index.html', 'contact/index.html', '404.html'];
const read = (path) => readFileSync(path, 'utf8');
const titles = new Set();
for (const page of pages) {
  test(`${page}: accessible structure, metadata, and working local links`, () => {
    const html = read(join('dist', page));
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, 'one primary heading');
    assert.match(html, /<html lang="en"/);
    assert.match(html, /href="#main"/);
    assert.match(html, /<main id="main"/);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.match(html, /rel="canonical" href="https:\/\/sljenkins975.github.io\/datasavvysolutions-website\//);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title), 'unique page title');
    titles.add(title);
    for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:|data:)/.test(href)) continue;
      const [pathname, fragment] = href.split('#');
      assert.ok(!pathname || pathname.startsWith(base), `base-aware URL: ${href}`);
      const relative = pathname ? pathname.slice(base.length) : page;
      const file = relative.endsWith('/') || relative === '' ? `${relative}index.html` : relative;
      assert.ok(existsSync(join('dist', file)), `destination exists: ${href}`);
      if (fragment) assert.ok(read(join('dist', file)).includes(`id="${fragment}"`), `anchor exists: ${href}`);
    }
    if (page !== '404.html') assert.equal((html.match(/aria-current="page"/g) || []).length, 1, 'one active navigation link');
  });
}

test('demo status and contact destination remain honest and usable', () => {
  const portfolio = read('dist/portfolio/index.html');
  assert.match(portfolio, /not client engagements|not client|not live yet/);
  assert.equal((portfolio.match(/Interactive demo planned/g) || []).length, 3);
  assert.match(read('dist/contact/index.html'), /mailto:sjenkins@datasavvysolutions.net/);
  assert.ok(!read('dist/contact/index.html').includes('<form'), 'no nonfunctional submission form');
  assert.ok(existsSync('dist/sitemap-index.xml'));
  assert.ok(!read('dist/sitemap-0.xml').includes('/404'), 'error page excluded from sitemap');
});

test('deployment requires an explicit manual choice and cannot change the domain', () => {
  const workflow = read('.github/workflows/site.yml');
  assert.match(workflow, /default: false/);
  assert.match(workflow, /deploy:\s*#[^\n]*\n\s*if: github.event_name == 'workflow_dispatch' && inputs.publish == true && github.ref == 'refs\/heads\/main'/);
  assert.ok(!existsSync('public/CNAME') && !existsSync('dist/CNAME'), 'no custom-domain switch');
});
