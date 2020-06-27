import * as React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import { GlobalAppState, AppContext, DispatchActions } from "../../Context";
import LocationList from "./LocationList";
import AnalysisAreaList from "./AnalysisAreasList";

interface LocationListDrawerProps {
  isLocationDrawerVisible: boolean;
  onCloseDrawer: () => void;
}

const drawerComponentVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1 },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const LocationListDrawer: React.FunctionComponent<LocationListDrawerProps> = ({
  isLocationDrawerVisible,
  onCloseDrawer,
}) => {
  const [state, dispatch]: [
    GlobalAppState,
    React.Dispatch<DispatchActions>
  ] = React.useContext(AppContext);
  const { analysisAreas, appState, locations } = state;
  const analysisResults = appState.analysisResults;

  return (
    <AnimatePresence>
      {isLocationDrawerVisible && (
        <DrawerComponentRoot
          variants={drawerComponentVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <ContentContainer
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <LocationList dispatch={dispatch} locations={locations} />
            <AnalysisAreaList
              dispatch={dispatch}
              analysisAreas={analysisAreas}
              analysisResults={analysisResults}
            />
          </ContentContainer>
          <Button variant="contained" color="secondary" onClick={onCloseDrawer}>
            <FontAwesomeIcon icon={"chevron-circle-right"} size="2x" />
          </Button>
        </DrawerComponentRoot>
      )}
    </AnimatePresence>
  );
};

export default LocationListDrawer;

const DrawerComponentRoot = styled(motion.div)`
  display: flex;
  flex-direction: column;
  z-index: 1200;
  width: 40%;
  min-width: 300px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  background-color: white;
  padding: 5px 15px;
  transform-origin: right;
`;

const ContentContainer = styled(motion.div)`
  flex: 1;
  margin-bottom: 100;
  display: flex;
  flex-direction: column;
`;
