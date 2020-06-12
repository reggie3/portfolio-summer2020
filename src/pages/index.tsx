import React, { useState, useEffect } from "react";

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
