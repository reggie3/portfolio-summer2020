import * as React from "react"
import Fab from "@material-ui/core/Fab"
import ArrowUpward from "@material-ui/icons/ArrowUpward"

interface ScrollToTopButtonProps {
  isVisible: boolean
  onClick: () => void
}

const ScrollToTopButton: React.FunctionComponent<ScrollToTopButtonProps> = ({
  isVisible,
  onClick,
}) => {
  return (
    <div
      id="scrollToTopButtonContainer"
      className={isVisible ? "visible" : "hidden"}
    >
      <Fab color="primary" aria-label="add" size="small" onClick={onClick}>
        <ArrowUpward />
      </Fab>
    </div>
  )
}

export default ScrollToTopButton
