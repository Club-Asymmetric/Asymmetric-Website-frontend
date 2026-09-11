'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './ScrollHero.module.css';

// Replace with self-hosted, club-branded GLBs when available. These are the
// scene URLs referenced by https://razorpay.com/sprint/26, not generated assets.
const DEFAULT_DESKTOP = 'https://pub-6903216751f64c07b3cecf6009faf318.r2.dev/Sprint.glb';
const DEFAULT_MOBILE = 'https://pub-6903216751f64c07b3cecf6009faf318.r2.dev/Sprint_mobile.glb';

// The stock scene ships two "label card" materials with baked-in Razorpay
// copy: BlueTag (the shoe hang-tags, reads "SPRINT/26") and AdSpends (a
// floating stat card, reads "CONVERSIONS"). We swap their textures at
// runtime for club branding/terms instead of editing the third-party GLB.
const SHOE_TAG_TEXT = 'CLUB ASYMMETRIC';
const AD_CARD_SLIDES: { title: string; subtitle?: string }[] = [
  { title: 'WELCOME TO', subtitle: 'CLUB ASYMMETRIC' },
  { title: '100+ UPDATES', subtitle: 'AVAILABLE' },
  { title: 'TECH FIESTA' },
  { title: 'WORKSHOPS' },
  { title: 'MCP' },
  { title: 'IOS DEVELOPMENT' },
  { title: 'HACKSYMMETRIC', subtitle: 'REGISTER NOW' },
  { title: 'MAGIC CHECKOUT', subtitle: 'BUY NOW' },
  { title: 'WE BREAK THINGS' },
];
const AD_CARD_INTERVAL_MS = 3000;

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, startFontSize: number, maxLines: number) {
  const words = text.toUpperCase().split(' ');
  let fontSize = startFontSize;
  let lines: string[] = [];
  while (fontSize > startFontSize * 0.4) {
    ctx.font = `700 ${fontSize}px Inter, Arial, sans-serif`;
    lines = [];
    let line = '';
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (ctx.measureText(candidate).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) lines.push(line);
    if (lines.length <= maxLines) break;
    fontSize -= startFontSize * 0.05;
  }
  return { lines, fontSize };
}

