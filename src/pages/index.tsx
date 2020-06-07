import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Footer from "../components/Footer"
import TrackVisibility from "react-on-screen"
import ScrollToTopButton from "../components/ScrollToTopButton"
import AnimatedHeader from "../components/AnimatedHeader"
import BlogPostList from "../components/BlogPostList"
import Header from "../components/Header"

const IndexPage = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)

  const setHeaderVisibility = (isVisible: boolean) => {
    setIsHeaderVisible(isVisible)
  }

  const onScrollToTopClicked = () => {
    window.scrollTo(0, 0)
  }

  return (
    <Layout>
      <div id="indexPageRoot">
        <TrackVisibility partialVisibility>
          <Header setVisibility={setHeaderVisibility} />
        </TrackVisibility>
        <ScrollToTopButton
          isVisible={!isHeaderVisible}
          onClick={onScrollToTopClicked}
        />
        <div id="contentContainer">
          <BlogPostList />
        </div>
        <Footer />
      </div>
    </Layout>
  )
}

export default IndexPage
