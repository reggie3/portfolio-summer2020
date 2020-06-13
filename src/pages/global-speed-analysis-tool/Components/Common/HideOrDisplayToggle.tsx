import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fab } from '@material-ui/core';

export interface HideOrDisplayToggleProps {
  className: string;
  isVisible: boolean;
  onToggleVisiblity: () => void;
}

export function HideOrDisplayToggle({
  className,
  isVisible,
  onToggleVisiblity,
}: HideOrDisplayToggleProps) {
  return (
    <Fab
      color="primary"
      size="small"
      onClick={onToggleVisiblity}
      className={className}
    >
      {isVisible ? (
        <FontAwesomeIcon icon={'eye-slash'} />
      ) : (
        <FontAwesomeIcon icon={'eye'} />
      )}
    </Fab>
  );
}
