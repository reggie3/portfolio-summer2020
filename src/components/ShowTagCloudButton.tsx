import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import {
  clr_accent_dark,
  clr_accent,
  buttonTapScale,
} from "../styles/siteGlobals";
import Cloud from "react-ionicons/lib/MdCloudOutline";

interface ShowTagCloudButtonProps {
  isTagCloudVisible: boolean;
  onClick: () => void;
}

const showTagCloudButtonVariants = {
  initial: {
    opacity: 0.5,
    bottom: "0rem",
  },
  open: { opacity: 1, bottom: "1rem" },

  closed: {
    opacity: 0.5,
    bottom: "0rem",
  },
  whileTap: { scale: buttonTapScale },
};

const ShowTagCloudButton: React.FunctionComponent<ShowTagCloudButtonProps> = ({
  isTagCloudVisible,
  onClick,
}) => {
  return (
    <RootContainer
      role="button"
      onClick={onClick}
      animate={isTagCloudVisible ? "open" : "closed"}
      variants={showTagCloudButtonVariants}
      initial={"initial"}
      whileTap={"whileTap"}
    >
      <Cloud color={clr_accent} />
    </RootContainer>
  );
};

export default ShowTagCloudButton;

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
`;
