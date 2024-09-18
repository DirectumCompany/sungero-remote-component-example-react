import React from 'react';
import { useTranslation } from 'react-i18next';
import { ControlUpdateHandler, IRemoteComponentCardApi, IRemoteComponentContext } from '@directum/sungero-remote-component-types';

import '../../../i18n';

import PerformedWorkDetailsGridView from './performed-work-details-grid-view';
import { IPerformedWork } from './types';

const DEFAULT_CULTURE = 'en';

interface IProps {
  initialContext: IRemoteComponentContext;
  api: IRemoteComponentCardApi;
}

/** Пример стороннего контрола, реализующего грид для отметки выполненных работ. */
const PerformedWorkDetailsGrid: React.FC<IProps> = ({ initialContext, api }) => {
  // Получаем сущность из карточки веб клиента через метод getEntity.
  const [ entity, setEntity ] = React.useState<IPerformedWork>(api.getEntity<IPerformedWork>());
  // Используем контекст, полученный в момент загрузки стороннего контрола, в качестве начального.
  // После обновления контрола, берем новый контекст.
  const [ context, setContext ] = React.useState(initialContext);
  
  // Задаем локализацию внутри контрола в соответствии с локализацией в контексте, в котором находится контрол.
  const currentCulture = context?.currentCulture ?? DEFAULT_CULTURE;
  const { i18n } = useTranslation();
  React.useEffect(() => {      
    i18n.changeLanguage(currentCulture);
  }, [ currentCulture ]);

  // Задаем обработчик события обновления контрола.
  const handleControlUpdate: ControlUpdateHandler = React.useCallback(updatedContext => {
    // Заново получаем актуальную сущность через API и устанавливаем в state, чтобы перерисовать компоненты контрола с актуальными данными сущности из карточки.
    const updatedEntity = api.getEntity<IPerformedWork>();
    setEntity(updatedEntity);
    // Устанавливаем в state актуальный контекст.
    setContext(updatedContext);
  }, [ api, setEntity ]);
  api.onControlUpdate = handleControlUpdate;

  return <PerformedWorkDetailsGridView entity={entity} />;
};

export default PerformedWorkDetailsGrid;
