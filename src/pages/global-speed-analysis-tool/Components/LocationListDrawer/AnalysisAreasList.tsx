import * as React from "react";
import { DispatchActions } from "../../Context";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { AnalysisArea, AnalysisResult } from "../../models";
import AnalysisAreaListItem from "./AnalysisAreaListItem";
import { infoTextHeader } from "../../styles/styles";

export interface AnalysisAreaListListProps {
  analysisAreas: AnalysisArea[];
  analysisResults: AnalysisResult[];
  dispatch: React.Dispatch<DispatchActions>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: 10,
      borderTopStyle: "solid",
      borderTopWidth: 1,
      paddingTop: 10,
      borderTopColor: "goldenrod",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
);

const AnalysisAreaList: React.SFC<AnalysisAreaListListProps> = ({
  analysisAreas,
  analysisResults,
  dispatch,
}) => {
  const classes = useStyles();

  if (!analysisAreas.length) {
    return <p style={infoTextHeader}>No Analysis Areas Defined</p>;
  }

  return (
    <div className={classes.root}>
      {analysisAreas.map(analysisArea => (
        <AnalysisAreaListItem
          key={analysisArea.id}
          analysisArea={analysisArea}
          analysisResults={analysisResults}
        />
      ))}
    </div>
  );
};

export default AnalysisAreaList;
