# Data Savvy Solutions website

A responsive Astro + Tailwind CSS business website. Includes Home, Services, Portfolio, About, Contact, and a helpful 404 page. Portfolio projects are explicitly labeled demo concepts, with no invented client work or results.

## Publication status

**Published with owner approval on November 2, 2026:** [Data Savvy Solutions](https://sljenkins975.github.io/datasavvysolutions-website/). GitHub Pages uses the GitHub Actions build source. Pushes and pull requests run checks only; they never deploy. The deploy job requires a manual workflow run on `main` with `publish` explicitly selected.

No DNS records, Namecheap settings, email records, Zoho settings, or Google Workspace subscriptions were changed for this launch. The existing custom-domain site remains in place. There is intentionally no `CNAME` file; connecting `datasavvysolutions.net` requires separate approval.

## Run locally

Use Node.js 24 LTS or a supported newer even-numbered release (Astro requires at least 22.23.4). The commands below are run from this repository's folder.

```sh
# Install the exact versions in package-lock.json for a repeatable setup.
npm ci

# Start the development server and open the local address it prints.
npm run dev

# Check component types before generating production files.
npm run check

# Generate the static website in dist/; this does not publish anything.
npm run build

# Inspect generated links, page metadata, demo labels, and the publishing gate.
npm test

# Serve the generated site locally for a final visual review.
npm run preview
```

The local site uses `/datasavvysolutions-website/`, matching the live GitHub Pages path. `package.json` is strict JSON, so explanations for its commands live here instead of invalid JSON comments. `private: true` prevents accidental publication as an npm package; the GitHub repository itself is public.

## Where to edit

| File | Purpose |
| --- | --- |
| `src/pages/` | The five main pages and 404 page |
| `src/layouts/Layout.astro` | Shared navigation, footer, metadata, and keyboard skip link |
| `src/styles/global.css` | Tailwind import, navy/blue palette, responsive styles |
| `src/components/Dashboard.astro` | Lightweight dashboard illustration with fictional data |
| `src/data/projects.ts` | Demo descriptions and future external app links |
| `astro.config.mjs` | Static build, Pages address, base path, and sitemap |
| `.github/workflows/site.yml` | Automatic validation and manual-only deployment |
| `tests/site.test.mjs` | Checks against built output; run after building |

Comments explain why key code and configuration choices exist. The site needs no client JavaScript, database, analytics tracker, cookies, or external font service. Contact opens the visitor's email app; it does not submit or store messages. Mailbox delivery was not tested as part of website publication; verify it separately during the Zoho migration.

## Publish only after owner approval

1. Review the copy, demo labels, desktop/mobile appearance, and contact email. Confirm the email is receiving messages.
2. Obtain explicit owner approval to publish the website. Repository creation is not website-launch approval.
3. In repository **Settings → Pages**, choose **GitHub Actions** as the build source. Leave the custom domain blank.
4. In **Actions → Check website and optionally publish → Run workflow**, choose `main`, select `publish`, and run it.
5. Verify the successful deployment and visit `https://sljenkins975.github.io/datasavvysolutions-website/`.

The workflow grants publishing permissions only to the deploy job. Future automatic deployment on pushes would be a separate approved change. A later approved domain cutover must update `site`, `base`, and `public/robots.txt`, adapt the path checks, and rebuild before changing any domain settings.

**Domain and email are separate changes.** Before any approved Namecheap update, record the existing zone and identify the website-only records. Preserve MX, SPF, DKIM, DMARC, verification, and other mail-related records. Do not replace the DNS zone or cancel Google Workspace as part of website deployment. Domain cutover and email migration require their own review.

## Portfolio integration and future Streamlit apps

The Marketing Performance Analyzer entry links to the [live synthetic-data demo](https://datasavvysolutions-marketing-analyzer-6rignvpchdeb2gyeurv3xt.streamlit.app/) and its [public source](https://github.com/sljenkins975/datasavvysolutions-marketing-analyzer). Its capabilities, disclosure, and URLs live in `src/data/projects.ts`. The portfolio reuses the site's responsive layout, focus styling, and wrapping actions; links open in the same tab so browser Back returns to the portfolio. The other two projects remain planned concepts. Built-output tests cover the links, disclosure, availability, and existing metadata/deployment checks.

GitHub Pages serves this static website; Streamlit apps will be separate Python applications hosted separately. No app has been deployed by this setup.

1. Build each demo in a separate repository with fictional or public sample data and its own dependency file.
2. Review the app and obtain approval before making it publicly available.
3. Add the reviewed HTTPS app address to that project's `appUrl` in `src/data/projects.ts`.
4. Update the page-level availability notice, project description, and the demo-status test to reflect the actual availability. Keep the demo label even after launch.
5. Build and test this site; follow the manual website-publishing process above.

Empty app URLs show availability text, not dead buttons. Client data, passwords, service keys, and private exports do not belong in either public repository.

## Reference documentation

- [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Astro and Tailwind CSS](https://docs.astro.build/en/guides/styling/#tailwind)

The workflow intentionally adds an approval gate to the standard deployment example.
