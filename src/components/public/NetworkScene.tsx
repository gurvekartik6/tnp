import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NetworkScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 100);
      camera.position.z = 6.4;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
      renderer.setSize(innerWidth, innerHeight, false);

      const group = new THREE.Group();
      scene.add(group);

      const count = 190;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i += 1) {
        const radius = 2.1 + Math.random() * 3.1;
        const angle = Math.random() * Math.PI * 2;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 3.4;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const pointsMaterial = new THREE.PointsMaterial({ color: 0x76a9ff, size: 0.028, transparent: true, opacity: 0.48, depthWrite: false });
      const points = new THREE.Points(geometry, pointsMaterial);
      group.add(points);

      const ringGeometry = new THREE.TorusGeometry(1.35, 0.012, 16, 128);
      const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x5b8cff, transparent: true, opacity: 0.28, depthWrite: false });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      group.add(ring);

      const ring2Geometry = new THREE.TorusGeometry(1.7, 0.009, 16, 128);
      const ring2Material = new THREE.MeshBasicMaterial({ color: 0xd7b56d, transparent: true, opacity: 0.2, depthWrite: false });
      const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
      ring2.rotation.x = Math.PI / 2.6;
      group.add(ring2);

      const target = { x: 0, y: 0 };
      const onPointerMove = (event: MouseEvent) => {
        target.y = (event.clientX / innerWidth - 0.5) * 0.18;
        target.x = (event.clientY / innerHeight - 0.5) * 0.12;
      };

      let frame = 0;
      const tick = () => {
        group.rotation.x += (target.x - group.rotation.x) * 0.018;
        group.rotation.y += (target.y - group.rotation.y) * 0.018;
        ring.rotation.z += 0.0018;
        ring2.rotation.z -= 0.001;
        points.rotation.y += 0.00022;
        renderer?.render(scene, camera);
        frame = requestAnimationFrame(tick);
      };

      const onResize = () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer?.setSize(innerWidth, innerHeight, false);
      };

      addEventListener('mousemove', onPointerMove, { passive: true });
      addEventListener('resize', onResize);
      tick();

      return () => {
        cancelAnimationFrame(frame);
        removeEventListener('mousemove', onPointerMove);
        removeEventListener('resize', onResize);
        geometry.dispose();
        pointsMaterial.dispose();
        ringGeometry.dispose();
        ringMaterial.dispose();
        ring2Geometry.dispose();
        ring2Material.dispose();
        renderer?.dispose();
      };
    } catch {
      canvas.style.display = 'none';
      renderer?.dispose();
    }
  }, []);

  return <canvas ref={ref} className="hero-network" aria-hidden="true" />;
}
