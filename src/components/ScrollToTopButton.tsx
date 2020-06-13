import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import {
  clr_accent_dark,
  clr_accent,
  buttonTapScale,
} from "../styles/siteGlobals";
import ArrowUpward from "react-ionicons/lib/MdArrowUp";

const scrollToTopButtonVariant = {
  initial: { opacity: 0, bottom: "-4rem" },
  visible: {
    opacity: 1,
    bottom: "2rem",
  },
  hidden: {
    opacity: 0,
    bottom: "-4rem",
  },
  whileTap: { scale: buttonTapScale },
};

interface ScrollToTopButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

const ScrollToTopButton: React.FunctionComponent<ScrollToTopButtonProps> = ({
  isVisible,
  onClick,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <RootContainer
          role="button"
          onClick={onClick}
          variants={scrollToTopButtonVariant}
          initial="initial"
          animate="visible"
          exit="hidden"
          whileTap={"whileTap"}
        >
          <ArrowUpward color={clr_accent} fontSize="2rem" />
        </RootContainer>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;

const RootContainer = styled(motion.div)`
  background-color: ${clr_accent_dark};
  border-radius: 4px;
  position: fixed;
  border: 1px solid ${clr_accent};
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 2rem;
  right: 1.5rem;
  z-index: 100;
  filter: drop-shadow(0em 0em 0.5em ${clr_accent});
`;
