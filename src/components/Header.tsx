import { Link } from "gatsby"
import React, { useEffect } from "react"

interface HeaderProps {
  isVisible?: boolean
  siteTitle: string
  setVisibility: (isVisible: boolean) => void
}

const Header = ({ isVisible, setVisibility, siteTitle }: HeaderProps) => {
  useEffect(() => {
    console.log({ isVisible })
    setVisibility(isVisible)
  }, [isVisible])

  return (
    <header>
      <p id="header-title">{siteTitle}</p>
    </header>
  )
}

export default Header
