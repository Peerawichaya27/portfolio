import * as THREE from 'three';

/** Original, procedural instrument. No model downloads or external textures. */
export function createGuitarWorld(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 1, 15);
  const guitar = new THREE.Group();
  scene.add(guitar);
  const wood = new THREE.MeshStandardMaterial({
    color: 0x99552e,
    roughness: 0.32,
    metalness: 0.12,
  });
  const edge = new THREE.MeshStandardMaterial({ color: 0x392218, roughness: 0.5 });
  const ivory = new THREE.MeshStandardMaterial({ color: 0xe4c99b, roughness: 0.38 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x211b17, roughness: 0.65 });
  const chrome = new THREE.MeshStandardMaterial({
    color: 0xd8c5a0,
    metalness: 0.85,
    roughness: 0.22,
  });
  const stringMaterial = new THREE.LineBasicMaterial({ color: 0xe9dbc2 });
  const body = new THREE.Shape();
  body.moveTo(0, 1.15);
  body.bezierCurveTo(-0.3, 1.15, -0.35, 0.7, -0.8, 0.7);
  body.bezierCurveTo(-1.35, 0.72, -1.4, 0.05, -0.92, -0.4);
  body.bezierCurveTo(-0.68, -0.65, -1.65, -0.95, -1.46, -1.85);
  body.bezierCurveTo(-1.28, -2.8, 1.28, -2.8, 1.46, -1.85);
  body.bezierCurveTo(1.65, -0.95, 0.68, -0.65, 0.92, -0.4);
  body.bezierCurveTo(1.4, 0.05, 1.35, 0.72, 0.8, 0.7);
  body.bezierCurveTo(0.35, 0.7, 0.3, 1.15, 0, 1.15);
  const bodyGeometry = new THREE.ExtrudeGeometry(body, {
    depth: 0.34,
    bevelEnabled: true,
    bevelSize: 0.1,
    bevelThickness: 0.08,
    bevelSegments: 4,
    steps: 1,
    curveSegments: 32,
  });
  guitar.add(new THREE.Mesh(bodyGeometry, [wood, edge]));
  function box(
    width: number,
    height: number,
    depth: number,
    material: THREE.Material,
    x: number,
    y: number,
    z: number,
  ) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.position.set(x, y, z);
    guitar.add(mesh);
    return mesh;
  }
  box(0.4, 3.55, 0.2, edge, 0, 2.45, 0.12);
  box(0.43, 3.55, 0.05, dark, 0, 2.45, 0.27);
  box(0.6, 1.08, 0.18, wood, 0.07, 4.65, 0.08).rotation.z = -0.12;
  box(0.43, 0.06, 0.1, ivory, 0, 4.16, 0.31);
  box(0.75, 0.18, 0.13, chrome, 0, -1.6, 0.47);
  box(0.66, 0.23, 0.1, dark, 0, -0.1, 0.42);
  box(0.66, 0.23, 0.1, dark, 0, -0.72, 0.42);
  // A cream pickguard follows the waist without hiding the wood body.
  const guard = new THREE.Shape();
  guard.moveTo(0.3, 0.65);
  guard.bezierCurveTo(1, 0.7, 0.8, -0.15, 0.55, -0.45);
  guard.lineTo(0.65, -1.25);
  guard.lineTo(0.3, -1.35);
  guard.closePath();
  const pickguard = new THREE.Mesh(new THREE.ShapeGeometry(guard), ivory);
  pickguard.position.z = 0.445;
  guitar.add(pickguard);
  for (let i = 0; i < 18; i++) {
    const y = 0.8 + (1 - Math.pow(0.88, i + 1)) * 3.45;
    box(0.43, 0.014, 0.025, chrome, 0, y, 0.31);
    if ([2, 4, 6, 8, 11, 14, 16].includes(i)) {
      const marker = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), ivory);
      marker.position.set(0, y - 0.06, 0.325);
      guitar.add(marker);
    }
  }
  const strings: { geometry: THREE.BufferGeometry; x: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const x = (i - 2.5) * 0.057;
    const points = Array.from({ length: 33 }, (_, segment) => {
      const t = segment / 32;
      return new THREE.Vector3(x, -1.65 + t * 6.6, 0.56 - t * 0.31);
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    strings.push({ geometry, x });
    guitar.add(new THREE.Line(geometry, stringMaterial));
    const side = i < 3 ? -1 : 1;
    const y = 4.35 + (i % 3) * 0.27;
    box(0.2, 0.09, 0.12, chrome, side * 0.36, y, 0.13);
  }
  for (const [x, y] of [
    [0.75, -1.3],
    [0.85, -1.7],
  ]) {
    const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.13, 0.12, 24), chrome);
    knob.rotation.x = Math.PI / 2;
    knob.position.set(x, y, 0.49);
    guitar.add(knob);
  }
  guitar.position.y = -0.8;
  scene.add(new THREE.HemisphereLight(0xffeed9, 0x29201c, 3));
  const key = new THREE.DirectionalLight(0xffe3ba, 5);
  key.position.set(-4, 7, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 4);
  rim.position.set(5, 1, -3);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xb8c8dc, 1.5);
  fill.position.set(-5, -2, 2);
  scene.add(fill);
  let width = 0,
    height = 0;
  return {
    render(
      progress: number,
      pointerX: number,
      pointerY: number,
      entrance = 1,
      vibration = 0,
      phase = 0,
    ) {
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      if (!w || !h) return;
      if (w !== width || h !== height) {
        width = w;
        height = h;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      // Framed for the editor's preview pane: centered, pulled back when the pane is tall.
      const narrow = w / h < 0.9;
      guitar.rotation.set(
        0.08 + progress * 0.35 + pointerY * 0.08 + (1 - entrance) * 0.6,
        -0.45 + progress * Math.PI * 1.6 + pointerX * 0.12 + (1 - entrance) * Math.PI * 1.3,
        -0.38 + progress * 0.8 - (1 - entrance) * 1.4,
      );
      guitar.position.x = (1 - entrance) * 4;
      guitar.position.y = -0.8 - progress * 0.3 - (1 - entrance) * 3;
      guitar.scale.setScalar(0.6 + entrance * 0.4);
      camera.position.z = (narrow ? 18 : 15.5) - progress * 1.5 - (1 - entrance) * 5;
      strings.forEach(({ geometry, x }, index) => {
        const positions = geometry.getAttribute('position');
        for (let segment = 0; segment < positions.count; segment++) {
          const t = segment / (positions.count - 1);
          positions.setX(
            segment,
            x +
              Math.sin(t * Math.PI) *
                Math.sin(phase + index * 0.7 + t * Math.PI * 3) *
                vibration *
                0.045,
          );
        }
        positions.needsUpdate = true;
      });
      camera.lookAt(0, 0.5, 0);
      renderer.render(scene, camera);
    },
    dispose() {
      const geometries = new Set<THREE.BufferGeometry>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line)
          geometries.add(object.geometry);
      });
      geometries.forEach((geometry) => geometry.dispose());
      [wood, edge, ivory, dark, chrome, stringMaterial].forEach((material) => material.dispose());
      renderer.dispose();
    },
  };
}
