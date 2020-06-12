import * as React from "react";
import { useState, useEffect } from "react";
import ScrollToTopButton from "./ScrollToTopButton";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { header_dark, header_light } from "../styles/colors";

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
      <div className="blogPostHeaderRoot-titleContainer">
        <h1 className="blogPostHeaderRoot-title">{title}</h1>
      </div>
      <ScrollToTopButton
        isVisible={!isHeaderVisible}
        onClick={onScrollToTopClicked}
      />
    </BlogPostHeaderRootContainer>
  );
};

export default BlogPostHeader;

export const BlogPostHeaderRootContainer = styled.div`
padding: 1rem;
  background: linear-gradient(180deg, ${header_dark} 0%,${header_dark} 50%, ${header_light} 100%);
}`;
