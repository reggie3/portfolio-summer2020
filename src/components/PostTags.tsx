import * as React from "react"
import { Chip } from "@material-ui/core"

interface PostTagsProps {
  tags: string[]
  onTagClicked: (label: string) => void
}

const PostTags: React.FunctionComponent<PostTagsProps> = ({ tags }) => {
  return (
    <div className="postTagsContainer">
      {tags.map(tag => {
        return (
          <div key={tag} className="postTag">
            {tag}
          </div>
        )
      })}
    </div>
  )
}

export default PostTags
