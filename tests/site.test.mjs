import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

// Check generated HTML, where broken base paths actually affect visitors on GitHub Pages.
const base = '/';
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
    assert.match(html, /rel="canonical" href="https:\/\/datasavvysolutions.net\//);
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
  assert.match(portfolio, /not client engagements/);
  assert.equal((portfolio.match(/Interactive demo planned/g) || []).length, 2);
  assert.match(read('dist/contact/index.html'), /mailto:sjenkins@datasavvysolutions.net/);
  assert.ok(!read('dist/contact/index.html').includes('<form'), 'no nonfunctional submission form');
  assert.ok(existsSync('dist/sitemap-index.xml'));
  assert.ok(!read('dist/sitemap-0.xml').includes('/404'), 'error page excluded from sitemap');
});

test('live analyzer has capabilities, synthetic disclosure, and accessible primary and source links', () => {
  // Inspect the rendered project so missing links or misplaced disclosures fail before publishing.
  const portfolio = read('dist/portfolio/index.html');
  const articles = portfolio.match(/<article\b[^>]*>[\s\S]*?<\/article>/g) || [];
  assert.equal(articles.length, 3, 'preserve the other portfolio entries');
  const analyzer = articles.find((article) => article.includes('<h2>Marketing Performance Analyzer</h2>'));
  assert.ok(analyzer, 'analyzer project exists');
  // Ensure the supplied screenshot belongs to the analyzer and remains accessible at full size.
  assert.match(analyzer, /<img[^>]+src="\/images\/marketing-performance-analyzer.png"[^>]+alt="Marketing Performance Analyzer showing synthetic sample data, performance KPIs, and executive insights\."/);
  assert.match(analyzer, /href="\/images\/marketing-performance-analyzer.png"/);
  assert.match(analyzer, /View full-size screenshot/);
  assert.match(analyzer, /Live demo/);
  assert.match(analyzer, /synthetic data.*not client results/i);
  assert.equal((analyzer.match(/<li>/g) || []).length, 3, 'key capabilities are a semantic list');
  assert.match(analyzer, /<a class="button" href="https:\/\/datasavvysolutions-marketing-analyzer-6rignvpchdeb2gyeurv3xt.streamlit.app\/">Try Live Demo <span class="sr-only">— Marketing Performance Analyzer<\/span>/);
  assert.match(analyzer, /<a class="text-link[^\"]*" href="https:\/\/github.com\/sljenkins975\/datasavvysolutions-marketing-analyzer">View Source Code <span class="sr-only">— Marketing Performance Analyzer on GitHub<\/span>/);
  for (const article of articles.filter((article) => article !== analyzer)) {
    assert.match(article, /Interactive demo planned/);
    assert.doesNotMatch(article, /Try Live Demo|View Source Code/);
    assert.doesNotMatch(article, /marketing-performance-analyzer.png/);
  }
  assert.match(read('dist/index.html'), /live Marketing Performance Analyzer with synthetic data/);
  assert.doesNotMatch(portfolio, /not live yet/);
});

test('deployment requires an explicit manual choice and cannot change the domain', () => {
  const workflow = read('.github/workflows/site.yml');
  assert.match(workflow, /default: false/);
  assert.match(workflow, /deploy:\s*#[^\n]*\n\s*if: github.event_name == 'workflow_dispatch' && inputs.publish == true && github.ref == 'refs\/heads\/main'/);
  assert.ok(!existsSync('public/CNAME') && !existsSync('dist/CNAME'), 'no custom-domain switch');
});
