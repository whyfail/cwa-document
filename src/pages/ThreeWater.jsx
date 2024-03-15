import React, { useEffect, useRef } from "react"
import { useGetState } from "ahooks"
import * as THREE from "three"

const ThreeWater = () => {
  const threeRef = useRef(null)
  const [, setCamera, getCamera] = useGetState(null)
  const [, setRenderer, getRenderer] = useGetState(null)
  const [, setScene, getScene] = useGetState(null)
  const [, setParticles, getParticles] = useGetState(null)
  const [, setCount, getCount] = useGetState(0)

  const SEPARATION = 100,
    AMOUNT_X = 200,
    AMOUNT_Y = 200

  const init = () => {
    const newCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)

    newCamera.position.z = 700

    const newScene = new THREE.Scene()

    setScene(newScene)

    const numParticles = AMOUNT_X * AMOUNT_Y

    const positions = new Float32Array(numParticles * 3)
    const scales = new Float32Array(numParticles)

    let i = 0,
      j = 0

    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        positions[i] = ix * SEPARATION - (AMOUNT_X * SEPARATION) / 2 // x
        positions[i + 1] = 0 // y
        positions[i + 2] = iy * SEPARATION - (AMOUNT_Y * SEPARATION) / 1 // z

        scales[j] = 1

        i += 3
        j++
      }
    }

    const geometry = new THREE.BufferGeometry()

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1))

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color("mediumseagreen") },
      },
      vertexShader: `
        attribute float scale;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = scale * ( 300.0 / - mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        void main() {
          if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
          gl_FragColor = vec4( color, 1.0 );
        }
      `,
    })

    const newParticles = new THREE.Points(geometry, material)

    newScene.add(newParticles)
    setParticles(newParticles)

    const newRenderer = new THREE.WebGLRenderer({ antialias: true })

    newRenderer.setPixelRatio(window.devicePixelRatio)
    newRenderer.setSize(window.innerWidth, window.innerHeight)
    newRenderer.setClearColor(0x0b1121, 0)
    threeRef.current.appendChild(newRenderer.domElement)
    setRenderer(newRenderer)

    window.addEventListener("resize", onWindowResize)

    setCamera(newCamera)
    animate()
  }

  const onWindowResize = () => {
    const newCamera = getCamera()
    const newRenderer = getRenderer()

    if (!newCamera) return

    newCamera.aspect = window.innerWidth / window.innerHeight
    newCamera.updateProjectionMatrix()

    newRenderer?.setSize(window.innerWidth, window.innerHeight)
  }

  const animate = () => {
    requestAnimationFrame(animate)
    render()
  }

  const render = () => {
    const newCamera = getCamera()
    const newScene = getScene()
    const newParticles = getParticles()
    const newRenderer = getRenderer()
    const count = getCount()

    if (!newCamera) return

    newCamera.position.x += (0 - newCamera.position.x) * 1
    newCamera.position.y += (400 - newCamera.position.y) * 1
    newCamera.lookAt(newScene.position)

    const positions = newParticles.geometry.attributes.position.array
    const scales = newParticles.geometry.attributes.scale.array

    let i = 0,
      j = 0

    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        positions[i + 1] = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50
        scales[j] = (Math.sin((ix + count) * 0.3) + 1) * 20 + (Math.sin((iy + count) * 0.5) + 1) * 20
        i += 3
        j++
      }
    }

    newParticles.geometry.attributes.position.needsUpdate = true
    newParticles.geometry.attributes.scale.needsUpdate = true

    newRenderer.render(newScene, newCamera)

    setCount((val) => (val += 0.1))
  }

  useEffect(() => {
    if (threeRef.current && !getCamera()) {
      init()
    }
  }, [threeRef])

  return (
    <div
      style={{ width: "100%", height: "400px", position: "absolute", top: "300px", left: 0, overflow: "hidden" }}
      ref={threeRef}
    ></div>
  )
}

export default ThreeWater
