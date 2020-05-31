import React, { useState } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Footer from "../components/Footer"
import TrackVisibility from "react-on-screen"
import ScrollToTopButton from "../components/ScrollToTopButton"
import Header from "../components/Header"
import BlogPostList from "../components/BlogPostList"

const IndexPage = ({ data }) => {
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
          <Header
            setVisibility={setHeaderVisibility}
            siteTitle={data.site.siteMetadata.title}
          />
        </TrackVisibility>
        <ScrollToTopButton
          isVisible={!isHeaderVisible}
          onClick={onScrollToTopClicked}
        />
        <BlogPostList />
        <Footer />
      </div>
    </Layout>
  )
}

export default IndexPage

const pageQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
