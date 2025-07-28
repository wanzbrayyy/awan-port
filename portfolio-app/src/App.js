import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Admin from './components/Admin';
import Fox from './components/Fox';
import Planet from './components/Planet';
import Flower from './components/Flower';
import './components/Admin.css';

const themes = [
  { id: 'theme1', name: 'Theme 1', model: 'box' },
  { id: 'theme2', name: 'Theme 2', model: 'sphere' },
  { id: 'theme3', name: 'Fox', model: 'fox' },
  { id: 'theme4', name: 'Planet', model: 'planet' },
  { id: 'theme5', name: 'Flower', model: 'flower' },
];

function Box(props) {
  const ref = useRef();
  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}

function Sphere(props) {
  const ref = useRef();
  return (
    <mesh {...props} ref={ref}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}

export default function App() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0].id);
  const [customizations, setCustomizations] = useState({
    color: 'orange',
    scale: 1,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
  });

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  const handleCustomize = (property, value) => {
    setCustomizations({ ...customizations, [property]: value });
  };

  const currentTheme = themes.find((theme) => theme.id === selectedTheme);

  return (
    <div>
      <Admin
        themes={themes}
        selectedTheme={selectedTheme}
        onThemeChange={handleThemeChange}
        onCustomize={handleCustomize}
      />
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          {currentTheme.model === 'box' && (
            <Box
              position={[0, 0, 0]}
              color={customizations.color}
              scale={customizations.scale}
              rotation={[customizations.rotationX, customizations.rotationY, customizations.rotationZ]}
            />
          )}
          {currentTheme.model === 'sphere' && (
            <Sphere
              position={[0, 0, 0]}
              color={customizations.color}
              scale={customizations.scale}
              rotation={[customizations.rotationX, customizations.rotationY, customizations.rotationZ]}
            />
          )}
          {currentTheme.model === 'fox' && (
            <Fox
              position={[0, -0.5, 0]}
              scale={[0.02, 0.02, 0.02]}
              color={customizations.color}
              rotation={[customizations.rotationX, customizations.rotationY, customizations.rotationZ]}
            />
          )}
          {currentTheme.model === 'planet' && (
            <Planet
              position={[0, 0, 0]}
              scale={[0.1, 0.1, 0.1]}
              color={customizations.color}
              rotation={[customizations.rotationX, customizations.rotationY, customizations.rotationZ]}
            />
          )}
          {currentTheme.model === 'flower' && (
            <Flower
              position={[0, -0.5, 0]}
              scale={[0.5, 0.5, 0.5]}
              color={customizations.color}
              rotation={[customizations.rotationX, customizations.rotationY, customizations.rotationZ]}
            />
          )}
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
