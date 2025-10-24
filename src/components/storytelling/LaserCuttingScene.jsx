import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export const LaserCuttingScene = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(5, 4, 8);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Lighting - Daha gerçekçi aydınlatma
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.8);
    spotLight.position.set(0, 8, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Lazer ışığı için mavi nokta ışık
    const laserLight = new THREE.PointLight(0x00ffff, 2, 10);
    laserLight.position.set(0, 2, 0);
    scene.add(laserLight);

    // Zemin (Makine tabanı)
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      metalness: 0.3,
      roughness: 0.7,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.5;
    floor.receiveShadow = true;
    scene.add(floor);

    // Lazer Kesim Masası (Daha detaylı)
    const tableGroup = new THREE.Group();
    
    // Ana masa yüzeyi
    const tableGeometry = new THREE.BoxGeometry(6, 0.1, 4);
    const tableMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.6,
      roughness: 0.4,
    });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.y = 0;
    table.castShadow = true;
    table.receiveShadow = true;
    tableGroup.add(table);

    // Masa ayakları
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 16);
    const legMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.7,
      roughness: 0.3,
    });
    
    const legPositions = [
      [-2.5, -0.5, -1.5],
      [2.5, -0.5, -1.5],
      [-2.5, -0.5, 1.5],
      [2.5, -0.5, 1.5],
    ];
    
    legPositions.forEach(pos => {
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      leg.position.set(...pos);
      leg.castShadow = true;
      tableGroup.add(leg);
    });

    scene.add(tableGroup);

    // Metal Sac (Gerçekçi metal malzeme)
    const sheetGeometry = new THREE.BoxGeometry(3, 0.02, 2);
    const sheetMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.95,
      roughness: 0.05,
      envMapIntensity: 1.5,
    });
    const sheet = new THREE.Mesh(sheetGeometry, sheetMaterial);
    sheet.position.set(0, 0.06, 0);
    sheet.castShadow = true;
    sheet.receiveShadow = true;
    scene.add(sheet);

    // Lazer Kafası Sistemi (Daha detaylı)
    const laserHeadGroup = new THREE.Group();
    
    // Ana lazer kafası gövdesi
    const headBodyGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.6, 16);
    const headBodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.8,
      roughness: 0.2,
    });
    const headBody = new THREE.Mesh(headBodyGeometry, headBodyMaterial);
    headBody.castShadow = true;
    laserHeadGroup.add(headBody);

    // Lazer nozulu
    const nozzleGeometry = new THREE.ConeGeometry(0.08, 0.2, 16);
    const nozzleMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.9,
      roughness: 0.1,
    });
    const nozzle = new THREE.Mesh(nozzleGeometry, nozzleMaterial);
    nozzle.position.y = -0.4;
    laserHeadGroup.add(nozzle);

    // Montaj kolu
    const armGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 16);
    const armMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      metalness: 0.7,
      roughness: 0.3,
    });
    const arm = new THREE.Mesh(armGeometry, armMaterial);
    arm.position.y = 1;
    arm.castShadow = true;
    laserHeadGroup.add(arm);

    laserHeadGroup.position.set(-1.5, 1.5, 0);
    scene.add(laserHeadGroup);

    // Lazer Işını (Daha gerçekçi)
    const beamGeometry = new THREE.CylinderGeometry(0.015, 0.015, 1.4, 16);
    const beamMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3300,
      transparent: true,
      opacity: 0.9,
    });
    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.position.set(-1.5, 0.8, 0);
    scene.add(beam);

    // Lazer ışını halo efekti
    const haloGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.4, 16);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.3,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.position.set(-1.5, 0.8, 0);
    scene.add(halo);

    // Kesim yolu (Daha karmaşık şekil - dikdörtgen içinde daire)
    const pathPoints = [];
    const outerRadius = 0.7;
    const segments = 64;
    
    // Dış daire
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pathPoints.push(
        new THREE.Vector3(
          Math.cos(angle) * outerRadius,
          0.07,
          Math.sin(angle) * outerRadius
        )
      );
    }

    const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const pathMaterial = new THREE.LineBasicMaterial({
      color: 0xff3300,
      linewidth: 2,
    });
    const cuttingPath = new THREE.Line(pathGeometry, pathMaterial);
    cuttingPath.visible = false;
    scene.add(cuttingPath);

    // Kesim ışığı efekti (parlama)
    const glowGeometry = new THREE.CircleGeometry(0.1, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.7,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = 0.08;
    scene.add(glow);

    // Animation
    let progress = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      progress += 0.003;
      if (progress > 1) progress = 0;

      const currentSegment = Math.floor(progress * segments);
      const currentPoint = pathPoints[currentSegment];
      
      if (currentPoint) {
        // Lazer kafasını hareket ettir
        laserHeadGroup.position.x = currentPoint.x;
        laserHeadGroup.position.z = currentPoint.z;
        
        // Lazer ışınını hareket ettir
        beam.position.x = currentPoint.x;
        beam.position.z = currentPoint.z;
        halo.position.x = currentPoint.x;
        halo.position.z = currentPoint.z;
        
        // Parlama efektini hareket ettir
        glow.position.x = currentPoint.x;
        glow.position.z = currentPoint.z;
        
        // Lazer ışığını hareket ettir
        laserLight.position.x = currentPoint.x;
        laserLight.position.z = currentPoint.z;

        // Kesim yolunu göster
        if (progress > 0.05) {
          cuttingPath.visible = true;
        }
      }

      // Lazer ışınının parlaklığını animasyonla değiştir
      const pulse = Math.sin(Date.now() * 0.01) * 0.15 + 0.85;
      beamMaterial.opacity = pulse;
      haloMaterial.opacity = pulse * 0.3;
      glowMaterial.opacity = pulse * 0.7;
      laserLight.intensity = 2 + pulse;

      // Hafif kamera hareketi
      camera.position.x = 5 + Math.sin(Date.now() * 0.0005) * 0.5;
      camera.position.y = 4 + Math.cos(Date.now() * 0.0003) * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
      // Dispose geometries and materials
      [tableGeometry, legGeometry, sheetGeometry, headBodyGeometry, 
       nozzleGeometry, armGeometry, beamGeometry, haloGeometry, 
       pathGeometry, glowGeometry, floorGeometry].forEach(g => g.dispose());
      [tableMaterial, legMaterial, sheetMaterial, headBodyMaterial,
       nozzleMaterial, armMaterial, beamMaterial, haloMaterial,
       pathMaterial, glowMaterial, floorMaterial].forEach(m => m.dispose());
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 w-full h-full"
    />
  );
};

