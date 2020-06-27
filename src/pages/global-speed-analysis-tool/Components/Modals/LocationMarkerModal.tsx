import * as React from "react";
import { ModalInfo, Modals, MarkerTypes, GsatLocation } from "../../models";
import { makeStyles } from "@material-ui/core/styles";
import { ActionTypes, AppContext, GlobalAppState } from "../../Context";
import ModalWrapper from "./ModalWrapper";
import { MenuItem, TextField } from "@material-ui/core";
import { useContext } from "react";
import LocationItemDataEntry from "../Common/LocationItemDataEntry";
import { isNumber } from "lodash";

export interface LocationModalProps {}

const useStyles = makeStyles({
  formBodyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  formRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "5px",
  },
  textInput: {
    width: "11em",
  },
});

const Body = ({ locationModal }: { locationModal: ModalInfo }) => {
  const [, dispatch]: [GlobalAppState, React.Dispatch<any>] = useContext(
    AppContext
  );

  let classes = useStyles();
  const currentParams = locationModal.params;
  const { icon } = currentParams.location;

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
    const value = parseInt(event.target.value, 10);

    if (isNumber(value)) {
      dispatch({
        type: ActionTypes.UPDATE_MODAL,
        payload: {
          name: Modals.LOCATION_MARKER,
          update: {
            location: {
              ...currentParams.location,
              [key]: value,
            },
          },
        },
      });
    }
  };

  return (
    <>
      <h3 id="configureLocationHeader">Configure Location</h3>
      <div className={classes.formBodyContainer}>
        <div className={classes.formRow}>
          <TextField
            className={classes.textInput}
            label="Location Name"
            onChange={event =>
              onChangeValue(
                "name",
                event as React.ChangeEvent<HTMLInputElement>
              )
            }
            value={locationModal.params.location?.name ?? ""}
          />
          {/*  <TextField
            label="Type"
            id="markerTypeSelect"
            value={icon.type}
            onChange={onChangeMarkerType}
            select
          >
            <MenuItem value={MarkerTypes.FRIENDLY}>Friendly</MenuItem>
            <MenuItem value={MarkerTypes.ENEMY}>Enemy</MenuItem>
            <MenuItem value={MarkerTypes.NEUTRAL}>Neutral</MenuItem>
          </TextField> */}
        </div>
        <LocationItemDataEntry
          location={locationModal.params.location}
          onChangeMarkerType={onChangeMarkerType}
          markerTypeValue={icon.type}
          onChangeValue={onChangeValue}
        />
      </div>
    </>
  );
};

const LocationMarkerModal = () => {
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
