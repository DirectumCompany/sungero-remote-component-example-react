import { IRemoteControlLoader } from '@directum/sungero-remote-component-types';

import * as ActionPanelCoverLoader from './src/loaders/actions-panel-cover-loader';
import * as GanttCoverLoader from './src/loaders/gantt-cover-loader';
import * as PerformedWorkDetailsGridCardLoader from './src/loaders/performed-work-details-grid-card-loader';
import * as StringControlCardLoader from './src/loaders/string-control-card-loader';
import * as EmployeesRatingLoader from './src/loaders/employees-rating-loader';

// Загрузчики контролов компонента.
const loaders: Record<string, IRemoteControlLoader> = {
  'actions-panel-cover-loader': ActionPanelCoverLoader,
  'gantt-cover-loader': GanttCoverLoader,
  'performed-work-details-grid-card-loader': PerformedWorkDetailsGridCardLoader,
  'string-control-card-loader': StringControlCardLoader,
  'employees-rating-loader': EmployeesRatingLoader,
};

export default loaders;
