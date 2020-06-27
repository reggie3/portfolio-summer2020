import * as React from "react";
import { Modal, Button, ButtonProps } from "@material-ui/core";
import { modalStyle } from "../../styles/styles";
import { Point } from "../../models";
import useDimensions from "react-use-dimensions";
import { useEffect, useState } from "react";
import { AppContext } from "../../Context";
import HorizontalRule from "../Common/HorizontalRule";

export interface ModalContainerProps {
  cancelButtonLabel?: string;
  cancelButtonProps?: ButtonProps;
  children: React.ReactElement;
  closeButtonLabel?: string;
  closeButtonProps?: ButtonProps;
  isOpen: boolean;
  onClose: () => void;
  onCancelButtonClick: () => void;
  onCloseButtonClick: () => void;
  position?: Point;
  width?: string;
}

const ModalWrapper = ({
  children,
  cancelButtonProps = { color: "secondary" },
  cancelButtonLabel = "Cancel",
  closeButtonProps = { color: "primary" },
  closeButtonLabel = "Close",
  isOpen,
  onClose,
  onCancelButtonClick,
  onCloseButtonClick,
  position,
  width = "400px",
}: ModalContainerProps) => {
  //const [safeModalPosition, setSafeModalPosition] = useState<Point>(null);
  //let classes = useStyles({ position, width });
  const [ref, modalDimensions] = useDimensions();
  const [{ appState }] = React.useContext(AppContext);
  const [safeModalStyle, setSafeModalStyle] = useState(modalStyle);

  useEffect(() => {
    /*  console.log("appState.dimensions", appState.dimensions);
    console.log("modalDimensions", modalDimensions);
    console.log("position", position); */
    const { dimensions } = appState;

    if (position) {
      let leftPos = position[0];
      let topPos = position[1];
      if (position[0] + modalDimensions.width > dimensions[0]) {
        const xExcess = position[0] + modalDimensions.width - dimensions[0];
        leftPos = leftPos - xExcess - 10;
      }
      if (position[1] + modalDimensions.height > dimensions[1]) {
        // if the modal is going to go off the edge of the screen, then
        // make it appear further up on the screen than the click point
        topPos = topPos - modalDimensions.height - 10;
      }
      if (topPos < 0) {
        topPos = 5;
      }

      setSafeModalStyle(safeModalStyle => {
        return {
          ...safeModalStyle,
          left: leftPos + "px",
          top: topPos + "px",
        };
      });
    }
  }, [appState, modalDimensions, position]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={safeModalStyle} ref={ref}>
        {children}
        <HorizontalRule />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Button
            onClick={onCloseButtonClick}
            variant="contained"
            {...closeButtonProps}
          >
            {closeButtonLabel}
          </Button>
          {onCancelButtonClick && (
            <Button
              onClick={onCancelButtonClick}
              variant="contained"
              {...cancelButtonProps}
            >
              {cancelButtonLabel}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalWrapper;
