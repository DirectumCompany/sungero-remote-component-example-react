import React from 'react';
import { useTranslation } from 'react-i18next';
import { IRemoteComponentContext, IEntity, IRemoteControlInfo, IRemoteComponentCardApi, ControlUpdateHandler } from '@directum/sungero-remote-component-types';

import '../../../i18n';

import StringControlView from './string-control-view';

const DEFAULT_CULTURE = 'en';

/** Интерфейс для установки свойств сущности. */
interface IEntityWithProperties extends IEntity {
  [property: string]: any
}

interface IProps {
  initialContext: IRemoteComponentContext;
  api: IRemoteComponentCardApi;
  controlInfo: IRemoteControlInfo;
}

/** 
 * Пример контрола, реализующего редактор строкового свойства.
 * В качестве примера контрол привязывается к свойству Subject Простого документа из Directum RX. 
 */
const StringControl: React.FC<IProps> = ({ initialContext, api, controlInfo }) => {
  const propertyName = controlInfo.propertyName;
  if (!propertyName)
    throw new Error('propertyName is not defined');

  // Получаем сущность из карточки веб клиента через метод getEntity.
  const [ entity, setEntity ] = React.useState<IEntityWithProperties>(() => api.getEntity<IEntityWithProperties>());

  // Используем контекст, полученный в момент загрузки стороннего контрола, в качестве начального.
  // После обновления контрола, берем новый контекст.
  const [ context, setContext ] = React.useState(initialContext);

  // Задаем локализацию внутри контрола в соответствии с локализацией в контексте, в котором находится контрол.
  const currentCulture = context.currentCulture ?? DEFAULT_CULTURE;
  const { t, i18n } = useTranslation();
  React.useEffect(() => {      
    i18n.changeLanguage(currentCulture);
  }, [ currentCulture ]);
  
  // Задаем обработчик события обновления контрола.
  const handleControlUpdate: ControlUpdateHandler = React.useCallback(updatedContext => {
    // Заново получаем актуальную сущность через API и устанавливаем в state, чтобы перерисовать компоненты контрола с актуальными данными сущности из карточки.
    setEntity(api.getEntity<IEntityWithProperties>());
    // Устанавливаем в state актуальный контекст.
    setContext(updatedContext);
  }, [ api, setEntity ]);
  api.onControlUpdate = handleControlUpdate;

  const handleChange = React.useCallback(async (newValue: string) => {
    // При изменении значения в контроле, изменяем соответствующее свойство сущности через API.
    await entity.changeProperty(propertyName, newValue);
  }, [ entity ]);

  const isLocked = entity.LockInfo && (entity.LockInfo.IsLocked && (!entity.LockInfo.IsLockedByMe || !entity.LockInfo.IsLockedHere));
  const isEnabled = entity.State.IsEnabled && !isLocked;
  
  // Получение информации о свойстве, для получения локализованного имени свойства.
  const propertyInfo = entity.Info.properties.find(p => p.name === controlInfo.propertyName);

  return <StringControlView
    label={propertyInfo?.displayValue ?? t('stringControl.label')}
    value={entity[propertyName] as string ?? undefined}
    onChange={handleChange}
    theme={context.theme}
    isEnabled={isEnabled}
  />;
};

export default StringControl;
