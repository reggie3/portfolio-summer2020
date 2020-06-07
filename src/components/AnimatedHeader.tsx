import * as React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import MyName from "../headerText/myName"
import { clr_accent_dark, clr_accent } from "../styles/colors"

interface AnimatedHeaderProps {}
const WIDTH = 1000
const HEIGHT = 100
const BLOCK_CONTAINER_WIDTH = WIDTH / 10
const BLOCK_CONTAINER_PADDING = 2
const BLOCK_SIZE = BLOCK_CONTAINER_WIDTH
const BOTTOM_PADDING = 20

const LEFT_PADDING = 12

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}
const PIXEL_SIZE = convertRemToPixels(1) * 0.75

const pixelsVariant = {
  visible: (index: number) => ({
    /* opacity: 1, */
    scale: 0.85,
    x: 0,
    y: 0,
    transition: {
      delay: index * 0.02,
    },
  }),
  hidden: () => {
    const sign = Math.random() > 0.5 ? 1 : -1
    const direction =
      Math.random() > 0.5 ? { y: sign * 100 } : { x: sign * 100 }
    return {
      /* opacity: 0, */
      scale: 0,
      // x: sign * 100,
      ...{ direction },
    }
  },
}

const Blocks = () => {
  const blocks: React.ReactElement[] = []
  MyName.forEach((pixel, index) => {
    const [x, y] = pixel
    blocks.push(
      <Pixel
        key={`Pixel-${x},${y}`}
        custom={index}
        variants={pixelsVariant}
        initial="hidden"
        animate="visible"
        style={{
          bottom: y * PIXEL_SIZE + BOTTOM_PADDING,
          left: x * PIXEL_SIZE + LEFT_PADDING,
          height: PIXEL_SIZE,
          width: PIXEL_SIZE,
        }}
      />
    )
  })
  return <motion.div>{blocks}</motion.div>
}
const AnimatedHeader: React.FunctionComponent<AnimatedHeaderProps> = props => {
  return (
    <RootContainer>
      <PixelContainer id="pixelContainer">
        <Blocks />
      </PixelContainer>
    </RootContainer>
  )
}

export default AnimatedHeader

const RootContainer = styled.div`
  height: 100px;
  background-color: black;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`
const PixelContainer = styled(motion.div)`
  position: relative;
  flex: 1;
  height: 100%;
`

const Pixel = styled(motion.div)`
  margin: 2px;
  background-color: ${clr_accent_dark};
  position: absolute;
  border: 1px solid ${clr_accent};
  border-radius: 3px;
  filter: drop-shadow(0em 0em 0.5em ${clr_accent});
`
