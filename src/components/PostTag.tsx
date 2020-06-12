import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { clr_accent, clr_accent_dark } from "../styles/colors";

interface PostTagProps {
  isSelectAll?: boolean;
  isTagCloudVisible?: boolean;
  onTagClicked?: (label: string) => void;
  selectedTags?: string[];
  tag: string;
}

const postTagVariants = {
  selected: {
    borderColor: clr_accent,
    color: clr_accent,
  },
  unSelected: {
    borderColor: clr_accent_dark,
    color: clr_accent_dark,
  },
  whileHover: {
    borderColor: clr_accent,
    color: clr_accent,
    backgroundColor: clr_accent_dark,
  },
};

const PostTag: React.FunctionComponent<PostTagProps> = ({
  isSelectAll = false,
  onTagClicked,
  selectedTags = [],
  tag,
}) => {
  let className: string = selectedTags.includes(tag)
    ? "postTag selectedPostTag"
    : "postTag";
  className = isSelectAll ? (className += " selectedPostTag") : className;

  return (
    <PostTagRootContainer
      animate={
        selectedTags.includes(tag) || isSelectAll ? "selected" : "unSelected"
      }
      initial={"selected"}
      variants={postTagVariants}
      onClick={() => onTagClicked(tag)}
      whileHover={"whileHover"}
    >
      {tag}
    </PostTagRootContainer>
  );
};

export default PostTag;

export const PostTagRootContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  font-size: 0.8rem;
  height: 1.35rem;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 4px 4px;
  cursor: pointer;
  letter-spacing: 0.03rem;
`;
