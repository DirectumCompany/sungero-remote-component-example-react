import * as React from 'react'
import { createRoot } from 'react-dom/client';
import { ControlCleanupCallback, ILoaderArgs, IRemoteComponentCardApi } from '@sungero/remote-component-types';

import PerformedWorkDetailsGrid from '../controls/performed-work-details-grid/performed-work-details-grid';

/**
 * Загрузчик контрола для контекста карточки.
 * @param args Аргументы загрузчика.
 */
export default (args: ILoaderArgs): Promise<ControlCleanupCallback> => {
  const root = createRoot(args.container);
  root.render(<PerformedWorkDetailsGrid initialContext={args.initialContext} api={args.api as IRemoteComponentCardApi} />);
  return Promise.resolve(() => root.unmount());
};
