import React, { useState, useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import AnimatedHeader from "../components/AnimatedHeader";
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
