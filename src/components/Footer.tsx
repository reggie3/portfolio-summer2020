import * as React from "react"
import SocialIcons from "./SocialIcons"

interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = props => {
  return (
    <footer>
      <SocialIcons />
    </footer>
  )
}

export default Footer
