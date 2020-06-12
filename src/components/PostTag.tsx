import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { clr_accent, clr_accent_dark } from "../styles/colors";

export enum TagMouseStates {
  INACTIVE = "INACTIVE",
  HOVER_START = "HOVER_START",
  HOVER_END = "HOVER_END",
  ON_MOUSE_DOWN = "ON_MOUSE_DOWN",
  ON_MOUSE_UP = "ON_MOUSE_UP",
  SELECTED = "SELECTED",
  UNSELECTED = "UNSELECTED",
}
interface PostTagProps {
  isSelectAll?: boolean;
  isTagCloudVisible?: boolean;
  onTagClicked?: (label: string) => void;
  selectedTags?: string[];
  tag: string;
}

/* const animations = {
  initial: { opacity: 0.5 },
  inActive: { opacity: 1, scale: 1 },
  onHoverStart: { borderColor: "white" },
  onHoverEnd: { borderColor: clr_accent },
  onMouseDown: { scale: 0.9 },
  onMouseUp: { scale: 1 },
  selected: { backgroundColor: "white" },
  unSelected: { opacity: 0.5 },
}; */

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
  isTagCloudVisible = true,
  onTagClicked,
  selectedTags = [],
  tag,
}) => {
  const [tagMouseState, setTagMouseState] = React.useState<TagMouseStates>(
    TagMouseStates.INACTIVE
  );
  const [tagAnimation, setTagAnimation] = React.useState({});

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
