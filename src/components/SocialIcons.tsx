import * as React from "react"
import { SocialIcon } from "react-social-icons"

interface SocialIconsProps {}

const height = 35,
  width = 35

const fgColor = "rgba(0,0,0,.9)"

const SocialIcons: React.FunctionComponent<SocialIconsProps> = props => {
  return (
    <div className="socialIconsRoot">
      <SocialIcon
        url="https://www.linkedin.com/in/reggie3"
        className="socialIconButton"
        bgColor="rgba(0,0,0,0)"
        fgColor={fgColor}
        style={{ height, width }}
      />
      <SocialIcon
        url="https://www.github.com/reggie3"
        className="socialIconButton"
        bgColor="rgba(0,0,0,0)"
        fgColor={fgColor}
        style={{ height, width }}
      />
      <SocialIcon
        url="https://medium.com/@reginald.johnson"
        className="socialIconButton"
        bgColor="rgba(0,0,0,0)"
        fgColor={fgColor}
        style={{ height, width }}
      />
      <SocialIcon
        url="https://www.twitter.com/reginald3"
        className="socialIconButton"
        bgColor="rgba(0,0,0,0)"
        fgColor={fgColor}
        style={{ height, width }}
      />
    </div>
  )
}

export default SocialIcons
