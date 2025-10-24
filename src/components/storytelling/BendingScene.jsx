import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export const BendingScene = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse hareketi için
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    camera.position.set(0, 4, 10);
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

    const spotLight = new THREE.SpotLight(0xffffff, 0.8);
    spotLight.position.set(0, 8, 3);
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
    floor.position.y = -1.5;
    floor.receiveShadow = true;
    scene.add(floor);

    // Apkant Presi Makinesi (Daha detaylı)
    const machineGroup = new THREE.Group();

    // Alt taban (sabit)
    const baseGeometry = new THREE.BoxGeometry(5, 0.8, 2.5);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a4d7a,
      metalness: 0.7,
      roughness: 0.3,
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.6;
    base.castShadow = true;
    machineGroup.add(base);

    // Alt kalıp (V-die)
    const lowerDieGeometry = new THREE.BoxGeometry(4, 0.3, 1.5);
    const dieMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.8,
      roughness: 0.2,
    });
    const lowerDie = new THREE.Mesh(lowerDieGeometry, dieMaterial);
    lowerDie.position.y = -0.05;
    lowerDie.castShadow = true;
    machineGroup.add(lowerDie);

    // Üst kalıp (Punch - hareket edecek)
    const upperDieGeometry = new THREE.BoxGeometry(4, 0.4, 1);
    const upperDie = new THREE.Mesh(upperDieGeometry, dieMaterial);
    upperDie.position.y = 2;
    upperDie.castShadow = true;
    machineGroup.add(upperDie);

    // Hidrolik kollar
    const hydraulicGeometry = new THREE.CylinderGeometry(0.15, 0.15, 2, 16);
    const hydraulicMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      metalness: 0.8,
      roughness: 0.2,
    });
    
    [-1.5, 1.5].forEach(xPos => {
      const hydraulic = new THREE.Mesh(hydraulicGeometry, hydraulicMaterial);
      hydraulic.position.set(xPos, 1, 0);
      hydraulic.castShadow = true;
      machineGroup.add(hydraulic);
    });

    // Üst çerçeve
    const frameGeometry = new THREE.BoxGeometry(5, 0.5, 2.5);
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a4d7a,
      metalness: 0.7,
      roughness: 0.3,
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.y = 2.5;
    frame.castShadow = true;
    machineGroup.add(frame);

    // Yan direkler
    const pillarGeometry = new THREE.BoxGeometry(0.4, 3, 0.4);
    const pillarMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a5a8a,
      metalness: 0.6,
      roughness: 0.4,
    });
    
    [[-2.3, 1, -1], [-2.3, 1, 1], [2.3, 1, -1], [2.3, 1, 1]].forEach(pos => {
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.position.set(...pos);
      pillar.castShadow = true;
      machineGroup.add(pillar);
    });

    scene.add(machineGroup);

    // Kesilen Metal Parça (Daire şeklinde kesilmiş)
    const sheetWidth = 1.4;
    const sheetHeight = 0.03;
    const sheetDepth = 1.4;
    
    // Gerçekçi metal malzeme
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.95,
      roughness: 0.05,
      envMapIntensity: 1.5,
    });

    // Düz parça (başlangıç)
    const flatSheetGeometry = new THREE.BoxGeometry(sheetWidth, sheetHeight, sheetDepth);
    const flatSheet = new THREE.Mesh(flatSheetGeometry, metalMaterial);
    flatSheet.position.set(0, 0.2, 0);
    flatSheet.castShadow = true;
    flatSheet.receiveShadow = true;
    scene.add(flatSheet);

    // Bükülmüş parça (2 parçalı)
    const bentPartGroup = new THREE.Group();
    
    const halfWidth = sheetWidth / 2;
    const leftPartGeometry = new THREE.BoxGeometry(halfWidth, sheetHeight, sheetDepth);
    const rightPartGeometry = new THREE.BoxGeometry(halfWidth, sheetHeight, sheetDepth);
    
    const leftPart = new THREE.Mesh(leftPartGeometry, metalMaterial.clone());
    const rightPart = new THREE.Mesh(rightPartGeometry, metalMaterial.clone());
    
    leftPart.position.set(-halfWidth / 2, 0, 0);
    rightPart.position.set(halfWidth / 2, 0, 0);
    
    leftPart.castShadow = true;
    rightPart.castShadow = true;
    
    bentPartGroup.add(leftPart);
    bentPartGroup.add(rightPart);
    bentPartGroup.position.set(0, 0.2, 0);
    bentPartGroup.visible = false;
    scene.add(bentPartGroup);

    // Final bükülmüş parça (tek parça - showcase için)
    const finalPartGeometry = new THREE.BoxGeometry(sheetWidth, sheetHeight, sheetDepth);
    const finalPart = new THREE.Mesh(finalPartGeometry, metalMaterial.clone());
    finalPart.position.set(0, 1, 0);
    finalPart.rotation.x = Math.PI / 6; // 30 derece ön eğim
    finalPart.castShadow = true;
    finalPart.visible = false;
    scene.add(finalPart);

    // Animation phases
    let phase = 0; // 0: positioning, 1: bending, 2: showcase
    let phaseProgress = 0;
    let upperDieStartY = 2;

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      phaseProgress += 0.008;

      if (phase === 0) {
        // Faz 1: Parçayı konumlandırma
        if (phaseProgress < 1) {
          // Parça yerinde
        } else {
          phase = 1;
          phaseProgress = 0;
          flatSheet.visible = false;
          bentPartGroup.visible = true;
        }
      } else if (phase === 1) {
        // Faz 2: Büküm işlemi
        if (phaseProgress < 1) {
          // Üst kalıbı aşağı indir
          upperDie.position.y = upperDieStartY - (phaseProgress * 1.8);
          
          // Sağ parçayı bük
          const bendAngle = phaseProgress * (Math.PI / 3); // 60 derece
          rightPart.rotation.z = -bendAngle;
          rightPart.position.x = halfWidth / 2 + Math.sin(bendAngle) * (halfWidth / 2);
          rightPart.position.y = -Math.cos(bendAngle) * (halfWidth / 2) + (halfWidth / 2);
        } else {
          phase = 2;
          phaseProgress = 0;
          // Üst kalıbı yukarı kaldır
          upperDie.position.y = upperDieStartY;
          // Bükülmüş parçayı gizle, final parçayı göster
          bentPartGroup.visible = false;
          finalPart.visible = true;
        }
      } else if (phase === 2) {
        // Faz 3: Final parçayı showcase (mouse ile döndürülebilir)
        const targetRotationX = mousePosition.y * 0.5 + Math.PI / 6;
        const targetRotationY = mousePosition.x * 0.8;
        const targetRotationZ = Math.sin(phaseProgress * 0.5) * 0.1;

        finalPart.rotation.x += (targetRotationX - finalPart.rotation.x) * 0.05;
        finalPart.rotation.y += (targetRotationY - finalPart.rotation.y) * 0.05;
        finalPart.rotation.z += (targetRotationZ - finalPart.rotation.z) * 0.05;

        // Hafif yukarı-aşağı hareket
        finalPart.position.y = 1 + Math.sin(phaseProgress * 0.5) * 0.2;
        
        // Spotlight parçayı takip etsin
        spotLight.target = finalPart;
      }

      // Hafif kamera hareketi
      camera.position.x = Math.sin(Date.now() * 0.0003) * 0.5;
      camera.position.y = 4 + Math.cos(Date.now() * 0.0002) * 0.3;
      camera.lookAt(0, 0.5, 0);

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
      [baseGeometry, lowerDieGeometry, upperDieGeometry, hydraulicGeometry,
       frameGeometry, pillarGeometry, flatSheetGeometry, leftPartGeometry,
       rightPartGeometry, finalPartGeometry, floorGeometry].forEach(g => g.dispose());
      [baseMaterial, dieMaterial, hydraulicMaterial, frameMaterial,
       pillarMaterial, metalMaterial, floorMaterial].forEach(m => m.dispose());
    };
  }, [mousePosition]);

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

