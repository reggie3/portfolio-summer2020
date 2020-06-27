import * as React from "react";
import { useState, useEffect } from "react";
import ScrollToTopButton from "./ScrollToTopButton";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { header_dark, header_light } from "../styles/siteGlobals";
import { motion } from "framer-motion";

interface BlogPostHeaderProps {
  onScrollToTopClicked: () => void;
  title: string;
}

const BlogPostHeader: React.FunctionComponent<BlogPostHeaderProps> = ({
  onScrollToTopClicked,
  title,
}) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [intersectionRef, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    setIsHeaderVisible(inView);
  }, [inView]);

  return (
    <BlogPostHeaderRootContainer ref={intersectionRef}>
      <TitleContainer animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
        <Title className="blogPostHeaderRoot-title">{title}</Title>
      </TitleContainer>
      <ScrollToTopButton
        isVisible={!isHeaderVisible}
        onClick={onScrollToTopClicked}
      />
    </BlogPostHeaderRootContainer>
  );
};

export default BlogPostHeader;

const BlogPostHeaderRootContainer = styled.div`
   {
    padding: 1rem;
    background: linear-gradient(
      180deg,
      ${header_dark} 0%,
      ${header_dark} 50%,
      ${header_light} 100%
    );
  }
`;

const TitleContainer = styled(motion.div)`
   {
    background-color: var(--clr-bg-dark);
    color: var(--clr-text);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 0 1rem;
    box-shadow: var(--clr-bg-very-light) 0px 4px 5px 1px;
  }
`;

const Title = styled(motion.h1)`
   {
    text-align: center;
    padding: 0;
  }
`;
