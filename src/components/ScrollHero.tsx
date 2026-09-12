'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { VoicePoweredOrb } from '@/components/ui/voice-powered-orb';
import styles from './ScrollHero.module.css';

// Locally bundled scenes with Club Asymmetric labels and original animation.
const DEFAULT_DESKTOP = '/hero/desktop.glb';
const DEFAULT_MOBILE = '/hero/mobile.glb';

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
      draco.setDecoderPath('/hero/draco/');
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
        model.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.frustumCulled = false;
            (Array.isArray(child.material) ? child.material : [child.material]).forEach(material => { material.side = THREE.DoubleSide; });
          }
        });
        scene.add(model);
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
          <h1>Welcome to<br /><span>Club Asymmetric.</span></h1>
          <p>We break things!<br />We build things!</p>
          <div className={styles.ctaRow}>
            <Link href="/events" className={styles.cta}>Explore our events ↗</Link>
            <Link href="/member-application" className={styles.ctaOutline}>Apply now ↗</Link>
          </div>
          <nav className={styles.quickNav} aria-label="Quick links">
            <Link href="/about-us">About Us</Link>
            <Link href="/team">Team</Link>
            <Link href="/podcast">Podcasts</Link>
            <Link href="/contact-us">Contact Us</Link>
          </nav>
          <div className={styles.orb} aria-hidden="true">
            <div className={styles.orbFrame} />
            <VoicePoweredOrb enableVoiceControl={false} hue={215} className="relative w-full h-full rounded-full overflow-hidden" />
          </div>
        </div>
        <a className={styles.skip} href="#home-content">Skip intro ↓</a>
        {status === 'loading' && <p className={styles.loading} role="status">Preparing the experience…</p>}
        {status === 'ready' && <p className={styles.hint}>SCROLL TO EXPLORE ↓</p>}
        <div className={styles.progress} aria-hidden="true" />
      </div>
    </section>
  );
}
