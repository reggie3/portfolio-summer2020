import * as React from "react";
import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import MyName from "../headerText/myName";
import { clr_accent, pixel_background, pixel_border } from "../styles/colors";
import { useEffect, useState } from "react";

interface AnimatedHeaderProps {
  width: number;
}

const pixelsVariant: Variants = {
  visible: ({ index, total, x, y }) => ({
    /* opacity: 1, */
    scale: 0.85,
    x: 0,
    y: 0,
    transition: {
      delay: index * 0.02,
    },
  }),
  // @ts-ignore
  hidden: ({ index, total, x, y }) => {
    // const sign = Math.random() > 0.5 ? 1 : -1
    /* const direction =
      Math.random() > 0.5 ? { y: sign * 100 } : { x: sign * 100 } */
    const sign = x < total / 2 ? 1 : -1;
    return {
      /* opacity: 0, */
      scale: 0,
      x: sign * 100,
    };
  },
};

const Blocks = ({
  blockSize,
  headerWidth,
}: {
  blockSize: number;
  headerWidth: number;
}) => {
  const BOTTOM_PADDING = blockSize * 2;
  const LEFT_PADDING =
    headerWidth / 2 - (MyName[MyName.length - 1][0] * blockSize) / 2;

  const blocks: React.ReactElement[] = [];
  MyName.forEach((pixel, index) => {
    const [x, y] = pixel;
    blocks.push(
      <Pixel
        key={`Pixel-${x},${y}`}
        custom={{ index, total: MyName.length, x, y }}
        variants={pixelsVariant}
        initial="hidden"
        animate="visible"
        style={{
          bottom: y * blockSize + BOTTOM_PADDING,
          left: x * blockSize + LEFT_PADDING,
          height: blockSize,
          width: blockSize,
        }}
      />
    );
  });
  return <motion.div>{blocks}</motion.div>;
};

const AnimatedHeader: React.FunctionComponent<AnimatedHeaderProps> = ({
  width,
}) => {
  const [blockSize, setBlockSize] = useState<number>(10);

  useEffect(() => {
    console.log(width);
    setBlockSize(Math.min(10, width * 0.012));
  }, [width]);

  return (
    <RootContainer style={{ height: blockSize * 5 + blockSize * 4 }}>
      <PixelContainer id="pixelContainer">
        <Blocks blockSize={blockSize} headerWidth={width} />
      </PixelContainer>
    </RootContainer>
  );
};

export default AnimatedHeader;

const RootContainer = styled.div`
  height: 2rem;
  background-color: black;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PixelContainer = styled(motion.div)`
  position: relative;
  flex: 1;
  height: 100%;
`;

const Pixel = styled(motion.div)`
  margin: 2px;
  background-color: ${pixel_background};
  position: absolute;
  border: 1px solid ${pixel_border};
  border-radius: 3px;
  filter: drop-shadow(0em 0em 0.5em ${clr_accent});
`;
