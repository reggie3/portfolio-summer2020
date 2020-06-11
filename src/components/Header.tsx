import React, { useEffect } from "react"
import AnimatedHeader from "./AnimatedHeader"
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from "@react-hook/window-size"

interface HeaderProps {
  isVisible?: boolean
  setVisibility: (isVisible: boolean) => void
}

const Header = ({ isVisible, setVisibility }: HeaderProps) => {
  const [width, height] = useWindowSize()

  useEffect(() => {
    console.log({ isVisible })
    setVisibility(isVisible)
  }, [isVisible])

  return (
    <header>
      <AnimatedHeader width={width} />
    </header>
  )
}

export default Header
