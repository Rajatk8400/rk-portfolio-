import React, { useMemo } from 'react'
import { useTexture, Text } from '@react-three/drei'
import * as THREE from 'three'

export default function Walls(props) {  
  const [wallExtTexture, wallInTexture] = useTexture([
    './Textures/WallExt.jpg',
    './Textures/WallIn.jpg'
  ])

  // Clone and flatten the old 3D extruded letters ("MAXIME HOUSE") flush into the wall surface
  const cleanWallExtGeometry = useMemo(() => {
    if (!props.nodes?.WallExtMerge?.geometry) return null;
    const geom = props.nodes.WallExtMerge.geometry.clone();
    const pos = geom.attributes.position;
    
    for (let i = 0; i < pos.count; i++) {
      const lx = pos.getX(i);
      const ly = pos.getY(i);
      const lz = pos.getZ(i);
      // Vertices of extruded letters on front wall in local coordinates
      if (lz > 3.96 && ly > 1.2 && ly < 3.3 && lx > -2.8 && lx < -0.3) {
        pos.setZ(i, 3.955);
      }
    }
    pos.needsUpdate = true;
    geom.computeVertexNormals();
    return geom;
  }, [props.nodes?.WallExtMerge?.geometry]);

  return (
    <>
      <mesh
        geometry={cleanWallExtGeometry || props.nodes.WallExtMerge.geometry}
        position={[-0.006, 1.6, -4.011]}
        rotation={[0, 1.571, 0]}
      >
        <meshBasicMaterial map={wallExtTexture} map-flipY={false} side={THREE.DoubleSide} />
      </mesh>

      <mesh
        geometry={props.nodes.WallInMerge.geometry}
        position={[0, 1.6, 3.9]}
      >
        <meshBasicMaterial map={wallInTexture} map-flipY={false} />
      </mesh>

      {/* RAJAT HOUSE 3D Lettering on Front Gable Facade */}
      <group position={[4.02, 3.75, -2.55]} rotation={[0, Math.PI / 2, 0]}>
        <Text
          font="./fonts/font.ttf"
          fontSize={0.42}
          color="#577562"
          anchorX="center"
          anchorY="middle"
          rotation-z={0.08}
          position={[0.08, 0.32, 0]}
        >
          RAJAT
        </Text>
        <Text
          font="./fonts/font.ttf"
          fontSize={0.38}
          color="#577562"
          anchorX="center"
          anchorY="middle"
          position={[0, -0.15, 0]}
        >
          HOUSE
        </Text>
      </group>
    </>
  )
}