import * as React from "react";
import { AnalysisResult, MarkerTypes } from "../../models";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import { formatPercent } from "../../utilities";
import { AppColors } from "../../colors";
import { useState } from "react";

interface RunResultsTableProps {
  analysisAreaId: string;
  analysisResults: AnalysisResult[];
}

const RunResultsTable: React.FunctionComponent<RunResultsTableProps> = ({
  analysisAreaId,
  analysisResults,
}) => {
  const classes = useStyles();
  const [thisAreasResults, setThisAreasResults] = useState<AnalysisResult[]>(
    []
  );

  React.useEffect(() => {
    setThisAreasResults(
      analysisResults
        .filter(result => result.id === analysisAreaId)
        .sort((a, b) => a.timeRanMillis - b.timeRanMillis)
    );
  }, [analysisAreaId, analysisResults]);

  if (!analysisResults.length) {
    return null;
  }
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
          {thisAreasResults.map((analysisResult, index) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">
                  {formatPercent(analysisResult.friendlyWinPercentage)}
                </TableCell>
                <TableCell align="right">
                  {formatPercent(analysisResult.enemyWinPercentage)}
                </TableCell>
                <TableCell align="right">
                  {formatPercent(analysisResult.neutralWinPercentage)}
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
