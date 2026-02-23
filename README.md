# Sehh2279 Web Group Project

Simple static web app containing pages for book cataloguing and analytics used in the course project.

## Project structure

- wireframe.html — initial layout sketch
- Sehh2279_web_GroupProject/ — main site files
  - BookCatalog.html, BookCatalog.js, BookCatalog.css
  - BookAnalytic.html, BookAnalytic.js, BookAnalytic.css
  - Dashboard.html, Dashboard.js, Dashboard.css
  - LateReturns.html, LateReturns.js, LateReturns.css

## How to run

This is a static site. To view it locally, open the desired `.html` file in a web browser (for example, open `Sehh2279_web_GroupProject/BookCatalog.html`). To test relative paths reliably, serve the folder with a simple static server, e.g.:

Windows (PowerShell):

```powershell
python -m http.server 8000
```

Then visit http://localhost:8000/ in your browser and navigate to the files.

## Notes for contributors

- Keep CSS and JS files modular and named consistently.
- Preserve existing file names and paths to avoid breaking links.

## Future development

Planned improvements and feature ideas (prioritized):

1. Improve accessibility and responsive layout
   - Add ARIA attributes, semantic markup, and keyboard navigation support
   - Ensure layouts work on mobile/tablet (media queries)

2. Client-side data persistence
   - Replace hard-coded data with JSON files or IndexedDB/localStorage
   - Add import/export for catalog data (CSV/JSON)

3. Search, filtering, and sorting
   - Advanced catalog search with filters (author, genre, availability)
   - Pagination for large catalogs

4. Interactive analytics
   - Use charting library (Chart.js / D3) for visual reports
   - Add date-range controls and exportable charts

5. Authentication and backend API (long-term)
   - Add a lightweight backend (Node/Express) and simple auth
   - Persist data in a small database (SQLite/Postgres)

If you'd like, I can open issues for these items or scaffold a basic static-server and sample JSON data next.
