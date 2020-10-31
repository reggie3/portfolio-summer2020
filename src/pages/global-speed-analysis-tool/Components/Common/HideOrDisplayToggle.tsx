import * as React from "react";
import { Fab } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

export interface HideOrDisplayToggleProps {
  className: string;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

export function HideOrDisplayToggle({
  className,
  isVisible,
  onToggleVisibility,
}: HideOrDisplayToggleProps) {
  return (
    <Fab
      color="primary"
      size="small"
      onClick={onToggleVisibility}
      className={className}
    >
      {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </Fab>
  );
}
