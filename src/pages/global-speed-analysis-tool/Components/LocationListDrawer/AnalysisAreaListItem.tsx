import * as React from 'react';
import { AnalysisArea, AnalysisResult } from '../../models';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  createStyles,
  Theme,
  makeStyles,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RunResultsTable from '../RunResultsTable/RunResultsTable';

interface AnalysiAreaListItemProps {
  analysisArea: AnalysisArea;
  analysisResults: AnalysisResult[];
}

const AnalysiAreaListItem: React.FunctionComponent<AnalysiAreaListItemProps> = ({
  analysisArea,
  analysisResults,
}) => {
  const classes = useStyles();

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<FontAwesomeIcon icon={'chevron-circle-down'} />}
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

export default AnalysiAreaListItem;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 600,
    },
  })
);
