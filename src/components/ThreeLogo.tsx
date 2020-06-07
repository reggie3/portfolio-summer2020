import * as React from "react"
import { Canvas, useFrame } from "react-three-fiber"
import { useMemo, Suspense, useRef } from "react"
import * as THREE from "three"
import {
  HTML,
  OrbitControls,
  OrthographicCamera,
  StandardEffects,
  Text,
} from "drei"
import { clr_accent_dark } from "../styles/colors"

interface ThreeLogoProps {}

const Fallback = () => (
  <HTML>
    <div className="loading">Loading...</div>
  </HTML>
)

const ThreeLogo: React.FunctionComponent<ThreeLogoProps> = props => {
  const cam = useRef()
  const pointLight = useRef()
  /* useFrame(() => {
    if (pointLight) {
      debugger
      pointLight.current.rotation.x = pointLight.current.rotation.y += 0.01
    }
  }) */

  return (
    <Canvas>
      <OrthographicCamera ref={cam} position={[0, 0, 2]} zoom={10} />
      <ambientLight />
      <pointLight ref={pointLight} position={[0, 10, 10]} />
      <Suspense fallback={<Fallback />}>
        {/* <Text
          fontSize={2}
          color={clr_accent_dark} // default
          anchorX="center" // default
          anchorY="150%" // default
          material={
            new THREE.MeshPhongMaterial({
              emissive: 0x0000ff,
              color: 0xdddddd,
              specular: 0x009900,
              shininess: 30,
              flatShading: true,
            })
          }
        > 
          Reginald Johnson
        </Text>
        <Text
          fontSize={1}
          color={clr_accent_dark} // default
          anchorX="center" // default
          anchorY="-150%" // default
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          material={
            new THREE.MeshPhongMaterial({
              emissive: 0x0000ff,
              color: 0xdddddd,
              specular: 0x009900,
              shininess: 30,
              flatShading: true,
            })
          }
        >
          A place for my portfolio, blog posts, articles, and projects.
        </Text>*/}
        <StandardEffects bloom={{ luminanceThreshold: 0.99 }} />
      </Suspense>
      {/*       <OrbitControls />*/}
    </Canvas>
  )
}

export default ThreeLogo
