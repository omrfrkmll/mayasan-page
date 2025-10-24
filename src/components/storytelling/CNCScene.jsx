import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export const CNCScene = () => {
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
    camera.position.set(4, 3, 7);
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

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(8, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(-3, 5, 3);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Zemin
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      metalness: 0.3,
      roughness: 0.7,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    scene.add(floor);

    // CNC Torna Makinesi (Daha detaylı)
    const machineGroup = new THREE.Group();

    // Ana makine gövdesi
    const bodyGeometry = new THREE.BoxGeometry(6, 1.5, 2.5);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a5a8a,
      metalness: 0.7,
      roughness: 0.3,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -0.75;
    body.castShadow = true;
    machineGroup.add(body);

    // İş mili (Spindle) housing
    const spindleHousingGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.5, 32);
    const spindleHousingMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.8,
      roughness: 0.2,
    });
    const spindleHousing = new THREE.Mesh(spindleHousingGeometry, spindleHousingMaterial);
    spindleHousing.rotation.z = Math.PI / 2;
    spindleHousing.position.set(-2, 0, 0);
    spindleHousing.castShadow = true;
    machineGroup.add(spindleHousing);

    // Kuyruk mili (Tailstock)
    const tailstockGeometry = new THREE.BoxGeometry(0.6, 0.8, 1);
    const tailstockMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      metalness: 0.7,
      roughness: 0.3,
    });
    const tailstock = new THREE.Mesh(tailstockGeometry, tailstockMaterial);
    tailstock.position.set(2, 0, 0);
    tailstock.castShadow = true;
    machineGroup.add(tailstock);

    // Takım revolveri (Tool turret)
    const turretGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.6, 8);
    const turretMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      metalness: 0.8,
      roughness: 0.2,
    });
    const turret = new THREE.Mesh(turretGeometry, turretMaterial);
    turret.position.set(0, 0.8, 0);
    turret.castShadow = true;
    machineGroup.add(turret);

    // Kontrol paneli
    const controlPanelGeometry = new THREE.BoxGeometry(0.8, 1, 0.2);
    const controlPanelMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.5,
      roughness: 0.5,
    });
    const controlPanel = new THREE.Mesh(controlPanelGeometry, controlPanelMaterial);
    controlPanel.position.set(3, 0.5, -1.5);
    controlPanel.rotation.y = -Math.PI / 6;
    controlPanel.castShadow = true;
    machineGroup.add(controlPanel);

    // Ekran (yeşil glow)
    const screenGeometry = new THREE.PlaneGeometry(0.5, 0.4);
    const screenMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.7,
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(3, 0.5, -1.4);
    screen.rotation.y = -Math.PI / 6;
    machineGroup.add(screen);

    scene.add(machineGroup);

    // Hammadde (Metal Kütük)
    const rawMaterialGeometry = new THREE.CylinderGeometry(0.4, 0.4, 2.5, 32);
    const rawMaterialMaterial = new THREE.MeshStandardMaterial({
      color: 0x999999,
      metalness: 0.9,
      roughness: 0.3,
    });
    const rawMaterial = new THREE.Mesh(rawMaterialGeometry, rawMaterialMaterial);
    rawMaterial.rotation.z = Math.PI / 2;
    rawMaterial.position.set(0, 0, 0);
    rawMaterial.castShadow = true;
    scene.add(rawMaterial);

    // Kesici Takım
    const toolGeometry = new THREE.ConeGeometry(0.08, 0.4, 8);
    const toolMaterial = new THREE.MeshStandardMaterial({
      color: 0xffaa00,
      metalness: 0.9,
      roughness: 0.1,
    });
    const cuttingTool = new THREE.Mesh(toolGeometry, toolMaterial);
    cuttingTool.rotation.z = Math.PI / 2;
    cuttingTool.position.set(0.5, 0.5, 0);
    cuttingTool.castShadow = true;
    scene.add(cuttingTool);

    // İşlenmiş Parça (Final)
    const machinedPartGeometry = new THREE.CylinderGeometry(0.25, 0.35, 2, 32);
    const machinedPartMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.95,
      roughness: 0.05,
      envMapIntensity: 1.5,
    });
    const machinedPart = new THREE.Mesh(machinedPartGeometry, machinedPartMaterial);
    machinedPart.rotation.z = Math.PI / 2;
    machinedPart.position.set(0, 0, 0);
    machinedPart.castShadow = true;
    machinedPart.visible = false;
    scene.add(machinedPart);

    // Talaş Parçacıkları
    const chipsGroup = new THREE.Group();
    const chipGeometry = new THREE.BoxGeometry(0.015, 0.015, 0.04);
    const chipMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.7,
      roughness: 0.3,
    });

    for (let i = 0; i < 80; i++) {
      const chip = new THREE.Mesh(chipGeometry, chipMaterial);
      chip.position.set(
        (Math.random() - 0.5) * 2,
        Math.random() * 1.5 - 1.5,
        (Math.random() - 0.5) * 2
      );
      chip.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      chip.velocity = {
        x: (Math.random() - 0.5) * 0.02,
        y: Math.random() * 0.03 + 0.01,
        z: (Math.random() - 0.5) * 0.02,
      };
      chip.visible = false;
      chip.castShadow = true;
      chipsGroup.add(chip);
    }
    scene.add(chipsGroup);

    // Animation
    let machiningProgress = 0;
    let toolAngle = 0;
    let showChips = false;
    let chipsShown = 0;

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      machiningProgress += 0.004;

      // Hammaddeyi döndür (yüksek hız)
      rawMaterial.rotation.x += 0.08;

      // Kesici takımı hareket ettir (radyal ve eksenel)
      toolAngle += 0.04;
      cuttingTool.position.y = 0.5 + Math.sin(toolAngle) * 0.25;
      cuttingTool.position.z = Math.cos(toolAngle) * 0.25;
      
      // Takım ileri-geri hareket
      cuttingTool.position.x = 0.5 + Math.sin(machiningProgress * 2) * 0.3;

      // İşleme ilerlemesi
      if (machiningProgress > 0.3 && machiningProgress < 1) {
        // Hammaddenin boyutunu küçült (işleme simülasyonu)
        const scale = 1 - (machiningProgress - 0.3) * 0.35;
        rawMaterial.scale.set(scale, 1, scale);

        // Talaşları göster (kademeli)
        if (!showChips) {
          showChips = true;
        }
        
        if (showChips && chipsShown < chipsGroup.children.length) {
          if (Math.random() > 0.7) {
            chipsGroup.children[chipsShown].visible = true;
            chipsGroup.children[chipsShown].position.set(
              cuttingTool.position.x + (Math.random() - 0.5) * 0.2,
              cuttingTool.position.y,
              cuttingTool.position.z + (Math.random() - 0.5) * 0.2
            );
            chipsShown++;
          }
        }

        // Talaşları hareket ettir (düşme ve yayılma)
        chipsGroup.children.forEach((chip) => {
          if (chip.visible) {
            chip.position.x += chip.velocity.x;
            chip.position.y -= chip.velocity.y;
            chip.position.z += chip.velocity.z;
            chip.rotation.x += 0.05;
            chip.rotation.y += 0.03;
            chip.rotation.z += 0.04;
            
            // Yere çarpma
            if (chip.position.y < -1.8) {
              chip.velocity.y = 0;
              chip.velocity.x *= 0.95;
              chip.velocity.z *= 0.95;
            }
          }
        });
      }

      // İşlenmiş parçayı göster
      if (machiningProgress > 1) {
        rawMaterial.visible = false;
        machinedPart.visible = true;
        cuttingTool.visible = false;

        // İşlenmiş parçayı showcase (döndür ve parlat)
        machinedPart.rotation.x += 0.015;
        machinedPart.rotation.y += 0.02;
        machinedPart.position.y = Math.sin((machiningProgress - 1) * 2) * 0.2;
        
        // Spotlight parçayı takip etsin
        spotLight.target = machinedPart;
      }

      // Hafif kamera hareketi
      camera.position.x = 4 + Math.sin(Date.now() * 0.0004) * 0.5;
      camera.position.y = 3 + Math.cos(Date.now() * 0.0003) * 0.3;
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
      [bodyGeometry, spindleHousingGeometry, tailstockGeometry, turretGeometry,
       controlPanelGeometry, screenGeometry, rawMaterialGeometry, toolGeometry,
       machinedPartGeometry, chipGeometry, floorGeometry].forEach(g => g.dispose());
      [bodyMaterial, spindleHousingMaterial, tailstockMaterial, turretMaterial,
       controlPanelMaterial, screenMaterial, rawMaterialMaterial, toolMaterial,
       machinedPartMaterial, chipMaterial, floorMaterial].forEach(m => m.dispose());
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

