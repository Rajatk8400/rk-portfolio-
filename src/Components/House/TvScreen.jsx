import { useRef } from "react" 
import { TextureLoader, Uniform } from 'three'
import { useLoader, useFrame } from "@react-three/fiber"

import vertexShader from '../../shaders/tvnoise/vertex.glsl'
import fragmentShader from '../../shaders/tvnoise/fragment.glsl'

export default function TvScreen(props)
{

    const planeRef = useRef()
    const logosRef = useRef()


    const githubTexture = useLoader(TextureLoader, "./logos/logoGithub.png");
    const instagramTexture = useLoader(TextureLoader, "./logos/logoInstagram.png");
    const linledinTexture = useLoader(TextureLoader, "./logos/logoLinkedin.png");
    const cvTexture = useLoader(TextureLoader, "./logos/logoCV.png");
    const telegramTexture = useLoader(TextureLoader, "./logos/logoTelegram.png");
    const workTexture = useLoader(TextureLoader, "./logos/work.png");
   

      useFrame(({ clock }) => {

        planeRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
       
        logosRef.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = props.opacity;
          }
        })
      });

      const shaderMaterial = {
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
          uTime: new Uniform(0),
          uProgress: new Uniform(props.progress)
        }
    
      }

    const handleClick = (url) => {
      if(props.opacity > 0.9)
      {
        window.open(url, "_blank");
      }
        
    };

    return<>

    <ambientLight intensity={1} />
    <mesh position={[0.61, 2.35, -3.49]} ref={ planeRef }>
        <planeGeometry args={[0.65, 0.45]} />
        <shaderMaterial 
          attach="material" 
          args={[shaderMaterial]}  
        />  
    </mesh>
    
    <group ref={logosRef}>
      <mesh 
        position={[0.4, 2.45, -3.48]} 
        scale={[0.09, 0.1, 0.1]} 
        onClick={() => handleClick("https://t.me/the_frontend_lab")}
      >
        <planeGeometry/>
        <meshBasicMaterial  map={telegramTexture} transparent />
      </mesh>

      <mesh 
        position={[0.6, 2.45, -3.48]} 
        scale={[0.09, 0.1, 0.1]} 
        onClick={() => handleClick("https://www.instagram.com/the_frontend_lab/?hl=en")}
      >
        <planeGeometry/>
        <meshBasicMaterial  map={instagramTexture} transparent />
      </mesh>

      <mesh 
        position={[0.8, 2.45, -3.48]} 
        scale={[0.09, 0.1, 0.1]} 
        onClick={() => handleClick("https://www.linkedin.com/in/rajat-kashyap-040379194")}
      >
        <planeGeometry/>
        <meshBasicMaterial  map={linledinTexture} transparent />
      </mesh>

      <mesh 
        position={[0.4, 2.25, -3.48]} 
        scale={[0.07, 0.1, 0.1]} 
        onClick={() => handleClick("./CV/Rajat-Kashyap-Resume.pdf")}
      >
        <planeGeometry/>
        <meshBasicMaterial  map={cvTexture} transparent />
      </mesh>

      <mesh 
        position={[0.6, 2.25, -3.48]} 
        scale={[0.09, 0.1, 0.1]}
        onClick={() => handleClick("https://github.com/Rajatk8400")}
      >
        <planeGeometry/>
        <meshBasicMaterial  map={githubTexture} transparent />
      </mesh>

      <mesh 
        position={[0.8, 2.25, -3.48]} 
        scale={[0.09, 0.12, 0.12]}
        onClick={() => handleClick("mailto:rajatqwe8@gmail.com")}
      >
        <planeGeometry/>
        <meshBasicMaterial  map={workTexture} transparent />
      </mesh>
    </group>
    
    </>

}