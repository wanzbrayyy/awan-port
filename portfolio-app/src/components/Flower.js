import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Flower(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/flower.glb');
  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes._root} />
    </group>
  );
}

useGLTF.preload('/flower.glb');
