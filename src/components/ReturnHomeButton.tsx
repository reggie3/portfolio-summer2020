import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import {
  clr_accent_dark,
  clr_accent,
  buttonTapScale,
} from "../styles/siteGlobals";
import { navigate } from "gatsby";
import Home from "react-ionicons/lib/MdHome";

interface ReturnHomeButtonProps {}

const returnHomeButtonVariants = {
  initial: {
    opacity: 0,
  },
  visible: { opacity: 1 },
  whileTap: { scale: buttonTapScale },
};

const ReturnHomeButton: React.FunctionComponent<ReturnHomeButtonProps> = props => {
  const onClick = () => {
    navigate("/");
  };

  return (
    <RootContainer
      role="button"
      onClick={onClick}
      variants={returnHomeButtonVariants}
      initial={"initial"}
      animate={"visible"}
      whileTap={"whileTap"}
    >
      <Home color={clr_accent} fontSize="2rem" />
    </RootContainer>
  );
};

export default ReturnHomeButton;

const RootContainer = styled(motion.div)`
  background-color: ${clr_accent_dark};
  border-radius: 4px;
  position: absolute;
  border: 1px solid ${clr_accent};
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 1rem;
  z-index: 100;
  filter: drop-shadow(0em 0em 0.5em ${clr_accent});
  backface-visibility: hidden;
`;
