import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ControlUpdateHandler,
  IRemoteComponentCardApi,
  IRemoteComponentContext
} from '@directum/sungero-remote-component-types';

import '../../../i18n';
import { IEmployeeRating } from './types';
import EmployeesRatingView from './employees-rating-view';

const DEFAULT_CULTURE = 'en';

interface IProps {
  initialContext: IRemoteComponentContext;
  api: IRemoteComponentCardApi;
}

const EmployeesRating: React.FC<IProps> =  ({ initialContext, api }) => {
  const [ entity, setEntity ] = React.useState<IEmployeeRating>(api.getEntity<IEmployeeRating>());
  const [ context, setContext ] = React.useState(initialContext);

  const currentCulture = context.currentCulture ?? DEFAULT_CULTURE;
  const { i18n } = useTranslation();
  React.useEffect(() => {
    i18n.changeLanguage(currentCulture);
  }, [ currentCulture ]);

  const handleControlUpdate: ControlUpdateHandler = React.useCallback(updatedContext => {
    const updatedEntity = api.getEntity<IEmployeeRating>();
    setEntity(updatedEntity);
    setContext(updatedContext);
  }, [ api, setEntity ]);
  api.onControlUpdate = handleControlUpdate;

  return <EmployeesRatingView
    entity={entity}
  />
}

export default EmployeesRating;
