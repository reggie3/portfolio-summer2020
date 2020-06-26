import styled from "styled-components";
import { motion } from "framer-motion";

export const mapLabelVariants = {
  whileHover: {
    scale: 1.02,
    zIndex: 25,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  hidden: {
    opacity: 0,
    scale: 0,
  },
};

export const MapLabel = styled(motion.div)`
  padding: 2px 4px;
  border-radius: 4px;
  position: relative;
  left: 8px;
  border: 1px solid dodgerblue;
  background-color: aliceblue;
  box-shadow: 1px 4px 2px 2px #00000054;
`;
