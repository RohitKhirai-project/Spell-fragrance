import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const FlowerAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const flowerTexture = textureLoader.load("/Flower/flower.png");

    const particles = [];
    const geometry = new THREE.PlaneGeometry(0.5, 0.5); // Adjust size as needed
    const material = new THREE.MeshBasicMaterial({
      map: flowerTexture,
      transparent: true,
    });

    const bounds = { x: 0, y: 0 };

    const setCameraBounds = () => {
      const aspect = mount.clientWidth / mount.clientHeight;
      const viewSize = 10;

      camera.left = (-aspect * viewSize) / 2;
      camera.right = (aspect * viewSize) / 2;
      camera.top = viewSize / 2;
      camera.bottom = -viewSize / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(mount.clientWidth, mount.clientHeight);

      bounds.x = camera.right;
      bounds.y = camera.top;
    };

    setCameraBounds();

    // 🎯 Center the orbit where the hero image roughly is (e.g., center of canvas)
    const orbitCenter = new THREE.Vector3(0, 0, 0); // You can tweak x/y if needed

    for (let i = 0; i < 15; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      const radius = 2 + Math.random(); // Vary distance from center
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.005 + Math.random() * 0.01;

      mesh.userData = { radius, angle, speed };
      scene.add(mesh);
      particles.push(mesh);
    }

    const animate = () => {
      requestAnimationFrame(animate);

      particles.forEach((p) => {
        p.userData.angle += p.userData.speed;

        p.position.x =
          orbitCenter.x + Math.cos(p.userData.angle) * p.userData.radius;
        p.position.y =
          orbitCenter.y + Math.sin(p.userData.angle) * p.userData.radius;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      setCameraBounds();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="flower-canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default FlowerAnimation;
