import { Link, useStaticQuery, graphql } from "gatsby"
import React, { useEffect } from "react"

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
      <p id="header-title">{data.site.siteMetadata.title}</p>
      <Link>Test me link</Link>
    </header>
  )
}

export default Header
