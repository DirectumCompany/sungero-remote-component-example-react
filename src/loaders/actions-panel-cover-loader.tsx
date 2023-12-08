import * as React from 'react'
import { createRoot } from 'react-dom/client';
import { ControlCleanupCallback, ILoaderArgs, IRemoteComponentCoverApi } from '@directum/sungero-remote-component-types';

import ActionsPanel from '../controls/actions-panel/actions-panel';

/**
 * Загрузчик контрола для контекста обложки модуля.
 * @param args Аргументы загрузчика.
 */
export default (args: ILoaderArgs): Promise<ControlCleanupCallback> => {
  const root = createRoot(args.container);
  root.render(<ActionsPanel initialContext={args.initialContext} api={args.api as IRemoteComponentCoverApi} />);
  return Promise.resolve(() => root.unmount());
};
