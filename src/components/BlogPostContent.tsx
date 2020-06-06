import * as React from "react"

interface BlogPostContentProps {
  children: React.ReactElement
}

const BlogPostContent: React.FunctionComponent<BlogPostContentProps> = ({
  children,
}) => {
  return <div className="blogPostContentRoot">{children}</div>
}

export default BlogPostContent
