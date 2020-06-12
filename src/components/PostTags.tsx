import * as React from "react";
import PostTag from "./PostTag";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

interface PostTagsProps {
  isTagCloudVisible?: boolean;
  onAnimationComplete?: () => void;
  onTagClicked?: (label: string) => void;
  onTagsHidden?: () => void;
  selectedTags?: string[];
  tags: string[];
}

const postTagVariants = {
  initial: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const PostTags: React.FunctionComponent<PostTagsProps> = ({
  isTagCloudVisible = true,
  onAnimationComplete,
  onTagClicked,
  selectedTags = [],
  tags,
}) => {
  return (
    <AnimatePresence>
      {isTagCloudVisible && (
        <PostTagsRootContainer
          variants={postTagVariants}
          initial={"initial"}
          exit={"hidden"}
          animate={"visible"}
          onAnimationComplete={onAnimationComplete}
        >
          {tags.map(tag => {
            return (
              <PostTag
                isTagCloudVisible={isTagCloudVisible}
                key={`PostTag-${tag}-${Date.now().toString()}`}
                tag={tag}
                onTagClicked={onTagClicked}
                selectedTags={selectedTags}
              />
            );
          })}
        </PostTagsRootContainer>
      )}
    </AnimatePresence>
  );
};

export default PostTags;

export const PostTagsRootContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 0.5rem;
`;
