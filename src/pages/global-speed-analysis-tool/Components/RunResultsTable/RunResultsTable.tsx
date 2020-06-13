import * as React from 'react';
import { AnalysisResult, MarkerTypes } from '../../models';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from '@material-ui/core';
import { formatPercent } from '../../utilities';
import { AppColors } from '../../colors';

interface RunResultsTableProps {
  analysisAreaId: string;
  analysisResults: AnalysisResult[];
}

const RunResultsTable: React.FunctionComponent<RunResultsTableProps> = ({
  analysisAreaId,
  analysisResults,
}) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Run</TableCell>
            <TableCell
              align="right"
              style={{ color: AppColors.friendlyLocation }}
            >
              Friendly
            </TableCell>
            <TableCell align="right" style={{ color: AppColors.enemyLocation }}>
              Enemy
            </TableCell>
            <TableCell
              align="right"
              style={{ color: AppColors.neutralLocation }}
            >
              Neutral
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {analysisResults.map((analysisResult, index) => {
            const runResults = analysisResult.analysisAreaStatsMap.get(
              analysisAreaId
            );
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="right">
                  {formatPercent(runResults.wins[MarkerTypes.FRIENDLY])}
                </TableCell>
                <TableCell align="right">
                  {formatPercent(runResults.wins[MarkerTypes.ENEMY])}
                </TableCell>
                <TableCell align="right">
                  {formatPercent(runResults.wins[MarkerTypes.NEUTRAL])}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RunResultsTable;

const useStyles = makeStyles({
  table: {},
});
