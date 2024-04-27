import * as React from 'react'
import { createRoot } from 'react-dom/client';
import {
  ControlCleanupCallback,
  ILoaderArgs,
  IRemoteComponentCardApi,
} from '@directum/sungero-remote-component-types';
import EmployeesRating from '../controls/employees-rating/employees-rating';

/**
 * Загрузчик контрола для контекста карточки.
 * @param args Аргументы загрузчика.
 */
export default (args: ILoaderArgs): Promise<ControlCleanupCallback> => {
  const root = createRoot(args.container);
  root.render(<EmployeesRating initialContext={args.initialContext} api={args.api as IRemoteComponentCardApi} />);
  return Promise.resolve(() => root.unmount());
}
