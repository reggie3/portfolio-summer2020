import * as React from "react"
import { motion } from "framer-motion"
interface PostTagProps {
  isSelectAll?: boolean
  onTagClicked?: (label: string) => void
  selectedTags?: string[]
  tag: string
}

const variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
}

const PostTag: React.FunctionComponent<PostTagProps> = ({
  isSelectAll = false,
  onTagClicked,
  selectedTags = [],
  tag,
}) => {
  let className: string = selectedTags.includes(tag)
    ? "postTag selectedPostTag"
    : "postTag"
  className = isSelectAll ? (className += " selectedPostTag") : className

  return (
    <motion.div
      id={isSelectAll ? "selectAllTagsButton" : ""}
      role="button"
      key={tag}
      className={
        selectedTags.includes(tag) ? "postTag selectedPostTag" : "postTag"
      }
      onClick={() => onTagClicked(tag)}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {tag}
    </motion.div>
  )
}

export default PostTag
