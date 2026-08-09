# itsmebhas.net

Personal bio/link-in-bio site for Bhaskoro Muthohar.

## Tech Stack

- **Next.js 14** (Pages Router)
- **React 18**
- **styled-components** for styling
- **next-seo** for SEO metadata and JSON-LD

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deployment

Deployed to a self-hosted VPS via GitHub Actions. Push to `main` triggers automatic deployment.

## Project Structure

```
pages/          Next.js pages (index only)
components/     UI components (WebLinks, Layout, Seo)
data/           Content data (BioData, LinksData)
hooks/          Custom React hooks (useDarkMode)
styles/         Global styles and theme config
public/         Static assets (avatar, icons, background)
```
