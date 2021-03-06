import * as React from "react";
import { AnalysisArea, AnalysisResult } from "../../models";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  createStyles,
  Theme,
  makeStyles,
} from "@material-ui/core";
import RunResultsTable from "../RunResultsTable/RunResultsTable";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
interface AnalysisAreaListItemProps {
  analysisArea: AnalysisArea;
  analysisResults: AnalysisResult[];
}

const AnalysisAreaListItem: React.FunctionComponent<AnalysisAreaListItemProps> = ({
  analysisArea,
  analysisResults,
}) => {
  const classes = useStyles();

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>
          {analysisArea.name || analysisArea.id}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <RunResultsTable
          analysisAreaId={analysisArea.id}
          analysisResults={analysisResults}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default AnalysisAreaListItem;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 600,
    },
  })
);
