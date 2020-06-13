import * as React from 'react';
import {
  GlobalAppState,
  AppContext,
  ActionTypes,
  DispatchActions,
} from '../../Context';
import { Theme, makeStyles, createStyles, Typography } from '@material-ui/core';
import { AnalysisArea, AnalysisResult } from '../../models';
import AnalysiAreaListItem from './AnalysisAreaListItem';

export interface AnalysisAreaListListProps {
  analysisAreas: AnalysisArea[];
  analysisResults: AnalysisResult[];
  dispatch: React.Dispatch<DispatchActions>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: 10,
      borderTopStyle: 'solid',
      borderTopWidth: 1,
      paddingTop: 10,
      borderTopColor: 'goldenrod',
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
    return (
      <Typography className={classes.heading}>
        No Analysis Areas Defined{' '}
      </Typography>
    );
  }
  return (
    <div className={classes.root}>
      {analysisAreas.map((analysisArea) => (
        <AnalysiAreaListItem
          key={analysisArea.id}
          analysisArea={analysisArea}
          analysisResults={analysisResults}
        />
      ))}
    </div>
  );
};

export default AnalysisAreaList;
