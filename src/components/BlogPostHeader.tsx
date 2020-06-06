import * as React from "react"

interface BlogPostHeaderProps {
  title: string
}

const BlogPostHeader: React.FunctionComponent<BlogPostHeaderProps> = ({
  title,
}) => {
  return (
    <div className="blogPostHeaderRoot">
      <div className="blogPostHeaderRoot-titleContainer">
        <h1 className="blogPostHeaderRoot-title">{title}</h1>
      </div>
    </div>
  )
}

export default BlogPostHeader
