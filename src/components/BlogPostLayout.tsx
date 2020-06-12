import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Img from "gatsby-image";
import { Link } from "gatsby";
import BlogPostHeader from "./BlogPostHeader";
import BlogPostContent from "./BlogPostContent";
import Footer from "./Footer";
import styled from "styled-components";
import TagCloud from "./TagCloud";
import ReturnHomeButton from "./ReturnHomeButton";
import { bg_dark } from "../styles/colors";
const shortcodes = { Link, Img }; // Provide common components here

export default function PageTemplate({ data: { mdx } }) {
  const onScrollToTopClicked = () => {
    window.scrollTo(0, 0);
  };

  return (
    <BlogPostPage>
      <BlogPostHeader
        onScrollToTopClicked={onScrollToTopClicked}
        title={mdx.frontmatter.title}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: bg_dark,
          alignItems: "center",
        }}
      >
        <ReturnHomeButton />
        <div style={{ flex: 1 }}>
          <TagCloud
            allTags={mdx.frontmatter.tags}
            alwaysShowTags={true}
            selectedTags={mdx.frontmatter.tags}
          />
        </div>
      </div>
      <BlogPostContent>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </BlogPostContent>
      <Footer />
    </BlogPostPage>
  );
}

const BlogPostPage = styled.div``;

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
`;
