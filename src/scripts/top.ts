// Procedural 3D battle-top (original geometry: torus attack ring with teeth,
// ridged lathe energy layer, cone tip). No copied models, logos, or assets.
// Palette is read from the page's CSS custom properties so it follows the
// Paper / Dusk / Ink reading themes: ink-on-paper, one muted amber accent.
import * as THREE from 'three';

const ACCENT = '#c08a4a'; // the single muted accent

function cssVar(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

export function mountTop(container: HTMLElement): void {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); // capped

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
  camera.position.set(0, 1.7, 6.4);
  camera.lookAt(0, 0.15, 0);

  scene.add(new THREE.AmbientLight(0xfff6e8, 0.95));
  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(3, 5, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffe2b8, 0.55);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const ink = new THREE.Color(cssVar('--ink', '#211e1a'));
  const paper = new THREE.Color(cssVar('--paper', '#f4f1ea'));
  const accent = new THREE.Color(ACCENT);
  const matInk = new THREE.MeshStandardMaterial({ color: ink, roughness: 0.42, metalness: 0.28 });
  const matPaper = new THREE.MeshStandardMaterial({ color: paper, roughness: 0.62, metalness: 0.05 });
  const matAccent = new THREE.MeshStandardMaterial({ color: accent, roughness: 0.5, metalness: 0.2 });

  const top = new THREE.Group();

  // wide attack ring: torus + teeth around the rim
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.26, 18, 72), matInk);
  ring.rotation.x = Math.PI / 2;
  top.add(ring);
  for (let i = 0; i < 14; i++) {
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.2, 0.3), matInk);
    const a = (i / 14) * Math.PI * 2;
    tooth.position.set(Math.cos(a) * 1.63, 0, Math.sin(a) * 1.63);
    tooth.rotation.y = -a;
    top.add(tooth);
  }

  // ridged energy layer: lathe with a zigzag profile
  const pts: THREE.Vector2[] = [];
  const steps = 9;
  for (let i = 0; i <= steps; i++) {
    const y = -0.55 + (1.1 * i) / steps;
    const r = i % 2 === 0 ? 1.28 : 1.04;
    pts.push(new THREE.Vector2(r, y));
  }
  pts.push(new THREE.Vector2(0.62, 0.62), new THREE.Vector2(0.001, 0.68));
  top.add(new THREE.Mesh(new THREE.LatheGeometry(pts, 48), matPaper));

  // one muted accent band around the energy layer
  const band = new THREE.Mesh(new THREE.TorusGeometry(1.16, 0.05, 10, 48), matAccent);
  band.rotation.x = Math.PI / 2;
  band.position.y = 0.0;
  top.add(band);

  // center disk, shaft, cap
  const disk = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.34, 40), matInk);
  disk.position.y = 0.56;
  top.add(disk);
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.72, 20), matInk);
  shaft.position.y = 0.88;
  top.add(shaft);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 14), matAccent);
  cap.position.y = 1.24;
  top.add(cap);

  // tip: downward cone + point
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.7, 24), matInk);
  tip.rotation.x = Math.PI;
  tip.position.y = -0.9;
  top.add(tip);
  const point = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 10), matPaper);
  point.position.y = -1.24;
  top.add(point);

  top.position.y = 0.3;
  scene.add(top);

  // soft fake shadow on the "paper"
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1.5, 40),
    new THREE.MeshBasicMaterial({ color: ink, transparent: true, opacity: 0.1 }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.32;
  scene.add(shadow);

  // ---- animation state ----
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const idleSpeed = reduced.matches ? 0.4 : 2.4;
  let speed = idleSpeed;
  let targetSpeed = idleSpeed;
  let wobble = reduced.matches ? 0 : 0.05;
  let targetWobble = wobble;
  let raf = 0;
  let running = false;
  let inView = true;
  let visible = !document.hidden;
  const clock = new THREE.Clock();

  function resize() {
    const w = Math.min(container.clientWidth || 300, 1200);
    const h = Math.min(container.clientHeight || 300, 1200);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  new ResizeObserver(resize).observe(container);

  function frame() {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    (container as HTMLElement).dataset.frames = String(Number((container as HTMLElement).dataset.frames || 0) + 1);
    speed += (targetSpeed - speed) * Math.min(1, dt * 2.2);
    wobble += (targetWobble - wobble) * Math.min(1, dt * 1.5);
    top.rotation.y += speed * dt;
    top.rotation.z = Math.sin(t * 2.1) * wobble;
    top.rotation.x = Math.cos(t * 1.7) * wobble * 0.6;
    top.position.y = 0.3 + Math.sin(t * 1.3) * 0.03;
    shadow.scale.setScalar(1 + Math.sin(t * 1.3) * 0.02);
    renderer.render(scene, camera);
  }
  function start() {
    if (!running) {
      running = true;
      clock.getDelta();
      raf = requestAnimationFrame(frame);
    }
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }
  function updateRunning() {
    if (visible && inView) start();
    else stop();
  }

  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
    updateRunning();
  });
  new IntersectionObserver((es) => {
    inView = es[0].isIntersecting;
    updateRunning();
  }).observe(container);
  reduced.addEventListener?.('change', () => {
    targetSpeed = reduced.matches ? 0.4 : 2.4;
    targetWobble = reduced.matches ? 0 : 0.05;
  });

  // click / tap / Enter launches: spin ramps up, wobbles, then settles
  let launching = false;
  function launch() {
    if (launching) return;
    launching = true;
    targetSpeed = 22;
    targetWobble = 0.22;
    window.setTimeout(() => {
      targetSpeed = reduced.matches ? 0.4 : 2.4;
      targetWobble = reduced.matches ? 0 : 0.05;
      launching = false;
    }, 1400);
  }
  container.addEventListener('click', launch);
  container.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      launch();
    }
  });

  updateRunning();
}
