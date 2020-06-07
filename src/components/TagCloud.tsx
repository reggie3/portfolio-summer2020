import * as React from "react"
import PostTags from "./PostTags"
import PostTag from "./PostTag"

interface TagCloudProps {
  allTags: string[]
  selectedTags: string[]
  onSelectAllTagsClicked: () => void
  onTagClicked: (label: string) => void
}

const TagCloud: React.FunctionComponent<TagCloudProps> = ({
  allTags,
  selectedTags,
  onSelectAllTagsClicked,
  onTagClicked,
}) => {
  return (
    <div id="tagCloud">
      <PostTags
        onTagClicked={onTagClicked}
        selectedTags={selectedTags}
        tags={allTags}
      />
      <PostTag
        isSelectAll
        tag={"Select All"}
        onTagClicked={onSelectAllTagsClicked}
      />
    </div>
  )
}

export default TagCloud
