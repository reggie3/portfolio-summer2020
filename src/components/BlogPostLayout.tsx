import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import { Link } from "gatsby"
import BlogPostHeader from "./BlogPostHeader"
import BlogPostContent from "./BlogPostContent"
import Footer from "./Footer"
const shortcodes = { Link, Img } // Provide common components here

export default function PageTemplate({ data: { mdx } }) {
  return (
    <div>
      <BlogPostHeader title={mdx.frontmatter.title} />
      <BlogPostContent>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </BlogPostContent>
      <Footer />
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        tags
        title
        date
      }
    }
  }
`
