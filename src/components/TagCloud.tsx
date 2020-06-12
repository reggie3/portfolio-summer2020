import * as React from "react";
import PostTags from "./PostTags";
import PostTag from "./PostTag";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import ShowTagCloudButton from "./ShowTagCloudButton";
import { useState } from "react";
import { bg_dark, header_light } from "../styles/colors";

interface TagCloudProps {
  allTags: string[];
  alwaysShowTags?: boolean;
  selectedTags: string[];
  onSelectAllTagsClicked?: () => void;
  onTagClicked?: (label: string) => void;
}

const tagCloudVariants = {
  initial: {
    backgroundColor: bg_dark,
    height: 0,
    opacity: 0,
    transition: {
      delay: 1,
    },
  },
  visible: {
    height: "auto",
    opacity: 1,
  },
  hidden: {
    height: "1px",
    opacity: 0,
    backgroundColor: bg_dark,
    paddingTop: "2rem",
    paddingBottom: "2rem",
  },
};

const TagCloud: React.FunctionComponent<TagCloudProps> = ({
  allTags,
  alwaysShowTags = false,
  selectedTags,
  onSelectAllTagsClicked = () => {},
  onTagClicked = () => {},
}) => {
  const [isTagCloudVisible, setIsTagCloudVisible] = useState<boolean>(false);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "2rem",
        backgroundColor: header_light,
      }}
    >
      {!alwaysShowTags && (
        <ShowTagCloudButton
          isTagCloudVisible={isTagCloudVisible}
          onClick={() => setIsTagCloudVisible(!isTagCloudVisible)}
        />
      )}

      <AnimatePresence>
        {(isTagCloudVisible || alwaysShowTags) && (
          <TagCloudRootContainer
            id="tagCloud"
            variants={tagCloudVariants}
            initial={"initial"}
            exit={"hidden"}
            animate={"visible"}
          >
            <PostTags
              onTagClicked={onTagClicked}
              selectedTags={selectedTags}
              tags={allTags}
            />
            {!alwaysShowTags && (
              <PostTag
                isSelectAll
                tag={"Select All"}
                onTagClicked={onSelectAllTagsClicked}
              />
            )}
          </TagCloudRootContainer>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TagCloud;

export const TagCloudRootContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  justify-content: center;
  align-items: center;
`;
