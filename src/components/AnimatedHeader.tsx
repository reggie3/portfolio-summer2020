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
const BOTTOM_PADDING = 10
const PIXEL_SIZE = 12
const LEFT_PADDING = 12

const Blocks = () => {
  const blocks: React.ReactElement[] = []
  MyName.forEach(pixel => {
    const [x, y] = pixel
    blocks.push(
      <Pixel
        key={`Pixel-${x},${y}`}
        style={{
          bottom: y * PIXEL_SIZE + BOTTOM_PADDING,
          left: x * PIXEL_SIZE + LEFT_PADDING,
          height: PIXEL_SIZE,
          width: PIXEL_SIZE,
        }}
      />
    )
  })
  return <>{blocks}</>
}
const AnimatedHeader: React.FunctionComponent<AnimatedHeaderProps> = props => {
  return (
    <RootContainer>
      <Blocks />
    </RootContainer>
  )
}

export default AnimatedHeader

const Pixel = styled(motion.div)`
  margin: 2px;
  background-color: ${clr_accent_dark};
  position: absolute;
  border: 1px solid ${clr_accent};
  border-radius: 3px;
`

const RootContainer = styled.div`
  height: 100px;
  background-color: black;
  position: relative;
`
const PixelContainer = styled.div`
  margin: 10px 10px;
  position: relative;
`
