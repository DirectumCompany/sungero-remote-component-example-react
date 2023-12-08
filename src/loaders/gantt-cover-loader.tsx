import * as React from 'react'
import { createRoot } from 'react-dom/client';
import { ControlCleanupCallback, ILoaderArgs } from '@directum/sungero-remote-component-types';

import Gantt from '../controls/gantt/gantt';

/**
 * Загрузчик контрола для контекста обложки модуля.
 * @param args Аргументы загрузчика.
 */
export default (args: ILoaderArgs): Promise<ControlCleanupCallback> => {
  const root = createRoot(args.container);
  root.render(<Gantt initialContext={args.initialContext} api={args.api} />);
  return Promise.resolve(() => root.unmount());
};
