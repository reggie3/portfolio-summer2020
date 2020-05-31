import * as React from "react"
import { graphql } from "gatsby"

interface BlogPostProps {
  data: object
}

const BlogPost: React.FunctionComponent<BlogPostProps> = ({ data }) => {
  debugger
  return <div>hello</div>
}

export const blogPostQuery = graphql`
  query BlogPostByPaht($path: String!) {
    allMdx(
      filter: { frontmatter: { draft: { ne: true }, path: { eq: $path } } }
    ) {
      edges {
        node {
          body
          id
          frontmatter {
            tags
            category
            layout
            title
            description
            date
          }
        }
      }
    }
  }
`

export default BlogPost
