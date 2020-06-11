import * as React from "react"
import ArrowUpward from "@material-ui/icons/ArrowUpward"
import { motion } from "framer-motion"
import styled from "styled-components"
import { clr_accent_dark, clr_accent } from "../styles/colors"

const variant = {
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

interface ScrollToTopButtonProps {
  isVisible: boolean
  onClick: () => void
}

const ScrollToTopButton: React.FunctionComponent<ScrollToTopButtonProps> = ({
  isVisible,
  onClick,
}) => {
  return (
    <RootContainer role="button" onClick={onClick} variants={variant}>
      <ArrowUpward />
    </RootContainer>
  )
}

export default ScrollToTopButton

const RootContainer = styled(motion.div)`
  background-color: ${clr_accent_dark};
  position: absolute;
  border: 1px solid ${clr_accent};
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