function makeLabelTexture(THREE: typeof import('three'), slide: { title: string; subtitle?: string }, size = 1024) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const pad = size * 0.045;
  const radius = size * 0.08;
  ctx.fillStyle = '#00008b';
  ctx.beginPath();
  if (typeof (ctx as any).roundRect === 'function') {
    (ctx as any).roundRect(pad, pad, size - pad * 2, size - pad * 2, radius);
  } else {
    const w = size - pad * 2, h = size - pad * 2, x = pad, y = pad, r = radius;
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
  }
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const maxWidth = size * 0.78;

  const title = wrapLines(ctx, slide.title, maxWidth, size * (slide.subtitle ? 0.12 : 0.15), 3);
  const subtitle = slide.subtitle ? wrapLines(ctx, slide.subtitle, maxWidth, size * 0.08, 2) : null;

  const titleLineHeight = title.fontSize * 1.15;
  const subtitleLineHeight = subtitle ? subtitle.fontSize * 1.15 : 0;
  const gap = subtitle ? size * 0.03 : 0;
  const titleBlockHeight = title.lines.length * titleLineHeight;
  const subtitleBlockHeight = subtitle ? subtitle.lines.length * subtitleLineHeight : 0;
  const totalHeight = titleBlockHeight + gap + subtitleBlockHeight;

  let y = size / 2 - totalHeight / 2 + titleLineHeight / 2;
  ctx.font = `700 ${title.fontSize}px Inter, Arial, sans-serif`;
  title.lines.forEach(line => { ctx.fillText(line, size / 2, y); y += titleLineHeight; });

  if (subtitle) {
    y += gap - titleLineHeight / 2 + subtitleLineHeight / 2;
    ctx.font = `600 ${subtitle.fontSize}px Inter, Arial, sans-serif`;
    subtitle.lines.forEach(line => { ctx.fillText(line, size / 2, y); y += subtitleLineHeight; });
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export default function ScrollHero() {
  const section = useRef<HTMLElement>(null);
  const mount = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');

  useEffect(() => {
    const host = mount.current;
    const root = section.current;
    if (!host || !root) return;
    let disposed = false;
    let teardown = () => {};
    let labelTimer: number | undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) { setStatus('fallback'); return; }
    const timeout = window.setTimeout(() => setStatus('fallback'), 15000);

    async function start() {
      const [THREE, { GLTFLoader }, { DRACOLoader }] = await Promise.all([
        import('three'), import('three/examples/jsm/loaders/GLTFLoader.js'),
        import('three/examples/jsm/loaders/DRACOLoader.js'),
      ]);
      if (disposed || !host || !root) return;
      const mobile = host.clientWidth < 768;
      const renderer = new THREE.WebGLRenderer({ antialias: !mobile, powerPreference: mobile ? 'low-power' : 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.75;
      host.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#080b09');
      scene.fog = new THREE.Fog('#080b09', 8, 60);
      let camera = new THREE.PerspectiveCamera(75, 1, 0.001, 1000);
      let mixer: import('three').AnimationMixer | undefined;
      let model: import('three').Group | undefined;
      let duration = 0;
      const actions: import('three').AnimationAction[] = [];
      let progress = 0;
      let target = 0;
      let frame = 0;
      let active = true;
      let last = 0;
      const pointer = new THREE.Vector2();
      const smoothPointer = new THREE.Vector2();
      const draco = new DRACOLoader();
      draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
      const loader = new GLTFLoader().setDRACOLoader(draco);
      const release = (object: import('three').Object3D) => {
        const textures = new Set<import('three').Texture>();
        object.traverse(child => {
          if (!(child instanceof THREE.Mesh)) return;
          child.geometry.dispose();
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach(material => {
            Object.values(material).forEach(value => { if (value instanceof THREE.Texture) textures.add(value); });
            material.dispose();
          });
        });
        textures.forEach(texture => texture.dispose());
      };
      const readScroll = () => {
        const rect = root.getBoundingClientRect();
        target = THREE.MathUtils.clamp(-rect.top / Math.max(1, root.offsetHeight - host.clientHeight), 0, 1);
      };
      const draw = (time: number) => {
        frame = 0;
        if (disposed || !active || document.hidden || !mixer) return;
        const dt = Math.min((time - last) / 1000 || 1 / 60, 0.1);
        last = time;
        progress = THREE.MathUtils.damp(progress, target, 12, dt);
        if (Math.abs(progress - target) < 0.0001) progress = target;
        actions.forEach(action => { action.paused = false; });
        mixer.setTime(Math.min(progress * duration, Math.max(0, duration - 0.01)));
        const saved = camera.position.clone();
        const rotation = camera.rotation.clone();
        if (!mobile) {
          smoothPointer.lerp(pointer, 1 - Math.exp(-6 * dt));
          camera.position.x += smoothPointer.x * THREE.MathUtils.lerp(0.2, 1.4, Math.min(progress / 0.3, 1));
          camera.position.y += smoothPointer.y * 0.15;
          camera.rotation.y -= smoothPointer.x * 0.04;
        } else camera.position.x += 0.35;
        renderer.render(scene, camera);
        camera.position.copy(saved);
        camera.rotation.copy(rotation);
        root.dataset.revealed = String(progress > 0.93);
        root.style.setProperty('--hero-progress', String(progress));
        root.style.setProperty('--hero-reveal', String(THREE.MathUtils.clamp((progress - 0.93) / 0.07, 0, 1)));
        if (Math.abs(target - progress) > 0.0001 || smoothPointer.distanceTo(pointer) > 0.0001) wake();
      };
      function wake() { if (!frame && active && !disposed && !document.hidden) frame = requestAnimationFrame(draw); }
      const scroll = () => { readScroll(); wake(); };
      const resize = () => {
        renderer.setSize(host.clientWidth, host.clientHeight);
        camera.aspect = host.clientWidth / Math.max(1, host.clientHeight);
        camera.updateProjectionMatrix();
        scroll();
      };
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' || mobile) return;
        const rect = host.getBoundingClientRect();
        pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -((event.clientY - rect.top) / rect.height * 2 - 1));
        wake();
      };
      const leave = () => { pointer.set(0, 0); wake(); };
      const contextLost = (event: Event) => { event.preventDefault(); setStatus('fallback'); active = false; };
      const motionChanged = () => { if (reducedMotion.matches) { active = false; setStatus('fallback'); } };
      const observer = new IntersectionObserver(([entry]) => { active = entry.isIntersecting && !reducedMotion.matches; if (active) scroll(); });
      observer.observe(root);
      const sizing = new ResizeObserver(resize);
      sizing.observe(host);
      window.addEventListener('scroll', scroll, { passive: true });
      document.addEventListener('visibilitychange', wake);
      host.addEventListener('pointermove', move);
      host.addEventListener('pointerleave', leave);
      renderer.domElement.addEventListener('webglcontextlost', contextLost);
      reducedMotion.addEventListener('change', motionChanged);
      teardown = () => {
        if (labelTimer) window.clearInterval(labelTimer);
        cancelAnimationFrame(frame);
        observer.disconnect(); sizing.disconnect();
        window.removeEventListener('scroll', scroll);
        document.removeEventListener('visibilitychange', wake);
        host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave);
        reducedMotion.removeEventListener('change', motionChanged);
        renderer.domElement.removeEventListener('webglcontextlost', contextLost);
        if (model) release(model);
        mixer?.stopAllAction();
        if (model) mixer?.uncacheRoot(model);
        draco.dispose(); renderer.dispose(); renderer.domElement.remove();
      };
      const url = mobile
        ? process.env.NEXT_PUBLIC_HERO_MOBILE_MODEL_URL || DEFAULT_MOBILE
        : process.env.NEXT_PUBLIC_HERO_MODEL_URL || DEFAULT_DESKTOP;
      loader.load(url, gltf => {
        if (disposed) { release(gltf.scene); return; }
        clearTimeout(timeout);
        model = gltf.scene;
        const embedded = gltf.cameras.find(item => item.name.includes('DutchCamera001')) || gltf.cameras[0];
        if (!(embedded instanceof THREE.PerspectiveCamera) || !gltf.animations.length) { setStatus('fallback'); return; }
        camera = embedded; camera.near = 0.001; camera.far = 1000;
        // The scene's stock MainBlue/EmissionDarkBlue/LightBlue materials are
        // left as their native blue — that's the theme now, no override needed.
        model.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.frustumCulled = false;
            (Array.isArray(child.material) ? child.material : [child.material]).forEach(material => { material.side = THREE.DoubleSide; });
          }
        });
        scene.add(model);

        // Re-brand the two baked-in text cards: the shoe hang-tags and the
        // floating stat card (see SHOE_TAG_TEXT / AD_CARD_SLIDES above).
        const swapLabel = (mesh: import('three').Mesh, matName: string, slide: { title: string; subtitle?: string }) => {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat: any, i: number) => {
            if (mat.name !== matName) return;
            const clone = mat.clone();
            const texture = makeLabelTexture(THREE, slide);
            // Some of these materials render via emissiveMap (baseColor is
            // pure black), others via the plain baseColor map — swap
            // whichever slot the original actually used for visible content.
            if (clone.emissiveMap) {
              clone.emissiveMap.dispose();
              clone.emissiveMap = texture;
            } else {
              clone.map?.dispose();
              clone.map = texture;
            }
            clone.needsUpdate = true;
            if (Array.isArray(mesh.material)) mesh.material[i] = clone;
            else mesh.material = clone;
          });
        };
        model.traverse(child => {
          if (child instanceof THREE.Mesh) swapLabel(child, 'BlueTag', { title: SHOE_TAG_TEXT });
        });
        // The right shoe tag also carries two raised-geometry primitives that
        // spell "SPRINT/26" as actual embossed 3D lettering (not a texture,
        // so it can't be redrawn) — hide just those two, keep the tag itself.
        const labelR = model.getObjectByName('Label_R.001');
        labelR?.traverse(child => {
          if (!(child instanceof THREE.Mesh)) return;
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          if (mats.some((m: any) => m.name === 'EmissionLESSWhite' || m.name === 'EmissionText.001')) {
            child.visible = false;
          }
        });
        let adSlideIndex = 0;
        const cycleAdCard = () => {
          model?.traverse(child => {
            if (child instanceof THREE.Mesh) {
              swapLabel(child, 'AdSpends', AD_CARD_SLIDES[adSlideIndex % AD_CARD_SLIDES.length]);
            }
          });
          adSlideIndex++;
          wake();
        };
        cycleAdCard();
        labelTimer = window.setInterval(cycleAdCard, AD_CARD_INTERVAL_MS);

        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach(clip => {
          const action = mixer!.clipAction(clip);
          action.setLoop(THREE.LoopOnce, 1); action.clampWhenFinished = true; action.play(); actions.push(action);
        });
        duration = Math.max(...gltf.animations.map(clip => clip.duration));
        setStatus(reducedMotion.matches ? 'fallback' : 'ready');
        resize();
      }, undefined, () => { if (!disposed) { clearTimeout(timeout); setStatus('fallback'); } });
    }
    start().catch(() => { if (!disposed) { clearTimeout(timeout); setStatus('fallback'); } });
    return () => { disposed = true; clearTimeout(timeout); teardown(); };
  }, []);

  return (
    <section ref={section} className={styles.section} data-status={status} aria-label="Welcome to Club Asymmetric">
      <div className={styles.viewport}>
        <div ref={mount} className={styles.canvas} aria-hidden="true" />
        <div className={styles.intro}>
          <p className={styles.eyebrow}>CHENNAI INSTITUTE OF TECHNOLOGY</p>
          <h1>Think beyond.<br /><span>Build Asymmetric.</span></h1>
          <p>A community for curious minds, bold ideas, and people who build.</p>
          <Link href="/events" className={styles.cta}>Explore our events ↗</Link>
        </div>
        <a className={styles.skip} href="#home-content">Skip intro ↓</a>
        {status === 'loading' && <p className={styles.loading} role="status">Preparing the experience…</p>}
        {status === 'ready' && <p className={styles.hint}>SCROLL TO EXPLORE ↓</p>}
        <div className={styles.progress} aria-hidden="true" />
      </div>
    </section>
  );
}
