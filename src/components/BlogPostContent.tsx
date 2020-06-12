import * as React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface BlogPostContentProps {
  children: React.ReactElement;
}

const blogPostContentVariant = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const BlogPostContent: React.FunctionComponent<BlogPostContentProps> = ({
  children,
}) => {
  return (
    <BlogPostContentRoot
      className="blogPostContentRoot"
      variants={blogPostContentVariant}
      initial={"initial"}
      animate={"visible"}
    >
      {children}
    </BlogPostContentRoot>
  );
};

export default BlogPostContent;

const BlogPostContentRoot = styled(motion.div)`
  padding: 1rem 3rem;
  padding-bottom: 3rem;
`;
