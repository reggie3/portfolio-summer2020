import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"

interface BlogCardProps {
  isShown: boolean
}
const blogCardVariants = {
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 1,
    },
  },
}

const BlogCard: React.FunctionComponent<BlogCardProps> = ({
  children,
  isShown,
}) => {
  return (
    <AnimatePresence>
      {isShown && (
        <motion.div
          className="blogCard"
          variants={blogCardVariants}
          exit={{ y: -1000 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BlogCard
