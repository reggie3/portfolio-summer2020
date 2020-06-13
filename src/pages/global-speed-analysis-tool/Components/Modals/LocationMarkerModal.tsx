import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import {
  ModalInfo,
  Modals,
  MarkerTypes,
  ModalParams,
  GsatLocation,
} from '../../models';
import { makeStyles } from '@material-ui/core/styles';
import {
  ModalAction,
  ActionTypes,
  AppContext,
  GlobalAppState,
} from '../../Context';
import globalStyles from '../../styles/styles';
import ModalWrapper from './ModalWrapper';
import {
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { useContext } from 'react';

export interface LocationModalProps {}

const useStyles = makeStyles({
  formBodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5px',
  },
  textInput: {
    width: '11em',
  },
});

const Body = ({ locationModal }: { locationModal: ModalInfo }) => {
  const [state, dispatch]: [GlobalAppState, React.Dispatch<any>] = useContext(
    AppContext
  );

  let classes = useStyles();
  const currentParams = locationModal.params;
  const { icon, name } = currentParams.location;

  const onChangeMarkerType = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionTypes.UPDATE_MODAL,
      payload: {
        name: Modals.LOCATION_MARKER,
        update: {
          location: {
            ...currentParams.location,
            icon: { ...icon, type: event.target.value },
          },
        },
      },
    });
  };
  const onChangeValue = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: ActionTypes.UPDATE_MODAL,
      payload: {
        name: Modals.LOCATION_MARKER,
        update: {
          location: {
            ...currentParams.location,
            [key]: event.target.value,
          },
        },
      },
    });
  };

  return (
    <>
      <h3 id="configureLocationHeader">Configure Location</h3>
      <div className={classes.formBodyContainer}>
        <div className={classes.formRow}>
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Location Name"
            onChange={(event) =>
              onChangeValue(
                'name',
                event as React.ChangeEvent<HTMLInputElement>
              )
            }
            value={locationModal.params.location?.name ?? ''}
          />

          <TextField
            label="Type"
            id="markerTypeSelect"
            value={icon.type}
            onChange={onChangeMarkerType}
            select
          >
            <MenuItem value={MarkerTypes.FRIENDLY}>Friendly</MenuItem>
            <MenuItem value={MarkerTypes.ENEMY}>Enemy</MenuItem>
            <MenuItem value={MarkerTypes.NEUTRAL}>Neutral</MenuItem>
          </TextField>
        </div>
        <div className={classes.formRow}>
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Travel Speed"
            onChange={(event) =>
              onChangeValue(
                'speed',
                event as React.ChangeEvent<HTMLInputElement>
              )
            }
            value={locationModal.params.location?.speed}
            InputProps={{
              endAdornment: <InputAdornment position="end">kph</InputAdornment>,
            }}
          />
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Speed Deviation"
            onChange={(event) =>
              onChangeValue(
                'speedDeviation',
                event as React.ChangeEvent<HTMLInputElement>
              )
            }
            value={locationModal.params.location?.speedDeviation}
            InputProps={{
              endAdornment: <InputAdornment position="end">kph</InputAdornment>,
            }}
          />
        </div>
        <div className={classes.formRow}>
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Max Range"
            onChange={(event) =>
              onChangeValue(
                'maxRange',
                event as React.ChangeEvent<HTMLInputElement>
              )
            }
            value={
              locationModal.params.location?.maxRange ?? '0 (infinite range)'
            }
            InputProps={{
              endAdornment: <InputAdornment position="end">km</InputAdornment>,
            }}
          />
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Range Deviation"
            onChange={(event) =>
              onChangeValue(
                'maxRangeDeviation',
                event as React.ChangeEvent<HTMLInputElement>
              )
            }
            value={locationModal.params.location?.maxRangeDeviation}
            InputProps={{
              endAdornment: <InputAdornment position="end">km</InputAdornment>,
            }}
          />
        </div>
      </div>
    </>
  );
};

const LocationMarkerModal = ({}: LocationModalProps) => {
  const [state, dispatch]: [GlobalAppState, any] = useContext(AppContext);

  const locationModal = state.modals.find(
    (modal: ModalInfo) => modal.name === Modals.LOCATION_MARKER
  );
  const { isOpen, params } = locationModal;

  const onClose = () => {
    dispatch({
      type: ActionTypes.CLOSE_MODAL,
      payload: { name: Modals.LOCATION_MARKER },
    });
  };

  const onCloseButtonClick = () => {
    const location: GsatLocation = locationModal.params.location;
    dispatch({
      type: location.id
        ? ActionTypes.UPDATE_LOCATION
        : ActionTypes.ADD_LOCATION,
      payload: {
        location: {
          ...location,
          name: location.name ?? `Location ${Date.now()}`,
          icon: {
            ...location.icon,
            type: location.icon.type ?? MarkerTypes.FRIENDLY,
          },
        },
      },
    });
    dispatch({
      type: ActionTypes.CLOSE_MODAL,
      payload: {
        name: Modals.LOCATION_MARKER,
      },
    });
  };

  const onCancelButtonClick = () => {
    dispatch({
      type: ActionTypes.CLOSE_MODAL,
      payload: {
        name: Modals.LOCATION_MARKER,
      },
    });
  };

  return (
    <ModalWrapper
      closeButtonLabel="Save"
      isOpen={isOpen}
      onClose={onClose}
      onCloseButtonClick={onCloseButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      position={params?.position}
    >
      <Body locationModal={locationModal} />
    </ModalWrapper>
  );
};

export default LocationMarkerModal;
