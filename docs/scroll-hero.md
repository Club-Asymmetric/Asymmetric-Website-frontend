# Club Asymmetric scroll hero

## Install this update

Copy the bundle's `src/components/` and `public/hero/` folders into your Next.js project, replacing the previous ScrollHero component and assets. Clear any `NEXT_PUBLIC_HERO_MODEL_URL` and `NEXT_PUBLIC_HERO_MOBILE_MODEL_URL` values pointing to the original Sprint URLs: the component now defaults to `/hero/desktop.glb` and `/hero/mobile.glb`.

If you already applied the previous homepage patch, no homepage changes are needed. Otherwise import `ScrollHero` from `@/components/ScrollHero`, render `<ScrollHero />` above the homepage content, and give the following section `id="home-content"` for the skip link. Ensure the hero can render without waiting for podcast/API data.

Dependencies (already present in the earlier patch):

```bash
npm install three@0.170.0
npm install -D @types/three@0.170.0
```

Restart the development server after copying the files. The rendered 3D text is part of the models, not HTML overlays. The Register Now label is visual scene content, not a clickable registration control; the existing Events link is functional.

## Changes in both scene files

| Original surface | New wording |
| --- | --- |
| Shoe label | ASYMMETRIC |
| Agentic Commerce | WORKSHOPS / MCP |
| Payment Completed | iOS DEVELOPMENT |
| Ask me anything | Explore workshops |
| Global Checkout | TECH FIESTA |
| Magic Checkout | HACKSYMMETRIC (two lines) |
| Buy now | REGISTER NOW |
| SPRINT 26 | WELCOME TO CLUB ASYMMETRIC |
| 100+ LAUNCHES & UPDATES | WE BREAK THINGS |

Original lettering geometry is replaced, including removal of the shoe's old texture reference and original right-shoe glyph primitive. The new shoe glyphs use skin weights and a smooth fitted surface to follow the existing animation. Camera paths, rigs, other objects, and animation timing remain unchanged. The scene retains its blue/white objects against a black background; the HTML end card uses black, green, and white.

The source scenes are from the user-requested reference at https://razorpay.com/sprint/26. Desktop and mobile assets and Draco decoders are now bundled locally, removing the earlier remote model dependency. Original scene URLs:

- https://pub-6903216751f64c07b3cecf6009faf318.r2.dev/Sprint.glb
- https://pub-6903216751f64c07b3cecf6009faf318.r2.dev/Sprint_mobile.glb

## Validation

- Both edited GLBs pass the Khronos glTF validator with zero errors. Eleven warnings remain in each scene.
- TypeScript check passed.
- Desktop scene rendered in headless Chromium at multiple animation times; shoe, workshop, Tech Fiesta, Hacksymmetric and welcome labels inspected.
- Separate mobile model rendered at a portrait viewport.

The repeatable model edit script is `scripts/rebrand-hero.mjs`. It requires original, unmodified source GLBs and the installed Three.js package. Do not run it against the already rebranded files; it deliberately checks the expected source mesh names. Source and output must be different files.

No GitHub push, merge, or production deployment was performed. The earlier connector write-access restriction remains unresolved.
