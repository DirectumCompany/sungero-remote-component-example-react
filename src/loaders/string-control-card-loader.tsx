import * as React from 'react'
import { createRoot } from 'react-dom/client';
import { ControlCleanupCallback, ILoaderArgs, IRemoteComponentCardApi } from '@sungero/remote-component-types';

import StringControl from '../controls/string-control/string-control';

/**
 * Загрузчик контрола для контекста карточки.
 * @param args Аргументы загрузчика.
 */
export default (args: ILoaderArgs): Promise<ControlCleanupCallback> => {
  const root = createRoot(args.container);
  root.render(<StringControl initialContext={args.initialContext} api={args.api as IRemoteComponentCardApi} controlInfo={args.controlInfo} />);
  return Promise.resolve(() => root.unmount());
};
