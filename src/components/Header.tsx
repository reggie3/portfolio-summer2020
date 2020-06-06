import { Link, useStaticQuery, graphql } from "gatsby"
import React, { useEffect } from "react"
import ThreeLogo from "./ThreeLogo"

interface HeaderProps {
  isVisible?: boolean
  setVisibility: (isVisible: boolean) => void
}

const Header = ({ isVisible, setVisibility }: HeaderProps) => {
  useEffect(() => {
    console.log({ isVisible })
    setVisibility(isVisible)
  }, [isVisible])

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <header>
      <ThreeLogo />
    </header>
  )
}

export default Header
