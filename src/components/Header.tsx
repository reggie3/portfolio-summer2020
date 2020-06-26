import React, { useEffect, useState } from "react";
import AnimatedHeader from "./AnimatedHeader";
import { useWindowSize } from "@react-hook/window-size";
import styled from "styled-components";
import { motion } from "framer-motion";
import { header_dark, header_light } from "../styles/siteGlobals";
import { useInView } from "react-intersection-observer";
import ScrollToTopButton from "./ScrollToTopButton";

interface HeaderProps extends React.ComponentPropsWithoutRef<any> {
  onScrollToTopClicked: () => void;
}

const Header = ({ onScrollToTopClicked }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const [width] = useWindowSize();
  const [intersectionRef, inView] = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    setIsHeaderVisible(inView);
  }, [inView]);

  return (
    <div ref={intersectionRef}>
      <HeaderRootContainer>
        <AnimatedHeader width={width} />
      </HeaderRootContainer>
      <ScrollToTopButton
        isVisible={!isHeaderVisible}
        onClick={onScrollToTopClicked}
      />
    </div>
  );
};

export default Header;

export const HeaderRootContainer = styled(motion.div)`
  margin: 0px 0px;
  background: linear-gradient(180deg, ${header_dark} 0%,${header_dark} 50%, ${header_light} 100%);
  color: var(--clr-text);
  font-size: 2rem;
  padding: 0;
  position: relative;
  display: flex;
  z-index: 10;
}`;
