import * as React from 'react';
import {
  Modal,
  makeStyles,
  isWidthDown,
  Button,
  ButtonProps,
} from '@material-ui/core';
import globalStyles, { centered } from '../../styles/styles';
import { Point } from '../../models';
import useDimensions from 'react-use-dimensions';
import { useEffect, useState } from 'react';
import { AppContext } from '../../Context';
import HorizontalRule from '../Common/HorizontalRule';

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

const useStyles = makeStyles({
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modal: ({ position, width }: { position: Point; width: string }) => {
    const pos = position
      ? {
          left: position[0],
          top: position[1],
          transform: `translate(-50%, -10%)`,
        }
      : centered;
    return {
      ...pos,
      width,
    };
  },
});

const ModalWrapper = ({
  children,
  cancelButtonProps = { color: 'secondary' },
  cancelButtonLabel = 'Cancel',
  closeButtonProps = { color: 'primary' },
  closeButtonLabel = 'Close',
  isOpen,
  onClose,
  onCancelButtonClick,
  onCloseButtonClick,
  position,
  width = '400px',
}: ModalContainerProps) => {
  const [safeModalPosition, setSafeModalPosition] = useState<Point>(null);
  let classes = useStyles({ position, width });
  const [ref, modalDimensions] = useDimensions();
  const [{ appState }, dispatch] = React.useContext(AppContext);

  /*  useEffect(() => {
    const [screenWidth, screenHeight]: [number, number] = appState.dimensions;
    const {
      bottom,
      height,
      left,
      right,
      top,
      width,
      x,
      y,
    }: {
      bottom: number;
      height: number;
      left: number;
      right: number;
      top: number;
      width: number;
      x: number;
      y: number;
    } = modalDimensions;
    console.log('appState.dimensions', appState.dimensions);
    console.log('*************');
    console.log('modalDimensions', modalDimensions);
    console.log('*************');

    const newPosition: Point = position;
    if (right > screenWidth) {
      newPosition[0] = screenWidth - width;
    }
    if (x < 0) {
      newPosition[0] = 0;
    }

    setSafeModalPosition(newPosition);
  }, [appState?.dimensions, modalDimensions]);
 */

  useEffect(() => {
    if (isOpen) {
      const {
        bottom,
        height,
        left,
        right,
        top,
        width,
        x,
        y,
      }: {
        bottom: number;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
        x: number;
        y: number;
      } = modalDimensions;
      console.log({ modalDimensions });
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={`${globalStyles().paper} ${classes.modal}`} ref={ref}>
        {children}
        <HorizontalRule />
        <div className={classes.buttonsContainer}>
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
