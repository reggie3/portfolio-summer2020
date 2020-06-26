import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

interface BlogCardProps {
  isShown: boolean;
}
const blogCardVariants = {
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

const BlogCard: React.FunctionComponent<BlogCardProps> = ({
  children,
  isShown,
}) => {
  return (
    <AnimatePresence>
      {isShown && (
        <BlogCardRoot
          className="blogCard"
          variants={blogCardVariants}
          initial={"initial"}
          exit={"hidden"}
          animate={"visible"}
        >
          {children}
        </BlogCardRoot>
      )}
    </AnimatePresence>
  );
};

export default BlogCard;

export const BlogCardRoot = styled(motion.div)`
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: var(--clr-bg-dark);
  max-width: 360px;
  padding: .5rem;
  box-shadow: 0px 7px 5px 0px rgba(0,0,0,0.75);
}`;
