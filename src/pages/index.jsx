import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Footer from "../components/Footer";
import BlogPostList from "../components/BlogPostList";
import Header from "../components/Header";
import styled from "styled-components";

const IndexPage = () => {
  const onScrollToTopClicked = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      {/* <SEO title="Home" /> */}
      <div id="indexPageRoot">
        <Header onScrollToTopClicked={onScrollToTopClicked} />
        <ContentContainer id="contentContainer">
          <BlogPostList />
        </ContentContainer>
        <Footer />
      </div>
    </Layout>
  );
};

export default IndexPage;

export const ContentContainer = styled.div`
  background-color: var(--clr-bg-light);
`;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        author
        description
        title
      }
    }
    allMdx {
      edges {
        node {
          id
          rawBody
          fields {
            slug
          }
          frontmatter {
            title
            tags
          }
          body
        }
      }
    }
  }
`;
