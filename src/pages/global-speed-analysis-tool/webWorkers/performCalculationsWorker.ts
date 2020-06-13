// @ts-ignore Module '"c:/Users/regin/Dropbox/Portfolios/portfolio-winter2018/src/pages/global-speed-analysis-tool/webWorkers/performCalculations.worker"' has no default export.
import PerformCalculationsWorker from './performCalculations.worker';

const performCalculationsWorker =
  typeof window === 'object' && new PerformCalculationsWorker();

export default performCalculationsWorker;
