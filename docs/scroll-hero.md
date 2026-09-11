# Scroll hero integration

The homepage now mounts `src/components/ScrollHero.tsx` before its existing content. Three.js is dynamically imported on the client. The hero reads its own scroll bounds, seeks the GLB animation (including its embedded camera), and releases the pinned viewport into the original homepage. Scrolling backward rewinds the animation. Mobile uses the reference's separate mobile scene. Pointer parallax is desktop-only.

The readable club intro appears while loading, when reduced motion is enabled, on WebGL or model failures, and at the end of the animation. The scene stops rendering offscreen and when the tab is hidden. Resources and observers are disposed when the component unmounts. The podcast API no longer blocks the entire homepage.

## Asset status — review before merging

The defaults are the actual desktop and mobile scene URLs linked by https://razorpay.com/sprint/26:

- https://pub-6903216751f64c07b3cecf6009faf318.r2.dev/Sprint.glb
- https://pub-6903216751f64c07b3cecf6009faf318.r2.dev/Sprint_mobile.glb

These third-party models are **not bundled or rebranded**. Download attempts in this development environment returned HTTP 403. As a result the real scene's appearance and cross-origin availability have not been verified. This is an integration draft, not a verified pixel-identical finished hero. The original scene may retain Razorpay/Sprint text and artwork. The surrounding fallback/end card is Club Asymmetric in black, green, and white; the reference model scene remains blue.

For independent hosting, put appropriate scene files under `public/hero/` and configure these public build-time variables:

```
NEXT_PUBLIC_HERO_MODEL_URL=/hero/desktop.glb
NEXT_PUBLIC_HERO_MOBILE_MODEL_URL=/hero/mobile.glb
```

Models must contain animation clips and an embedded perspective camera (preferably named `DutchCamera001`). Camera animation should remain inside the scene graph. Rebuild Next.js after changing these environment variables. Draco decoders use the same versioned Google CDN as the reference page. Self-host these as well if removing third-party runtime dependencies.

## Review checks

- Desktop: scroll from the initial scene to the end, then backward; camera and objects should rewind.
- Mobile: verify framing on a real phone in both orientations. The selected model is chosen at mount; resize adjusts projection, without downloading another model during scrolling.
- Block the GLB request: readable intro and Events link remain usable and the long scroll track collapses.
- Emulate reduced motion: no scene fetch or long scroll track.
- Tab through the hero: skip link and visible Events link are reachable; invisible end-card links are hidden.
- Navigate away/back: only one canvas and one set of listeners should exist.

No deployment or merge is included in this change.
