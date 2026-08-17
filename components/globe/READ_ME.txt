### Dependencies to Install
Run the following command in your Next.js project root:

```bash
npm install three @types/three
```

### File Structure
To import this into your project, place these files in your `components/` or `lib/` directory:

1. `ZorahGlobe.tsx` (Main Component)
2. `GlobeUtils.ts` (Three.js & Map Utilities)
3. `GlobeStyles.css` (UI Styling)

### Important Asset
Move our GeoJSON file into your Next.js `public` folder:
- Path: `/public/geojson/countries.json`

### Import Usage
In your page (e.g., `app/page.tsx`), import it like this:

```tsx
import dynamic from 'next/dynamic';

const ZorahGlobe = dynamic(() => import('@/components/ZorahGlobe'), { ssr: false });

export default function Home() {
  return (
    <main>
      <ZorahGlobe />
    </main>
  );
}
```
