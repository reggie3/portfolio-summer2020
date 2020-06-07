import * as React from "react"
import { Chip } from "@material-ui/core"
import PostTag from "./PostTag"

interface PostTagsProps {
  onTagClicked?: (label: string) => void
  selectedTags?: string[]
  tags: string[]
}

const PostTags: React.FunctionComponent<PostTagsProps> = ({
  onTagClicked,
  selectedTags = [],
  tags,
}) => {
  return (
    <div className="postTagsContainer">
      {tags.map(tag => {
        return (
          <PostTag
            key={`PostTag-${tag}-${Date.now().toString()}`}
            tag={tag}
            onTagClicked={onTagClicked}
            selectedTags={selectedTags}
          />
        )
      })}
    </div>
  )
}

export default PostTags
