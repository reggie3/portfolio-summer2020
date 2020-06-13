import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { clr_accent_dark, clr_accent } from "../styles/siteGlobals";
import ArrowBack from "react-ionicons/lib/MdArrowBack";

const goBackPageButtonVariant = {
  initial: { opacity: 0, left: "-4rem" },
  visible: {
    opacity: 1,
    left: "2rem",
  },
  hidden: {
    opacity: 0,
    left: "-4rem",
  },
};

interface GoBackPageButtonProps {}

const GoBackPageButton: React.FunctionComponent<GoBackPageButtonProps> = () => {
  const onClick = () => {};
  return (
    <AnimatePresence>
      <RootContainer
        role="button"
        onClick={onClick}
        variants={goBackPageButtonVariant}
        initial="initial"
        animate="visible"
        exit="hidden"
      >
        <ArrowBack color={clr_accent} fontSize="2rem" />
      </RootContainer>
    </AnimatePresence>
  );
};

export default GoBackPageButton;

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
  top: 1rem;
  z-index: 100;
  filter: drop-shadow(0em 0em 0.5em ${clr_accent});
`;
