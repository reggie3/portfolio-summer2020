import React from "react"
import { Link, graphql } from "gatsby"

const BlogPostList = ({ data }) => {
  const { edges: posts } = data.allMdx
  return (
    <div>
      <h1>Awesome MDX Blog</h1>
      <ul>
        {posts.map(({ node: post }) => (
          <li key={post.id}>
            <Link to={post.fields.slug}>
              <h2>{post.frontmatter.title}</h2>
            </Link>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogPostList

export const pageQuery = graphql`
  query blogIndex {
    allMdx {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
